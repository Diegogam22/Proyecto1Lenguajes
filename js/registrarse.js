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

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Función para validar las expresiones regulares y registrar un usuario
function registrarUsuario(event) {
  event.preventDefault();

  // Obtiene los valores de los campos del formulario
  const cedula = document.getElementById("cedula").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const celular = document.getElementById("celular").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasenna = document.getElementById("contrasenna").value.trim();
  const confirmarContrasenna = document
    .getElementById("confirmarContrasenna")
    .value.trim();

  // Valida si las contraseñas coinciden
  if (contrasenna !== confirmarContrasenna) {
    showToast("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");

    return;
  }

  // Valida si algún campo está vacío
  if (
    !cedula ||
    !nombre ||
    !apellidos ||
    !celular ||
    !correo ||
    !contrasenna ||
    !confirmarContrasenna
  ) {
    showToast("Por favor, complete todos los campos antes de registrar.");

    return;
  }

  // Valida las expresiones regulares
  const errores = {};
  if (!validarCorreo(correo)) {
    errores.correo = true;
  }
  if (!validarContrasenna(contrasenna)) {
    errores.contrasenna = true;
  }
  if (!validarNombre(nombre)) {
    errores.nombre = true;
  }
  if (!validarApellidos(apellidos)) {
    errores.apellidos = true;
  }
  if (!validarCedula(cedula)) {
    errores.cedula = true;
  }
  if (!validarNumeroCelular(celular)) {
    errores.celular = true;
  }

  if (Object.keys(errores).length > 0) {
    manejarError(errores);
    return; // Evita el registro si hay errores en las expresiones regulares
  }

  // Valida si la cédula ya existe
  if (usuarioExistente(cedula)) {
    showToast(
      "La cédula ingresada ya existe en el sistema. Por favor, utiliza otra."
    );

    return;
  }

  // Cifra la contraseña
  const hashedPassword = CryptoJS.SHA256(contrasenna).toString(
    CryptoJS.enc.Base64
  );

  // Crea objeto de usuario
  const usuario = {
    cedula,
    nombre,
    apellidos,
    celular,
    correo,
    contrasenna: hashedPassword,
  };

  // Agrega usuario al array
  usuarios.push(usuario);

  // Almacena en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Limpia el formulario
  document.getElementById("formulario").reset();

  // Muestra mensaje de éxito
  showToast("Registro exitoso. Bienvenido, " + nombre + "!");
}

// Función para verificar si la cédula ya existe en la lista de usuarios
function usuarioExistente(cedula) {
  return usuarios.some((usuario) => usuario.cedula === cedula);
}

// Función para validar el correo electrónico con una expresión regular
const validarCorreo = (correo) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};

// Función para validar la contraseña con una expresión regular
const validarContrasenna = (contrasenna) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    contrasenna
  );
};

// Función para validar el nombre con una expresión regular
const validarNombre = (nombre) => {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s']{1,20}$/i.test(nombre);
};

// Función para validar los apellidos con una expresión regular
const validarApellidos = (apellidos) => {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s']{1,30}$/i.test(apellidos);
};

// Función para validar la cédula con una expresión regular
const validarCedula = (cedula) => {
  return /^\d{2}-\d{4}-\d{4}$/.test(cedula);
};

// Función para validar el número de celular con una expresión regular
const validarNumeroCelular = (celular) => {
  return /^\d{4}-\d{4}$/.test(celular);
};

// Función para manejar los errores de validación
const manejarError = (errores) => {
  let mensajeError = "Por favor, corrige los siguientes errores:\n";

  if (errores.correo) {
    mensajeError += "- El correo electrónico es inválido.\n";
  }
  if (errores.contrasenna) {
    mensajeError +=
      "- La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.\n";
  }
  if (errores.nombre) {
    mensajeError += "- El nombre solo puede contener letras y espacios.\n";
  }
  if (errores.apellidos) {
    mensajeError += "- Los apellidos solo pueden contener letras y espacios.\n";
  }
  if (errores.cedula) {
    mensajeError +=
      "- La cédula debe contener exactamente 10 dígitos y el formato ##-####-####..\n";
  }
  if (errores.celular) {
    mensajeError +=
      "- El número de celular debe contener exactamente 8 dígitos y debe cumplir con el formato ####-####.\n";
  }
  showToast(mensajeError);
};

document.addEventListener("DOMContentLoaded", () => {
  // Asocia la función registrarUsuario con el evento submit del formulario
  document
    .getElementById("formulario")
    .addEventListener("submit", (event) => registrarUsuario(event));
});
