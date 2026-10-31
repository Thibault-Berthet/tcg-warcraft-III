/* ============================================================
   WoW Forever — Collectionneur de Cartes
   Logique du jeu (script.js)
   ============================================================ */
"use strict";

/* ================== DONNÉES : LE SET DE CARTES ==================
   rarity : Commune | Rare | Épique | Légendaire
   type   : Héros | Créature | Objet | Lieu
   Toutes les cartes sont des créations originales (parodie). */
const SET = [
  // --- COMMUNES (16) ---
  { id: "c01", name: "Grûm le Porte-Hache", type: "Héros", rarity: "Commune", icon: "🪓", flavor: "Il ne règle pas les problèmes, il les hache." },
  { id: "c02", name: "Gnoll Farfelu", type: "Créature", rarity: "Commune", icon: "🦴", flavor: "Wouf ? Non. Grrr ? Pas vraiment non plus." },
  { id: "c03", name: "Cochon Sauvage", type: "Créature", rarity: "Commune", icon: "🐗", flavor: "Il a déjà mangé trois aventuriers. Pas de jaloux." },
  { id: "c04", name: "Loup Affamé", type: "Créature", rarity: "Commune", icon: "🐺", flavor: "Affamé depuis 1842. Toujours pas rassasié." },
  { id: "c05", name: "Chauve-souris Importune", type: "Créature", rarity: "Commune", icon: "🦇", flavor: "Elle vole droit sur vous. En zigzag." },
  { id: "c06", name: "Fiole de Jus de Géant", type: "Objet", rarity: "Commune", icon: "🧪", flavor: "À consommer avec modération. Ou pas du tout, en fait." },
  { id: "c07", name: "Épée Rouillée de Mamie", type: "Objet", rarity: "Commune", icon: "🗡️", flavor: "Elle a survécu à trois générations de héros." },
  { id: "c08", name: "Botte de Cuir Usé", type: "Objet", rarity: "Commune", icon: "🥾", flavor: "Il en manque une. Personne ne sait où." },
  { id: "c09", name: "Fromage de Nain Affiné", type: "Objet", rarity: "Commune", icon: "🧀", flavor: "Affiné 200 ans dans une cave. Et ça se sent." },
  { id: "c10", name: "Champignons Luisants", type: "Objet", rarity: "Commune", icon: "🍄", flavor: "Brillants. Probablement comestibles. Probablement." },
  { id: "c11", name: "Carte au Trésor Déchirée", type: "Objet", rarity: "Commune", icon: "🗺️", flavor: "Elle indique un trésor. Dommage que la moitié manque." },
  { id: "c12", name: "Fermière Gertrude", type: "Héros", rarity: "Commune", icon: "👩‍🌾", flavor: "Elle a vu passer des armées. Elle a préféré ses betteraves." },
  { id: "c13", name: "Caporal Bitume", type: "Héros", rarity: "Commune", icon: "🎖️", flavor: "Il n'a jamais perdu une bataille. Il n'en a jamais mené." },
  { id: "c14", name: "Apprenti Miroiteau", type: "Héros", rarity: "Commune", icon: "🧙", flavor: "Il maîtrise le feu. Enfin, presque." },
  { id: "c15", name: "Pêcheur du Lac Boueux", type: "Héros", rarity: "Commune", icon: "🎣", flavor: "Il pêche surtout des histoires." },
  { id: "c16", name: "Taverne du Dragon Bailleur", type: "Lieu", rarity: "Commune", icon: "🏚️", flavor: "Le seul dragon qui crache du feu en baillant." },
  // --- RARES (12) ---
  { id: "c17", name: "Yethi le Yéti Sociable", type: "Créature", rarity: "Rare", icon: "🐻‍❄️", flavor: "Il fait des câlins. C'est exactement le problème." },
  { id: "c18", name: "Golem de Granite Bavard", type: "Créature", rarity: "Rare", icon: "🗿", flavor: "Il raconte sa vie. Il a 4 000 ans." },
  { id: "c19", name: "Ogre Deux-Têtes Bienhabil", type: "Créature", rarity: "Rare", icon: "👹", flavor: "Deux têtes, trois opinions." },
  { id: "c20", name: "Gryphon Livreur Express", type: "Créature", rarity: "Rare", icon: "🦅", flavor: "Livraison en 24 h. Le dragon en sus." },
  { id: "c21", name: "Katryna Lame-de-Nuit", type: "Héros", rarity: "Rare", icon: "🥷", flavor: "Vous ne la verrez jamais venir. Personne ne l'a vue." },
  { id: "c22", name: "Chef Gobelin Zigomatix", type: "Héros", rarity: "Rare", icon: "👺", flavor: "Il n'a jamais perdu une négociation. Ni un doigt." },
  { id: "c23", name: "Capitaine Sardonique", type: "Héros", rarity: "Rare", icon: "🏴‍☠️", flavor: "Son rire est plus redouté que sa lame." },
  { id: "c24", name: "Potion de Frotement-de-Genou", type: "Objet", rarity: "Rare", icon: "⚗️", flavor: "Guérit tout, sauf le frottement de genou." },
  { id: "c25", name: "Arc de Frondille", type: "Objet", rarity: "Rare", icon: "🏹", flavor: "Tire des flèches. Souvent même dans la bonne direction." },
  { id: "c26", name: "Bannière du Clan Orage-Brume", type: "Objet", rarity: "Rare", icon: "🚩", flavor: "Le clan a disparu. La bannière flotte encore." },
  { id: "c27", name: "Bibliothèque de Babel-sur-Mer", type: "Lieu", rarity: "Rare", icon: "📚", flavor: "Tous les livres du monde, sauf celui que vous cherchez." },
  { id: "c28", name: "Mine de Mithril XCII", type: "Lieu", rarity: "Rare", icon: "⛏️", flavor: "XCI mineurs ont fait fortune. Vous, pas encore." },
  // --- ÉPIQUES (8) ---
  { id: "c29", name: "Serpent des Nuages Arc-en-Ciel", type: "Créature", rarity: "Épique", icon: "🐍", flavor: "Son passage laisse des arcs-en-ciel. Et des morsures." },
  { id: "c30", name: "Dragon Adolescent Arnaud", type: "Créature", rarity: "Épique", icon: "🐲", flavor: "Il fonce tête la première. Souvent dans un mur." },
  { id: "c31", name: "Matriarche des Sylvestres", type: "Héros", rarity: "Épique", icon: "🧝‍♀️", flavor: "La forêt lui obéit. Les bûcherons aussi." },
  { id: "c32", name: "Voleuse d'Étoiles Nyxa", type: "Héros", rarity: "Épique", icon: "🌟", flavor: "Elle a volé la lune une fois. Elle l'a rendue. Avec des excuses." },
  { id: "c33", name: "Excalipoil", type: "Objet", rarity: "Épique", icon: "⚔️", flavor: "L'épée du destin. Qui coupe surtout les poils." },
  { id: "c34", name: "Couronne de Chêne Millénaire", type: "Objet", rarity: "Épique", icon: "👑", flavor: "Elle pèse une tonne. Question de respect." },
  { id: "c35", name: "Citadelle de Pierre-Chantante", type: "Lieu", rarity: "Épique", icon: "🏰", flavor: "Les murs chantent la nuit. Personne ne dort jamais." },
  { id: "c36", name: "Seigneur Krakos le Rampant", type: "Créature", rarity: "Épique", icon: "🐙", flavor: "Il monte à l'assaut. Par l'escalier de service." },
  // --- LÉGENDAIRES (4) ---
  { id: "c37", name: "Tharok l'Éternel, Roi des Cendres", type: "Héros", rarity: "Légendaire", icon: "🔥", flavor: "Il a fondé un royaume. Puis l'a incendié. Deux fois." },
  { id: "c38", name: "Galamoth le Dragon Bourru", type: "Créature", rarity: "Légendaire", icon: "🐉", flavor: "Il ne crache pas de feu, il grommelle. Et ça suffit." },
  { id: "c39", name: "La Grande Quiche du Destin", type: "Objet", rarity: "Légendaire", icon: "🥧", flavor: "Quiconque la goûte voit l'avenir. Et redemande une part." },
  { id: "c40", name: "Portail des Royaumes Jumeaux", type: "Lieu", rarity: "Légendaire", icon: "🌀", flavor: "Il mène partout. Surtout là où vous n'avez rien à faire." },
];
const byId = Object.fromEntries(SET.map(c => [c.id, c]));
const RARITIES = ["Commune", "Rare", "Épique", "Légendaire"];
const RARITY_CLASS = {
  "Commune": "c-common",
  "Rare": "c-rare",
  "Épique": "c-epic",
  "Légendaire": "c-legendary",
};
const RARITY_TAG = {
  "Commune": "rt-commune",
  "Rare": "rt-rare",
  "Épique": "rt-epic",
  "Légendaire": "rt-legendary",
};
const RARITY_COLOR = {
  "Commune": "var(--r-common)",
  "Rare": "var(--r-rare)",
  "Épique": "var(--r-epic)",
  "Légendaire": "var(--r-legendary)",
};

