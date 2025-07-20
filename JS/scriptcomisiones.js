const API_URL_Proyectos = "https://retoolapi.dev/B81qu9/tbProyectos";
const API_URL_Coordinadores = "https://retoolapi.dev/EWVZu8/tbAdministradores";
const API_URL_ServiciosVigentes = "https://retoolapi.dev/XqGGae/tbServicios_Vigentes";

const Alert_Error_Coordinadores = document.getElementById("Alert_Error_Coordinadores");
const Alert_Error_Proyects = document.getElementById("Alert_Error_Proyects");
const Proyectos_Vigentes_Div = document.getElementById("accordionFlushExample");

async function Cargar_Proyectos() {
    try{
        const res = await fetch(`${API_URL_Proyectos}?Vigencia_Proyecto=1`);
        const data = await res.json();
        Rellenar_Proyectos(data);
    } catch(err) {
        console.error('Error al cargar datos' , err);
        Alert_Error_Proyects.hidden = false;
        setTimeout(() => {
            Alert_Error_Proyects.hidden = true;       
        }, 3000)
    }
}
async function Buscar_Servicios(Proyecto) {
    try{
        const res = await fetch(`${API_URL_ServiciosVigentes}?Nombre_Proyecto=${Proyecto}`)
        const data = await res.json();
        return(data);
    }catch(err){
        console.error('Error al cargar datos' , err);
    }
}
async function Rellenar_Proyectos(Proyectos){
    Proyectos_Vigentes_Div.innerHTML = '';

    Proyectos.forEach(async (Proyecto, index) => {
        const Index_ID = `flush-collapse${index}`;
        const Encabezado_ID = `flush-heading-${index}`;

        let DIV_Proyecto = `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed comision-btn" type="button" data-bs-toggle="collapse" data-bs-target="#${Index_ID}" aria-expanded="false" aria-controls="${Index_ID}">${Proyecto.Nombre_Proyecto}</button>
            </h2>
            <div id="${Index_ID}" class="accordion-collapse collapse" aria-labelledby="${Encabezado_ID}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="Div_Info2">
                            <div class="Proyectos_Info_div">
                                <label class="Label_IMG">Icono de Proyecto:
                                    <img src="${Proyecto.Icono_Proyecto}" alt="Icono del Proyecto" class="IMG_Icon_Proyecto">
                                </label>
                                <label class="Label_IMG">Imagen de muestra:
                                    <img src="${Proyecto.Img_Muestra}" alt="Imagen de muestra de ${Proyecto.Nombre_Proyecto}" class="IMG_Muestra_Proyecto">
                                </label>
                            </div>
                            <div class="Proyectos_Info_div Info_Proyectos" style="width: 50%;">
                                <label>Descripcion Proyecto:
                                    <textarea readonly>${Proyecto.Concepto_Proyecto}</textarea>
                                </label>
        `;

        let Servicios = await Buscar_Servicios(Proyecto.Nombre_Proyecto);
        let Cupos_Usados = Servicios.length;
        Cupos_disponibles = Proyecto.Cupos_Proyectos - Cupos_Usados;
        DIV_Proyecto += `
                                    <label>Cupos Disponibles
                                        <input type="number" readonly value="${Cupos_disponibles}">
                                    </label>
                                <div class="Div_secondary">
                                    <button type="button" class="inscripcion-btn" onClick="Editar_Proyecto(${Proyecto.id}, '${Proyecto.Nombre_Proyecto}', '${Proyecto.Concepto_Proyecto}', ${Proyecto.Cupos_Proyectos}, '${Proyecto.Icono_Proyecto}', '${Proyecto.Img_Muestra}')">Seleccionar Proyecto</button>
                                </div>
                            </div>
                        </div>
        `;
        DIV_Proyecto += `
                        </div>
                    </div>
                </div>
            `;

        Proyectos_Vigentes_Div.innerHTML += DIV_Proyecto
    });
}
function CargaInicialProyectosEstudiante(){
    Alert_Error_Proyects.hidden = true;
    Alert_Error_Coordinadores.hidden = true;
}

window.addEventListener('DOMContentLoaded', CargaInicialProyectosEstudiante);