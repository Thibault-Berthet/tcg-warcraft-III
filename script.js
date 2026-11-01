/* ============================================================
   WoW Forever — Collectionneur de Cartes
   Logique du jeu (script.js)
   ============================================================ */
"use strict";

/* ================== DONNÉES : LE SET DE CARTES ==================
   rarity : Commune | Rare | Épique | Légendaire | Mythique
   type   : Héros | Créature | Objet | Lieu | Faction
   Toutes les cartes sont des créations originales (parodie). */
const SET = [
  {
    id: "c01",
    name: "Elfe de la Nuit",
    type: "Faction",
    rarity: "Rare",
    icon: "🌙",
    img: "assets/justin-thavirat-03nightelf.jpg",
    theme: "Kaldorei · Kalimdor",
    lore: "Gardiens nocturnes de Kalimdor depuis la Guerre des Anciens, les elfes de la nuit veillent sur Azeroth, tapis dans l'ombre de Nordrassil.",
    flavor: "Mille ans de nuit, et elle n'a toujours pas cligné des yeux.",
  },
  {
    id: "c02",
    name: "Orc",
    type: "Faction",
    rarity: "Rare",
    icon: "👺",
    img: "assets/justin-thavirat-01orc-small.jpg",
    theme: "Horde · Durotar",
    lore: "Fiers guerriers de la Horde venus des royaumes de l'Est, les orcs ont bâti Durotar au prix de leur sang et de leurs haches.",
    flavor: "Il ne discute pas. Il charge. La discussion vient après.",
  },
  {
    id: "c03",
    name: "Humain",
    type: "Faction",
    rarity: "Rare",
    icon: "🛡️",
    img: "assets/justin-thavirat-02arthas.jpg",
    theme: "Alliance · Lordaeron",
    lore: "Chevaliers et soldats du royaume de Lordaeron, les humains de l'Alliance défendent Azeroth avec foi, acier et cavalerie.",
    flavor: "« Pour l'Alliance ! » — crié par quelqu'un qui n'a jamais vu un orc de près.",
  },
  {
    id: "c04",
    name: "Mort-Vivant",
    type: "Faction",
    rarity: "Rare",
    icon: "💀",
    img: "assets/justin-thavirat-04undead-final.jpg",
    theme: "Fléau · Fossoyeuse",
    lore: "Arrachés à la vie par le Fléau du Roi Liche, les morts-vivants de Fossoyeuse servent leur maître dans une obéissance glaciale.",
    flavor: "La mort n'est qu'un début. Surtout le lundi.",
  },
  {
    id: "c05",
    name: "Brisesort",
    type: "Créature",
    rarity: "Commune",
    icon: "🌀",
    img: "assets/brisesort_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Magicien capable de dissiper les enchantements ennemis d'un seul geste.",
    flavor: "Votre malédiction ? Effacée.",
  },
  {
    id: "c06",
    name: "Capitaine",
    type: "Créature",
    rarity: "Rare",
    icon: "⚔️",
    img: "assets/capitaine_humain.jpeg",
    theme: "Alliance · Unité de base",
    lore: "Officier de Lordaeron qui mène ses hommes au cri de « Pour l'Alliance ! »",
    flavor: "Il a un plan. Personne ne le connaît.",
  },
  {
    id: "c07",
    name: "Chevalier",
    type: "Créature",
    rarity: "Commune",
    icon: "🐴",
    img: "assets/chevalier_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Noble cavalier de l'Alliance, monté sur son destrier.",
    flavor: "Son cheval a plus de victimes que lui. Presque.",
  },
  {
    id: "c08",
    name: "Chevaucheur de dragon faucon",
    type: "Créature",
    rarity: "Commune",
    icon: "🐉",
    img: "assets/chevaucheur_de_dragon_faucon_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Montés sur des dragons faucons, la terreur volante des lignes ennemies.",
    flavor: "Attention à la descente.",
  },
  {
    id: "c09",
    name: "Chevaucheur de griffon",
    type: "Créature",
    rarity: "Commune",
    icon: "🦅",
    img: "assets/chevaucheur_de_griffon_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Pilote d'élite monté sur un griffon, l'unité aérienne de l'Alliance.",
    flavor: "Livraison express depuis les airs.",
  },
  {
    id: "c10",
    name: "Élémentaire d'eau",
    type: "Créature",
    rarity: "Rare",
    icon: "💧",
    img: "assets/elementaire_eau_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Esprit d'eau invoqué par les mages, il noie les ennemis et éteint les incendies.",
    flavor: "Il pleut sur votre parade.",
  },
  {
    id: "c12",
    name: "Engin de siège",
    type: "Créature",
    rarity: "Commune",
    icon: "🏰",
    img: "assets/engin_de_siege_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Bélier et catapulte sur roues, l'arme des sièges de Lordaeron.",
    flavor: "Knock knock. Qui est là ? Personne. Le mur est tombé.",
  },
  {
    id: "c14",
    name: "Fantassin",
    type: "Créature",
    rarity: "Commune",
    icon: "🪖",
    img: "assets/fantassin_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "L'infanterie de base de Lordaeron : bouclier en bois, cœur en acier.",
    flavor: "Le premier à charger, le dernier à reculer.",
  },
  {
    id: "c15",
    name: "Fusilier",
    type: "Créature",
    rarity: "Commune",
    icon: "🔫",
    img: "assets/fusilier_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Tireur d'élite des lignes de l'Alliance, il abat un ennemi à deux cents mètres.",
    flavor: "Un coup, un mort. La facture arrive après.",
  },
  {
    id: "c16",
    name: "Gyrocopère",
    type: "Créature",
    rarity: "Commune",
    icon: "🚁",
    img: "assets/gyrocoptere_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Machine volante des ingénieurs de l'Alliance, armée de roquettes.",
    flavor: "Ça vole, ça tire, ça tombe rarement.",
  },
  {
    id: "c19",
    name: "Milicien",
    type: "Créature",
    rarity: "Commune",
    icon: "🎖️",
    img: "assets/milicien_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Garde du village levée à la hâte quand les orcs débarquent.",
    flavor: "Jamais entraîné, toujours debout.",
  },
  {
    id: "c20",
    name: "Mortier",
    type: "Créature",
    rarity: "Commune",
    icon: "💣",
    img: "assets/mortier_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Artillerie lourde humaine, idéale pour raser les murailles ennemies.",
    flavor: "Portée : tout. Précision : on verra.",
  },
  {
    id: "c21",
    name: "Œuf de phénix",
    type: "Créature",
    rarity: "Rare",
    icon: "🥚",
    img: "assets/oeuf_phenix_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Œuf géant d'où éclot un phénix ; les ennemis hésitent toujours à le briser.",
    flavor: "Ne pas secouer avant l'invocation.",
  },
  {
    id: "c22",
    name: "Paysan",
    type: "Créature",
    rarity: "Commune",
    icon: "🌾",
    img: "assets/paysan_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Sans paysans, pas d'armée : celui-ci nourrit Lordaeron à la sueur de son front.",
    flavor: "Il a vu passer des armées. Il préfère ses récoltes.",
  },
  {
    id: "c23",
    name: "Phénix",
    type: "Créature",
    rarity: "Rare",
    icon: "🔥",
    img: "assets/phenix_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Oiseau de feu invoqué par les mages, il renaît de ses cendres après chaque combat.",
    flavor: "Meurt au combat, revient au petit-déjeuner.",
  },
  {
    id: "c24",
    name: "Prêtre",
    type: "Créature",
    rarity: "Commune",
    icon: "✨",
    img: "assets/pretre_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Serviteur de la Lumière à la cathédrale de Lordaeron, il bénit et soigne les troupes.",
    flavor: "Bénédiction sur vous. Et sur votre épée.",
  },
  {
    id: "c25",
    name: "Sorcière",
    type: "Créature",
    rarity: "Commune",
    icon: "🔮",
    img: "assets/sorciere_humain.jpg",
    theme: "Alliance · Unité de base",
    lore: "Mage de bataille de l'Alliance, experte en sortilèges de zone.",
    flavor: "Elle transforme ses ennemis en grenouilles. Ça coasse moins fort.",
  },  {
    id: "c26",
    name: "Étendard elfe de la nuit",
    type: "Faction",
    rarity: "Commune",
    icon: "🚩",
    img: "assets/etandard_elfe.jpg",
    theme: "Kaldorei · Kalimdor",
    lore: "La bannière des elfes de la nuit flotte sur Kalimdor depuis la Guerre des Anciens, tissée de soie d'araignée et de clair de lune.",
    flavor: "Elle flotte même sans vent. Ne cherche pas à comprendre.",
  },
  {
    id: "c27",
    name: "Étendard humain",
    type: "Faction",
    rarity: "Commune",
    icon: "🚩",
    img: "assets/etandard_humain.jpg",
    theme: "Alliance · Lordaeron",
    lore: "Frappé du lion d'or de Lordaeron, c'est la bannière que brandissent les soldats de l'Alliance avant la charge.",
    flavor: "Le lion rugit. Les soldats aussi, un peu.",
  },
  {
    id: "c28",
    name: "Étendard mort-vivant",
    type: "Faction",
    rarity: "Commune",
    icon: "🚩",
    img: "assets/etandard_mort_vivant.jpg",
    theme: "Fléau · Fossoyeuse",
    lore: "L'étendard blême du Fléau, porté par les morts-vivants de Fossoyeuse dans un silence de cimetière.",
    flavor: "Il bouge tout seul. C'est normal, c'est un mort-vivant.",
  },
  {
    id: "c29",
    name: "Étendard orc",
    type: "Faction",
    rarity: "Commune",
    icon: "🚩",
    img: "assets/etandard_orc.jpg",
    theme: "Horde · Durotar",
    lore: "Bannière rouge sang de la Horde, cousue dans le cuir des premières bêtes de guerre de Durotar.",
    flavor: "Rouge comme le sang, sombre comme la guerre.",
  },
  {
    id: "c30",
    name: "Bête kodo",
    type: "Créature",
    rarity: "Commune",
    icon: "🦏",
    img: "assets/bete_kodo_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Grand lézard domestiqué par les orcs, le kodo sert de monture et de bête de somme en temps de guerre.",
    flavor: "Il charge aussi bien que son cavalier.",
  },
  {
    id: "c31",
    name: "Chaman",
    type: "Créature",
    rarity: "Commune",
    icon: "⚡",
    img: "assets/chaman_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Guide spirituel de la Horde, le chaman invoque les esprits et la foudre au nom des ancêtres.",
    flavor: "« Les esprits sont avec nous. » Personne ne sait lesquels.",
  },
  {
    id: "c32",
    name: "Chasseur de têtes",
    type: "Créature",
    rarity: "Commune",
    icon: "🪓",
    img: "assets/chasseur_de_tete_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Trappeur d'élite de Durotar, le chasseur de têtes manie la hache lourde des clans orcs.",
    flavor: "Il collectionne les têtes. Les grandes, de préférence.",
  },
  {
    id: "c33",
    name: "Chevaucheur de chauve-souris",
    type: "Créature",
    rarity: "Commune",
    icon: "🦇",
    img: "assets/chevaucheur_de_chauve_souris_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Cavalier aérien de la Horde, monté sur une chauve-souris géante des cavernes.",
    flavor: "Livraison express, par les airs et par les dents.",
  },
  {
    id: "c34",
    name: "Chevaucheur de loup",
    type: "Créature",
    rarity: "Commune",
    icon: "🐺",
    img: "assets/chevaucheur_de_loup_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "La cavalerie rapide de la Horde : le loup de guerre avale les distances.",
    flavor: "Il court plus vite que son ombre. Et que vous.",
  },
  {
    id: "c35",
    name: "Démolisseur",
    type: "Créature",
    rarity: "Commune",
    icon: "💥",
    img: "assets/demolisseur_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Orc monté sur une machine explosive, spécialisé dans la destruction des fortifications.",
    flavor: "Il ne construit rien. Il déconstruit, vite.",
  },
  {
    id: "c36",
    name: "Esprit du loup",
    type: "Créature",
    rarity: "Rare",
    icon: "👻",
    img: "assets/esprit_du_loup_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Esprit invoqué par le chaman, le loup spirituel traque les ennemis même dans l'obscurité.",
    flavor: "Il traverse les murs. Ne laissez pas traîner vos secrets.",
  },
  {
    id: "c37",
    name: "Esprit marcheur",
    type: "Créature",
    rarity: "Commune",
    icon: "🌫️",
    img: "assets/esprit_marcheur_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Vision spirituelle qui marche entre les mondes ; il révèle les invisibles et les embuscades.",
    flavor: "Il voit même à travers vos mensonges.",
  },
  {
    id: "c38",
    name: "Grunt",
    type: "Créature",
    rarity: "Commune",
    icon: "🗡️",
    img: "assets/grunt_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "L'infanterie de base de la Horde : hache, peau dure et mauvaise humeur.",
    flavor: "Le premier à charger. Le premier à râler.",
  },
  {
    id: "c39",
    name: "Péon",
    type: "Créature",
    rarity: "Commune",
    icon: "⛏️",
    img: "assets/peon_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Ouvrier de la Horde, le péon bâtit les casernes et coupe le bois à la sueur de son front.",
    flavor: "« Travail d'abord, baston après. »",
  },
  {
    id: "c40",
    name: "Sorcier-docteur",
    type: "Créature",
    rarity: "Commune",
    icon: "🧪",
    img: "assets/sorcier_docteur_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Guérisseur sombre de la Horde, le sorcier-docteur soigne avec des herbes et des malédictions.",
    flavor: "Ça pique un peu. C'est censé piquer un peu.",
  },
  {
    id: "c41",
    name: "Tauren",
    type: "Créature",
    rarity: "Commune",
    icon: "🐂",
    img: "assets/tauren_orc.jpeg",
    theme: "Horde · Mulgore",
    lore: "Les taurens, fiers alliés de la Horde venus des plaines de Mulgore, portent la terre sur leurs épaules.",
    flavor: "Trois litres de lait par jour. Sans lactose.",
  },
  {
    id: "c42",
    name: "Wyverne",
    type: "Créature",
    rarity: "Commune",
    icon: "🐉",
    img: "assets/wyvern_orc.jpg",
    theme: "Horde · Unité de base",
    lore: "Dragon à deux pattes de la Horde, la wyverne crache un venin qui ronge l'armure.",
    flavor: "Ne l'énervez pas. Le venin ne pardonne pas.",
  },
  {
    id: "c43",
    name: "Abomination",
    type: "Créature",
    rarity: "Commune",
    icon: "🧌",
    img: "assets/abomination_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Assemblage de cadavres recousus par le Fléau, l'abomination frappe les lignes ennemies comme un bélier vivant.",
    flavor: "Ça sent mauvais. C'est le principe.",
  },
  {
    id: "c44",
    name: "Acolyte",
    type: "Créature",
    rarity: "Commune",
    icon: "🕯️",
    img: "assets/acolyte_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Serviteur cagoulé du Fléau, l'acolyte prépare les rituels dans l'ombre des cryptes de Fossoyeuse.",
    flavor: "Il prie. On ne sait pas trop qui.",
  },
  {
    id: "c45",
    name: "Banshee",
    type: "Créature",
    rarity: "Commune",
    icon: "😱",
    img: "assets/banshee_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Esprit vengeur du Fléau, la banshee pousse un cri qui glace le sang des vivants.",
    flavor: "Son cri porte à trois kilomètres. Ne répondez pas.",
  },
  {
    id: "c46",
    name: "Chariot à viande",
    type: "Créature",
    rarity: "Commune",
    icon: "🩸",
    img: "assets/chariot_a_viande_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Machine de siège du Fléau qui lance des cadavres infectés par-dessus les murailles ennemies.",
    flavor: "C'est bio. Et explosif.",
  },
  {
    id: "c47",
    name: "Démon des cryptes",
    type: "Créature",
    rarity: "Commune",
    icon: "😈",
    img: "assets/demon_des_cryptes_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Démon invoqué depuis les cryptes, il terrorise les armées de l'Alliance depuis l'ombre.",
    flavor: "Il a dix mille ans et toujours pas de permis.",
  },
  {
    id: "c48",
    name: "Gargouille",
    type: "Créature",
    rarity: "Commune",
    icon: "🗿",
    img: "assets/gargouille_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Statue de pierre animée par la magie du Fléau, la gargouille fond sur les murailles ennemies.",
    flavor: "Elle dort le jour. Ne la réveillez pas.",
  },
  {
    id: "c49",
    name: "Goule",
    type: "Créature",
    rarity: "Commune",
    icon: "🧟",
    img: "assets/goule_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Mort-vivant vorace, la goule dévore les cadavres et répand la peste du Fléau.",
    flavor: "Elle mange même ce que les autres n'osent pas.",
  },
  {
    id: "c50",
    name: "Nécromancien",
    type: "Créature",
    rarity: "Commune",
    icon: "🧙",
    img: "assets/necromancien_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Maître des morts du Fléau, le nécromancien relève les squelettes tombés au combat.",
    flavor: "« Debout. » Et ils se lèvent. Évidemment.",
  },
  {
    id: "c51",
    name: "Ombre",
    type: "Créature",
    rarity: "Commune",
    icon: "🌑",
    img: "assets/ombre_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Créature d'ombre invoquée par le Fléau, invisible jusqu'au moment de frapper.",
    flavor: "Regardez derrière vous. Non, là !",
  },
  {
    id: "c52",
    name: "Squelette",
    type: "Créature",
    rarity: "Rare",
    icon: "⚰️",
    img: "assets/squelette_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Guerrier mort-vivant animé par la nécromancie, le squelette ne connaît ni la peur ni la fatigue.",
    flavor: "Il a perdu son arme ? Il se bat à mains nues. À mains d'os.",
  },
  {
    id: "c53",
    name: "Statue d'obsidienne",
    type: "Créature",
    rarity: "Commune",
    icon: "🪨",
    img: "assets/statue_d_obsidienne_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Colosse d'obsidienne invoqué par le Roi Liche, la statue écrase les armées sous ses poings de pierre noire.",
    flavor: "Lent, mais personne n'a jamais esquivé.",
  },
  {
    id: "c54",
    name: "Wyrm des glaces",
    type: "Créature",
    rarity: "Commune",
    icon: "🐲",
    img: "assets/wyrm_des_glaces_undead.jpg",
    theme: "Fléau · Unité mort-vivante",
    lore: "Dragon mort-vivant des glaces du Norfendre, le wyrm crache un froid qui gèle les cœurs.",
    flavor: "Son haleine gèle même le feu.",
  },
  {
    id: "c55",
    name: "Archère",
    type: "Créature",
    rarity: "Commune",
    icon: "🏹",
    img: "assets/archere_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Tireuse d'élite des sentinelles kaldorei, son arc ne rate jamais sa proie dans la forêt de Kalimdor.",
    flavor: "Elle a compté ses flèches. Il en reste une. Pour vous.",
  },
  {
    id: "c56",
    name: "Chasseresse",
    type: "Créature",
    rarity: "Commune",
    icon: "🌲",
    img: "assets/chasseresse_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Rôdeuse des bois, la chasseresse elfe traque le gibier — et parfois les intrus — entre les arbres.",
    flavor: "Elle vous a vu avant que vous ne la voyiez.",
  },
  {
    id: "c57",
    name: "Chevaucheuse d'hippogryphe",
    type: "Créature",
    rarity: "Rare",
    icon: "🪽",
    img: "assets/chevaucheuse_d_hippogryphe_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Cavalière aérienne des elfes de la nuit, elle fond du ciel sur les lignes ennemies.",
    flavor: "Attention aux serres.",
  },
  {
    id: "c58",
    name: "Chimère",
    type: "Créature",
    rarity: "Commune",
    icon: "🦁",
    img: "assets/chimere_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Bête hybride invoquée par les druides, la chimère crache des boules de mana qui brûlent la peau.",
    flavor: "Deux têtes, deux fois plus de morsures.",
  },
  {
    id: "c59",
    name: "Dragon féérique",
    type: "Créature",
    rarity: "Commune",
    icon: "🧚",
    img: "assets/dragon_feerique_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Petit dragon enchanté des elfes, il crache une poudre qui endort même les orcs.",
    flavor: "Il ronfle quand il dort. Adorable.",
  },
  {
    id: "c60",
    name: "Druide de la griffe",
    type: "Créature",
    rarity: "Commune",
    icon: "🐻",
    img: "assets/druide_de_la_griffe_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Druide métamorphe en ours, il défend la forêt de Kalimdor, griffes dehors.",
    flavor: "Ne le caressez pas. Surtout pas.",
  },
  {
    id: "c61",
    name: "Druide de la serre",
    type: "Créature",
    rarity: "Commune",
    icon: "🦉",
    img: "assets/druide_de_la_serre_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Druide métamorphe en oiseau de proie, il harcèle l'ennemi depuis les airs.",
    flavor: "Il vous a repéré. Du ciel.",
  },
  {
    id: "c62",
    name: "Dryade",
    type: "Créature",
    rarity: "Commune",
    icon: "🌸",
    img: "assets/dryade_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Esprit de la forêt né d'un arbre, la dryade ensorcelle quiconque s'approche de son bois.",
    flavor: "L'arbre vous regarde. C'est elle.",
  },
  {
    id: "c63",
    name: "Feu follet",
    type: "Créature",
    rarity: "Commune",
    icon: "💡",
    img: "assets/feu_follet_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Lueur flottante invoquée par les druides, le feu follet attire les ennemis droit dans les pièges.",
    flavor: "Suivez la lumière. Non, ne suivez pas la lumière !",
  },
  {
    id: "c64",
    name: "Géant des montagnes",
    type: "Créature",
    rarity: "Commune",
    icon: "⛰️",
    img: "assets/geant_des_montagnes_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Colosse de pierre qui marche pour les kaldorei, il lance des rochers comme des cailloux.",
    flavor: "Il marche si lentement que la forêt repousse derrière lui.",
  },
  {
    id: "c65",
    name: "Hippogryphe",
    type: "Créature",
    rarity: "Commune",
    icon: "🦄",
    img: "assets/hippogryphe_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Monture ailée des elfes de la nuit, l'hippogryphe fond du ciel plus vite que le vent.",
    flavor: "Accrochez-vous. Fort.",
  },
  {
    id: "c66",
    name: "Lanceur de glaive",
    type: "Créature",
    rarity: "Commune",
    icon: "💫",
    img: "assets/lanceur_de_glaive_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Guerrier kaldorei au glaive rebondissant, qui touche plusieurs ennemis d'un seul lancer.",
    flavor: "Un lancer, trois orcs. Record à battre.",
  },
  {
    id: "c67",
    name: "Treant",
    type: "Créature",
    rarity: "Rare",
    icon: "🌳",
    img: "assets/treant_elfe.jpg",
    theme: "Kaldorei · Unité de base",
    lore: "Arbre géant animé par la magie druidique, le treant écrase les armées ennemies sous ses racines.",
    flavor: "Il a 4 000 ans. Il a vu passer votre grand-père.",
  },
  {
    id: "c68",
    name: "Archimage",
    type: "Héros",
    rarity: "Épique",
    icon: "📖",
    img: "assets/archimage_humain.jpg",
    theme: "Alliance · Héros",
    lore: "Maître des arcanes de l'Alliance, l'archimage invoque blizzards et élémentaires de feu sur le champ de bataille.",
    flavor: "Il a transformé un dragon en mouton. Une fois. Pour rire.",
  },
  {
    id: "c69",
    name: "Roi des montagnes",
    type: "Héros",
    rarity: "Épique",
    icon: "👑",
    img: "assets/roi_de_la_montagne_humain.jpg",
    theme: "Alliance · Héros",
    lore: "Héros de l'Alliance monté sur son bélier des montagnes, son marteau de guerre fait trembler la terre.",
    flavor: "BOUM. (C'était le marteau.)",
  },
  {
    id: "c70",
    name: "Paladin",
    type: "Héros",
    rarity: "Épique",
    icon: "⚜️",
    img: "assets/paladin_humain.jpg",
    theme: "Alliance · Héros",
    lore: "Chevalier de la Lumière, le paladin bénit ses alliés et brûle les morts-vivants de sa lame sacrée.",
    flavor: "Il a une aura. Au sens propre.",
  },
  {
    id: "c71",
    name: "Mage de sang",
    type: "Héros",
    rarity: "Épique",
    icon: "🩸",
    img: "assets/mage_de_sang_humain.jpg",
    theme: "Alliance · Héros",
    lore: "Mage démoniste de l'Alliance, il sacrifie son propre sang pour lancer des boules de feu interdites.",
    flavor: "Il saigne pour la magie. Ne l'imitez pas.",
  },
  {
    id: "c72",
    name: "Jaina Proudmoore",
    type: "Héros",
    rarity: "Légendaire",
    icon: "❄️",
    img: "assets/jaina_proudmoore_humain.jpg",
    theme: "Alliance · Héros",
    lore: "Archimage de Dalaran et dame de Theramore, Jaina Proudmoore manie la glace et la diplomatie — souvent dans cet ordre.",
    flavor: "Elle a gelé un port entier. Pour la paix.",
  },
  {
    id: "c73",
    name: "Arto ZHB",
    type: "Héros",
    rarity: "Mythique",
    icon: "🍷",
    img: "assets/arto_zhb.jpg",
    theme: "Drôme (26) · Légende locale",
    lore: "Guerrier légendaire du département de la Drôme, Arto ZHB a affronté l'Ardèche entière et tenu tête à elle seule, avant de défendre Valence, Montélimar et la Clairette contre toutes les invasions.",
    flavor: "Un guerrier, une fougasse, et la Drôme vaincra.",
  },
  {
    id: "c74",
    name: "Maître des lames",
    type: "Héros",
    rarity: "Épique",
    icon: "🌪️",
    img: "assets/maitre_des_lames_orc.jpg",
    theme: "Horde · Héros",
    lore: "Dueliste orc légendaire, le maître des lames manie deux katanas et esquive les flèches en dansant.",
    flavor: "Il a esquivé une wyverne. En dansant.",
  },
  {
    id: "c75",
    name: "Prophète",
    type: "Héros",
    rarity: "Épique",
    icon: "📯",
    img: "assets/prophete_orc.jpg",
    theme: "Horde · Héros",
    lore: "Visionnaire de la Horde, le prophète lit l'avenir dans les entrailles et frappe la terre de son bâton.",
    flavor: "Il prédit tout. Sauf la pluie.",
  },
  {
    id: "c76",
    name: "Chef tauren",
    type: "Héros",
    rarity: "Épique",
    icon: "🥁",
    img: "assets/chef_tauren_orc.jpg",
    theme: "Horde · Héros",
    lore: "Chef des taurens de la Horde, il frappe le sol de sa masse et déclenche un choc de terre dévastateur.",
    flavor: "BOUM. (Encore le sol.)",
  },
  {
    id: "c77",
    name: "Chasseur des ombres",
    type: "Héros",
    rarity: "Épique",
    icon: "🌘",
    img: "assets/chasseur_des_ombres_orc.jpg",
    theme: "Horde · Héros",
    lore: "Tueur tapi dans l'ombre, le chasseur des ombres lance des haches empoisonnées puis disparaît dans la nuit.",
    flavor: "Vous ne l'avez jamais vu venir. Personne ne l'a vu.",
  },
  {
    id: "c78",
    name: "Chevalier de la mort",
    type: "Héros",
    rarity: "Épique",
    icon: "🧊",
    img: "assets/chevalier_de_la_mort_undead.jpg",
    theme: "Fléau · Héros mort-vivant",
    lore: "Guerrier déchu relevé par le Roi Liche, le chevalier de la mort brandit une lame runique qui gèle le sang de ses ennemis.",
    flavor: "Il était humain, un jour. Il s'en fiche un peu.",
  },
  {
    id: "c79",
    name: "Liche",
    type: "Héros",
    rarity: "Épique",
    icon: "☠️",
    img: "assets/liche_undead.jpg",
    theme: "Fléau · Héros mort-vivant",
    lore: "Nécromancien accompli transformé en liche immortelle, elle lance des novas de glace qui figent toute une armée.",
    flavor: "La mort est son métier. Elle ne prend pas rendez-vous.",
  },
  {
    id: "c80",
    name: "Seigneur de l'effroi",
    type: "Héros",
    rarity: "Épique",
    icon: "🦇",
    img: "assets/seigneur_de_l_effroi_undead.jpg",
    theme: "Fléau · Héros mort-vivant",
    lore: "Démon ailé du Fléau, le seigneur de l'effroi sème la terreur et plonge les ennemis dans un sommeil éternel.",
    flavor: "Ne fermez pas les yeux près de lui.",
  },
  {
    id: "c81",
    name: "Seigneur des cryptes",
    type: "Héros",
    rarity: "Épique",
    icon: "🕷️",
    img: "assets/seigneur_des_cryptes_undead.jpg",
    theme: "Fléau · Héros mort-vivant",
    lore: "Seigneur des cryptes du Fléau, il invoque des scarabées d'obsidienne qui dévorent les vivants sur place.",
    flavor: "Il a une aura de scarabées. Toujours.",
  },
  {
    id: "c82",
    name: "Thrall",
    type: "Héros",
    rarity: "Légendaire",
    icon: "🔨",
    img: "assets/thrall_orc.jpg",
    theme: "Horde · Héros",
    lore: "Chef de guerre de la Horde et libérateur des orcs, Thrall manie le marteau de son père et la foudre des éléments.",
    flavor: "Personne ne met Thrall dans un coin. Surtout pas la Horde.",
  },
  {
    id: "c83",
    name: "Sylvanas Windrunner",
    type: "Héros",
    rarity: "Légendaire",
    icon: "🌬️",
    img: "assets/sylvanas_windrunner_undead.jpg",
    theme: "Fléau · Héros mort-vivant",
    lore: "Reine banshee de Fossoyeuse et ancienne général des rôdeurs de Lune-d'Argent, Sylvanas tire des flèches spectrales qui ne ratent jamais.",
    flavor: "Elle a déjà tout perdu. Alors elle ne perd plus.",
  },
  {
    id: "c84",
    name: "Gardien du bosquet",
    type: "Héros",
    rarity: "Épique",
    icon: "🌿",
    img: "assets/gardien_du_bosquet_elfe.png",
    theme: "Kaldorei · Héros",
    lore: "Druide gardien de Kalimdor, il invoque la nature pour soigner ses alliés et enraciner ses ennemis.",
    flavor: "Il plante des graines. Ça pousse très, très vite.",
  },
  {
    id: "c85",
    name: "Prêtresse de la lune",
    type: "Héros",
    rarity: "Épique",
    icon: "🌕",
    img: "assets/pretresse_de_la_lune_elfe.jpeg",
    theme: "Kaldorei · Héros",
    lore: "Chevalier elfe montée sur un tigre blanc, la prêtresse de la lune décoche des javelots de vertu sur l'ennemi.",
    flavor: "Son tigre ronronne. Elle, elle vise.",
  },
  {
    id: "c86",
    name: "Chasseur de démons",
    type: "Héros",
    rarity: "Épique",
    icon: "💢",
    img: "assets/demon_hunter_elfe.jpg",
    theme: "Kaldorei · Héros",
    lore: "Chasseur de démons elfe consumé par la haine, il sacrifie sa vue pour abattre les démons de sa lame magique.",
    flavor: "Il voit les démons partout. C'est le but.",
  },
  {
    id: "c87",
    name: "Gardienne",
    type: "Héros",
    rarity: "Épique",
    icon: "⛓️",
    img: "assets/gardienne_elfe.png",
    theme: "Kaldorei · Héros",
    lore: "Gardienne emprisonnée pendant dix mille ans, elle manie son éventail de précision pour frapper les ennemis à distance.",
    flavor: "Elle a attendu dix mille ans. Elle peut attendre que vous mouriez.",
  },
  {
    id: "c88",
    name: "Malfurion Stormrage",
    type: "Héros",
    rarity: "Légendaire",
    icon: "🦌",
    img: "assets/malfurion_stormrage_elfe.jpg",
    theme: "Kaldorei · Héros",
    lore: "Archidruide des elfes de la nuit et premier druide d'Azeroth, Malfurion Stormrage a dormi dix mille ans dans le Rêve d'Émeraude avant de revenir sauver Kalimdor.",
    flavor: "Il s'est réveillé une fois. Ça a suffi.",
  },
  {
    id: "c89",
    name: "AlexVonTraff ZHB",
    type: "Héros",
    rarity: "Mythique",
    icon: "🧘",
    img: "assets/AlexVonTraff_zhb.jpg",
    theme: "ZHB · Moine percussionniste",
    lore: "Moine percussionniste légendaire, AlexVonTraff ZHB garde un calme olympien en plein combat et frappe ses tambours au rythme des batailles d'Azeroth.",
    flavor: "Toujours serein. Toujours prêt à tout. Surtout à un solo de batterie.",
  },
  {
    id: "c90",
    name: "Tattooine ZHB",
    type: "Héros",
    rarity: "Mythique",
    icon: "🎸",
    img: "assets/tattooine_zhb.jpg",
    theme: "ZHB · Métaleuse",
    lore: "Métaleuse légendaire du clan ZHB, Tattooine déchaîne ses solos de guitare sur les champs de bataille d'Azeroth — entourée de ses chats, ses chiens et ses chevaux.",
    flavor: "Elle adore les chats, les chiens et les chevaux. Dans cet ordre, ou pas.",
  },
  {
    id: "c91",
    name: "Jeannot ZHB",
    type: "Héros",
    rarity: "Mythique",
    icon: "📐",
    img: "assets/jeannot_zhb.jpg",
    theme: "ZHB · Pragmatique",
    lore: "Stratège légendaire du clan ZHB, Jeannot prône l'efficacité et l'efficicience avant toute chose : chez lui, tout est carré, clair, et rangé au millimètre près.",
    flavor: "Efficace, efficient, carré. Dans cet ordre. Toujours.",
  },
  {
    id: "c92",
    name: "BillyNat ZHB",
    type: "Héros",
    rarity: "Mythique",
    icon: "🎼",
    img: "assets/BillyNat_zhb.jpg",
    theme: "ZHB · Compositeur",
    lore: "Compositeur légendaire du clan ZHB, BillyNat ZHB écrit des symphonies qui galvanisent les armées d'Azeroth — créatif, talentueux, et porté par de grands idéaux.",
    flavor: "Une bonne idée bien orchestrée vaut mille plans.",
  },
  {
    id: "c93",
    name: "Gufry ZHB",
    type: "Héros",
    rarity: "Mythique",
    icon: "🎮",
    img: "assets/Gufry_zhb.jpg",
    theme: "ZHB · Joueur",
    lore: "Joueur légendaire du clan ZHB, Gufry ZHB est assidu, volontaire, téméraire, persévérant et patient : rien ne lui résiste, même les boss les plus coriaces d'Azeroth.",
    flavor: "Encore une tentative. Encore une. Et encore une.",
  },
  {
    id: "c94",
    name: "Scandall ZHB",
    type: "Héros",
    rarity: "Mythique",
    icon: "🌈",
    img: "assets/Scandall_zhb.jpg",
    theme: "ZHB · Rayon de soleil",
    lore: "Membre légendaire du clan ZHB, Scandall est versatile, surprenant, plein de bonne onde et toujours positif — même quand le raid wipe à 1 %.",
    flavor: "Ça va aller. Vraiment. Souriez, on est entre nous.",
  },
  {
    id: "c95",
    name: "Kptain ZHB",
    type: "Héros",
    rarity: "Mythique",
    icon: "🧭",
    img: "assets/Kptain_zhb.jpg",
    theme: "ZHB · Capitaine",
    lore: "Capitaine légendaire du clan ZHB, Kptain est très courageux, donne toujours de bons conseils, est très sage et reste toujours rassurant — même face au Roi Liche.",
    flavor: "Avancez sereinement. Je connais le chemin.",
  },
];
const byId = Object.fromEntries(SET.map((c) => [c.id, c]));
const RARITIES = ["Commune", "Rare", "Épique", "Légendaire", "Mythique"];
// Ordre d'affichage des factions dans la collection (le reste en alphabétique à la fin)
const FACTION_ORDER = ["Alliance", "Horde", "Kaldorei", "Fléau", "Drôme (26)", "ZHB"];
const RARITY_CLASS = {
  Commune: "c-common",
  Rare: "c-rare",
  Épique: "c-epic",
  Légendaire: "c-legendary",
  Mythique: "c-mythic",
};
const RARITY_TAG = {
  Commune: "rt-commune",
  Rare: "rt-rare",
  Épique: "rt-epic",
  Légendaire: "rt-legendary",
  Mythique: "rt-mythic",
};
const RARITY_COLOR = {
  Commune: "var(--r-common)",
  Rare: "var(--r-rare)",
  Épique: "var(--r-epic)",
  Légendaire: "var(--r-legendary)",
  Mythique: "var(--r-mythic)",
};

