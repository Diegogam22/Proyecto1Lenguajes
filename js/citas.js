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
  // Obtener referencia al formulario
  const form = document.getElementById("programarCitaForm");

  // Agregar event listener al formulario para el evento "submit"
  form.addEventListener("submit", function (event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener datos del formulario
    const fechaHora = document.getElementById("fechaHora").value;
    const medicoId = document.getElementById("medico").value;
    const especialidad = document.getElementById("especialidad").value;

    // Aquí deberías obtener la información del usuario autenticado del localStorage
    const usuarioAutenticado = JSON.parse(
      localStorage.getItem("usuarioAutenticado")
    );
    if (!usuarioAutenticado) {
      showToast("Debes iniciar sesión para programar una cita.");

      return;
    }

    // Crear objeto de cita con la información del usuario y la cita
    const cita = {
      id: getNextCitaId(), // Obtener el próximo ID de cita
      fechaHora,
      medico: medicoId,
      especialidad,
      usuario: usuarioAutenticado,
      confirmado: false,
    };

    // Validar solapamiento de citas
    if (validarSolapamientoCitas(cita)) {
      showToast("Ya hay una cita programada para este horario.");

      return;
    }

    // Programar la cita
    programarCita(cita);

    // Limpiar el formulario después de guardar la cita
    form.reset();
  });
});

// Función para obtener el próximo ID de cita
function getNextCitaId() {
  let lastCitaId = localStorage.getItem("lastCitaId") || 0;
  lastCitaId = parseInt(lastCitaId);
  const nextCitaId = lastCitaId + 1;
  localStorage.setItem("lastCitaId", nextCitaId);
  return nextCitaId;
}

// Función para validar solapamientos de citas
function validarSolapamientoCitas(nuevaCita) {
  // Obtener citas existentes del almacenamiento local
  const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];

  // Verificar si hay solapamiento con alguna cita existente
  const solapamiento = citasGuardadas.some((cita) => {
    // Convertir las fechas de cadena a objetos Date para facilitar la comparación
    const fechaHoraCitaExistente = new Date(cita.fechaHora);
    const fechaHoraNuevaCita = new Date(nuevaCita.fechaHora);

    // Verificar solapamiento
    return fechaHoraNuevaCita.getTime() === fechaHoraCitaExistente.getTime();
  });

  return solapamiento;
}

// Función para guardar la cita en el almacenamiento local
function guardarCitaEnLocalStorage(cita) {
  const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
  citasGuardadas.push(cita);
  localStorage.setItem("citas", JSON.stringify(citasGuardadas));
}

// Función para programar una nueva cita
function programarCita(cita) {
  // Agregar el ID del usuario autenticado a la cita
  const usuarioAutenticado = JSON.parse(
    localStorage.getItem("usuarioAutenticado")
  );
  cita.usuarioId = usuarioAutenticado.id;

  // Guardar la cita en el almacenamiento local
  guardarCitaEnLocalStorage(cita);
  showToast("Cita programada con éxito.");
}

//modificar cita
document.addEventListener("DOMContentLoaded", function () {
  // Obtener la información del usuario autenticado del localStorage
  const usuarioAutenticado = JSON.parse(
    localStorage.getItem("usuarioAutenticado")
  );

  // Filtrar las citas para mostrar solo las del usuario autenticado
  const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
  const citasUsuarioAutenticado = citasGuardadas.filter(
    (cita) => cita.usuario && cita.usuario.cedula === usuarioAutenticado.cedula
  );

  // Construir el menú desplegable de citas con las citas del usuario autenticado
  const citasSelect = document.getElementById("citas");
  citasSelect.innerHTML = ""; // Limpiar las opciones anteriores

  citasUsuarioAutenticado.forEach((cita) => {
    const option = document.createElement("option");
    option.value = cita.id;
    option.textContent = `${cita.fechaHora} - ${cita.especialidad}`; // Puedes mostrar más información si lo deseas
    citasSelect.appendChild(option);
  });

  // Agregar evento al botón "Modificar Cita"
  const modificarCitaBtn = document.getElementById("modificarCitaBtn");
  modificarCitaBtn.addEventListener("click", function () {
    // Obtener el valor seleccionado del menú desplegable de citas
    const selectedCitaId = document.getElementById("citas").value;

    const citaSeleccionada = citasGuardadas.find(
      (cita) => cita.id === parseInt(selectedCitaId)
    );

    // Abrir el modal para editar la cita seleccionada
    openModal(citaSeleccionada);
  });
});

