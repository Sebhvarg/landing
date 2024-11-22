let ready = () => {
    console.log('DOM está listo')

}
var cont = 0;

let load = () => {

    console.log('Cargando recursos')
    let loader = document.getElementById('loader');
    loader.style.display = 'none';
    let main = document.getElementById('main');
    main.style.display = 'block';
    let footer = document.getElementById('footer');
    footer.style.display = 'block';

    let form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        sendData();
    });

}


const databaseURL = "https://landing-2bca6-default-rtdb.firebaseio.com/collection.json";

let sendData = () => {

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' });
    // Realiza la petición POST con fetch
    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            form.reset()
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });

}