/* ================== ÉTAT & STOCKAGE ==================
   La collection est sauvegardée dans le navigateur (localStorage).
   Format : { boosters: 0, gold: 0, cards: { id: { n: nombre d'exemplaires, h: étincelante ? } }, recent: [ids] } */
const STORAGE_KEY = "wof-collect-v1";
let storageOk = true;
const BOOSTER_COST = 5; // 🪙 nécessaires pour ouvrir un booster
const ANVIL_TIME_MS = 3000; // 3 s de forge à l'enclume → +1 🪙
function defaultState() {
  return { boosters: 0, gold: 0, cards: {}, recent: [] };
}
let state = defaultState();
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) state = Object.assign(defaultState(), JSON.parse(raw));
} catch (e) {
  storageOk = false; // stockage indisponible : on continue en mémoire
}
// Nettoie les sauvegardes : ignore les ids de cartes qui n'existent plus dans le SET
for (const id of Object.keys(state.cards)) if (!byId[id]) delete state.cards[id];
state.recent = state.recent.filter((id) => byId[id]);
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* ignore */
  }
}

/* ================== TIRAGE ================== */
function rollRarity(guaranteed) {
  const r = Math.random();
  let rarity =
    r < 0.01
      ? "Mythique"
      : r < 0.05
        ? "Légendaire"
        : r < 0.15
          ? "Épique"
          : r < 0.4
            ? "Rare"
            : "Commune";
  if (guaranteed && rarity === "Commune") {
    // dernier slot du booster : Rare minimum garanti
    const r2 = Math.random();
    rarity = r2 < 0.025 ? "Mythique" : r2 < 0.125 ? "Légendaire" : r2 < 0.375 ? "Épique" : "Rare";
  }
  // Ignore les raretés qui n'ont aucune carte dans le SET (set en construction)
  while (!SET.some((c) => c.rarity === rarity)) {
    const r3 = Math.random();
    rarity = r3 < 0.01 ? "Mythique" : r3 < 0.05 ? "Légendaire" : r3 < 0.15 ? "Épique" : r3 < 0.4 ? "Rare" : "Commune";
  }
  return rarity;
}
function pickCard(rarity) {
  let pool = SET.filter((c) => c.rarity === rarity);
  if (!pool.length) pool = SET; // fallback : jamais de tirage à vide
  return pool[Math.floor(Math.random() * pool.length)];
}
function openBooster() {
  const pulls = [];
  for (let i = 0; i < 5; i++) {
    const rarity = rollRarity(i === 4);
    const card = pickCard(rarity);
    const holo = Math.random() < 0.08; // 8% de version étincelante
    const owned = state.cards[card.id];
    const isNew = !owned;
    if (owned) owned.n += 1;
    else state.cards[card.id] = { n: 1, h: false };
    if (holo) state.cards[card.id].h = true;
    pulls.push({ id: card.id, holo, isNew });
  }
  state.boosters += 1;
  state.recent = pulls
    .map((p) => p.id)
    .reverse()
    .concat(state.recent)
    .slice(0, 10);
  save();
  return pulls;
}

