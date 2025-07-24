document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario de eventos
    const eventForm = document.getElementById('event-form');
    
    if (eventForm) {
        // Manejar el envío del formulario en eventos.html
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const fecha = document.getElementById('fecha').value;
            const descripcion = document.getElementById('descripcion').value;
            
            // Crear objeto del evento
            const nuevoEvento = {
                nombre: nombre,
                fecha: fecha,
                descripcion: descripcion
            };
            
            // Obtener eventos existentes o inicializar array
            let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
            
            // Agregar nuevo evento
            eventos.push(nuevoEvento);
            
            // Guardar en localStorage
            localStorage.setItem('eventos', JSON.stringify(eventos));
            
            // Limpiar formulario
            eventForm.reset();
            
            // Mostrar mensaje de éxito
            alert('Evento agregado correctamente');
            
            // Redirigir a actividades.html (opcional)
            // window.location.href = 'actividades.html';
        });
    }
    
    // Mostrar eventos en actividades.html
    const actividadesSection = document.querySelector('.actividades');
    
    if (actividadesSection) {
        // Obtener eventos del localStorage
        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        
        // Si no hay eventos, mostrar mensaje
        if (eventos.length === 0) {
            actividadesSection.innerHTML += `
                <div class="no-eventos">
                    <p>No hay eventos programados</p>
                </div>
            `;
            return;
        }
        
        // Ordenar eventos por fecha (más reciente primero)
        eventos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        
        // Mostrar cada evento
        eventos.forEach(evento => {
            // Formatear fecha para mostrar (ej: 5 Jun)
            const fechaObj = new Date(evento.fecha);
            const opcionesFecha = { day: 'numeric', month: 'short' };
            const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opcionesFecha);
            
            // Crear elemento de actividad
            const actividadHTML = `
                <div class="actividad">
                    <p class="fecha">${fechaFormateada}</p>
                    <div class="actividad-toggle" onclick="toggleDescripcion(this)">
                        ${evento.nombre}
                    </div>
                    <div class="descripcion">
                        ${evento.descripcion}
                    </div>
                </div>
            `;
            
            // Agregar al DOM
            actividadesSection.insertAdjacentHTML('beforeend', actividadHTML);
        });
    }
});

// Función para mostrar/ocultar descripción (debe estar en el scope global)
function toggleDescripcion(elemento) {
    const descripcion = elemento.nextElementSibling;
    descripcion.classList.toggle('mostrar');
    descripcion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}