const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

const TILE = 20;
const MAZE = [
  "############################",
  "#o............##..........o#",
  "#.####.#####..##..#####.####",
  "#.####.#####..##..#####.####",
  "#..........................#",
  "#.####.##.########.##.####.#",
  "#......##....##....##......#",
  "######.##### ## #####.######",
  "     #.##          ##.#     ",
  "######.## ###--### ##.######",
  "      .   #......#   .      ",
  "######.## ######## ##.######",
  "     #.##          ##.#     ",
  "######.## ######## ##.######",
  "#............##............#",
  "#.####.#####.##.#####.####.#",
  "#o..##................##..o#",
  "###.##.##.########.##.##.###",
  "#......##....##....##......#",
  "#.##########.##.##########.#",
  "#..........................#",
  "############################",
];

const ROWS = MAZE.length;
const COLS = MAZE[0].length;
canvas.width = COLS * TILE;
canvas.height = ROWS * TILE;

const DIRS = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];
const INPUT_DIRS = {
  ArrowUp: { x: 0, y: -1 },
  KeyW: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  KeyS: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  KeyA: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  KeyD: { x: 1, y: 0 },
};

const SCATTER_CHASE_STEPS = [
  { mode: "scatter", seconds: 7 },
  { mode: "chase", seconds: 20 },
  { mode: "scatter", seconds: 7 },
  { mode: "chase", seconds: 20 },
  { mode: "scatter", seconds: 5 },
  { mode: "chase", seconds: 9999 },
];

let grid = [];
let score = 0;
let lives = 3;
let pelletsLeft = 0;
let gameOver = false;
let modeClock = 0;
let modeStep = 0;
let frightenedMs = 0;
let ghostEatChain = 0;
let pauseMs = 0;
let lastTs = 0;
let pacmanMouth = 0;

let player;
let ghosts = [];

const spawn = {
  pacman: { c: 14, r: 16 },
  ghostDoor: { c: 14, r: 9 },
  blinky: { c: 14, r: 8 },
  pinky: { c: 13, r: 10 },
  inky: { c: 14, r: 10 },
  clyde: { c: 15, r: 10 },
};

const scatterTargets = {
  blinky: { c: COLS - 2, r: 1 },
  pinky: { c: 1, r: 1 },
  inky: { c: COLS - 2, r: ROWS - 2 },
  clyde: { c: 1, r: ROWS - 2 },
};

function toPixel(c, r) {
  return { x: c * TILE + TILE / 2, y: r * TILE + TILE / 2 };
}

function tileAt(c, r) {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) {
    return "#";
  }
  return grid[r][c];
}

function isWalkable(c, r, forGhost = false) {
  const t = tileAt(c, r);
  if (t === "#" || t === " ") {
    return false;
  }
  if (t === "-" && !forGhost) {
    return false;
  }
  return true;
}

function wrapTunnel(entity) {
  if (entity.x < -TILE / 2) {
    entity.x = canvas.width + TILE / 2;
  } else if (entity.x > canvas.width + TILE / 2) {
    entity.x = -TILE / 2;
  }
}

function aligned(entity) {
  const c = (entity.x - TILE / 2) / TILE;
  const r = (entity.y - TILE / 2) / TILE;
  return Math.abs(c - Math.round(c)) < 0.06 && Math.abs(r - Math.round(r)) < 0.06;
}

function entityCell(entity) {
  return {
    c: Math.round((entity.x - TILE / 2) / TILE),
    r: Math.round((entity.y - TILE / 2) / TILE),
  };
}

function canMove(entity, dir, forGhost = false) {
  if (dir.x === 0 && dir.y === 0) {
    return true;
  }
  const { c, r } = entityCell(entity);
  return isWalkable(c + dir.x, r + dir.y, forGhost);
}