/* ================== RENDU ================== */
const $ = (s) => document.querySelector(s);

function cardHTML(card, opts = {}) {
  const {
    flipped = false,
    holo = false,
    locked = false,
    count = 0,
    badge = null,
    backFlavor = false,
  } = opts;
  const rc = RARITY_CLASS[card.rarity];
  const nameText = locked ? "???" : card.name;
  const flavorText = locked ? "Pas encore découverte…" : card.flavor;
  const longFlavor = card.flavor && card.flavor.length > 100;
  const backFlavorHTML = backFlavor
    ? `<div class="cb-flavor${longFlavor ? " text-long" : ""}">${flavorText}</div>`
    : "";
  const countHTML = count > 1 ? `<div class="count-badge">×${count}</div>` : "";
  const holoHTML = holo ? `<div class="holo-badge">✨</div>` : "";
  const badgeHTML =
    badge === "new"
      ? `<div class="new-badge">NOUVEAU !</div>`
      : badge === "dup"
        ? `<div class="dup-badge">Doublon</div>`
        : "";
  // Carte non possédée : on cache l'image (❓), révélée seulement après un tirage
  const artHTML = locked
    ? "❓"
    : card.img
      ? `<img class="card-art-img" src="${card.img}" alt="${card.name}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${card.icon}'))" />`
      : card.icon;
  // Layout spécial (titre en haut + thème + lore Warcraft) si la carte a un "theme"
  const frontHTML = card.theme
    ? `
        <div class="gem">${card.rarity[0]}</div>
        ${holoHTML}
        <div class="card-title-bar">${nameText}</div>
        <div class="card-art">${artHTML}</div>
        <div class="card-meta">
          <div class="card-theme">${card.theme}</div>
          <div class="card-lore${card.lore && card.lore.length > 130 ? " text-long" : ""}">${locked ? "Pas encore découverte…" : card.lore}</div>
        </div>`
    : `
        <div class="gem">${card.rarity[0]}</div>
        ${holoHTML}
        <div class="card-art">${artHTML}</div>
        <div class="card-name">${nameText}</div>
        <div class="card-type">${card.type}</div>
        <div class="card-flavor">${flavorText}</div>`;
  return `
  <div class="card ${rc} ${card.img ? "has-img" : ""} ${card.theme ? "card-lg" : ""} ${flipped ? "flipped" : ""} ${holo ? "holo" : ""} ${locked ? "locked" : ""}" data-id="${card.id}">
    <div class="card-inner">
      <div class="card-face card-back">${backFlavorHTML}<div class="cb-label">WoW Forever</div></div>
      <div class="card-face card-front">
        ${frontHTML}
        ${locked ? `<div class="locked-note">🔒 à collectionner</div>` : ""}
        ${countHTML}
      </div>
    </div>
    ${badgeHTML}
  </div>`;
}

