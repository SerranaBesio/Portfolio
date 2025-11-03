// ---------------------------------------------------------
// BASE DE DATOS DE PROYECTOS
// ---------------------------------------------------------
const proyectos = [
    {
        id: 2,
        nombre: "E-commerce Blau",
        categoria: "Diseño Web",
        enlaceDemo: "https://rococo-sherbet-d9d436.netlify.app/",
        imagen: "imagenes/blau-mockup.png",
        descripcionCorta: "Blau es un proyecto enfocado en el diseño y desarrollo de un sitio e-commerce responsivo para una marca de accesorios ficticia. El objetivo fue crear una experiencia de compra clara, intuitiva y visualmente atractiva, cuidando tanto la funcionalidad como la estética. El proceso incluyó la definición de la identidad visual de la marca, la selección de una paleta de colores suave y contemporánea, y la creación de una interfaz limpia que resalte los productos sin distraer al usuario. Se priorizó una navegación fluida, un diseño adaptable y una estructura visual equilibrada que refleje los valores de simplicidad, elegancia y sostenibilidad de la marca.",
        cliente: "Proyecto Universidad ORT",
        año: "2025",
        imagenes: ["imagenes/blau-mockup.png", "imagenes/blau-mockup-cel.png"],
    },
    {
        id: 4,
        nombre: "Diseño libro Juceca",
        categoria: "Diseño editorial",
        imagen: "imagenes/juceca.png",
        descripcionCorta: "Proyecto realizado para la materia Diseño 3, basado en la lectura y análisis de la obra de Juceca. A partir de la exploración del autor y su universo literario, se desarrolló un concepto visual bajo el título “Historias para no creer”, que busca reflejar el tono absurdo, humorístico y exagerado característico de sus relatos. El diseño propone un enfoque disparatado y expresivo, con ilustraciones de colores vibrantes y composiciones intencionalmente exageradas, evocando el carácter fantástico y surreal de las historias. La intención principal fue reinterpretar el espíritu lúdico de Juceca y acercar su obra a un público más joven, utilizando un lenguaje visual contemporáneo que combina ironía, dinamismo y frescura.",
        cliente: "Proyecto Universidad ORT",
        año: "2025",
        imagenes: ["imagenes/juceca.png", "imagenes/juceca2.png", "imagenes/marcalibro.png", "imagenes/juceca4.png"],
    },
    {
        id: 6,
        nombre: "Diseño de vinilo",
        categoria: "Identidad visual",
        enlaceDemo: "https://helpful-kashata-a97aab.netlify.app/",
        imagen: "imagenes/rada1.png",
        descripcionCorta: "Proyecto de disco de vinilo realizado en el marco de la materia Diseño 3. Tras analizar canciones de Rubén Rada, se detectaron conceptos recurrentes como amor, felicidad, identidad y candombe. Se eligen estos últimos dos como núcleo al reflejar con mayor fuerza su universo cultural y musical. De esta unión surge el concepto “Origen”, que integra al candombe como raíz rítmica y la identidad como manifestación individual y colectiva. De esta manera, se pone en evidencia su papel central en la obra y vida del artista. Esta reinterpretación propone un cruce entre patrimonio nacional e identidad afro-uruguaya, que celebra a Rada como figura clave del candombe y de la cultura uruguaya contemporánea. Además, el proyecto incluye un desarrollo web que complementa la propuesta visual y sonora.",
        cliente: "Proyecto Universidad ORT",
        año: "2024",
        imagenes: ["imagenes/rada1.png", "imagenes/rada2.png"],
    },
];

// ---------------------------------------------------------
// FUNCIÓN PRINCIPAL: GENERAR PROYECTOS EN LA GRID
// ---------------------------------------------------------
function generarProyectos() {
    const grid = document.getElementById('proyectos-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Mostrar solo los primeros 3 proyectos
    const proyectosLimitados = proyectos.slice(0, 3);

    proyectosLimitados.forEach((proyecto, index) => {
        grid.insertAdjacentHTML('beforeend', `
            <div class="proyecto-card fade-in" 
                 style="animation-delay: ${0.3 + index * 0.1}s" 
                 data-proyecto-id="${proyecto.id}">
                <img src="${proyecto.imagen}" 
                     alt="${proyecto.nombre}" 
                     class="proyecto-imagen">
                <div class="proyecto-info">
                    <h3 class="proyecto-nombre">${proyecto.nombre}</h3>
                </div>
            </div>
        `);
    });

    // Asignar eventos a las tarjetas
    document.querySelectorAll('.proyecto-card').forEach(card => {
        card.addEventListener('click', () => {
            const proyectoId = card.dataset.proyectoId;
            mostrarDetalleProyecto(proyectoId);
        });
    });
}

// ---------------------------------------------------------
// MOSTRAR DETALLE DEL PROYECTO SELECCIONADO
// ---------------------------------------------------------
function mostrarDetalleProyecto(proyectoId) {
    // Ocultar secciones principales
    ['hero', 'proyectos', 'sobre-mi', 'proceso'].forEach(id => {
        const seccion = document.getElementById(id);
        if (seccion) seccion.style.display = 'none';
    });

    // Eliminar detalle anterior si existe
    const detalleExistente = document.getElementById('proyecto-detalle');
    if (detalleExistente) detalleExistente.remove();

    // Crear nueva sección de detalle
    const detalleSection = document.createElement('section');
    detalleSection.id = 'proyecto-detalle';
    detalleSection.innerHTML = generarHTMLDetalle(proyectoId);

    // Insertar antes del contacto
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
        document.body.insertBefore(detalleSection, contactoSection);
    } else {
        document.body.appendChild(detalleSection);
    }

    // Forzar header con fondo activo (blanco)
    const header = document.querySelector('header');
    if (header) header.classList.add('scrolled');

    // Scroll hacia arriba suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------
// INICIALIZAR GRID DE PROYECTOS AL CARGAR EL DOM
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', generarProyectos);
