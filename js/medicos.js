const doctors = [
  {
    id: "1",
    name: "Dr. Juan Pérez",
    specialty: "Cardiología",
    location: "Turrialba",
    schedule: "Lunes a Viernes, 8:00 AM - 4:00 PM",
    contact: "8456-7890, drjuanperez@gmail.com",
    reviews: "Excelente médico. Muy recomendado.",
  },
  {
    id: "2",
    name: "Dra. María Gómez",
    specialty: "Pediatría",
    location: "Turrialba",
    schedule: "Lunes a Sábado, 9:00 AM - 5:00 PM",
    contact: "9654-3210, drmariagomez@gmail.com",
    reviews: "Muy amable y atenta con los niños.",
  },
  {
    id: "3",
    name: "Dr. Carlos Martínez",
    specialty: "Dermatología",
    location: "Turrialba",
    schedule: "Lunes a Jueves, 10:00 AM - 6:00 PM",
    contact: "8555-5555, drcarlosmartinez@gmail.com",
    reviews: "Buen dermatólogo, resolvió mi problema de piel.",
  },
  {
    id: "4",
    name: "Dra. Laura Rodríguez",
    specialty: "Ginecología",
    location: "Cartago",
    schedule: "Lunes a Viernes, 9:00 AM - 3:00 PM",
    contact: "8122-3333, drlaurarodriguez@gmail.com",
    reviews: "Muy profesional y comprensiva.",
  },
  {
    id: "5",
    name: "Dr. Andrés López",
    specialty: "Neurología",
    location: "San José",
    schedule: "Martes y Jueves, 10:00 AM - 6:00 PM",
    contact: "8444-6666, drandreslopez@gmail.com",
    reviews: "Gran conocimiento en su área. Lo recomiendo.",
  },
  {
    id: "6",
    name: "Dra. Ana Ramírez",
    specialty: "Pediatría",
    location: "Cartago",
    schedule: "Lunes a Viernes, 8:00 AM - 2:00 PM",
    contact: "8888-9999, draanaramirez@gmail.com",
    reviews: "Muy dedicada y cariñosa con los niños.",
  },
  {
    id: "7",
    name: "Dr. Pablo Sánchez",
    specialty: "Cirugía General",
    location: "Turrialba",
    schedule: "Lunes a Viernes, 9:00 AM - 5:00 PM",
    contact: "8908-7777, drpablosanchez@gmail.com",
    reviews: "Gran cirujano, excelente trato con los pacientes.",
  },
  {
    id: "8",
    name: "Dra. Sofía Hernández",
    specialty: "Oftalmología",
    location: "Heredia",
    schedule: "Lunes a Jueves, 10:00 AM - 7:00 PM",
    contact: "8456-7890, drsofiahernandez@gmail.com",
    reviews: "Atención impecable, resolvió mis problemas de visión.",
  },
  {
    id: "9",
    name: "Dr. Jorge Vargas",
    specialty: "Endocrinología",
    location: "Alajuela",
    schedule: "Martes y Jueves, 8:00 AM - 4:00 PM",
    contact: "8222-3333, drjorgevargas@gmail.com",
    reviews: "Explica muy bien y es muy claro en sus diagnósticos.",
  },
  {
    id: "10",
    name: "Dra. Patricia García",
    specialty: "Psiquiatría",
    location: "Turrialba",
    schedule: "Lunes a Viernes, 9:00 AM - 5:00 PM",
    contact: "8351-6666, drpatriciagarcia@gmail.com",
    reviews: "Escucha atentamente y ofrece excelentes tratamientos.",
  },
  {
    id: "11",
    name: "Dr. Manuel Cruz",
    specialty: "Ortopedia",
    location: "Alajuela",
    schedule: "Miércoles y Viernes, 10:00 AM - 6:00 PM",
    contact: "8121-9999, drmanuelcruz@gmail.com",
    reviews: "Mejoró mi calidad de vida con su tratamiento.",
  },
  {
    id: "12",
    name: "Dra. Carolina Díaz",
    specialty: "Dermatología",
    location: "Turrialba",
    schedule: "Lunes a Sábado, 8:00 AM - 3:00 PM",
    contact: "8884-7777, drcarolinadiaz@gmail.com",
    reviews: "Excelente atención, resolvió mi problema de piel rápidamente.",
  },
];

const resultsPerPage = 6;
let currentPage = 1;
let filteredDoctors = [];

function search() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const datalist = document.getElementById("doctorList");

  // Filtrar los médicos según el término de búsqueda
  filteredDoctors = doctors.filter(
    // Elimina 'const' o 'let' aquí
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm) ||
      doctor.specialty.toLowerCase().includes(searchTerm) ||
      doctor.location.toLowerCase().includes(searchTerm)
  );

  // Limpiar el datalist antes de agregar las nuevas opciones
  datalist.innerHTML = "";

  // Agregar las opciones de autocompletado al datalist
  filteredDoctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.name;
    datalist.appendChild(option);
  });
  displayResults();
}

