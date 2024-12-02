let ready = () => {
    console.log('DOM está listo')

    getData();

}

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {

    navbar.style.top = '-70px'; 
  } else {

    navbar.style.top = '0';
  }
  lastScrollTop = scrollTop;
});

const databaseURL = 'https://landing-2bca6-default-rtdb.firebaseio.com/data.json'; 

let senData = () => {
    // Corrige el nombre de la variable a `formData`
    const formData = new FormData(document.getElementById('form'));
    const data = Object.fromEntries(formData);
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
        document.getElementById('form').reset(); // Asegúrate de usar el id correcto

        getData();
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        console.error(error); // Log para depuración
    });

}
let getData = async () => { 

    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL, {
            method: 'GET'
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if(data != null) {
            //obtener la cantidad de eventos de Wrestlemania registrado
            let eventosFav = new Map();
            if (Object.keys(data).length > 0) {
                for (let key in data) {
                    let evento = data[key].eventoFavorito;
                    if (eventosFav.has(evento)) {
                        eventosFav.set(evento, eventosFav.get(evento) + 1);
                    } else {
                        eventosFav.set(evento, 1);
                    }

                        
            }
            
            
        }

        // Mostrar la cantidad de eventos de Wrestlemania registrados
        for (let [key, value] of eventosFav) {
            if(key === "WrestleMania"){
                document.getElementById('rWM').innerHTML = value;
            }
            if(key === "Royal Rumble"){
                document.getElementById('rRR').innerHTML = value;
            }
            if(key === "SummerSlam"){
                document.getElementById('rSSlam').innerHTML = value;
            }
            if(key === "Survivor Series"){
                document.getElementById('rSS').innerHTML = value;
            }
        }
        
    }
    
            // Mostrar la cantidad de eventos de Wrestlemania registrados

       
            

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. de WM ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }

}

let loaded = (eventLoader) => {

    let myform = document.getElementById('form');

    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault(); 
        senData();
        

    });

}
window.addEventListener("DOMContentLoaded", ready)
 window.addEventListener("load", loaded)

