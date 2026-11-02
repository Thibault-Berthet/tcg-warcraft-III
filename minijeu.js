/* ============================================================
   WoW Forever — Mini-jeu Tower Defense (débloqué à 91/91 cartes)
   100 % statique : canvas 2D + requestAnimationFrame, aucun asset.
   ============================================================ */
"use strict";

window.initTD = function () {
  const canvas = document.getElementById("td-canvas");
  if (!canvas || canvas.dataset.init) return;
  canvas.dataset.init = "1";
  const ctx = canvas.getContext("2d");

  // Sprites (images dans assets, emoji en fallback si non chargé)
  const SPRITES_SRC = {
    grunt: "assets/mini_grunt_02.png",
    boss: "assets/blademaster_mini.png",
    portal: "assets/portal_mini.png",
    castle: "assets/chateau_mini.png",
    archere: "assets/tower_archer_mini.jpg",
    glace: "assets/tower_arcane_mini.jpg",
    canon: "assets/tower_canon_mini.jpg",
  };
  const sprites = {};
  for (const [k, src] of Object.entries(SPRITES_SRC)) {
    const im = new Image();
    im.src = src;
    sprites[k] = im;
  }
  function drawSprite(key, emoji, x, y, size, fontPx) {
    const img = sprites[key];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
    } else {
      ctx.font = fontPx + "px serif";
      ctx.fillText(emoji, x, y);
    }
  }

  const COLS = 15, ROWS = 10, CELL = 48;
  canvas.width = COLS * CELL;
  canvas.height = ROWS * CELL;

  const elGold = document.getElementById("td-gold");
  const elLives = document.getElementById("td-lives");
  const elWave = document.getElementById("td-wave");
  const elMsg = document.getElementById("td-msg");

  // Chemin en S (cases) : entrée à gauche, sortie à droite
  const pathCells = [];
  for (let x = 0; x <= 13; x++) pathCells.push([x, 4]);
  for (let y = 4; y >= 1; y--) pathCells.push([13, y]);
  for (let x = 13; x >= 2; x--) pathCells.push([x, 1]);
  for (let y = 1; y <= 7; y++) pathCells.push([2, y]);
  for (let x = 2; x <= 14; x++) pathCells.push([x, 7]);
  const waypoints = pathCells.map(([x, y]) => ({ x: x * CELL + CELL / 2, y: y * CELL + CELL / 2 }));
  const pathSet = new Set(pathCells.map(([x, y]) => x + "," + y));

  const TOWERS = {
    archere: { name: "Archère", icon: "🏹", sprite: "archere", cost: 30, range: 115, dmg: 8, rate: 0.5, color: "#38bdf8" },
    glace: { name: "Tour de glace", icon: "❄️", sprite: "glace", cost: 40, range: 75, dmg: 2, rate: 0.4, slow: 0.5, slowTime: 4, color: "#8b7cf6" },
    canon: { name: "Canon", icon: "💣", sprite: "canon", cost: 60, range: 125, dmg: 25, rate: 1.2, splash: 55, color: "#ffb35c" },
  };
  const MAX_WAVE = 10;

  let gold, lives, wave, towers, enemies, shots, selectedType, selectedTower, gameOver, victory, spawnQueue, spawnTimer, waveActive;

  function reset() {
    gold = 120; lives = 20; wave = 0;
    towers = []; enemies = []; shots = [];
    selectedType = null; selectedTower = null;
    gameOver = false; victory = false;
    spawnQueue = 0; spawnTimer = 0; waveActive = false;
    elMsg.textContent = "Pose des tours (hors du chemin) puis lance la vague !";
    updateHud();
  }

  function updateHud() {
    elGold.textContent = gold;
    elLives.textContent = lives;
    elWave.textContent = wave + " / " + MAX_WAVE;
  }

  function makeEnemy(boss = false) {
    const hp = boss ? 400 + wave * 60 : 110 + wave * 50; // grunts encore plus costauds
    return {
      x: waypoints[0].x, y: waypoints[0].y, wp: 1,
      hp, maxHp: hp,
      speed: boss ? 22 : 70 + wave * 5, // grunts encore plus rapides
      slowUntil: 0, slowFactor: 1,
      boss, icon: boss ? "🐗" : "👺",
      reward: boss ? 50 : 5,
    };
  }

  function startWave() {
    if (waveActive || gameOver || victory) return;
    wave++;
    waveActive = true;
    spawnQueue = 3 + wave * 4; // plus de grunts dès la 1ère vague (7, puis 11, 15…)
    spawnTimer = 0;
    if (wave === MAX_WAVE) enemies.push(makeEnemy(true)); // boss final
    elMsg.textContent = "Vague " + wave + " — que la Horde avance ! 👺";
    updateHud();
  }

  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  function update(dt, now) {
    // Spawn des ennemis de la vague
    if (spawnQueue > 0) {
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        enemies.push(makeEnemy(false));
        spawnQueue--;
        spawnTimer = 0.7;
      }
    }
    // Avancée des ennemis
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      const target = waypoints[e.wp];
      const d = dist(e, target);
      const speed = e.speed * (now < e.slowUntil ? e.slowFactor : 1);
      const step = speed * dt;
      if (step >= d) {
        e.x = target.x; e.y = target.y; e.wp++;
        if (e.wp >= waypoints.length) {
          enemies.splice(i, 1);
          lives--;
          updateHud();
          if (lives <= 0) { gameOver = true; elMsg.textContent = "💀 Le portail est tombé ! Partie terminée à la vague " + wave + "."; }
          continue;
        }
      } else {
        e.x += (target.x - e.x) / d * step;
        e.y += (target.y - e.y) / d * step;
      }
    }
    // Tours : cooldown + tir
    for (const t of towers) {
      t.cooldown -= dt;
      if (t.cooldown > 0) continue;
      // cible = ennemi le plus avancé dans la portée
      let best = null, bestWp = -1;
      for (const e of enemies) {
        if (dist(t, e) <= t.range && e.wp > bestWp) { best = e; bestWp = e.wp; }
      }
      if (!best) continue;
      t.cooldown = t.rate;
      if (t.splash) {
        // le canon lance un boulet visible qui explose à l'impact (dégâts de zone)
        shots.push({ x: t.x, y: t.y, target: best, dmg: t.dmg, splash: t.splash, color: t.color, speed: 200 });
      } else {
        shots.push({ x: t.x, y: t.y, target: best, dmg: t.dmg, slow: t.slow || 0, slowTime: t.slowTime || 0, color: t.color, speed: 320 });
      }
    }
    // Projectiles
    for (let i = shots.length - 1; i >= 0; i--) {
      const s = shots[i];
      if (!enemies.includes(s.target)) { shots.splice(i, 1); continue; }
      const d = dist(s, s.target);
      const step = s.speed * dt;
      if (step >= d) {
        if (s.splash) {
          // impact du boulet : dégâts de zone autour de la cible
          for (const e of [...enemies]) if (dist(s.target, e) <= s.splash) damage(e, s.dmg, now, {});
        } else {
          damage(s.target, s.dmg, now, { slow: s.slow, slowTime: s.slowTime });
        }
        shots.splice(i, 1);
      } else {
        s.x += (s.target.x - s.x) / d * step;
        s.y += (s.target.y - s.y) / d * step;
      }
    }
    // Fin de vague / victoire
    if (waveActive && spawnQueue === 0 && enemies.length === 0) {
      waveActive = false;
      gold += 15;
      if (wave >= MAX_WAVE) {
        victory = true;
        if (window.tdVictoryBonus) window.tdVictoryBonus(); // +5 🪙 sur la cagnotte TCG
        elMsg.textContent = "🏆 VICTOIRE ! Azeroth est sauvée — les 10 vagues sont repoussées ! Tu as bien mérité +5 🪙 sur ta cagnotte ! 📸 Pense à screener pour prouver ta victoire !";
      } else {
        elMsg.textContent = "Vague " + wave + " repoussée ! +15 🪙 — lance la suivante.";
      }
      updateHud();
    }
  }

  function damage(e, dmg, now, opts = {}) {
    e.hp -= dmg;
    if (opts.slow) { e.slowFactor = opts.slow; e.slowUntil = now + (opts.slowTime || 0); }
    if (e.hp <= 0 && enemies.includes(e)) {
      enemies.splice(enemies.indexOf(e), 1);
      gold += e.reward;
      updateHud();
    }
  }

  function draw(now) {
    // herbe
    for (let y = 0; y < ROWS; y++)
      for (let x = 0; x < COLS; x++) {
        ctx.fillStyle = (x + y) % 2 ? "#0c2b21" : "#0e3226";
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    // chemin
    ctx.fillStyle = "#3d2f1d";
    for (const [x, y] of pathCells) ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    // entrée / sortie
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    drawSprite("portal", "🌀", waypoints[0].x, waypoints[0].y, 36, 22);
    drawSprite("castle", "🏰", waypoints[waypoints.length - 1].x, waypoints[waypoints.length - 1].y, 36, 22);
    // portées
    if (selectedTower) {
      ctx.beginPath();
      ctx.arc(selectedTower.x, selectedTower.y, selectedTower.range, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(53,182,217,.12)"; ctx.fill();
      ctx.strokeStyle = "rgba(53,182,217,.5)"; ctx.stroke();
    }
    if (selectedType) {
      const t = TOWERS[selectedType];
      ctx.fillStyle = "rgba(255,255,255,.08)";
      for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
        if (!pathSet.has(x + "," + y) && !towers.some((tw) => tw.gx === x && tw.gy === y))
          ctx.fillRect(x * CELL + 2, y * CELL + 2, CELL - 4, CELL - 4);
      void t;
    }
    // tours
    for (const t of towers) {
      drawSprite(TOWERS[t.type].sprite, TOWERS[t.type].icon, t.x, t.y, 34, 26);
    }
    // ennemis + barres de vie
    for (const e of enemies) {
      const size = e.boss ? 38 : 30;
      drawSprite(e.boss ? "boss" : "grunt", e.icon, e.x, e.y, size, e.boss ? 34 : 24);
      const w = e.boss ? 36 : 26;
      const barY = e.y - (e.boss ? 26 : size / 2 + 6);
      ctx.fillStyle = "#111";
      ctx.fillRect(e.x - w / 2, barY, w, 5);
      ctx.fillStyle = e.hp / e.maxHp > 0.4 ? "#4ade80" : "#ff5e5e";
      ctx.fillRect(e.x - w / 2, barY, w * Math.max(0, e.hp / e.maxHp), 5);
    }
    // projectiles (boulet du canon plus gros)
    for (const s of shots) {
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.splash ? 7 : 4, 0, Math.PI * 2);
      ctx.fill();
      if (s.splash) {
        ctx.strokeStyle = "rgba(0,0,0,.45)";
        ctx.stroke();
      }
    }
    // fin de partie
    if (gameOver || victory) {
      ctx.fillStyle = "rgba(2,10,16,.75)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = victory ? "#ffb35c" : "#ff5e5e";
      ctx.font = "28px Georgia, serif";
      ctx.fillText(victory ? "🏆 VICTOIRE !" : "💀 GAME OVER", canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillStyle = "#e6f3f8";
      ctx.font = "15px Georgia, serif";
      ctx.fillText("Clique sur « Recommencer » pour rejouer", canvas.width / 2, canvas.height / 2 + 22);
      if (victory) {
        ctx.fillStyle = "#ffb35c";
        ctx.fillText("+5 🪙 bien mérités crédités sur ta cagnotte de cartes !", canvas.width / 2, canvas.height / 2 + 46);
        ctx.fillStyle = "#e6f3f8";
        ctx.fillText("📸 Pense à screener pour prouver ta victoire !", canvas.width / 2, canvas.height / 2 + 70);
      }
    }
    void now;
  }

  function onCanvasClick(ev) {
    const rect = canvas.getBoundingClientRect();
    const gx = Math.floor((ev.clientX - rect.left) / CELL);
    const gy = Math.floor((ev.clientY - rect.top) / CELL);
    if (gx < 0 || gy < 0 || gx >= COLS || gy >= ROWS) return;
    if (gameOver || victory) return;
    const existing = towers.find((t) => t.gx === gx && t.gy === gy);
    if (selectedType) {
      const t = TOWERS[selectedType];
      if (pathSet.has(gx + "," + gy)) { elMsg.textContent = "⛔ On ne construit pas sur le chemin !"; return; }
      if (existing) { elMsg.textContent = "⛔ Case déjà occupée !"; return; }
      if (gold < t.cost) { elMsg.textContent = "😅 Pas assez d'or pour la " + t.name + " (" + t.cost + " 🪙)."; return; }
      gold -= t.cost;
      towers.push({ type: selectedType, gx, gy, x: gx * CELL + CELL / 2, y: gy * CELL + CELL / 2, cooldown: 0, ...t });
      updateHud();
      return;
    }
    selectedTower = existing || null;
  }

  document.querySelectorAll(".td-tower").forEach((b) =>
    b.addEventListener("click", () => {
      selectedType = selectedType === b.dataset.tdTower ? null : b.dataset.tdTower;
      selectedTower = null;
      document.querySelectorAll(".td-tower").forEach((x) => x.classList.toggle("active", x.dataset.tdTower === selectedType));
      elMsg.textContent = selectedType
        ? TOWERS[selectedType].name + " sélectionnée — clique sur une case libre."
        : "Pose des tours (hors du chemin) puis lance la vague !";
    }),
  );
  document.getElementById("td-start").addEventListener("click", startWave);
  document.getElementById("td-reset").addEventListener("click", reset);
  canvas.addEventListener("click", onCanvasClick);

  let last = performance.now();
  function loop(nowMs) {
    const now = nowMs / 1000;
    let dt = (nowMs - last) / 1000;
    last = nowMs;
    if (dt > 0.1) dt = 0.1;
    if (canvas.offsetParent !== null && !gameOver && !victory) update(dt, now); // pause si l'onglet est caché
    else if (canvas.offsetParent !== null) updateHud();
    if (canvas.offsetParent !== null) draw(now);
    requestAnimationFrame(loop);
  }
  reset();
  requestAnimationFrame(loop);
};