function sortResults() {
  const sortSelect = document.getElementById("sortSelect");
  const sortBy = sortSelect.value;

  // Ordenar los resultados según la opción seleccionada
  if (sortBy === "name") {
    filteredDoctors.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "specialty") {
    filteredDoctors.sort((a, b) => a.specialty.localeCompare(b.specialty));
  } else if (sortBy === "location") {
    filteredDoctors.sort((a, b) => a.location.localeCompare(b.location));
  }

  // Mostrar los resultados ordenados
  displayResults();
}

function displayResults() {
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
  const resultsContainer = document.getElementById("searchResults");

  let tableRows = "";

  paginatedDoctors.forEach((doctor) => {
    tableRows += `
  <tr>
    <td>${doctor.name}</td>
    <td>${doctor.specialty}</td>
    <td>${doctor.location}</td>
    <td><button class="details-button" onclick="openModal('${doctor.id}')">Ver Detalles</button></td>
  </tr>
`;
  });

  const tableHTML = `
    <tr>
      <th>Nombre</th>
      <th>Especialidad</th>
      <th>Ubicación</th>
      <th>Ver Detalles</th>
    </tr>
    ${tableRows}
  `;

  resultsContainer.innerHTML = tableHTML;
  buildPagination();
}

function buildPagination() {
  const totalPages = Math.ceil(filteredDoctors.length / resultsPerPage);
  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button class="pagination-button" onclick="goToPage(${i})">${i}</button>`;
  }

  document.getElementById("pagination").innerHTML = paginationHTML;
}

function goToPage(page) {
  currentPage = page;
  displayResults();
}

function openModal(doctorId) {
  const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);
  const modalContent = document.getElementById("modalContent");

  // Construir el contenido del modal
  const modalHTML = `
    <h2>${selectedDoctor.name}</h2>
    <p><strong>Especialidad:</strong> ${selectedDoctor.specialty}</p>
    <p><strong>Ubicación:</strong> ${selectedDoctor.location}</p>
    <p><strong>Horarios de Consulta:</strong> ${selectedDoctor.schedule}</p>
    <p><strong>Contacto:</strong> ${selectedDoctor.contact}</p>
    <p><strong>Reseñas:</strong> ${selectedDoctor.reviews}</p>
  `;
  modalContent.innerHTML = modalHTML;

  // Mostrar el modal
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencia a los elementos select
  const medicoSelect = document.getElementById("medico");
  const especialidadSelect = document.getElementById("especialidad");

  // Agregar evento change al select de médico
  medicoSelect.addEventListener("change", function () {
    // Obtener el valor seleccionado del médico
    const selectedMedicoId = this.value;
    // Filtrar el array de médicos por el médico seleccionado
    const selectedMedico = doctors.find(
      (doctor) => doctor.id === selectedMedicoId
    );
    // Obtener la especialidad del médico seleccionado
    const selectedEspecialidad = selectedMedico.specialty;
    // Filtrar los médicos por la especialidad seleccionada
    const filteredByEspecialidad = doctors.filter(
      (doctor) => doctor.specialty === selectedEspecialidad
    );

    // Limpiar y actualizar el select de especialidad con las opciones filtradas
    especialidadSelect.innerHTML = "";
    filteredByEspecialidad.forEach((doctor) => {
      const especialidadOption = document.createElement("option");
      especialidadOption.value = doctor.specialty;
      especialidadOption.textContent = doctor.specialty;
      especialidadSelect.appendChild(especialidadOption);
    });
  });

  // Llamar a la función para cargar los médicos después de asignar el evento change
  cargarMedicos();
});

function cargarMedicos() {
  const medicoSelect = document.getElementById("medico");
  const especialidadSelect = document.getElementById("especialidad");

  medicoSelect.innerHTML = "";
  especialidadSelect.innerHTML = "";

  doctors.forEach((doctor) => {
    const medicoOption = document.createElement("option");
    medicoOption.value = doctor.id;
    medicoOption.textContent = doctor.name;
    medicoSelect.appendChild(medicoOption);
  });

  // También necesitas cargar las especialidades al inicio, en caso de que no se seleccione un médico
  const allSpecialties = doctors.map((doctor) => doctor.specialty);
  const uniqueSpecialties = [...new Set(allSpecialties)];
  uniqueSpecialties.forEach((specialty) => {
    const especialidadOption = document.createElement("option");
    especialidadOption.value = specialty;
    especialidadOption.textContent = specialty;
    especialidadSelect.appendChild(especialidadOption);
  });
}