function moveOnGrid(entity, speed, forGhost = false) {
  if (aligned(entity)) {
    if (canMove(entity, entity.nextDir, forGhost)) {
      entity.dir = { ...entity.nextDir };
    }
    if (!canMove(entity, entity.dir, forGhost)) {
      entity.dir = { x: 0, y: 0 };
    }
    const { c, r } = entityCell(entity);
    const snap = toPixel(c, r);
    entity.x = snap.x;
    entity.y = snap.y;
  }

  entity.x += entity.dir.x * speed;
  entity.y += entity.dir.y * speed;
  wrapTunnel(entity);
}

function resetLevelGrid() {
  grid = MAZE.map((row) => row.split(""));
  pelletsLeft = 0;
  for (const row of grid) {
    for (const t of row) {
      if (t === "." || t === "o") {
        pelletsLeft += 1;
      }
    }
  }
}

function createGhost(name, color, start, releaseMs) {
  const p = toPixel(start.c, start.r);
  return {
    name,
    color,
    x: p.x,
    y: p.y,
    dir: { x: 0, y: -1 },
    nextDir: { x: 0, y: -1 },
    state: "home",
    releaseMs,
    released: name === "blinky",
  };
}

function resetActors() {
  const p = toPixel(spawn.pacman.c, spawn.pacman.r);
  player = {
    x: p.x,
    y: p.y,
    dir: { x: -1, y: 0 },
    nextDir: { x: -1, y: 0 },
    speed: 1.85,
  };

  ghosts = [
    createGhost("blinky", "#ff3b3b", spawn.blinky, 0),
    createGhost("pinky", "#ff9bf6", spawn.pinky, 2000),
    createGhost("inky", "#4bd9ff", spawn.inky, 5500),
    createGhost("clyde", "#ffb347", spawn.clyde, 9000),
  ];
}

function resetRound() {
  modeClock = 0;
  modeStep = 0;
  frightenedMs = 0;
  ghostEatChain = 0;
  pauseMs = 900;
  messageEl.textContent = "Ready!";
  resetActors();
}

function resetGame() {
  score = 0;
  lives = 3;
  gameOver = false;
  messageEl.textContent = "";
  resetLevelGrid();
  resetRound();
  updateHud();
}

function updateHud() {
  scoreEl.textContent = String(score);
  livesEl.textContent = String(lives);
}

function currentGlobalMode() {
  if (frightenedMs > 0) {
    return "frightened";
  }
  return SCATTER_CHASE_STEPS[modeStep].mode;
}

function updateModeTimers(dt) {
  if (frightenedMs > 0) {
    frightenedMs -= dt;
    if (frightenedMs <= 0) {
      frightenedMs = 0;
      ghostEatChain = 0;
      for (const g of ghosts) {
        if (g.state === "frightened") {
          g.state = "normal";
        }
      }
    }
  }

  modeClock += dt / 1000;
  while (modeStep < SCATTER_CHASE_STEPS.length - 1 && modeClock > SCATTER_CHASE_STEPS[modeStep].seconds) {
    modeClock -= SCATTER_CHASE_STEPS[modeStep].seconds;
    modeStep += 1;
    for (const g of ghosts) {
      if (g.state !== "eyes" && g.released) {
        g.dir = { x: -g.dir.x, y: -g.dir.y };
      }
    }
  }
}

function collectPellet() {
  const { c, r } = entityCell(player);
  const t = tileAt(c, r);
  if (t !== "." && t !== "o") {
    return;
  }
  grid[r][c] = "·";
  pelletsLeft -= 1;
  score += t === "o" ? 50 : 10;
  if (t === "o") {
    frightenedMs = 7000;
    ghostEatChain = 0;
    for (const g of ghosts) {
      if (g.state !== "eyes" && g.released) {
        g.state = "frightened";
        g.dir = { x: -g.dir.x, y: -g.dir.y };
      }
    }
  }
  if (pelletsLeft <= 0) {
    score += 500;
    resetLevelGrid();
    resetRound();
  }
  updateHud();
}