function openModal(citaSeleccionada) {
  const modalContent = document.getElementById("modalContent");

  const modalHTML = `
    <h2>Modificar Cita</h2>
    <form id="formModificarCita">
        <label for="nuevaFechaHora">Nueva Fecha y Hora:</label>
        <input type="datetime-local" id="nuevaFechaHora" value="${citaSeleccionada.fechaHora}" required />
        <label for="nuevoMedico">Nuevo Médico:</label>
        <select id="nuevoMedico" required>
            <!-- Opciones de médicos se llenarán dinámicamente -->
        </select>
        <label for="nuevaEspecialidad">Nueva Especialidad:</label>
        <select id="nuevaEspecialidad" required>
            <!-- Opciones de especialidades se llenarán dinámicamente -->
        </select>
        <button type="submit">Guardar Cambios</button>
    </form>
  `;
  modalContent.innerHTML = modalHTML;

  const nuevoMedicoSelect = document.getElementById("nuevoMedico");
  doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.textContent = `${doctor.name} - ${doctor.specialty}`;
    nuevoMedicoSelect.appendChild(option);
  });

  nuevoMedicoSelect.addEventListener("change", () => {
    const selectedMedicoId = nuevoMedicoSelect.value;
    const nuevaEspecialidadSelect =
      document.getElementById("nuevaEspecialidad");

    // Limpiar las opciones anteriores del select de especialidad
    while (nuevaEspecialidadSelect.firstChild) {
      nuevaEspecialidadSelect.removeChild(nuevaEspecialidadSelect.firstChild);
    }
    // Obtener las especialidades del médico seleccionado
    const medicoSeleccionado = doctors.find(
      (doctor) => doctor.id === selectedMedicoId
    );

    if (medicoSeleccionado) {
      // Agregar la especialidad del médico seleccionado al select de especialidades
      const option = document.createElement("option");
      option.value = medicoSeleccionado.specialty;
      option.textContent = medicoSeleccionado.specialty;
      nuevaEspecialidadSelect.appendChild(option);
    }
  });

  // Mostrar el modal
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  // Manejar el envío del formulario dentro del modal
  const formModificarCita = document.getElementById("formModificarCita");
  formModificarCita.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los nuevos valores del formulario
    const nuevaFechaHora = document.getElementById("nuevaFechaHora").value;
    const nuevoMedicoId = document.getElementById("nuevoMedico").value;
    const nuevaEspecialidad =
      document.getElementById("nuevaEspecialidad").value;

    // Actualizar la cita con los nuevos valores
    citaSeleccionada.fechaHora = nuevaFechaHora;
    citaSeleccionada.medico = nuevoMedicoId;
    citaSeleccionada.especialidad = nuevaEspecialidad;

    // Guardar la cita actualizada en el almacenamiento local
    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
    const index = citasGuardadas.findIndex(
      (cita) => cita.id === citaSeleccionada.id
    );
    if (index !== -1) {
      citasGuardadas[index] = citaSeleccionada;
      localStorage.setItem("citas", JSON.stringify(citasGuardadas));
      showToast("Cita modificada con éxito.");
    }

    // Cerrar el modal
    modal.style.display = "none";
  });
}

// CANCELAR CITA