function renderStats() {
  const unique = Object.keys(state.cards).length;
  const owned = Object.entries(state.cards);
  const holoCount = owned.filter(([, v]) => v.h).length;
  const legendaries = owned.filter(
    ([id]) => byId[id].rarity === "Légendaire",
  ).length;
  const legendaryTotal = SET.filter((c) => c.rarity === "Légendaire").length;
  const dupes = owned.reduce((a, [, v]) => a + Math.max(0, v.n - 1), 0);
  $("#stats").innerHTML = `
    <div class="chip">🪙 Pièces d'or : <b>${state.gold}</b></div>
    <div class="chip">Boosters ouverts : <b>${state.boosters}</b></div>
    <div class="chip">Cartes uniques : <b>${unique} / ${SET.length}</b></div>
    <div class="chip">Doublons : <b>${dupes}</b></div>
    <div class="chip">✨ Étincelantes : <b>${holoCount}</b></div>
    <div class="chip">🔥 Légendaires : <b>${legendaries} / ${legendaryTotal}</b></div>
    ${!storageOk ? `<div class="chip">⚠️ Stockage indisponible dans ce contexte — la collection ne sera pas conservée</div>` : ""}
  `;
  const openBtn = $("#open-btn");
  openBtn.textContent = `Ouvrir un booster · 🪙 ${BOOSTER_COST}`;
  openBtn.disabled = state.gold < BOOSTER_COST;
  $("#pack-cost").textContent = `🪙 ${BOOSTER_COST}`;
  $("#cost-note").textContent = `🪙 ${BOOSTER_COST}`;
}

