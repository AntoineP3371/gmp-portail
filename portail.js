// Code partagé entre la page visiteurs (index.html) et l'administration (admin.html).
// Sans PB_URL (config.js) => mode démo : données dans le navigateur (localStorage).
(function () {
  "use strict";
  const PB = (window.PB_URL || "").replace(/\/+$/, "");
  const DEMO_KEY = "portail_demo_config_v1";
  const TOKEN_KEY = "portail_admin_token";
  const ME_KEY = "portail_admin_me";
  const uid = () => Math.random().toString(36).slice(2, 9);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s || "").trim().toLowerCase();
  const okColor = (c) => (/^#[0-9a-f]{3,8}$/i.test(c || "") ? c : "#12284c");

  function safeUrl(u) {
    try { const x = new URL(u, location.href); return /^https?:$/.test(x.protocol) ? x.href : "#"; } catch (e) { return "#"; }
  }
  function safeImg(u) {
    u = String(u || "");
    if (/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(u)) return u;
    const s = u ? safeUrl(u) : "";
    return s === "#" ? "" : s;
  }

  function defaultConfig() {
    return { version: 1, title: "Nos applications", subtitle: "", requireCode: false,
      groups: [{ id: uid(), name: "Accès libre", code: "", color: "#12284c", autoOpen: false, active: true, cards: [] }] };
  }
  function normalizeConfig(c) {
    const d = defaultConfig();
    if (!c || typeof c !== "object") return d;
    return {
      version: 1,
      title: c.title || d.title,
      subtitle: c.subtitle || "",
      requireCode: !!c.requireCode,
      groups: (Array.isArray(c.groups) ? c.groups : []).map((g) => ({
        id: g.id || uid(), name: g.name || "", code: String(g.code || "").replace(/\|/g, ""),
        color: okColor(g.color), autoOpen: !!g.autoOpen, active: g.active !== false,
        cards: (Array.isArray(g.cards) ? g.cards : []).map((k) => ({
          id: k.id || uid(), title: k.title || "", url: k.url || "", text: k.text || "",
          image: k.image || "", blank: k.blank !== false })),
      })),
    };
  }

  // ---- Mode démo : même logique que le hook PocketBase (pb/pb_hooks/portail.pb.js) ----
  function filterView(cfg, codes) {
    const set = codes.map(norm).filter(Boolean);
    const valid = [];
    let groups = [];
    for (const g of cfg.groups) {
      if (g.active === false) continue;
      const gc = norm(g.code);
      const out = { id: g.id, name: g.name, color: g.color, autoOpen: g.autoOpen, cards: g.cards };
      if (!gc) groups.push(out);
      else if (set.includes(gc)) { out.viaCode = gc; groups.push(out); if (!valid.includes(gc)) valid.push(gc); }
    }
    if (cfg.requireCode && !valid.length) groups = [];
    return { title: cfg.title, subtitle: cfg.subtitle, requireCode: !!cfg.requireCode, groups, valid };
  }
  const getDemo = () => { try { return normalizeConfig(JSON.parse(localStorage.getItem(DEMO_KEY))); } catch (e) { return defaultConfig(); } };
  const setDemo = (c) => localStorage.setItem(DEMO_KEY, JSON.stringify(c));

  // ---- API visiteurs ----
  async function view(codes) {
    if (!PB) return filterView(getDemo(), codes);
    const r = await fetch(PB + "/portail/view", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codes: codes.join("|") }) });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  }

  // ---- API admin (comptes de la collection "portail_admins", distincts du super-utilisateur PocketBase) ----
  const AUTH = "/api/collections/portail_admins";
  let recId = null;
  const token = () => sessionStorage.getItem(TOKEN_KEY) || "";
  const authError = () => { const e = new Error("auth"); e.auth = true; return e; };
  async function pb(path, opts) {
    opts = opts || {};
    const r = await fetch(PB + path, Object.assign({}, opts, { headers: { "Content-Type": "application/json", Authorization: token() } }));
    if (r.status === 401) throw authError();
    if (!r.ok) throw new Error("HTTP " + r.status + " " + (await r.text()));
    return r.status === 204 ? null : r.json();
  }
  function remember(a, email) {
    sessionStorage.setItem(TOKEN_KEY, a.token);
    sessionStorage.setItem(ME_KEY, JSON.stringify({ id: a.record.id, email: a.record.email || email }));
  }
  async function login(email, pw) {
    const r = await fetch(PB + AUTH + "/auth-with-password", { method: "POST",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identity: email, password: pw }) });
    if (!r.ok) throw new Error("Identifiants incorrects");
    remember(await r.json(), email);
  }
  // Vérifie que la session est valide (sinon une lecture refusée par les règles renverrait une liste vide)
  async function ensureAuth() {
    if (!token()) throw authError();
    const m = JSON.parse(sessionStorage.getItem(ME_KEY) || "{}");
    remember(await pb(AUTH + "/auth-refresh", { method: "POST" }), m.email);
  }
  const me = () => JSON.parse(sessionStorage.getItem(ME_KEY) || "null");
  // Change le mot de passe du compte connecté, puis se reconnecte (l'ancien jeton devient invalide)
  async function changePassword(oldPw, newPw) {
    const m = me(); if (!m) throw authError();
    const r = await fetch(PB + AUTH + "/records/" + m.id, { method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token() },
      body: JSON.stringify({ oldPassword: oldPw, password: newPw, passwordConfirm: newPw }) });
    if (r.status === 401) throw authError();
    if (!r.ok) throw new Error("Ancien mot de passe incorrect, ou nouveau mot de passe refusé (8 caractères minimum).");
    await login(m.email, newPw);
  }
  const listAdmins = async () => (await pb(AUTH + "/records?perPage=100&sort=created")).items;
  async function createAdmin(email, pw) {
    try { await pb(AUTH + "/records", { method: "POST", body: JSON.stringify({ email, emailVisibility: true, password: pw, passwordConfirm: pw }) }); }
    catch (e) { if (e.auth) throw e; throw new Error("Création refusée : e-mail invalide ou déjà utilisé, ou mot de passe trop court (8 caractères minimum)."); }
  }
  const deleteAdmin = (id) => pb(AUTH + "/records/" + id, { method: "DELETE" });
  const logout = () => { sessionStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(ME_KEY); };
  async function load() {
    if (!PB) return getDemo();
    await ensureAuth();
    const j = await pb("/api/collections/portail_config/records?perPage=1&filter=" + encodeURIComponent('key="main"'));
    if (j.items.length) { recId = j.items[0].id; return normalizeConfig(j.items[0].data); }
    return defaultConfig();
  }
  async function save(cfg) {
    if (!PB) return setDemo(cfg);
    await ensureAuth();
    if (recId) await pb("/api/collections/portail_config/records/" + recId, { method: "PATCH", body: JSON.stringify({ data: cfg }) });
    else recId = (await pb("/api/collections/portail_config/records", { method: "POST", body: JSON.stringify({ key: "main", data: cfg }) })).id;
  }

  // ---- Image : redimensionnée (max 420 px) et stockée dans la config ----
  function imageFromFile(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = () => {
        const im = new Image();
        im.onerror = reject;
        im.onload = () => {
          const k = Math.min(1, 420 / Math.max(im.width, im.height));
          const cv = document.createElement("canvas");
          cv.width = Math.max(1, Math.round(im.width * k)); cv.height = Math.max(1, Math.round(im.height * k));
          cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height);
          let out = cv.toDataURL("image/png");
          if (out.length > 160000) out = cv.toDataURL("image/jpeg", 0.82);
          resolve(out);
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  // ---- Rendu d'une carte (visiteur) ----
  function cardHTML(c, g, badge) {
    const img = safeImg(c.image);
    const ini = esc((c.title || "?").trim().charAt(0).toUpperCase());
    return `<a class="card" href="${esc(safeUrl(c.url))}"${c.blank === false ? "" : ' target="_blank" rel="noopener"'} style="--gc:${okColor(g.color)}">
      <div class="card-img">${img ? `<img src="${esc(img)}" alt="">` : `<span class="card-initial">${ini}</span>`}</div>
      ${badge && g.name ? `<span class="badge">${esc(g.name)}</span>` : ""}
      <h2>${esc(c.title || "Sans titre")}</h2>${c.text ? `<p>${esc(c.text)}</p>` : ""}
      <span class="go">Accéder →</span></a>`;
  }
  function groupsHTML(groups) {
    const multi = groups.length > 1;
    return groups.map((g) => `<section class="vgroup" style="--gc:${okColor(g.color)}">
      ${multi && g.name ? `<h2 class="vgroup-title">${esc(g.name)}</h2>` : ""}
      <div class="grid">${g.cards.map((c) => cardHTML(c, g, !multi)).join("")}</div></section>`).join("");
  }

  // Thème clair / sombre (même principe que l'Atelier GMP)
  function themeIcon() { const b = document.getElementById("themeToggle"); if (b) b.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙"; }
  document.addEventListener("DOMContentLoaded", () => {
    themeIcon();
    const b = document.getElementById("themeToggle");
    if (b) b.addEventListener("click", () => {
      const n = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", n);
      try { localStorage.setItem("theme", n); } catch (e) {}
      themeIcon();
    });
  });

  window.Portail = { PB, uid, esc, norm, okColor, safeUrl, safeImg, defaultConfig, normalizeConfig,
    view, login, changePassword, listAdmins, createAdmin, deleteAdmin, me, logout, load, save, imageFromFile, cardHTML, groupsHTML, hasToken: () => !!token() };
})();
