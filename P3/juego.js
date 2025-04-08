console.log('Comenzando juego');

//-- Declaración de variables y objetos

let proyectiles = {

    lista: [],

    logica: function() {

        if (this.lista.length > 0)  {

            this.lista.forEach(proyect => {
            
                proyect.logica();
    
            });

            this.lista = this.lista.filter(proyect => proyect.y >= 0);

        }
        
    },

    mostrar: function() {

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

    mostrar: function() {

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
            
                jug.logica();
    
            });

        }
        
    },

    mostrar: function() {

        if (this.lista.length > 0)  {

            this.lista.forEach(jug => {
                
                jug.mostrar();
    
            });

        }

    }

};

let modo = 1;

//-- Obtención del canvas y de los elementos HTML a usar

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let menu_principal = document.getElementById('menu_principal');
let modos = [document.getElementById('un_jugador'), document.getElementById('dos_jugadores')];
let start = document.getElementById('empezar');
let reinicio = document.getElementById('restart');

// Botones de los jugadores

let zona_jugadores = document.getElementById('jugadores');
let zonas_botones = [document.getElementById('p1'), document.getElementById('p2')];
let botones_jugadores = {
    tecla: ['ArrowLeft', 'ArrowRight', ' ', 'a', 'd', 'w'],
    boton: [document.getElementById('disp_1'), document.getElementById('der_1'), document.getElementById('izq_1'),
            document.getElementById('disp_2'), document.getElementById('der_2'), document.getElementById('izq_2')]
}

let boton_niveles = document.getElementById('nivel');

let sonido_disparo = document.getElementById('disparo');
let sonido_explosion = document.getElementById('explosion');
let sonido_win = document.getElementById('win');
let sonido_derrota = document.getElementById('derrota');

let skins_naves = [document.getElementById('nave_2'), document.getElementById('nave')];
const skin_alien = document.getElementById('alien');
const skin_explosion = document.getElementById('explosion_img');
const barra_espaciadora = document.getElementById('barra_espaciadora');

let partida_empezada = false;
let partida = new Partida();

//-- Función principal de actualización
function update()   {

    //-- Implementación del algoritmo de animación:

    //-- 1) Actualizar posición de los elementos
    if (partida.modo != 0)    {

        partida.logica();

    }

    //-- 2) Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //-- 3) Pintar los elementos en el canvas
    if (partida)    {

        partida.mostrar();

    }

    //-- 4) Repetir
    requestAnimationFrame(update);

}

//-- Otras funciones...

modos.forEach((boton_modo, ind) => {

    boton_modo.onclick = () => {

        modo = ind + 1;

    };

});

start.onclick = () => {

    for (let i = 0; i < modo; i ++) {

        zonas_botones[i].style.display = 'flex';

    }

    inicio_partida();

};

function inicio_partida()   {

    partida.nivel(3, 8);

    for (let i = 0; i < 3*modo; i ++)  {

        let boton = botones_jugadores.boton[i];
        let tecla = botones_jugadores.tecla[(3*modo-1)-i];
    
        boton.addEventListener('mousedown', function()   {
    
                document.dispatchEvent(new KeyboardEvent('keydown', {
        
                    key: tecla,
                    bubbles: false
                  
                }));
        
            });
        
            boton.addEventListener('mouseup', function()   {
        
                document.dispatchEvent(new KeyboardEvent('keyup', {
        
                    key: tecla,
                    bubbles: false
                  
                }));
        
            });
    
            boton.addEventListener('touchstart', function(evt)   {
    
                evt.preventDefault();
    
                document.dispatchEvent(new KeyboardEvent('keydown', {
        
                    key: tecla,
                    bubbles: false
                  
                }));
        
            });
        
            boton.addEventListener('touchend', function()   {
        
                document.dispatchEvent(new KeyboardEvent('keyup', {
        
                    key: tecla,
                    bubbles: false
                  
                }));
        
            });
    
    }

    partida_empezada = true;

}

function fin_partida()  {

    partida_empezada = false;
    partida.modo = 3;

    zona_jugadores.style.display = 'none';
    reinicio.style.display = 'flex';

    jugadores.lista.splice(0);

    console.log('Partida perdida...');

}

function restart()  {

    partida.modo = 0;

    reinicio.style.display = 'none';
    menu_principal.style.display = 'flex';

}

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez
update();
