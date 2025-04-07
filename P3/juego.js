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
                
                proyect.mostrar();
    
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
                
                enemy.mostrar();
    
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
                
                explo.mostrar();
    
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

let modo = 2;

//-- Obtención del canvas y de los elementos HTML a usar

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let boton_niveles = document.getElementById('nivel');
let zona_jugadores = document.getElementById('jugadores');

// Botones de los jugadores

let botones_jugadores = {
    tecla: ['ArrowLeft', 'ArrowRight', ' ', 'a', 'd', 'w'],
    boton: [document.getElementById('disp_1'), document.getElementById('der_1'), document.getElementById('izq_1'),
            document.getElementById('disp_2'), document.getElementById('der_2'), document.getElementById('izq_2')]
}

/*{

    'ArrowLeft': document.getElementById('izq_2'),
    'a': document.getElementById('izq_1'),
    'ArrowRight': document.getElementById('der_2'),
    'd': document.getElementById('der_1'),
    ' ': document.getElementById('disp_2'),
    'w': document.getElementById('disp_1')    

};*/

let sonido_disparo = document.getElementById('disparo');
let sonido_explosion = document.getElementById('explosion');
let sonido_win = document.getElementById('win');
let sonido_derrota = document.getElementById('derrota');

let skins_naves = [document.getElementById('nave_2'), document.getElementById('nave')];
const skin_alien = document.getElementById('alien');
const skin_explosion = document.getElementById('explosion_img');

let partida = new Partida();
partida.nivel(3, 8);

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

//-- Otras funciones...

for (let i = 0; i < 3*modo; i ++)  {

    let boton = botones_jugadores.boton[i];
    let tecla = botones_jugadores.tecla[(3*modo-1)-i];
    console.log(boton);
    console.log(tecla);

    boton.addEventListener('mousedown', function()   {

            document.dispatchEvent(new KeyboardEvent('keydown', {
    
                key: tecla,
                bubbles: true
              
            }));
    
        });
    
        boton.addEventListener('mouseup', function()   {
    
            document.dispatchEvent(new KeyboardEvent('keyup', {
    
                key: tecla,
                bubbles: true
              
            }));
    
        });

}

/*let ayu = 1;

for (const [tecla, boton] of Object.entries(botones_jugadores)) {

    if (ayu % modo == 0)   {

        boton.addEventListener('mousedown', function()   {

            document.dispatchEvent(new KeyboardEvent('keydown', {
    
                key: tecla,
                bubbles: true
              
            }));
    
        });
    
        boton.addEventListener('mouseup', function()   {
    
            document.dispatchEvent(new KeyboardEvent('keyup', {
    
                key: tecla,
                bubbles: true
              
            }));
    
        });

    }

    ayu ++;

}*/

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez
update();
