# ⚔️ WoW Forever — Collectionneur de Cartes

Petit site de collection de cartes façon TCG (sans combat), créé pour le fun à
l'occasion de la sortie de « WoW Forever ». Ouvre des boosters, révèle tes cartes
et complète ton album de 40 cartes !

## 🎮 Comment ça marche

- **Ouvre des boosters** de 5 cartes (déchire le paquet, retourne les cartes une par une !)
- **4 raretés** : Commune, Rare, Épique, Légendaire — avec au moins une Rare garantie par booster
- **✨ Versions étincelantes** : 8 % de chance qu'une carte soit holo
- **Album de collection** avec progression, filtres et doublons
- **Sauvegarde automatique** dans le navigateur (localStorage) — pas besoin de compte
- **Export / Import** de ta collection en fichier JSON (pour changer d'ordinateur)
- Confettis 🎊 quand tu tires une Légendaire

## 🌐 Mise en ligne sur GitHub Pages

1. Crée un dépôt sur GitHub (par exemple `wow-forever-cartes`)
2. Dépose les fichiers `index.html`, `style.css` et `script.js` à la racine du dépôt
3. Dans le dépôt : **Settings → Pages**
4. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`
5. Sauvegarde — le site est en ligne sur `https://ton-pseudo.github.io/wow-forever-cartes/` en ~1 minute

> 💡 Astuce : tu peux aussi juste glisser les 3 fichiers dans un dossier et ouvrir
> `index.html` dans ton navigateur, ça marche en local aussi.

## 🛠️ Personnalisation

Tout le set de cartes est dans `script.js`, dans le tableau `SET` :
ajoute, modifie ou renomme des cartes librement. Les probabilités de tirage
sont dans la fonction `rollRarity()`, et le taux d'étincelantes dans
`openBooster()` (`Math.random() < 0.08`).

## 📄 Mentions

Site fan non officiel fait pour le fun. Toutes les cartes, noms et textes sont
des créations originales (parodie) — aucun lien avec Blizzard Entertainment.
