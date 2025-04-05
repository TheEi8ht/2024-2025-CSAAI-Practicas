console.log('Comenzando juego');

//-- Declaración de variables y objetos

let proyectiles = {

    lista: [],

    logica: function() {

        if (this.lista.length > 0)  {

            this.lista.forEach(proyect => {
            
                proyect.logica(this.lista);
    
            });

            this.lista = this.lista.filter(proyect => proyect.y >= 0);

        }
        
    },

    mostrar: function(ctx) {

        if (this.lista.length > 0)  {

            this.lista.forEach(proyect => {
                
                proyect.mostrar(ctx);
    
            });

        }

    }

};

//-- Obtención del canvas y de los elementos HTML a usar

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//-- Función principal de actualización
function update()   {

  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posición de los elementos
  proyectiles.logica();

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Pintar los elementos en el canvas
  proyectiles.mostrar(ctx);

  //-- 4) Repetir
  requestAnimationFrame(update);

}

//-- Otras funciones....



document.addEventListener('keydown', (evt) => {

    if (evt.key === ' ' && !evt.repeat)    {

        proyectiles.lista.push(new Proyectil(Math.random() * 600, 500));

    }

});

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez
update();
