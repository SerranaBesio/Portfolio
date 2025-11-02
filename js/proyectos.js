// Base de datos con info para lista y detalle
const proyectos = [
  
  {
    id: 2,
    nombre: "E-commerce Blau",
    enlaceDemo:"https://rococo-sherbet-d9d436.netlify.app/",
    categoria: "Diseño Web",
    descripcion:
      "Desarrollo de identidad visual completa para marca de moda sostenible.",
    imagen: "imagenes/blau-mockup.png",

    // Info extendida
    descripcionCorta:
      "Desarrollo de identidad visual completa para marca de moda sostenible.",

    cliente: "Proyecto Universidad ORT",
    año: "2025",

    imagenes: ["imagenes/blau-mockup.png", "imagenes/blau-mockup-cel.png"],
  },
   {
    id: 4,
    nombre: "Diseño libro juseca",
    categoria: "Diseño editorial",
    descripcion:
      "Diseño de interfaz y experiencia de usuario para aplicación de delivery.",
    imagen: "imagenes/juceca.png",

    // Info extendida
    descripcionCorta:
      "Diseño de interfaz y experiencia de usuario para aplicación de delivery.",

    cliente: "Proyecto Universidad ORT",
    año: "2025",
    imagenes: ["proyecto3-1.jpg", "proyecto3-2.jpg", "proyecto3-3.jpg"],
  },
 
  {
    id: 6,
    nombre: "Rediseño de vinilo de Rada",
    categoria: "Identidad visual",
    descripcion:
      "Diseño de interfaz y experiencia de usuario para aplicación de delivery.",
    imagen: "imagenes/mockup disco.png",

    // Info extendida
    descripcionCorta:
      "Diseño de interfaz y experiencia de usuario para aplicación de delivery.",

    cliente: "Proyecto Universidad ORT",
    año: "2024",
    imagenes: ["imagenes/rada.png", "proyecto3-2.jpg", "proyecto3-3.jpg"],
  },
];

// Función para generar proyectos en la grid principal - VERSIÓN MINIMALISTA
function generarProyectos() {
    const grid = document.getElementById("proyectos-grid");
    grid.innerHTML = ""; // Limpiar antes de generar
  
    // Tomar solo los primeros 3 proyectos
    const proyectosLimitados = proyectos.slice(0, 3);
  
    proyectosLimitados.forEach((proyecto, index) => {
      const proyectoHTML = `
              <div class="proyecto-card fade-in" style="animation-delay: ${
                0.3 + index * 0.1
              }s" data-proyecto-id="${proyecto.id}">
                  <img src="${proyecto.imagen}" alt="${proyecto.nombre}" class="proyecto-imagen">
                  <div class="proyecto-info">
                      <h3 class="proyecto-nombre">${proyecto.nombre}</h3>
                  </div>
              </div>
          `;
  
      grid.innerHTML += proyectoHTML;
    });
  
    // Agregar event listeners a las cards
    document.querySelectorAll(".proyecto-card").forEach((card) => {
      card.addEventListener("click", function () {
        const proyectoId = this.getAttribute("data-proyecto-id");
        mostrarDetalleProyecto(proyectoId);
      });
    });
  }
