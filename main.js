
fetch('https://api.openf1.org/v1/drivers?session_key=latest')
  .then(response => response.json())
  .then(data => {
    console.log('Pilotos cargados desde la API:');
    console.log(data);

    const pilotoContainer = document.getElementById('pilotoContainer');

    let pilotos = [];

    pilotos = data.map(driver => ({
      nombre: driver.full_name || "Sin Nombre",
      equipo: driver.team_name || "Sin Equipo",
      numero: driver.driver_number || "N/A",
      pais: driver.country_code || "N/A"
    }));

    mostrarPilotosConForEach();
  })
  .catch(error => {
    console.error('Error al leer la API:', error);
  });

function mostrarPilotosConForEach(lista = pilotos) {
  pilotoContainer.innerHTML = "";
  lista.forEach(piloto => {
    pilotoContainer.innerHTML += `
      <article class="card">
        <h2>${piloto.nombre}</h2>
        <p>Equipo: ${piloto.equipo}</p>
        <p>Número: ${piloto.numero}</p>
        <p>País: ${piloto.pais}</p>
      </article>
    `;
  });
}

const buscador = document.getElementById('buscador');
const filtroEquipo = document.getElementById('filtrarEquipo');


function filtrar() {
  const eq = filtroEquipo.value.trim().toLowerCase();
  const pilotosFiltrados = pilotos.filter(piloto => {
    return eq === "" || piloto.equipo.toLowerCase().includes(eq);
  });
  mostrarPilotosConForEach(pilotosFiltrados);
}

function buscar() {
  const texto = buscador.value.toLowerCase().trim();

  const pilotosFiltrados = pilotos.filter(piloto => {
    return piloto.nombre.toLowerCase().includes(texto)
      || piloto.equipo.toLowerCase().includes(texto)
      || String(piloto.numero).includes(texto);
  });

  mostrarPilotosConForEach(pilotosFiltrados);
}

filtroEquipo.addEventListener("change", filtrar);
buscador.addEventListener("input", buscar);