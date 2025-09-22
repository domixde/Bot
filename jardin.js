// Mensajes únicos por flor
const messages = [
  " Una flor para ti, Joshi, pq eres bot ✨",
  " Como este jardín me agradas, bn bonito",
  " Gracias por tus dibujito, me gustó aunque no sea una girlxd",
  " Me gusta conversar contigo c:",
  " Tqm, bot 🌸",
  " Ojalá algún día veamos flores juntos en persona, o las estrellas que te conté ✨",
];

const garden = document.getElementById("garden");
const overlay = document.getElementById("message-overlay");
const messageText = document.getElementById("message-text");
const closeButton = document.getElementById("close-button");

const numFlowers = 12;
const flowerEmojis = ["🌸","🌼","🌻","🌷","🌺","💐"];
const placedFlowers = [];

function isTooClose(x, y, minDist) {
  return placedFlowers.some(f => {
    const dx = f.x - x;
    const dy = f.y - y;
    return Math.sqrt(dx*dx + dy*dy) < minDist;
  });
}

for (let i = 0; i < numFlowers; i++) {
  let x, y;
  do {
    x = Math.random() * 90;
    y = 65 + Math.random() * 30;
  } while (isTooClose(x, y, 8));

  const flower = document.createElement("div");
  flower.classList.add("flower");
  flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
  flower.style.left = x + "%";
  flower.style.top = y + "%";
  flower.dataset.index = i % messages.length;

  flower.addEventListener("click", () => {
    messageText.textContent = messages[flower.dataset.index];
    overlay.classList.add("show");
  });

  garden.appendChild(flower);
  placedFlowers.push({ x, y });
}

closeButton.addEventListener("click", () => overlay.classList.remove("show"));

//Galería
const treeSvg = document.querySelector("#tree svg"); 
const galleryOverlay = document.getElementById("gallery-overlay");
const closeGallery = document.getElementById("close-gallery");

treeSvg.addEventListener("click", () => {
  galleryOverlay.classList.add("show");
});

// cerrar galería
closeGallery.addEventListener("click", () => {
  galleryOverlay.classList.remove("show");
});

//NUBES
const clouds = document.getElementById("clouds");
const cloudMessages = [
  "☁️ Toca una flor...",
  "☁️ Joshi bot",
  "☁️ Un jardín ♡",
  "☁️ Pq estás lejos",
  "☁️ El árbooool"
];
function createCloud(text) {
  const cloud = document.createElement("div");
  cloud.className = "cloud";
  cloud.style.top = (10 + Math.random() * 20) + "%";
  cloud.style.animationDuration = (25 + Math.random() * 15) + "s";
  cloud.innerHTML = `
    <svg viewBox="0 0 200 100">
      <ellipse cx="60" cy="60" rx="60" ry="30" fill="white"/>
      <ellipse cx="110" cy="50" rx="50" ry="30" fill="white"/>
      <ellipse cx="150" cy="65" rx="40" ry="25" fill="white"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle">${text}</text>
    </svg>
  `;
  clouds.appendChild(cloud);
  setTimeout(() => cloud.remove(), 45000);
}
createCloud(cloudMessages[0]);
let ci = 1;
setInterval(() => {
  createCloud(cloudMessages[ci % cloudMessages.length]);
  ci++;
}, 6000);

//PÉTALOS
const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");
let petals = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    size: 8 + Math.random() * 8,
    speed: 1 + Math.random() * 2,
    drift: (Math.random() - 0.5) * 2,
    color: Math.random() > 0.5 ? "rgba(255,182,193,0.8)" : "rgba(255,160,122,0.8)"
  };
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (petals.length < 40 && Math.random() < 0.3) {
    petals.push(createPetal());
  }
  petals.forEach((p, i) => {
    p.y += p.speed;
    p.x += p.drift;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.size, p.size/2, Math.PI/4, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.y > canvas.height + 20) petals.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();

//Estrellas prematuras
const sky = document.getElementById("sky");

function createStar() {
  const star = document.createElement("div");
  star.className = "star";
  star.style.top = Math.random() * 60 + "%";  
  star.style.left = Math.random() * 100 + "%";
  star.style.animationDuration = (2 + Math.random() * 3) + "s";
  sky.appendChild(star);
}

for (let i = 0; i < 20; i++) {
  createStar();
}

