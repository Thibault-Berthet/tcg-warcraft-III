# ⚔️ WoW Forever — Le mini-TCG pour patienter les 4 derniers jours ;)

Petit site de collection de cartes façon TCG (sans combat), créé pour le fun à
l'occasion de la sortie de « WoW Forever ». Forge des pièces d'or, ouvre des
boosters, révèle tes cartes et complète ton album de **91 cartes** illustrées !

## 🎮 Comment ça marche

- **⚒️ L'enclume** : clique pour forger une pièce d'or (barre de chargement de 3 s → 🪙 +1)
- **🎴 Booster payant** : 5 cartes par booster, coût **🪙 5 pièces d'or** (déchire le paquet, retourne les cartes une par une !)
- **5 raretés** : Commune 60 % · Rare 25 % · Épique 10 % · Légendaire 4 % · Mythique 1 % — avec au moins une Rare garantie sur la 5e carte
- **✨ Versions étincelantes (holo)** : 8 % de chance par carte tirée, définitif une fois obtenu
- **📖 Album de collection** : progression, filtres par rareté/type, doublons — les cartes non possédées montrent un ❓ (l'image est révélée au premier tirage)
- **Cartes illustrées** : chaque carte a sa propre image dans `assets/`, avec titre, thème et lore Warcraft
- **Sauvegarde automatique** dans le navigateur (localStorage) — pas besoin de compte
- Confettis 🎊 et tremblement d'écran quand tu tires une Légendaire ou une Mythique

## 🌐 Mise en ligne sur GitHub Pages

1. Crée un dépôt sur GitHub (par exemple `wow-forever-cartes`)
2. Dépose tout le dossier à la racine du dépôt : `index.html`, `style.css`, `script.js` et le dossier `assets/` (obligatoire pour les images des cartes)
3. Dans le dépôt : **Settings → Pages**
4. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`
5. Sauvegarde — le site est en ligne sur `https://ton-pseudo.github.io/wow-forever-cartes/` en ~1 minute

> 💡 Astuce : en local, ouvre simplement `index.html` dans ton navigateur, ça marche aussi.

## 🛠️ Personnalisation

Tout le set de cartes est dans `script.js`, dans le tableau `SET` (une entrée par
carte : `id`, `name`, `type`, `rarity`, `icon`, `img`, `theme`, `lore`, `flavor`) :
ajoute, modifie ou renomme des cartes librement — une image dans `assets/` + un
champ `img: "assets/..."` suffit.

- Probabilités de tirage : fonction `rollRarity()`
- Taux d'étincelantes : `openBooster()` (`Math.random() < 0.08`)
- Coût d'un booster : constante `BOOSTER_COST` (5)
- Temps de forge à l'enclume : constante `ANVIL_TIME_MS` (3000 ms)

## 📄 Mentions

Site fan non officiel fait pour le fun. Les textes des cartes sont des créations
originales (parodie) et les illustrations sont des dessins personnels — aucun
lien avec Blizzard Entertainment.
