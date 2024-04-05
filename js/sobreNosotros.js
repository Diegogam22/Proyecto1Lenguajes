// sobreNosotros.js

// Función para mostrar todos los médicos en una tabla
function mostrarTodosLosMedicos() {
  // Selecciona el contenedor de resultados
  const resultsContainer = document.getElementById("searchResults");

  // Calcula el índice de inicio y fin para la paginación
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  // Filtra los médicos según la paginación
  const paginatedDoctors = doctors.slice(startIndex, endIndex);

  // Construye las filas de la tabla con los datos de los médicos
  const tableRows = paginatedDoctors.map((doctor) => {
    return `
      <tr>
        <td>${doctor.name}</td>
        <td>${doctor.specialty}</td>
      </tr>
    `;
  });

  // Construye el HTML de la tabla
  const tableHTML = `
    <tr>
      <th>Nombre</th>
      <th>Especialidad</th>
    </tr>
    ${tableRows.join("")}
  `;

  // Inserta el HTML de la tabla en el contenedor de resultados
  resultsContainer.innerHTML = tableHTML;

  // Construye la paginación
  buildPagination();
}

// Función para construir los botones de paginación
function buildPagination() {
  // Calcula el número total de páginas
  const totalPages = Math.ceil(doctors.length / resultsPerPage);

  // Selecciona el contenedor de paginación
  const paginationContainer = document.getElementById("pagination");

  // Construye los botones de paginación
  let paginationHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="goToPage(${i})">${i}</button>`;
  }

  // Inserta los botones de paginación en el contenedor
  paginationContainer.innerHTML = paginationHTML;
}

// Función para ir a una página específica
function goToPage(page) {
  // Actualiza la página actual
  currentPage = page;

  // Muestra los médicos de la página seleccionada
  mostrarTodosLosMedicos();
}

// Carga inicial de los médicos y muestra la primera página
document.addEventListener("DOMContentLoaded", function () {
  // Asigna el array de médicos proveniente de medicos.js a la variable local doctors
  const doctors = window.doctors;

  // Muestra todos los médicos en la primera página
  mostrarTodosLosMedicos();
});
