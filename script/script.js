const API = "https://686c3a7714219674dcc79348.mockapi.io/api/U1/HorasSociales"
const NEWAPI = "https://686c3a7714219674dcc79348.mockapi.io/api/U1/HorasSociales/1/NewUser"

function Login() {
    // Prevenir el envío del formulario por defecto
    event.preventDefault();
 
    // Obtener valores de los campos
    let email = document.getElementById("Correo").value;
    let password = document.getElementById("Contraseña").value;
 
    // Validación básica de campos vacíos
    if (!email || !password) {
        alert("Por favor, complete todos los campos");
        return;
    }
 
    // Definir usuarios válidos con sus roles
    const usuariosValidos = [
        { 
            email: "admin@institucion.edu", 
            password: "admin123",
            rol: "coordinador",
            redirect: "DashboardC.html"
        },
        { 
            email: "estudiante@institucion.edu", 
            password: "estudiante123",
            rol: "estudiante",
            redirect: "DashboardE.html"
        }
    ];
 
    // Verificar si las credenciales coinciden con algún usuario válido
    const usuarioValido = usuariosValidos.find(user => 
        user.email === email && user.password === password
    );
 
    if (usuarioValido) {
        // Redirigir según el rol del usuario
        window.location.href = usuarioValido.redirect;
        
        // Opcional: Guardar datos del usuario si marcó "Recordarme"
        if (document.querySelector('input[type="checkbox"]').checked) {
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('rol', usuarioValido.rol);
        }
    } else {
        alert("Credenciales incorrectas. Por favor, intente nuevamente.");
    }
}
 
// Opcional: Cargar el email guardado cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    const savedEmail = sessionStorage.getItem('email');
    if (savedEmail) {
        document.getElementById('Correo').value = savedEmail;
        document.querySelector('input[type="checkbox"]').checked = true;
    }
});
 