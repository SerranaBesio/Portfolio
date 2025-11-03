// =========================================================
// DETALLE DE PROYECTOS 
// =========================================================

// Generar el HTML del detalle
function generarHTMLDetalle(proyectoId) {
    const proyecto = proyectos.find((p) => p.id == proyectoId);
    const proyectoIndex = proyectos.findIndex((p) => p.id == proyectoId);
    const proyectoAnterior = proyectos[proyectoIndex - 1];
    const proyectoSiguiente = proyectos[proyectoIndex + 1];
    
    // Generar grid de imágenes dinámicamente
    let imagenesHTML = "";
    proyecto.imagenes.forEach((img, index) => {
        imagenesHTML += `
            <div class="image-grid-item fade-in">
                <img src="${img}" alt="${proyecto.nombre} - Imagen ${index + 1}" class="project-image-large">
            </div>
        `;
    });
    
    return `
        <div class="project-detail-grid">
            <!-- Título y enlace -->
            <div class="project-title-section">
                <h1 class="project-hero-title">${proyecto.nombre}</h1>
                ${proyecto.enlaceDemo ? `
                    <div class="project-link-section">
                        <a href="${proyecto.enlaceDemo}" target="_blank" class="btn btn-primary">
                            🌐 Visitar sitio web
                        </a>
                    </div>
                ` : ''}
            </div>
            
            <!-- Grid de imágenes -->
            ${imagenesHTML}
            
            <!-- Descripción -->
            <div class="project-description-full">

                <p>${proyecto.descripcionCorta || proyecto.descripcion}</p>
            </div>
            
            <!-- Navegación -->
            <div class="project-navigation">
                ${proyectoAnterior ? `
                    <button class="btn prev" onclick="mostrarDetalleProyecto(${proyectoAnterior.id})">← Anterior</button>
                ` : '<div></div>'}
                ${proyectoSiguiente ? `
                    <button class="btn next" onclick="mostrarDetalleProyecto(${proyectoSiguiente.id})">Siguiente →</button>
                ` : '<div></div>'}
            </div>
            
            <!-- Botón volver -->
            <div class="project-back-section">
                <button class="btn btn-secondary" onclick="volverAProyectos()">
                    ← Volver
                </button>
            </div>
        </div>
    `;
}











