// Función para manejar clicks en el header CON SCROLL SUAVE Y OFFSET
function configurarNavegacionHeader() {
    // Logo - llevar a inicio
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            navegarAInicio();
        });
    }
    
    // Enlaces del menú - scroll suave con offset
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSectionId = this.getAttribute('href').replace('#', '');
            
            // Primero volver al inicio si estamos en detalle de proyecto
            navegarAInicio();
            
            // Después de un pequeño delay, hacer scroll a la sección CON OFFSET
            setTimeout(() => {
                scrollASeccionConOffset(targetSectionId);
            }, 100);
        });
    });
    
    // Botón "Ver proyectos" del hero - scroll suave con offset
    const heroBtn = document.querySelector('.hero-btn a');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSectionId = this.getAttribute('href').replace('#', '');
            scrollASeccionConOffset(targetSectionId);
        });
    }
}

// Función para scroll suave con offset del header
function scrollASeccionConOffset(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80; // Fallback de 80px
        const offsetPosition = section.offsetTop - headerHeight - 20; // 20px extra de espacio
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Función para navegar a la página principal
function navegarAInicio() {
    const detalleSection = document.getElementById('proyecto-detalle');
    if (detalleSection) {
        detalleSection.remove();
    }
    
    // Mostrar secciones principales
    document.getElementById('hero').style.display = 'flex';
    document.getElementById('proyectos').style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Función para volver a proyectos desde el detalle
function volverAProyectos() {
    navegarAInicio();
    
    // Hacer scroll a la sección de proyectos con offset
    setTimeout(() => {
        scrollASeccionConOffset('proyectos');
    }, 100);
}

// Función para generar proyectos en la grid principal - VERSIÓN MINIMALISTA
function generarProyectos() {
    const grid = document.getElementById('proyectos-grid');
    grid.innerHTML = ''; // Limpiar antes de generar
    
    proyectos.forEach((proyecto, index) => {
        const proyectoHTML = `
            <div class="proyecto-card" data-proyecto-id="${proyecto.id}">
                <img src="${proyecto.imagen}" alt="${proyecto.nombre}" class="proyecto-imagen">
                <div class="proyecto-info">
                    <h3 class="proyecto-nombre">${proyecto.nombre}</h3>
                </div>
            </div>
        `;
        
        grid.innerHTML += proyectoHTML;
    });

    // Agregar event listeners a las cards
    document.querySelectorAll('.proyecto-card').forEach(card => {
        card.addEventListener('click', function() {
            const proyectoId = this.getAttribute('data-proyecto-id');
            mostrarDetalleProyecto(proyectoId);
        });
    });
}

// Función para mostrar el detalle del proyecto
function mostrarDetalleProyecto(proyectoId) {
    // Ocultar secciones principales
    document.getElementById('hero').style.display = 'none';
    document.getElementById('proyectos').style.display = 'none';
    
    // Crear y mostrar sección de detalle
    const detalleHTML = generarHTMLDetalle(proyectoId);
    
    // Si ya existe la sección de detalle, removerla
    const existingDetalle = document.getElementById('proyecto-detalle');
    if (existingDetalle) {
        existingDetalle.remove();
    }
    
    // Crear nueva sección de detalle
    const detalleSection = document.createElement('section');
    detalleSection.id = 'proyecto-detalle';
    detalleSection.innerHTML = detalleHTML;
    
    // Insertar después del header
    document.body.insertBefore(detalleSection, document.getElementById('hero'));
    
    // Forzar header blanco en detalle
    const header = document.querySelector('header');
    header.classList.add('scrolled');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    configurarNavegacionHeader();
    generarProyectos();
    
    // También inicializar el efecto de scroll del header si lo tienes
    if (typeof manejarScrollHeader === 'function') {
        manejarScrollHeader();
    }
});