console.log('Comenzando juego');

//-- Declaración de variables y objetos

let proyectiles = {

    lista: [],

    logica: function(enemigos) {

        if (this.lista.length > 0)  {

            this.lista.forEach(proyect => {
            
                proyect.logica(enemigos, this);
    
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

let enemigos = {

    lista: [],

    logica: function() {

        if (this.lista.length > 0)  {

            this.lista.forEach(enemy => {
            
                enemy.logica(this.lista);
    
            });

            this.lista = this.lista.filter(enemy => enemy.eliminado != true);

        }
        
    },

    mostrar: function(ctx) {

        if (this.lista.length > 0)  {

            this.lista.forEach(enemy => {
                
                enemy.mostrar(ctx);
    
            });

        }

    }

};

let explosiones = {

    lista: [],

    logica: function()  {

        if (this.lista.length > 0)  {
            
            this.lista.forEach(explo => {
            
                explo.logica(this.lista);

            });

            this.lista = this.lista.filter(explo => explo.terminado != true);

        }

    },

    mostrar: function() {

        if (this.lista.length > 0)  {

            this.lista.forEach(explo => {
                
                explo.mostrar(explo);
    
            });

        }

    }

}

let jugadores = {

    lista: [],

    enemigos_restantes: 0,

    logica: function() {

        if (this.lista.length > 0)  {

            this.lista.forEach(jug => {
            
                jug.logica(this.lista);
    
            });

        }
        
    },

    mostrar: function(ctx) {

        if (this.lista.length > 0)  {

            this.lista.forEach(jug => {
                
                jug.mostrar(ctx);
    
            });

        }

    }

};

const skin_nave = document.getElementById('nave');
const skin_alien = document.getElementById('alien');

//-- Obtención del canvas y de los elementos HTML a usar

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let boton_niveles = document.getElementById('nivel');
let sonido_disparo = document.getElementById('disparo');
let sonido_explosion = document.getElementById('explosion');
let sonido_win = document.getElementById('win');
let sonido_derrota = document.getElementById('derrota');

let skin_explosion = document.getElementById('explosion_img');

let partida = new Partida(jugadores, enemigos, proyectiles, canvas);
partida.nivel(3, 3);

//-- Función principal de actualización
function update()   {

    //-- Implementación del algoritmo de animación:

    //-- 1) Actualizar posición de los elementos
    partida.logica();

    //-- 2) Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //-- 3) Pintar los elementos en el canvas
    partida.mostrar(ctx);
    //-- 4) Repetir
    requestAnimationFrame(update);

}

//-- Otras funciones....

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez
update();
