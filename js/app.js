/* =========================================
   Spider-Man Web - JavaScript PRO (con imágenes)
   - Modo claro/oscuro (guardado)
   - Modal profesional para villanos (con imagen)
   - Botón "Arriba"
========================================= */


/* =========================
   ESTILO DE PÁGINA (3 modos) - LIMPIO Y SIN BUGS
   Orden: Claro -> Oscuro -> Spider-Man (en bucle)
   - Claro: body.light
   - Oscuro: sin clase (normal)
   - Spider-Man: body.spiderman
   El botón NO cambia de texto nunca.
========================= */

const btnModo = document.getElementById("btnModo");
btnModo.textContent = "Estilo de página"; // ✅ fijo

const MODOS = ["light", "dark", "spiderman"];
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'eLz5AjuY6os', // ID del video: Spider-Man Theme
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'loop': 1,
            'playlist': 'eLz5AjuY6os'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Intentar reproducir automáticamente
    event.target.playVideo();
    
    // TRUCO: Si el navegador lo bloquea, se activará al primer clic que el usuario haga en cualquier parte
    document.body.addEventListener('click', () => {
        event.target.playVideo();
    }, { once: true });
}


function modoActual() {
  if (document.body.classList.contains("spiderman")) return "spiderman";
  if (document.body.classList.contains("light")) return "light";
  return "dark";
}

function aplicarModo(modo) {
  // Limpia
  document.body.classList.remove("light", "spiderman");

  // Aplica
  if (modo === "light") document.body.classList.add("light");
  if (modo === "spiderman") document.body.classList.add("spiderman");

  // Guarda
  localStorage.setItem("modo", modo);

  // ✅ vuelve a dejar fijo el texto (por si otro código intenta cambiarlo)
  btnModo.textContent = "Estilo de página";
}

function cargarModo() {
  const guardado = localStorage.getItem("modo");
  const inicial = MODOS.includes(guardado) ? guardado : "light"; // ✅ arranca en claro
  aplicarModo(inicial);
}

btnModo.addEventListener("click", () => {
  const actual = modoActual();
  const idx = MODOS.indexOf(actual);
  const siguiente = MODOS[(idx + 1) % MODOS.length];
  aplicarModo(siguiente);
});

cargarModo();



/* =========================
   2) BOTÓN ARRIBA
========================= */

const btnScrollTop = document.getElementById("btnScrollTop");

btnScrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================
   3) MODAL PROFESIONAL (CON IMAGEN)
========================= */

const modalOverlay = document.getElementById("modalOverlay");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const btnCerrarModal2 = document.getElementById("btnCerrarModal2");

const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

// Botones de villanos
const botonesVillanos = document.querySelectorAll(".btnVillano");

/* Datos completos (texto + imagen) */
const detallesVillanos = {
  "Green Goblin": {
    titulo: "Green Goblin",
    descripcion:
      "Norman Osborn. Uno de los enemigos más personales y peligrosos de Spider-Man. Usa bombas, un planeador y tecnología avanzada. Es impredecible y brutal.",
    img: "imagenes/villanos/Green Goblin.png",
  },
  "Doctor Octopus": {
    titulo: "Doctor Octopus",
    descripcion:
      "Otto Octavius. Científico brillante con brazos mecánicos gigantes. Su mayor peligro es su inteligencia: siempre tiene un plan y es un rival estratégico.",
    img: "imagenes/villanos/Doctor Octopus.png",
  },
  Venom: {
    titulo: "Venom",
    descripcion:
      "Un simbionte alienígena que se une a un humano y lo potencia. Es fuerte, rápido, resistente y puede anular el sentido arácnido. Un enemigo aterrador.",
    img: "imagenes/villanos/Venom.png",
  },
  Sandman: {
    titulo: "Sandman",
    descripcion:
      "Flint Marko. Puede convertir su cuerpo en arena, hacerse gigante y crear armas con su forma. Es muy difícil de derrotar por su resistencia.",
    img: "imagenes/villanos/Sandman.png",
  },
};

function abrirModal(villanoKey) {
  const data = detallesVillanos[villanoKey];

  // Seguridad por si falta algo
  if (!data) {
    modalTitle.textContent = "Villano";
    modalDesc.textContent = "No hay información disponible para este villano.";
  } else {
    modalTitle.textContent = data.titulo;
    modalDesc.textContent = data.descripcion;
  }

  // Si ya existe una imagen previa, la eliminamos
  const imgAnterior = document.querySelector(".modal__imgBox");
  if (imgAnterior) imgAnterior.remove();

  // Si existe imagen, la creamos y la insertamos antes de la descripción
  if (data && data.img) {
    const imgBox = document.createElement("div");
    imgBox.classList.add("modal__imgBox");

    const img = document.createElement("img");
    img.classList.add("modal__img");
    img.src = data.img;
    img.alt = data.titulo;

    imgBox.appendChild(img);

    // Insertar la imagen antes de la descripción
    modalDesc.parentNode.insertBefore(imgBox, modalDesc);
  }

  modalOverlay.classList.add("active");
  modalOverlay.setAttribute("aria-hidden", "false");

  // Evita scroll del body
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  modalOverlay.classList.remove("active");
  modalOverlay.setAttribute("aria-hidden", "true");

  // Devuelve scroll
  document.body.style.overflow = "";
}

// Abrir modal al presionar botones
botonesVillanos.forEach((boton) => {
  boton.addEventListener("click", () => {
    const villanoKey = boton.dataset.villain;
    abrirModal(villanoKey);
  });
});

// Cerrar modal con botones
btnCerrarModal.addEventListener("click", cerrarModal);
btnCerrarModal2.addEventListener("click", cerrarModal);

// Cerrar modal al hacer click fuera del modal
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    cerrarModal();
  }
});

// Cerrar modal con tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    cerrarModal();
  }
});

/* =========================
   4) MENSAJE EN CONSOLA
========================= */

console.log("Spider-Man web PRO (con imágenes) lista ✅");
