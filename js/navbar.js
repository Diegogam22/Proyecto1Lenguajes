// crea el navbar generico
const contenedorPrincipal = document.querySelector(".contenedor__principal");
const navbar = `
      <header>
        <h1>
          <a href="../index.html"
            >Sistema de Citas Médicas de la Clínica Árbol de Seda</a
          >
        </h1>
        <nav>
          <ul>
            <li>
              <a href="./inicioSesion.html"
                >Inicio de sesión</a
              >
            </li>
            <li id="agenda-citas">
              <a href="./citas.html">Agenda de citas</a>
            </li>
            <li>
              <a href="./busquedaMedicos.html"
                >Búsqueda de médicos</a
              >
            </li>
            <li>
              <a href="./sobreNosotros.html">Sobre nosotros</a>
            </li>
            <li><a href="./servicios.html">Servicios</a></li>
            <li>
              <a href="./contacto.html">Información de contacto</a>
            </li>
            <li>
              <a href="./preguntasFrecuentes.html"
                >Preguntas frecuentes</a
              >
            </li>
             <li>
              <a href="../pdf/Politica.pdf" target="_blank"
                >Política de privacidad y términos de uso</a
              >
            </li>

            <li>
             <a href="#" id="cerrarSesion">Cerrar sesión</a>
            </li>

          </ul>
        </nav>
      </header>
`;
contenedorPrincipal.insertAdjacentHTML("afterbegin", navbar);