function renderRecent() {
  const el = $("#recent-list");
  if (!state.recent.length) {
    el.innerHTML = `<li style="color:var(--muted)">Aucune carte tirée pour l'instant…</li>`;
    return;
  }
  el.innerHTML = state.recent
    .map((id) => {
      const c = byId[id];
      return `<li><span>${c.icon} ${c.name}</span><span class="rarity-tag ${RARITY_TAG[c.rarity]}">${c.rarity}</span></li>`;
    })
    .join("");
}

/* ---------- Collection ---------- */
let filters = { rarity: "all", type: "all", hideOwned: false };

function renderCollection() {
  const unique = Object.keys(state.cards).length;
  const pct = Math.round((unique / SET.length) * 100);
  $("#prog-text").textContent = `${unique} / ${SET.length} cartes`;
  $("#prog-pct").textContent =
    pct === 100
      ? "100% — COLLECTION COMPLÈTE ! 🏆"
      : `${pct}% — encore ${SET.length - unique} à trouver`;
  $("#prog-fill").style.width = pct + "%";
  $("#rarity-progress").innerHTML = RARITIES.map((r) => {
    const all = SET.filter((c) => c.rarity === r).length;
    const own = SET.filter((c) => c.rarity === r && state.cards[c.id]).length;
    return `<span><span class="dot" style="background:${RARITY_COLOR[r]}"></span>${r} : ${own}/${all}</span>`;
  }).join("");

  const list = SET.filter(
    (c) =>
      (filters.rarity === "all" || c.rarity === filters.rarity) &&
      (filters.type === "all" || c.type === filters.type) &&
      (!filters.hideOwned || !state.cards[c.id]),
  );
  // Tri : faction (ordre Warcraft), puis rareté dans la faction, les Mythiques toujours à la fin
  list.sort((a, b) => {
    const myth = (c) => (c.rarity === "Mythique" ? 1 : 0);
    if (myth(a) !== myth(b)) return myth(a) - myth(b);
    const faction = (c) => (c.theme || "").split("·")[0].trim();
    const fa = faction(a), fb = faction(b);
    const oa = FACTION_ORDER.indexOf(fa), ob = FACTION_ORDER.indexOf(fb);
    const ordA = oa === -1 ? 99 : oa, ordB = ob === -1 ? 99 : ob;
    if (ordA !== ordB) return ordA - ordB || fa.localeCompare(fb);
    return RARITIES.indexOf(a.rarity) - RARITIES.indexOf(b.rarity) || a.name.localeCompare(b.name);
  });
  const grid = $("#collection-grid");
  if (!list.length) {
    grid.innerHTML = `<div class="empty-msg">Aucune carte ne correspond à ces filtres 🤔</div>`;
    return;
  }
  grid.innerHTML = list
    .map((c) => {
      const owned = state.cards[c.id];
      return cardHTML(c, {
        flipped: true,
        locked: !owned,
        holo: owned && owned.h,
        count: owned ? owned.n : 0,
        backFlavor: true, // au clic, la carte se retourne et montre le flavor au dos
      });
    })
    .join("");
  // Clic sur une carte de la collection : elle se retourne (dos = flavor)
  [...grid.querySelectorAll(".card")].forEach((el) =>
    el.addEventListener("click", () => el.classList.toggle("flipped")),
  );
}

