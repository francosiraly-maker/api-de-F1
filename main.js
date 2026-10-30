
fetch('https://api.openf1.org/v1/drivers?session_key=9165')
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
  })
  .catch(error => {
    console.error('Error al leer la API:', error);
  });