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

document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencia al botón de envío del formulario
  const submitButton = document.getElementById("submit-button");

  // Agregar un evento click al botón de envío
  submitButton.addEventListener("click", function (event) {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();
    showToast("Enviado con éxito");
  });
});
