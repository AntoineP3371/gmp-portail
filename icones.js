// Bibliothèque d'icônes du portail (style « Atelier GMP » : trait arrondi de 3 px, grille 64×64).
// Pour AJOUTER une icône : ajouter une ligne ci-dessous { id, label, tags, svg }.
//   - id    : identifiant unique, sans espace (enregistré dans le lien)
//   - label : nom affiché dans le sélecteur
//   - tags  : mots-clés pour la recherche
//   - svg   : contenu du dessin (sans la balise <svg>), couleur = currentColor
// Ne jamais renommer un id déjà utilisé (les liens qui l'utilisent perdraient leur icône).
window.PORTAIL_ICONS = [
  // --- Réalité virtuelle / augmentée ---
  { id: "casque-vr", label: "Casque VR", tags: "vr réalité virtuelle casque quest",
    svg: `<path d="M10 24h44a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H42l-5-6H27l-5 6H10a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4z"/><path d="M18 24c0-8 6-12 14-12s14 4 14 12"/><circle cx="21" cy="35" r="4" fill="currentColor" stroke="none"/><circle cx="43" cy="35" r="4" fill="currentColor" stroke="none"/>` },
  { id: "ar-cube", label: "Réalité augmentée", tags: "ra ar réalité augmentée cadre visée cube guide",
    svg: `<path d="M10 22v-8h8M46 14h8v8M54 42v8h-8M18 50h-8v-8"/><path d="M32 19l11 6v12l-11 6-11-6V25z"/><path d="M21 25l11 6 11-6M32 31v12"/>` },
  { id: "casque-cube", label: "Casque + cube 3D", tags: "vr casque cube 3d objet",
    svg: `<path d="M10 24h44a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H42l-5-6H27l-5 6H10a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4z"/><path d="M32 12l6 3.4v6.8L32 25.6l-6-3.4v-6.8z"/><path d="M26 15.4l6 3.4 6-3.4M32 18.8v6.8"/><circle cx="21" cy="36" r="3.5" fill="currentColor" stroke="none"/><circle cx="43" cy="36" r="3.5" fill="currentColor" stroke="none"/>` },
  { id: "cube", label: "Assemblage 3D", tags: "cube 3d assemblage isométrique pièce",
    svg: `<path d="M32 8l20 11v22L32 52 12 41V19z"/><path d="M12 19l20 11 20-11"/><path d="M32 30v22"/>` },
  { id: "visionneuse", label: "Visionneuse CAO", tags: "cao visionneuse loupe pièce 3d",
    svg: `<circle cx="27" cy="27" r="17"/><path d="M39 39l15 15" stroke-width="4"/><path d="M27 18l8 4.5v9L27 36l-8-4.5v-9z"/><path d="M19 22.5l8 4.5 8-4.5M27 27v9"/>` },
  // --- Mécanique ---
  { id: "statique", label: "Statique", tags: "statique poutre appui force mécanique cric",
    svg: `<path d="M8 34h48"/><path d="M32 34l-9 16h18z"/><path d="M50 8v17"/><path d="M44 19l6 6 6-6"/><path d="M8 54h48" stroke-dasharray="3 5"/>` },
  { id: "engrenage", label: "Outils / réglages", tags: "engrenage réglages outils mécanique paramètres",
    svg: `<circle cx="32" cy="32" r="13"/><circle cx="32" cy="32" r="5" fill="currentColor" stroke="none"/><path d="M32 6v8M32 50v8M6 32h8M50 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6"/>` },
  { id: "machine-outil", label: "Machine-outil (Atelier)", tags: "atelier usinage machine fraisage tournage gmp réservation",
    svg: `<path d="M45 9h9v33h-9z"/><path d="M7 45h50v7H7z"/><path d="M12 52v4M52 52v4"/><path d="M45 17H29v6"/><path d="M24 23h10v8H24z" fill="currentColor" stroke="none"/><path d="M29 31v7"/><path d="M20 38h18v7H20z"/>` },
  { id: "imprimante-3d", label: "Impression 3D", tags: "imprimante 3d fabrication additive",
    svg: `<path d="M11 8h42v34H11z"/><path d="M11 22h42"/><path d="M27 18h10v7H27z" fill="currentColor" stroke="none"/><path d="M32 25v4"/><path d="M17 42h30" stroke-width="4"/><path d="M27 42v-6h10v6"/><path d="M16 42v12M48 42v12"/>` },
  { id: "roulement", label: "Éléments standards", tags: "roulement standard visserie commande achat",
    svg: `<circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="11"/><circle cx="32" cy="14.5" r="3" fill="currentColor" stroke="none"/><circle cx="44.4" cy="19.6" r="3" fill="currentColor" stroke="none"/><circle cx="49.5" cy="32" r="3" fill="currentColor" stroke="none"/><circle cx="44.4" cy="44.4" r="3" fill="currentColor" stroke="none"/><circle cx="32" cy="49.5" r="3" fill="currentColor" stroke="none"/><circle cx="19.6" cy="44.4" r="3" fill="currentColor" stroke="none"/><circle cx="14.5" cy="32" r="3" fill="currentColor" stroke="none"/><circle cx="19.6" cy="19.6" r="3" fill="currentColor" stroke="none"/>` },
  { id: "profile", label: "Matière (profilé en I)", tags: "matière profilé acier brut",
    svg: `<path d="M14 12h36v9H37v22h13v9H14v-9h13V21H14z"/><path d="M5 32h54" stroke-dasharray="3 5"/>` },
  // --- Course en cours / voiture ---
  { id: "voiture", label: "Voiture", tags: "voiture modelage auto véhicule course",
    svg: `<path d="M7 42v-9c0-2 1-3 3-3l8-1 7-10h18l8 10 6 1c2 0 3 1 3 3v9"/><path d="M7 42h6M23 42h18M51 42h6"/><circle cx="18" cy="42" r="5"/><circle cx="46" cy="42" r="5"/><path d="M22 30l5-9h8v9z"/><path d="M42 21l6 9"/>` },
  { id: "voiture-vitesse", label: "Voiture + vitesse", tags: "voiture vitesse course rapide",
    svg: `<path d="M6 46v-7c0-2 1-3 3-3l7-1 6-8h15l7 8 5 1c2 0 3 1 3 3v7"/><path d="M6 46h5M21 46h22M53 46h5"/><circle cx="16" cy="46" r="5"/><circle cx="48" cy="46" r="5"/><path d="M10 14l6 6M20 10l3 8M32 10v7"/>` },
  { id: "drapeau", label: "Drapeau à damier", tags: "drapeau damier course arrivée",
    svg: `<path d="M14 8v48"/><path d="M14 10h36v26H14z"/><path d="M14 10h9v8.7h-9zM32 10h9v8.7h-9zM23 18.7h9v8.7h-9zM41 18.7h9v8.7h-9zM14 27.4h9V36h-9zM32 27.4h9V36h-9z" fill="currentColor" stroke="none"/>` },
  { id: "peinture", label: "Rouleau de peinture", tags: "peinture décoration rouleau déco",
    svg: `<path d="M10 10h38v14H10z"/><path d="M48 17h6v16H31v8"/><path d="M27 41h8v14h-8z" fill="currentColor"/>` },
  { id: "montage-peinture", label: "Montage et peinture", tags: "montage peinture rouleau clé plate atelier",
    svg: `<g transform="rotate(-45 32 32) scale(.92) translate(2.8 2.8)"><path d="M16 5h30v13H16z"/><path d="M46 11.5h4.5V27H32v8"/><path d="M29 35h6v22h-6z" fill="currentColor"/></g><g transform="rotate(45 32 32) scale(.92) translate(2.8 2.8)"><path d="M26.5 6.5A7 7 0 1 0 37.5 6.5"/><path d="M27 6.5V12h10V6.5"/><path d="M29.5 19v26M34.5 19v26"/><path d="M26.5 57.5A7 7 0 1 1 37.5 57.5"/><path d="M27 57.5V52h10v5.5"/></g>` },
  // --- Évaluation / enseignement ---
  { id: "evaluation", label: "Fiche d'évaluation", tags: "évaluation fiche notes encadrants checklist sae",
    svg: `<path d="M16 12h32v44H16z"/><path d="M25 8h14v9H25z" fill="currentColor"/><path d="M23 30l3 3 6-7"/><path d="M37 31h7"/><path d="M23 44l3 3 6-7"/><path d="M37 45h7"/>` },
  { id: "etudiants", label: "Étudiants", tags: "étudiants équipe élèves groupe projet",
    svg: `<circle cx="24" cy="22" r="8"/><path d="M8 52c0-10 7-16 16-16s16 6 16 16z"/><path d="M42 15a8 8 0 0 1 0 15"/><path d="M46 37c7 1 11 6 11 15h-9"/>` },
  { id: "diplome", label: "Chapeau de diplômé", tags: "diplôme but formation sae école",
    svg: `<path d="M32 12L5 26l27 14 27-14z"/><path d="M16 33v12c0 4 8 8 16 8s16-4 16-8V33"/><path d="M59 26v16"/>` },
  { id: "cours", label: "Cours / guides", tags: "cours guide livre documentation",
    svg: `<path d="M32 14c-6-4-14-5-24-4v39c10-1 18 0 24 4 6-4 14-5 24-4V10c-10-1-18 0-24 4z"/><path d="M32 14v39"/><path d="M15 22h10M15 30h10M39 22h10M39 30h10"/>` },
  { id: "quiz", label: "Quiz", tags: "quiz question culture défi",
    svg: `<path d="M10 10h44v32H31L19 54V42H10z"/><path d="M26 22a6 6 0 1 1 8 5.5c-1.5.8-2 1.8-2 3.5"/><circle cx="32" cy="36" r="1.8" fill="currentColor" stroke="none"/>` },
  { id: "permis", label: "Permis / carte", tags: "permis carte identité cec",
    svg: `<path d="M6 14h52v36H6z"/><circle cx="21" cy="29" r="5"/><path d="M12 42c1-5 5-7 9-7s8 2 9 7"/><path d="M36 25h16M36 33h12M36 41h8"/>` },
  { id: "resultats", label: "Résultats", tags: "résultats graphique statistiques",
    svg: `<path d="M8 54h48"/><path d="M14 54V36h9v18M27.5 54V18h9v36M41 54V28h9v26"/><path d="M12 22l12-8 10 4 18-10"/>` },
  { id: "classement", label: "Classement", tags: "classement trophée podium score",
    svg: `<path d="M20 10h24v14a12 12 0 0 1-24 0z"/><path d="M20 14h-8v4a8 8 0 0 0 8 8M44 14h8v4a8 8 0 0 1-8 8"/><path d="M32 36v10M24 54h16M27 46h10"/>` },
  { id: "chrono", label: "Chrono / défi", tags: "chrono chronomètre temps défi",
    svg: `<circle cx="32" cy="36" r="19"/><path d="M26 8h12"/><path d="M32 8v9"/><path d="M32 36V24"/><path d="M32 36l8 5"/><path d="M50 16l4-4"/>` },
  // --- Divers ---
  { id: "planning", label: "Planning", tags: "planning calendrier réservation date",
    svg: `<path d="M8 14h48v42H8z"/><path d="M8 27h48"/><path d="M20 8v11M44 8v11"/><path d="M18 36h6v6h-6zM29 36h6v6h-6z"/><path d="M40 36h6v6h-6z" fill="currentColor"/><path d="M18 47h6v5h-6z"/>` },
  { id: "web", label: "Sites web", tags: "web site lien internet globe",
    svg: `<circle cx="32" cy="32" r="23"/><path d="M9 32h46"/><path d="M32 9c-11 12-11 34 0 46M32 9c11 12 11 34 0 46"/>` },
  { id: "cadenas", label: "Accès protégé", tags: "cadenas sécurité protégé code",
    svg: `<path d="M13 28h38v27H13z"/><path d="M21 28v-7a11 11 0 0 1 22 0v7"/><circle cx="32" cy="40" r="3" fill="currentColor" stroke="none"/><path d="M32 42v6"/>` },
];