/* ================== ÉTAT & STOCKAGE ==================
   La collection est sauvegardée dans le navigateur (localStorage).
   Format : { boosters: 0, cards: { id: { n: nombre d'exemplaires, h: étincelante ? } }, recent: [ids] } */
const STORAGE_KEY = "wof-collect-v1";
let storageOk = true;
function defaultState() { return { boosters: 0, cards: {}, recent: [] }; }
let state = defaultState();
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) state = Object.assign(defaultState(), JSON.parse(raw));
} catch (e) {
  storageOk = false; // stockage indisponible : on continue en mémoire
}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

/* ================== TIRAGE ================== */
function rollRarity(guaranteed) {
  const r = Math.random();
  let rarity = r < 0.015 ? "Légendaire" : r < 0.10 ? "Épique" : r < 0.35 ? "Rare" : "Commune";
  if (guaranteed && rarity === "Commune") {
    // dernier slot du booster : Rare minimum garanti
    const r2 = Math.random();
    rarity = r2 < 0.06 ? "Légendaire" : r2 < 0.40 ? "Épique" : "Rare";
  }
  return rarity;
}
function pickCard(rarity) {
  const pool = SET.filter(c => c.rarity === rarity);
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
    if (owned) owned.n += 1; else state.cards[card.id] = { n: 1, h: false };
    if (holo) state.cards[card.id].h = true;
    pulls.push({ id: card.id, holo, isNew });
  }
  state.boosters += 1;
  state.recent = pulls.map(p => p.id).reverse().concat(state.recent).slice(0, 10);
  save();
  return pulls;
}

