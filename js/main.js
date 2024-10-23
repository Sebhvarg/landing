let ready = () => {
    console.log('DOM está listo')
    
}
var cont = 0;

let loaded = () => {

    let myform = document.getElementById('form');
       
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault(); 
           
        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;

        if (emailText.length === 0) {
          emailElement.focus();
          emailElement.animate([
            { transform: "translateX(0)" },
            { transform: "translateX(50px)" },
            { transform: "translateX(-50px)" },
            { transform: "translateX(0)" }
        ],
        {
            duration: 400,
            easing: "linear",
        }
    );
          
          console.log('Campo vacío');
        }
    })

  }
  
window.addEventListener("DOMContentLoaded", ready);
 window.addEventListener("load", loaded);
 window.addEventListener("click", function(){
    cont++;
    console.log('Click en la ventana: '+ cont);
    if(document.body.style.backgroundColor == "yellow"){
        document.body.style.backgroundColor = "white";
        console.log('Cambio a blanco');
    }else{
        document.body.style.backgroundColor = "yellow";
        console.log('Cambio a amarillo');
    }
        
    });