function distanceSq(a, b) {
  const dx = a.c - b.c;
  const dy = a.r - b.r;
  return dx * dx + dy * dy;
}

function chooseGhostDirection(ghost) {
  const mode = currentGlobalMode();
  const pos = entityCell(ghost);

  if (!ghost.released) {
    ghost.releaseMs -= 16;
    if (ghost.releaseMs <= 0) {
      ghost.released = true;
      ghost.state = frightenedMs > 0 ? "frightened" : "normal";
      ghost.nextDir = { x: 0, y: -1 };
    } else {
      ghost.nextDir = ghost.dir.y <= 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      return;
    }
  }

  if (ghost.state === "home") {
    return;
  }

  const options = DIRS.filter((dir) => {
    if (dir.x === -ghost.dir.x && dir.y === -ghost.dir.y) {
      return false;
    }
    return isWalkable(pos.c + dir.x, pos.r + dir.y, true);
  });
  const fallback = DIRS.filter((dir) => isWalkable(pos.c + dir.x, pos.r + dir.y, true));
  const dirs = options.length ? options : fallback;
  if (!dirs.length) {
    return;
  }

  if (ghost.state === "frightened") {
    ghost.nextDir = dirs[Math.floor(Math.random() * dirs.length)];
    return;
  }

  let target;
  if (ghost.state === "eyes") {
    target = spawn.ghostDoor;
  } else if (mode === "scatter") {
    target = scatterTargets[ghost.name];
  } else if (ghost.name === "blinky") {
    target = entityCell(player);
  } else if (ghost.name === "pinky") {
    const p = entityCell(player);
    target = { c: p.c + player.dir.x * 4, r: p.r + player.dir.y * 4 };
  } else if (ghost.name === "inky") {
    const p = entityCell(player);
    const b = entityCell(ghosts[0]);
    const ahead = { c: p.c + player.dir.x * 2, r: p.r + player.dir.y * 2 };
    target = { c: ahead.c * 2 - b.c, r: ahead.r * 2 - b.r };
  } else {
    const p = entityCell(player);
    if (distanceSq(pos, p) > 64) {
      target = p;
    } else {
      target = scatterTargets.clyde;
    }
  }

  let best = dirs[0];
  let bestD = Number.POSITIVE_INFINITY;
  for (const dir of dirs) {
    const n = { c: pos.c + dir.x, r: pos.r + dir.y };
    const d = distanceSq(n, target);
    if (d < bestD) {
      bestD = d;
      best = dir;
    }
  }
  ghost.nextDir = best;
}

function updatePlayer() {
  const speed = frightenedMs > 0 ? 1.95 : 1.85;
  moveOnGrid(player, speed, false);
  collectPellet();
}

function updateGhosts() {
  for (const ghost of ghosts) {
    if (aligned(ghost)) {
      chooseGhostDirection(ghost);
    }
    const speed =
      ghost.state === "eyes" ? 2.8 : ghost.state === "frightened" ? 1.25 : 1.75;
    moveOnGrid(ghost, speed, true);

    if (ghost.state === "eyes") {
      const pos = entityCell(ghost);
      if (pos.c === spawn.ghostDoor.c && pos.r === spawn.ghostDoor.r) {
        ghost.state = frightenedMs > 0 ? "frightened" : "normal";
      }
    }
  }
}

function loseLife() {
  lives -= 1;
  updateHud();
  if (lives <= 0) {
    gameOver = true;
    messageEl.textContent = "Game Over";
    return;
  }
  resetRound();
}

function handleCollisions() {
  for (const g of ghosts) {
    const dx = player.x - g.x;
    const dy = player.y - g.y;
    const hit = dx * dx + dy * dy < (TILE * 0.7) ** 2;
    if (!hit) {
      continue;
    }

    if (g.state === "frightened") {
      g.state = "eyes";
      g.dir = { x: 0, y: -1 };
      g.nextDir = { x: 0, y: -1 };
      score += [200, 400, 800, 1600][Math.min(ghostEatChain, 3)];
      ghostEatChain += 1;
      updateHud();
      pauseMs = 200;
      return;
    }

    if (g.state !== "eyes") {
      loseLife();
      return;
    }
  }
}