function cargarCitas() {
  // Obtener las citas guardadas del almacenamiento local
  const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];

  // Obtener el usuario autenticado del almacenamiento local
  const usuarioAutenticado = JSON.parse(
    localStorage.getItem("usuarioAutenticado")
  );

  // Filtrar las citas del usuario autenticado
  const citasUsuarioAutenticado = citasGuardadas.filter(
    (cita) => cita.usuario && cita.usuario.cedula === usuarioAutenticado.cedula
  );

  // Obtener el elemento select donde se mostrarán las citas
  const citasSelect = document.getElementById("citas");

  // Limpiar el contenido actual del elemento select
  citasSelect.innerHTML = "";

  // Iterar sobre las citas del usuario autenticado y agregarlas como opciones al select
  citasUsuarioAutenticado.forEach((cita) => {
    const option = document.createElement("option");
    option.value = cita.id;
    option.textContent = `ID: ${cita.id} - ${cita.fechaHora} - ${cita.especialidad}`;
    citasSelect.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Agregar evento al botón "Cancelar Cita"
  const cancelarCitaBtn = document.getElementById("cancelarCitaBtn");
  cancelarCitaBtn.addEventListener("click", function () {
    // Obtener el valor seleccionado del menú desplegable de citas
    const selectedCitaId = document.getElementById("citas").value.toString();

    // Obtener las citas guardadas del almacenamiento local
    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];

    // Obtener el usuario autenticado del almacenamiento local
    const usuarioAutenticado = JSON.parse(
      localStorage.getItem("usuarioAutenticado")
    );

    // Buscar la cita seleccionada en el array de citas guardadas
    const index = citasGuardadas.findIndex(
      (cita) =>
        cita.id.toString() === selectedCitaId &&
        cita.usuario &&
        cita.usuario.cedula === usuarioAutenticado.cedula
    );

    // Verificar si se encontró la cita seleccionada
    if (index !== -1) {
      // Eliminar la cita del array de citas guardadas
      citasGuardadas.splice(index, 1);

      // Actualizar el almacenamiento local con las citas actualizadas
      localStorage.setItem("citas", JSON.stringify(citasGuardadas));

      // Actualizar el select de citas
      cargarCitas();

      // Notificar al usuario que la cita ha sido cancelada
      showToast("La cita ha sido cancelada con éxito.");
    } else {
      // Si no se encuentra la cita seleccionada o no pertenece al usuario autenticado, mostrar un mensaje de error
      showToast(
        "No se encontró la cita seleccionada o no tienes permisos para cancelarla."
      );
    }
  });
});

// CALENDARIO