function generarHTMLDetalle(proyectoId) {
  const proyecto = proyectos.find((p) => p.id == proyectoId);
  const proyectoIndex = proyectos.findIndex((p) => p.id == proyectoId);
  const proyectoAnterior = proyectos[proyectoIndex - 1];
  const proyectoSiguiente = proyectos[proyectoIndex + 1];

  return `
        <div class="project-detail-grid">
            <!-- Fila 1: Título y Enlace -->
            <div class="project-title-section">
                <h1 class="project-hero-title">${proyecto.nombre}</h1>
                <div class="project-link-section">
                    <a href="${
                      proyecto.enlaceDemo
                    }" target="_blank" class="btn btn-primary">
                        🌐 Visitar sitio web
                    </a>
                </div>
            </div>

            <!-- Fila 2: Imágenes 1 y 2 -->
            <div class="image-grid-item">
                <img src="${proyecto.imagenes[0]}" alt="${
    proyecto.nombre
  } - Imagen 1" class="project-image-large">
            </div>
            <div class="image-grid-item">
                <img src="${proyecto.imagenes[1]}" alt="${
    proyecto.nombre
  } - Imagen 2" class="project-image-large">
            </div>

            <!-- Fila 3: Imágenes 3 y 4 -->
            <div class="image-grid-item">
                <img src="${proyecto.imagenes[2]}" alt="${
    proyecto.nombre
  } - Imagen 3" class="project-image-large">
            </div>
            <div class="image-grid-item">
                <img src="${proyecto.imagenes[3]}" alt="${
    proyecto.nombre
  } - Imagen 4" class="project-image-large">
            </div>

            <!-- Fila 4: Descripción del proyecto (ancho completo) -->
            <div class="project-description-full">
                <h3>Proyecto</h3>
                ${
                  proyecto.descripcionCompleta ||
                  proyecto.descripcionCompleta ||
                  `
                    <p>${proyecto.descripcionCorta || proyecto.descripcion}</p>
             
                `
                }
            </div>

            <!-- Fila 5: Navegación entre proyectos -->
            <div class="project-navigation">
                ${
                  proyectoAnterior
                    ? `
                    <button class="nav-btn prev" onclick="mostrarDetalleProyecto(${proyectoAnterior.id})">
                        Anterior
                    </button>
                `
                    : "<div></div>"
                }
                
                ${
                  proyectoSiguiente
                    ? `
                    <button class="nav-btn next" onclick="mostrarDetalleProyecto(${proyectoSiguiente.id})">
                        Siguiente
                    </button>
                `
                    : "<div></div>"
                }
            </div>

            <!-- Fila 6: Botón volver -->
            <div class="project-back-section">
                <button class="btn btn-secondary" onclick="volverAProyectos()">
                    ← Volver a todos los proyectos
                </button>
            </div>
        </div>
    `;
}
function cambiarImagenPrincipal(proyectoId, imagenSrc) {
  const imagenPrincipal = document.getElementById(
    `imagen-principal-${proyectoId}`
  );
  const miniaturas = document.querySelectorAll(
    `.gallery-thumbnails .thumbnail`
  );

  // Cambiar imagen principal
  imagenPrincipal.src = imagenSrc;

  // Actualizar miniaturas activas
  miniaturas.forEach((miniatura) => {
    miniatura.classList.remove("active");
    if (miniatura.querySelector("img").src.includes(imagenSrc)) {
      miniatura.classList.add("active");
    }
  });
}

// Función para mostrar el detalle del proyecto
function mostrarDetalleProyecto(proyectoId) {
  // Ocultar secciones principales
  document.getElementById("hero").style.display = "none";
  document.getElementById("proyectos").style.display = "none";

  // Crear y mostrar sección de detalle
  const detalleHTML = generarHTMLDetalle(proyectoId);

  // Si ya existe la sección de detalle, removerla
  const existingDetalle = document.getElementById("proyecto-detalle");
  if (existingDetalle) {
    existingDetalle.remove();
  }

  // Crear nueva sección de detalle
  const detalleSection = document.createElement("section");
  detalleSection.id = "proyecto-detalle";
  detalleSection.innerHTML = detalleHTML;

  // Insertar después del header
  document.body.insertBefore(detalleSection, document.getElementById("hero"));

  // Scroll to top
  window.scrollTo(0, 0);
}

// Función para navegar a la página principal
function navegarAInicio() {
  const detalleSection = document.getElementById("proyecto-detalle");
  if (detalleSection) {
    detalleSection.remove();
  }

  // Mostrar secciones principales
  document.getElementById("hero").style.display = "flex";
  document.getElementById("proyectos").style.display = "block";

  // Scroll to top
  window.scrollTo(0, 0);
}

// Función para volver a proyectos
function volverAProyectos() {
  navegarAInicio();

  // Hacer scroll a la sección de proyectos
  setTimeout(() => {
    const proyectosSection = document.getElementById("proyectos");
    if (proyectosSection) {
      proyectosSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
}

// Función para manejar clicks en el header
function configurarNavegacionHeader() {
  // Logo - llevar a inicio
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      navegarAInicio();
    });
  }

  // Enlaces del menú - llevar a inicio y luego a la sección
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute("href").replace("#", "");

      // Primero volver al inicio
      navegarAInicio();

      // Después de un pequeño delay, hacer scroll a la sección
      setTimeout(() => {
        const section = document.getElementById(targetSection);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    });
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  configurarNavegacionHeader();
  generarProyectos();
});



