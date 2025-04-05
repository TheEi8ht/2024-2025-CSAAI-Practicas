console.log('Creando realista');

//-- Declaración de variables y objetos

let t1 = Date.now();
let t2 = 0;
let t_dif = 0;

class pelota  {

    constructor(radio, x, y, v_x, v_y, a_x, a_y)   {

        this.radio = radio;
        this.x = x;
        this.y = y;
        this.v_x = v_x*377.941;
        this.v_y = v_y*377.941;
        this.a_x = a_x*377.941;
        this.a_y = a_y*377.941;

    }

    mostrar(ctx) {

        ctx.beginPath();

        ctx.arc(this.x + this.radio, this.y + this.radio, this.radio, 0, 2*Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'red';

        ctx.stroke();
        ctx.fill();

        ctx.closePath();

    }

    posicion(t)  {

        this.x += this.v_x*t;
        this.y -= this.v_y*t;

        if (this.y >= canvas.height - 2*this.radio)    {

            this.v_y *= -(0.8);
            this.v_x *= 0.95
            this.y = canvas.height - 2*this.radio;

        } else if(this.y <= 0)   {

            this.v_y *= -(0.8);
            this.v_x *= 0.95
            this.y = 0;

        }

        if (this.x >= canvas.width - 2*this.radio)    {

            this.v_x *= -(0.95);
            this.x = canvas.width - 2*this.radio;

        } else if(this.x <= 0)   {

            this.v_x *= -(0.95);
            this.x = 0;

        }

        this.velocidad(t);

    }

    velocidad(t) {

        this.v_x += this.a_x*t;
        this.v_y += this.a_y*t;

    }

}

//-- Obtención del canvas y de los elementos HTML a usar

let canvas = document.getElementById('canvas');

canvas.width = 1400;
canvas.height = 500;
let ctx = canvas.getContext('2d');

let pelota_1 = new pelota(20, 0, 100, 2, 2, 0, -9.8)
let pelota_2 = new pelota(20, 0, 200, 0, -10, 0, 0)
pelota_1.mostrar(ctx);

//-- Función principal de actualización
function update()   {

  //-- Implementación del algoritmo de animación:
  t2 = Date.now();
  t_dif = (t2 - t1)/1000;
  t1 = t2;

  //-- 1) Actualizar posición de los elementos
  pelota_1.posicion(t_dif);

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Pintar los elementos en el canvas
  pelota_1.mostrar(ctx);

  //-- 4) Repetir
  requestAnimationFrame(update);

}

//-- Otras funciones....

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez
update();