function refreshUI() {
  renderStats();
  renderRecent();
  renderCollection();
}

/* ================== MODALE BOOSTER ================== */
const overlay = $("#overlay");
let currentPulls = [];

function showPackModal() {
  if (state.gold < BOOSTER_COST) {
    alert(
      `Pas assez de pièces d'or ! 😅 Il t'en faut 🪙 ${BOOSTER_COST} pour ouvrir un booster (tu en as ${state.gold}). Va forger à l'enclume ⚒️`,
    );
    return;
  }
  currentPulls = openBooster(); // tirage d'abord…
  state.gold -= BOOSTER_COST; // …puis on débite seulement si le tirage a réussi
  save();
  renderStats();
  overlay.innerHTML = `
    <div class="modal-pack" id="modal-pack">
      <div style="font-size:52px;filter:drop-shadow(0 4px 10px rgba(0,0,0,.5))">⚔️</div>
      <div style="font-family:Georgia,serif;font-size:22px;color:#fff">Azeroth</div>
      <div style="font-size:11px;letter-spacing:3px;color:#bfe9f5;text-transform:uppercase">Édition Forever</div>
    </div>
    <div class="modal-hint">Clique sur le booster pour l'ouvrir !</div>`;
  overlay.classList.remove("hidden");
  $("#modal-pack").addEventListener("click", tearPack, { once: true });
}