document.addEventListener("DOMContentLoaded", function () {
  const calendarioContainer = document.getElementById("calendario");
  const btnMesAnterior = document.getElementById("btnMesAnterior");
  const btnMesSiguiente = document.getElementById("btnMesSiguiente");
  let fechaActual = new Date();
  let modoCalendario = "mes";

  cargarCalendario();

  function cargarCalendario() {
    calendarioContainer.innerHTML = "";

    const citasGuardadas = obtenerCitasUsuarioAutenticado();
    const nombreMes = obtenerNombreMes(fechaActual.getMonth()); // Obtener el nombre del mes actual

    // Mostrar el nombre del mes en el elemento correspondiente
    const nombreMesElemento = document.createElement("h2");
    nombreMesElemento.textContent = nombreMes;
    calendarioContainer.appendChild(nombreMesElemento);

    if (modoCalendario === "mes") {
      mostrarMes(citasGuardadas);
    }
  }

  function mostrarMes(citasGuardadas) {
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth();
    ultimoDiaMes = new Date(añoActual, mesActual + 1, 0);

    const divMes = document.createElement("div");
    divMes.classList.add("mes");

    let fechaInicio = new Date(añoActual, mesActual, 1);
    let fechaFin = new Date(añoActual, mesActual, ultimoDiaMes.getDate());

    while (fechaInicio <= fechaFin) {
      const divSemana = document.createElement("div");
      divSemana.classList.add("semana");

      for (let i = 0; i < 7; i++) {
        const divDia = document.createElement("div");
        divDia.classList.add("dia");
        divDia.textContent = fechaInicio.getDate();

        if (fechaInicio.getMonth() !== mesActual) {
          divDia.classList.add("fuera-de-mes");
        }

        const citasEnFecha = citasGuardadas.filter(
          (cita) =>
            cita.fecha.getDate() === fechaInicio.getDate() &&
            cita.fecha.getMonth() === mesActual
        );

        if (citasEnFecha.length > 0) {
          divDia.classList.add("con-cita");
          divDia.setAttribute("data-citas", JSON.stringify(citasEnFecha));
          // Agregar evento de clic al día si tiene citas
          divDia.addEventListener("click", function () {
            mostrarModalConfirmacion(citasEnFecha);
          });
        }

        divDia.addEventListener("mouseover", function (event) {
          mostrarInformacionCita(event);
        });

        divDia.addEventListener("mouseout", function () {
          ocultarInformacionCita();
        });

        divSemana.appendChild(divDia);
        fechaInicio.setDate(fechaInicio.getDate() + 1);
      }

      divMes.appendChild(divSemana);
    }

    calendarioContainer.appendChild(divMes);
  }

  btnMesAnterior.addEventListener("click", function () {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    cargarCalendario();
  });

  btnMesSiguiente.addEventListener("click", function () {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    cargarCalendario();
  });

  function obtenerCitasUsuarioAutenticado() {
    const usuarioAutenticado = JSON.parse(
      localStorage.getItem("usuarioAutenticado")
    );
    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];

    const citasUsuarioAutenticado = citasGuardadas.filter(
      (cita) => cita.usuario && cita.usuario.id === usuarioAutenticado.id
    );

    citasUsuarioAutenticado.forEach((cita) => {
      cita.fecha = new Date(cita.fechaHora);
    });

    return citasUsuarioAutenticado;
  }

  function mostrarInformacionCita(event) {
    const divDia = event.target;
    const citasEnFecha = JSON.parse(divDia.getAttribute("data-citas"));

    const popover = document.createElement("div");
    popover.classList.add("popover");

    citasEnFecha.forEach((cita) => {
      const citaInfo = document.createElement("div");
      citaInfo.textContent = `${cita.fechaHora} - ${cita.especialidad}`;
      popover.appendChild(citaInfo);
    });

    calendarioContainer.appendChild(popover);

    const rect = divDia.getBoundingClientRect();
    popover.style.top = rect.top + window.scrollY + "px";
    popover.style.left = rect.left + window.scrollX + "px";
  }

  function ocultarInformacionCita() {
    const popover = document.querySelector(".popover");
    if (popover) {
      popover.remove();
    }
  }

  function obtenerNombreMes(numeroMes) {
    const nombresMeses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return nombresMeses[numeroMes];
  }
});

function showModal(content) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = content;
  modal.style.display = "block";
}

function mostrarModalConfirmacion(citasEnFecha) {
  // Crear el contenido del modal con la lista de citas y el botón de confirmación
  let modalContent = "<h2>Confirmar Citas</h2>";
  modalContent += "<ul>";

  // Agrupar citas por fecha
  const citasPorFecha = {};
  citasEnFecha.forEach((cita) => {
    const fecha = cita.fechaHora.split("T")[0]; // Obtener la parte de la fecha sin la parte de la hora
    if (!citasPorFecha[fecha]) {
      citasPorFecha[fecha] = [];
    }
    citasPorFecha[fecha].push(cita);
  });

  // Mostrar cada grupo de citas
  for (const fecha in citasPorFecha) {
    if (citasPorFecha.hasOwnProperty(fecha)) {
      citasPorFecha[fecha].forEach((cita, index) => {
        modalContent += `<li>${cita.fechaHora} - ${cita.especialidad}</li>`;
        // Agregar un separador entre citas, excepto para la última cita
        if (index < citasPorFecha[fecha].length - 1) {
          modalContent += "<hr>";
        }
      });
    }
  }

  modalContent += "</ul>";
  modalContent += '<button id="confirmarCitaBtn">Confirmar Cita</button>'; // Botón de confirmación
  // Mostrar el modal
  showModal(modalContent);

  // Agregar evento al botón de confirmación
  const confirmarCitaBtn = document.getElementById("confirmarCitaBtn");
  confirmarCitaBtn.addEventListener("click", function () {
    confirmarCita(citasEnFecha);
  });
}

