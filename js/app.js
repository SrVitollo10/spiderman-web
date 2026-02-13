/* =========================================
   Spider-Man Web - JavaScript PRO (con imágenes)
   - Modo claro/oscuro (guardado)
   - Modal profesional para villanos (con imagen)
   - Botón "Arriba"
========================================= */

/* =========================
   1) MODO CLARO / OSCURO
========================= */

const btnModo = document.getElementById("btnModo");

function guardarModo(modo) {
  localStorage.setItem("modo", modo);
}

function cargarModo() {
  const modoGuardado = localStorage.getItem("modo");

  if (modoGuardado === "light") {
    document.body.classList.add("light");
    btnModo.textContent = "Modo oscuro";
  } else {
    document.body.classList.remove("light");
    btnModo.textContent = "Modo claro";
  }
}

btnModo.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    btnModo.textContent = "Modo oscuro";
    guardarModo("light");
  } else {
    btnModo.textContent = "Modo claro";
    guardarModo("dark");
  }
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