function drawPacman() {
  const phase = Math.abs(Math.sin(pacmanMouth * 0.22));
  const open = phase * 0.8;
  const ang = Math.atan2(player.dir.y, player.dir.x);
  ctx.fillStyle = "#ffd400";
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.arc(player.x, player.y, TILE * 0.45, ang + open, ang - open + Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawGhost(g) {
  const radius = TILE * 0.42;
  const left = g.x - radius;
  const top = g.y - radius;
  const width = radius * 2;
  const wave = (Math.floor(performance.now() / 120) % 2) * 2;

  let color = g.color;
  if (g.state === "frightened") {
    const flash = frightenedMs < 2000 && Math.floor(performance.now() / 140) % 2 === 0;
    color = flash ? "#f5f5f5" : "#224dff";
  } else if (g.state === "eyes") {
    color = "#dfe6ff";
  }

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(g.x, g.y - 1, radius, Math.PI, 0);
  ctx.lineTo(left + width, top + radius + 8);
  ctx.lineTo(left + width - 6, top + radius + 4 + wave);
  ctx.lineTo(left + width - 12, top + radius + 8);
  ctx.lineTo(left + width - 18, top + radius + 4 + wave);
  ctx.lineTo(left + width - 24, top + radius + 8);
  ctx.lineTo(left, top + radius + 8);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(g.x - 6, g.y - 2, 4, 0, Math.PI * 2);
  ctx.arc(g.x + 6, g.y - 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1b1b1b";
  ctx.beginPath();
  ctx.arc(g.x - 6 + g.dir.x * 1.5, g.y - 2 + g.dir.y * 1.5, 2, 0, Math.PI * 2);
  ctx.arc(g.x + 6 + g.dir.x * 1.5, g.y - 2 + g.dir.y * 1.5, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawMaze() {
  ctx.fillStyle = "#060d22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const t = grid[r][c];
      const x = c * TILE;
      const y = r * TILE;
      if (t === "#") {
        ctx.fillStyle = "#1840a6";
        ctx.fillRect(x, y, TILE, TILE);
      } else if (t === ".") {
        ctx.fillStyle = "#ffd6a1";
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (t === "o") {
        ctx.fillStyle = "#ffd6a1";
        const pulse = 4 + Math.sin(performance.now() * 0.015) * 1.3;
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, pulse, 0, Math.PI * 2);
        ctx.fill();
      } else if (t === "-") {
        ctx.fillStyle = "#b0c1ff";
        ctx.fillRect(x + 2, y + TILE / 2 - 1, TILE - 4, 2);
      }
    }
  }
}

function update(dt) {
  if (gameOver) {
    return;
  }
  if (pauseMs > 0) {
    pauseMs -= dt;
    if (pauseMs <= 0 && messageEl.textContent === "Ready!") {
      messageEl.textContent = "";
    }
    return;
  }

  updateModeTimers(dt);
  updatePlayer();
  updateGhosts();
  handleCollisions();
  pacmanMouth += dt * 0.04;
}

function render() {
  drawMaze();
  drawPacman();
  ghosts.forEach(drawGhost);
}

function tick(ts) {
  const dt = lastTs ? Math.min(34, ts - lastTs) : 16;
  lastTs = ts;
  update(dt);
  render();
  requestAnimationFrame(tick);
}

document.addEventListener("keydown", (e) => {
  const dir = INPUT_DIRS[e.code];
  if (!dir || gameOver) {
    return;
  }
  player.nextDir = dir;
});

restartBtn.addEventListener("click", () => {
  lastTs = 0;
  resetGame();
});

resetGame();
requestAnimationFrame(tick);