function tearPack() {
  const packEl = $("#modal-pack");
  packEl.classList.add("tearing");
  packEl.addEventListener("animationend", revealCards, { once: true });
}

function revealCards() {
  overlay.innerHTML = `
    <div class="reveal-zone" id="reveal-zone"></div>
    <div class="modal-btns">
      <button class="big-btn" id="reveal-all">✨ Tout révéler</button>
      <button class="secondary-btn" id="close-modal">Terminer</button>
    </div>`;
  const zone = $("#reveal-zone");
  zone.innerHTML = currentPulls
    .map((p) => {
      const c = byId[p.id];
      return cardHTML(c, { flipped: false, holo: p.holo });
    })
    .join("");
  [...zone.querySelectorAll(".card")].forEach((el, i) => {
    el.addEventListener("click", () => flipCard(el, i));
  });
  $("#reveal-all").addEventListener("click", () => {
    let delay = 0;
    [...zone.children].forEach((el, i) => {
      if (!el.classList.contains("flipped")) {
        setTimeout(() => flipCard(el, i), delay);
        delay += 220;
      }
    });
  });
  $("#close-modal").addEventListener("click", closeModal);
  // légendaire dans le booster ? petit teaser à l'ouverture
  if (currentPulls.some((p) => ["Légendaire", "Mythique"].includes(byId[p.id].rarity)))
    shakeScreen();
}