/* ================== RENDU ================== */
const $ = s => document.querySelector(s);

function cardHTML(card, opts = {}) {
  const {
    flipped = false, holo = false, locked = false,
    count = 0, badge = null,
  } = opts;
  const rc = RARITY_CLASS[card.rarity];
  const nameText = locked ? "???" : card.name;
  const flavorText = locked ? "Pas encore découverte…" : card.flavor;
  const countHTML = count > 1 ? `<div class="count-badge">×${count}</div>` : "";
  const holoHTML = holo ? `<div class="holo-badge">✨</div>` : "";
  const badgeHTML = badge === "new"
    ? `<div class="new-badge">NOUVEAU !</div>`
    : badge === "dup"
    ? `<div class="dup-badge">Doublon</div>`
    : "";
  return `
  <div class="card ${rc} ${flipped ? "flipped" : ""} ${holo ? "holo" : ""} ${locked ? "locked" : ""}" data-id="${card.id}">
    <div class="card-inner">
      <div class="card-face card-back"><div class="cb-label">WoW Forever</div></div>
      <div class="card-face card-front">
        <div class="gem">${card.rarity[0]}</div>
        ${holoHTML}
        <div class="card-art">${card.icon}</div>
        <div class="card-name">${nameText}</div>
        <div class="card-type">${card.type}</div>
        <div class="card-flavor">${flavorText}</div>
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
  const legendaries = owned.filter(([id]) => byId[id].rarity === "Légendaire").length;
  const dupes = owned.reduce((a, [, v]) => a + Math.max(0, v.n - 1), 0);
  $("#stats").innerHTML = `
    <div class="chip">Boosters ouverts : <b>${state.boosters}</b></div>
    <div class="chip">Cartes uniques : <b>${unique} / ${SET.length}</b></div>
    <div class="chip">Doublons : <b>${dupes}</b></div>
    <div class="chip">✨ Étincelantes : <b>${holoCount}</b></div>
    <div class="chip">🔥 Légendaires : <b>${legendaries} / 4</b></div>
    ${!storageOk ? `<div class="chip">⚠️ Stockage indisponible dans ce contexte — la collection ne sera pas conservée</div>` : ""}
  `;
}

function renderRecent() {
  const el = $("#recent-list");
  if (!state.recent.length) {
    el.innerHTML = `<li style="color:var(--muted)">Aucune carte tirée pour l'instant…</li>`;
    return;
  }
  el.innerHTML = state.recent.map(id => {
    const c = byId[id];
    return `<li><span>${c.icon} ${c.name}</span><span class="rarity-tag ${RARITY_TAG[c.rarity]}">${c.rarity}</span></li>`;
  }).join("");
}

