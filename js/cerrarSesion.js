document.addEventListener("DOMContentLoaded", () => {
  const cerrarSesionBtn = document.getElementById("cerrarSesion");

  cerrarSesionBtn.addEventListener("click", () => {
    // Eliminar el usuario autenticado del localStorage
    localStorage.removeItem("usuarioAutenticado");
    // Redireccionar a la página de inicio de sesión u otra página relevante
    window.location.href = "../index.html"; // Cambia esto según la página a la que quieras redirigir
  });
});