function closeModal() {
  overlay.classList.add("hidden");
  overlay.innerHTML = "";
  refreshUI();
}

function flipCard(el, index) {
  if (el.classList.contains("flipped")) return;
  const pull = currentPulls[index];
  if (!pull) return;
  const card = byId[pull.id];
  el.classList.add("flipped");
  setTimeout(() => {
    const old = el.querySelector(".new-badge, .dup-badge");
    if (old) old.remove();
    const b = document.createElement("div");
    b.className = pull.isNew ? "new-badge" : "dup-badge";
    b.textContent = pull.isNew ? "NOUVEAU !" : "Doublon";
    el.appendChild(b);
  }, 350);
  if (card.rarity === "Légendaire" || card.rarity === "Mythique") {
    setTimeout(() => {
      confetti();
      shakeScreen();
    }, 300);
  }
}
function shakeScreen() {
  document.body.classList.add("screen-shake");
  setTimeout(() => document.body.classList.remove("screen-shake"), 450);
}

/* ================== CONFETTIS ================== */
const canvas = $("#confetti-canvas");
const ctx = canvas.getContext("2d");
let confettiPieces = [],
  confettiRunning = false;
function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener("resize", resizeCanvas);
resizeCanvas();
function confetti() {
  const colors = [
    "#0782A1",
    "#35b6d9",
    "#8b7cf6",
    "#38bdf8",
    "#4ade80",
    "#ff5e8a",
    "#ffffff",
  ];
  for (let i = 0; i < 140; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      c: colors[Math.floor(Math.random() * colors.length)],
      vy: 2.4 + Math.random() * 3.4,
      vx: -1.4 + Math.random() * 2.8,
      rot: Math.random() * Math.PI,
      vr: -0.14 + Math.random() * 0.28,
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(tickConfetti);
  }
}
function tickConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces = confettiPieces.filter((p) => p.y < canvas.height + 30);
  for (const p of confettiPieces) {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
  if (confettiPieces.length) requestAnimationFrame(tickConfetti);
  else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ================== ÉVÉNEMENTS ================== */
function switchTab(tab) {
  const isBooster = tab === "booster";
  $("#tab-booster").classList.toggle("active", isBooster);
  $("#tab-collection").classList.toggle("active", !isBooster);
  $("#view-booster").classList.toggle("hidden", !isBooster);
  $("#view-collection").classList.toggle("hidden", isBooster);
  if (!isBooster) renderCollection();
}
$("#tab-booster").addEventListener("click", () => switchTab("booster"));
$("#tab-collection").addEventListener("click", () => switchTab("collection"));
$("#open-btn").addEventListener("click", showPackModal);
$("#pack").addEventListener("click", showPackModal);

/* ---------- Enclume : forge de pièces d'or ---------- */
let forging = false;
/* Son de l'enclume (fichier mp3 dans assets) */
const hammerSound = new Audio("assets/enclume_marteau.mp3");
function playHammer() {
  try {
    hammerSound.currentTime = 0; // rejoue depuis le début à chaque coup
    hammerSound.volume = 0.2; // volume doux
    hammerSound.play().catch(() => {}); // ignoré si le navigateur bloque l'autoplay
  } catch (e) { /* audio indisponible : on ignore */ }
}

function startForge() {
  if (forging) return;
  forging = true;
  playHammer(); // son du marteau au clic
  const btn = $("#anvil-btn");
  const fill = $("#anvil-fill");
  btn.disabled = true;
  btn.classList.add("working");
  fill.style.transition = `width ${ANVIL_TIME_MS}ms linear`;
  fill.style.width = "100%";
  setTimeout(() => {
    state.gold += 1;
    save();
    renderStats();
    fill.style.transition = "none";
    fill.style.width = "0%";
    void fill.offsetWidth; // reflow : réinitialise la barre sans animation
    fill.style.transition = "";
    btn.classList.remove("working");
    btn.disabled = false;
    forging = false;
  }, ANVIL_TIME_MS);
}
$("#anvil-btn").addEventListener("click", startForge);

document.querySelectorAll(".f-btn[data-rarity]").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".f-btn[data-rarity]")
      .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    filters.rarity = b.dataset.rarity;
    renderCollection();
  }),
);
document.querySelectorAll(".f-btn[data-type]").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".f-btn[data-type]")
      .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    filters.type = b.dataset.type;
    renderCollection();
  }),
);
$("#hide-owned").addEventListener("click", () => {
  filters.hideOwned = !filters.hideOwned;
  $("#hide-owned").classList.toggle("active", filters.hideOwned);
  $("#hide-owned").textContent = filters.hideOwned
    ? "Afficher toutes les cartes"
    : "Masquer mes cartes";
  renderCollection();
});

$("#reset-btn").addEventListener("click", () => {
  if (
    !confirm("Effacer toute ta collection ? Cette action est irréversible 😱")
  )
    return;
  if (!confirm("Vraiment sûr ? Même la Grande Quiche du Destin ? 🥧")) return;
  state = defaultState();
  save();
  refreshUI();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) closeModal();
});

/* ================== DÉMARRAGE ================== */
refreshUI();
