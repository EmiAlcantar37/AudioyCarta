const TOTAL = 54;
let cartas = [];
let indice = 0;
let timer = null;
let pausado = false;
let audio = new Audio();

const startBtn = document.getElementById("startBtn");
const inicio = document.getElementById("inicio");
const app = document.getElementById("app");
const imagen = document.getElementById("carta");

const reiniciarBtn = document.getElementById("reiniciar");
const pausaBtn = document.getElementById("pausa");
const atrasBtn = document.getElementById("atras");

function mezclar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function iniciar() {
  cartas = Array.from({ length: TOTAL }, (_, i) => i);
  mezclar(cartas);
  indice = 0;
  pausado = false;
  pausaBtn.textContent = "Pausa";
  reiniciarBtn.hidden = true;
  mostrarCarta();
  timer = setInterval(mostrarCarta, 5000);
}

function mostrarCarta() {
  if (pausado) return;

  if (indice >= cartas.length) {
    clearInterval(timer);
    reiniciarBtn.hidden = false;
    return;
  }

  const n = cartas[indice++];
  mostrar(n);
}

function mostrar(n) {
  imagen.src = `cartas/carta${String(n + 1).padStart(2, "0")}.png`;
  audio.pause();
  audio.currentTime = 0;
  audio.src = `sonido/carta${String(n + 1).padStart(2, "0")}.mp3`;
  audio.play();
}

function pausar() {
  pausado = !pausado;
  if (pausado) {
    clearInterval(timer);
    audio.pause();
    pausaBtn.textContent = "Reanudar";
  } else {
    pausaBtn.textContent = "Pausa";
    timer = setInterval(mostrarCarta, 5000);
  }
}

function atras() {
  if (indice <= 1) return;
  clearInterval(timer);
  pausado = true;
  pausaBtn.textContent = "Reanudar";
  indice = indice - 2;
  const n = cartas[indice];
  indice++;
  mostrar(n);
}

startBtn.addEventListener("click", () => {
  inicio.style.display = "none";
  app.style.display = "flex";
  iniciar();
});

reiniciarBtn.addEventListener("click", iniciar);
pausaBtn.addEventListener("click", pausar);
atrasBtn.addEventListener("click", atras);