function confirmarCita(citasEnFecha) {
  // Actualizar el estado de confirmación de las citas en el localStorage
  citasEnFecha.forEach((cita) => {
    cita.confirmada = true;
  });

  // Guardar las citas actualizadas en el localStorage
  const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
  citasGuardadas.forEach((citaGuardada) => {
    citasEnFecha.forEach((cita) => {
      if (citaGuardada.id === cita.id) {
        citaGuardada.confirmado = true;
      }
    });
  });
  localStorage.setItem("citas", JSON.stringify(citasGuardadas));

  showToast("Gracias por confirmar tu cita");
  // Cerrar el modal
  closeModal();
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// HISTORIAL DE CITAS

const historialCitasBody = document.querySelector("#historialCitas tbody"); // Obtener referencia al cuerpo de la tabla en el HTML
let paginaActual = 1; // Inicializar la página actual
const citasPorPagina = 6; // Número de citas a mostrar por página

function mostrarHistorialCitas() {
  const usuarioAutenticado = JSON.parse(
    localStorage.getItem("usuarioAutenticado")
  );
  const citasUsuarioAutenticado = obtenerCitasUsuarioAutenticado();

  const paginasTotales = Math.ceil(
    citasUsuarioAutenticado.length / citasPorPagina
  );
  const inicio = (paginaActual - 1) * citasPorPagina;
  const fin = inicio + citasPorPagina;
  const citasPaginadas = citasUsuarioAutenticado.slice(inicio, fin);

  historialCitasBody.innerHTML = ""; // Limpiar el contenido anterior de la tabla
  citasPaginadas.forEach((cita) => {
    // Buscar el nombre del médico correspondiente en la lista de médicos

    cita.medico;
    const medico = obtenerNombreMedico(cita.medico);

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cita.fechaHora}</td>
      <td>${medico}</td>
      <td>${cita.especialidad}</td>
    `;
    historialCitasBody.appendChild(fila);
  });

  mostrarBotonesPaginacion(paginasTotales);
}

function obtenerNombreMedico(idMedico) {
  const medico = doctors.find((doctor) => doctor.id === idMedico);
  return medico ? medico.name : "Médico no encontrado";
}

function mostrarBotonesPaginacion(paginasTotales) {
  const paginacionContainer = document.createElement("div");
  paginacionContainer.classList.add("paginacion");

  // Limpiar el contenido anterior de la paginación
  paginacionContainer.innerHTML = "";

  for (let i = 1; i <= paginasTotales; i++) {
    const botonPagina = document.createElement("button");
    botonPagina.textContent = i;
    botonPagina.addEventListener("click", function () {
      paginaActual = i;
      mostrarHistorialCitas();
    });
    paginacionContainer.appendChild(botonPagina);
  }

  // Obtener el contenedor de historialCitas y agregar los botones de paginación
  const historialCitas = document.getElementById("historialCitas");

  // Limpiar contenido anterior de paginación antes de agregar los botones
  const paginacionAnterior = historialCitas.querySelector(".paginacion");
  if (paginacionAnterior) {
    paginacionAnterior.remove();
  }

  historialCitas.appendChild(paginacionContainer);
}

function obtenerCitasUsuarioAutenticado() {
  const usuarioAutenticado = JSON.parse(
    localStorage.getItem("usuarioAutenticado")
  );
  const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];

  const citasUsuarioAutenticado = citasGuardadas.filter(
    (cita) => cita.usuario && cita.usuario.id === usuarioAutenticado.id
  );

  return citasUsuarioAutenticado;
}

// Llamada inicial para mostrar el historial de citas al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  mostrarHistorialCitas();
});
