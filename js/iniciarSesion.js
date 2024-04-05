function showToast(message) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  let intentosFallidos = 0;

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const cedula = document.getElementById("cedula").value.trim();
    const contrasenna = document.getElementById("contrasenna").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.cedula === cedula
    );

    if (!usuarioEncontrado) {
      showToast(
        "El usuario no está registrado. Por favor, regístrate primero."
      );

      return;
    }

    // Aquí utilizamos la misma función de encriptación que en el registro
    const hashedPassword = CryptoJS.SHA256(contrasenna).toString(
      CryptoJS.enc.Base64
    );

    if (usuarioEncontrado.contrasenna !== hashedPassword) {
      intentosFallidos++;
      showToast("La contraseña es incorrecta. Por favor, inténtalo de nuevo.");

      if (intentosFallidos >= 3) {
        const modal = document.getElementById("modalRestablecerContrasenna");
        modal.style.display = "block";

        const closeButton = modal.querySelector(".close");
        closeButton.onclick = function () {
          modal.style.display = "none";
        };

        const formRestablecerContrasenna = document.getElementById(
          "formRestablecerContrasenna"
        );
        formRestablecerContrasenna.onsubmit = function (event) {
          event.preventDefault();

          const nuevaContrasenna = document
            .getElementById("nuevaContrasenna")
            .value.trim();

          const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

          const usuarioIndex = usuarios.findIndex(
            (usuario) => usuario.cedula === usuarioEncontrado.cedula
          );

          if (usuarioIndex !== -1) {
            const hashedNewPassword = CryptoJS.SHA256(
              nuevaContrasenna
            ).toString(CryptoJS.enc.Base64);
            usuarios[usuarioIndex].contrasenna = hashedNewPassword;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            showToast("Contraseña restablecida exitosamente.");

            modal.style.display = "none";
          } else {
            showToast(
              "No se encontró al usuario correspondiente para restablecer la contraseña."
            );
          }
        };
        return;
      }
      return;
    }

    intentosFallidos = 0;
    showToast(
      "Inicio de sesión exitoso. ¡Bienvenido, " + usuarioEncontrado.nombre + "!"
    );

    localStorage.setItem(
      "usuarioAutenticado",
      JSON.stringify(usuarioEncontrado)
    );
  });
});