/* ---------- Collection ---------- */
let filters = { rarity: "all", type: "all", hideOwned: false };

function renderCollection() {
  const unique = Object.keys(state.cards).length;
  const pct = Math.round(unique / SET.length * 100);
  $("#prog-text").textContent = `${unique} / ${SET.length} cartes`;
  $("#prog-pct").textContent = pct === 100
    ? "100% — COLLECTION COMPLÈTE ! 🏆"
    : `${pct}% — encore ${SET.length - unique} à trouver`;
  $("#prog-fill").style.width = pct + "%";
  $("#rarity-progress").innerHTML = RARITIES.map(r => {
    const all = SET.filter(c => c.rarity === r).length;
    const own = SET.filter(c => c.rarity === r && state.cards[c.id]).length;
    return `<span><span class="dot" style="background:${RARITY_COLOR[r]}"></span>${r} : ${own}/${all}</span>`;
  }).join("");

  const list = SET.filter(c =>
    (filters.rarity === "all" || c.rarity === filters.rarity) &&
    (filters.type === "all" || c.type === filters.type) &&
    (!filters.hideOwned || !state.cards[c.id])
  );
  const grid = $("#collection-grid");
  if (!list.length) {
    grid.innerHTML = `<div class="empty-msg">Aucune carte ne correspond à ces filtres 🤔</div>`;
    return;
  }
  grid.innerHTML = list.map(c => {
    const owned = state.cards[c.id];
    return cardHTML(c, {
      flipped: true,
      locked: !owned,
      holo: owned && owned.h,
      count: owned ? owned.n : 0,
    });
  }).join("");
}

function refreshUI() { renderStats(); renderRecent(); renderCollection(); }

/* ================== MODALE BOOSTER ================== */
const overlay = $("#overlay");
let currentPulls = [];

