document.addEventListener("DOMContentLoaded", () => {
  const cerrarSesionBtn = document.getElementById("cerrarSesion");

  cerrarSesionBtn.addEventListener("click", () => {
    // Elimina el usuario autenticado del localStorage
    localStorage.removeItem("usuarioAutenticado");
    // Redireccionar a la página home (Index)
    window.location.href = "../index.html";
  });
});
