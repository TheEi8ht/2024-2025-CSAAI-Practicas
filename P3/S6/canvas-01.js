console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 800;
canvas.height = 500;

// El contexto sirve para dibujar. Es un elemento especial

const ctx = canvas.getContext("2d");

// Sirve para empezar un trazado (dibujo). Dentro se dice lo que se dibuja

ctx.beginPath();

//Crea un rectangulo (x, y, width, height)
ctx.rect(5,5, 100, 50);

// Establece un estilo de relleno. Por defecto el relleno y el borde son negros.
ctx.fillStyle = 'red';

// Cambiar el grosor del trazo
ctx.lineWidth = 4;

// Bordea el trazado
ctx.stroke();

// Rellena el trazado
ctx.fill();

// Cierra el trazado
ctx.closePath();

//LINEA RECTA
ctx.beginPath();

// Donde se empieza la línea (x, y)
ctx.moveTo(20, 20);

// Donde acaba la linea (x, y)
ctx.lineTo(500, 20);

// Grosor de la linea
ctx.lineWidth = 8;

// Color del trazado
ctx.strokeStyle = 'red';

// Siempre después de todas las opciones del contorno
ctx.stroke();

ctx.closePath();

// ARCOS, CIRCULOS Y CIRCUNFERENCIAS
ctx.beginPath();

// Dibujar un arco (x, y, radio, angulo inicial, angulo final)
ctx.arc(100, 100, 88, 0, -3*Math.PI/4);

ctx.lineWidth = 8;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'black';

ctx.stroke();
ctx.fill();

ctx.closePath();

// TEXTO (No funciona)

ctx.font = "25px Arial";
ctx.fillStyle = 'yellow'
ctx.fillText("Texto sólido", 10, 30);

//-- Texto trazo
ctx.strokeStyle = 'red';
ctx.font = "50px Arial";
ctx.lineWidth = 2;
ctx.strokeText("Texto trazo", 5, 80);

// IMAGENES

var logo = document.getElementById('logo-urjc');

logo.onload = () => {
    //-- Insertar la imagen en el canvas, una vez que
    //-- ya esté cargada!
    ctx.drawImage(logo, 50,50);
  };
