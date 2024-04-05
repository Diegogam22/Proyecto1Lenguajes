const agendaCitasLink = document.getElementById("agenda-citas");

// Verificar si el usuario está autenticado
const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");

if (!usuarioAutenticado) {
  // Si el usuario no está autenticado, ocultar el enlace al módulo de agenda de citas
  agendaCitasLink.style.display = "none";
} else {
  // Si el usuario está autenticado, mostrar el enlace al módulo de agenda de citas
  agendaCitasLink.style.display = "block";
}