function showPackModal() {
  currentPulls = openBooster();
  overlay.innerHTML = `
    <div class="modal-pack" id="modal-pack">
      <div style="font-size:52px;filter:drop-shadow(0 4px 10px rgba(0,0,0,.5))">⚔️</div>
      <div style="font-family:Georgia,serif;font-size:22px;color:#fff">Royaumes Éternels</div>
      <div style="font-size:11px;letter-spacing:3px;color:#e9d5ff;text-transform:uppercase">Édition Forever</div>
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
  zone.innerHTML = currentPulls.map(p => {
    const c = byId[p.id];
    return cardHTML(c, { flipped: false, holo: p.holo });
  }).join("");
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
  if (currentPulls.some(p => byId[p.id].rarity === "Légendaire")) shakeScreen();
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
  if (card.rarity === "Légendaire") {
    setTimeout(() => { confetti(); shakeScreen(); }, 300);
  }
}
function shakeScreen() {
  document.body.classList.add("screen-shake");
  setTimeout(() => document.body.classList.remove("screen-shake"), 450);
}

/* ================== CONFETTIS ================== */
const canvas = $("#confetti-canvas");
const ctx = canvas.getContext("2d");
let confettiPieces = [], confettiRunning = false;
function resizeCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener("resize", resizeCanvas);
resizeCanvas();
function confetti() {
  const colors = ["#ffa42b", "#e8c35a", "#b465f0", "#4f9dff", "#4ade80", "#ff5e8a", "#ffffff"];
  for (let i = 0; i < 140; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
      c: colors[Math.floor(Math.random() * colors.length)],
      vy: 2.4 + Math.random() * 3.4,
      vx: -1.4 + Math.random() * 2.8,
      rot: Math.random() * Math.PI,
      vr: -0.14 + Math.random() * 0.28,
    });
  }
  if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(tickConfetti); }
}
function tickConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 30);
  for (const p of confettiPieces) {
    p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
  if (confettiPieces.length) requestAnimationFrame(tickConfetti);
  else { confettiRunning = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
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

document.querySelectorAll(".f-btn[data-rarity]").forEach(b =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".f-btn[data-rarity]").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    filters.rarity = b.dataset.rarity;
    renderCollection();
  }));
document.querySelectorAll(".f-btn[data-type]").forEach(b =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".f-btn[data-type]").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    filters.type = b.dataset.type;
    renderCollection();
  }));
$("#hide-owned").addEventListener("click", () => {
  filters.hideOwned = !filters.hideOwned;
  $("#hide-owned").classList.toggle("active", filters.hideOwned);
  $("#hide-owned").textContent = filters.hideOwned ? "Afficher toutes les cartes" : "Masquer mes cartes";
  renderCollection();
});

$("#reset-btn").addEventListener("click", () => {
  if (!confirm("Effacer toute ta collection ? Cette action est irréversible 😱")) return;
  if (!confirm("Vraiment sûr ? Même la Grande Quiche du Destin ? 🥧")) return;
  state = defaultState();
  save();
  refreshUI();
});

/* ---------- Export / Import de collection ---------- */
$("#export-btn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "wow-forever-collection.json";
  a.click();
  URL.revokeObjectURL(a.href);
});
$("#import-btn").addEventListener("click", () => $("#import-file").click());
$("#import-file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || typeof data !== "object" || !data.cards) throw new Error("format");
      const cards = {};
      for (const [id, v] of Object.entries(data.cards)) {
        if (byId[id] && v && Number.isFinite(v.n) && v.n > 0) {
          cards[id] = { n: Math.floor(v.n), h: !!v.h };
        }
      }
      state = {
        boosters: Number(data.boosters) || 0,
        cards,
        recent: Array.isArray(data.recent) ? data.recent.filter(id => byId[id]).slice(0, 10) : state.recent,
      };
      save();
      refreshUI();
      alert("Collection importée avec succès ! ✅");
    } catch (err) {
      alert("Fichier invalide 😕 — il faut un export de collection de ce site.");
    }
    e.target.value = "";
  };
  reader.readAsText(file);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) closeModal();
});

/* ================== DÉMARRAGE ================== */
refreshUI();
