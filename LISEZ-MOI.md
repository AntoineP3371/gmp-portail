# Portail des applications — mise en place

Deux pages :

- `index.html` — la page que voient les visiteurs (liens, groupes, champ « Vous avez un code ? »).
- `admin.html` — l'administration graphique (glisser-déposer). Protégée par votre compte PocketBase.

## Essayer tout de suite (mode démo)

Laissez `PB_URL` vide dans `config.js` et ouvrez `admin.html` : tout marche, mais les données restent dans **votre navigateur** (les autres visiteurs ne les voient pas).

## Mettre en ligne (PocketBase dédié, comme Carnet SAE)

1. **Nouvelle instance PocketBase** sur le Raspberry Pi (processus, port et dossier séparés des autres), avec un nouveau super-utilisateur.
2. Copier dans le dossier de cette instance :
   - `pb/pb_hooks/portail.pb.js` → dans `pb_hooks/`
   - `pb/pb_migrations/1790000000_portail_config.js` → dans `pb_migrations/`
3. **Redémarrer** PocketBase : la collection `portail_config` est créée toute seule.
4. Ajouter une route **Cloudflare Tunnel** vers cette instance (ex. `api_portail.gmpbordeaux.fr`). Test : `https://api_portail.gmpbordeaux.fr/api/health` doit répondre.
5. Dans `config.js`, mettre `window.PB_URL = "https://api_portail.gmpbordeaux.fr";`
6. Publier le dossier (sans `pb/` ni ce fichier si vous voulez) sur un dépôt GitHub + **Settings → Pages**.
7. Ouvrir `.../admin.html`, se connecter avec l'e-mail/mot de passe du super-utilisateur PocketBase.

## Utiliser l'administration

- **Glisser** « Nouveau lien » dans un groupe ; **glisser** les liens pour les réordonner ou changer de groupe ; **glisser** la poignée ⠿ pour réordonner les groupes.
- **Cliquer** un lien : titre, adresse, texte, image (clic, dépôt d'un fichier, ou adresse d'image).
- **Déposer une image** du bureau sur un groupe : un lien est créé avec cette image.
- **Groupe sans code** = visible de tous. **Groupe avec code** (🎲 pour en générer un) = visible seulement après saisie du code. Plusieurs groupes peuvent partager le même code.
- **« Ouvrir directement… »** : si le code ne débloque qu'un seul lien, le visiteur est envoyé dessus immédiatement.
- **« Page verrouillée »** : rien n'est visible sans code valide.
- **Aperçu**, **Sauvegarde** (fichier .json) et **Restaurer**. N'oubliez pas **Enregistrer** (Ctrl+S).

## Sécurité (à savoir)

- Les codes sont vérifiés **côté serveur** : un visiteur ne reçoit que les liens des groupes dont il a saisi le code. Les codes ne sont jamais envoyés à la page.
- En revanche, **un lien connu est un lien accessible** : le code protège l'affichage dans le portail, pas l'application elle-même.
- Pas de limitation d'essais : un code court peut être deviné par force brute. Préférez des codes de 6 caractères ou plus.
- Les images sont réduites (420 px) et stockées dans la configuration.
