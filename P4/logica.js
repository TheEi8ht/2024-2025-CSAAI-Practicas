
function generar()  {

    let n = size.value;

    Array.from(tablero.children).forEach(hijo => {

        tablero.removeChild(hijo);

    });

    let carta = null;
    let frente = null;
    let atras = null;

    for (let i = 0; i < Math.pow(n, 2); i++)   {

        carta = document.createElement('div');
        carta.classList.add('carta');
        carta.style.width = `${(100/n - 10/n)}%`;
        carta.style.height = `${(100/n - 10/n)}%`;

        frente = document.createElement('div');
        frente.classList.add('frente');

        let mickey_img = document.createElement('img');
        mickey_img.src = 'mickey.png';
        mickey_img.alt = 'Imagen Mickey Mouse';

        frente.appendChild(mickey_img);

        atras = document.createElement('div');
        atras.classList.add('atras');

        carta.appendChild(frente);
        tablero.appendChild(carta);

    }

}

let botones = {

    start: document.getElementById('comenzar'),
    restart: document.getElementById('reinicar'),
    size: document.getElementById('size')

};


let tablero = document.getElementById('tablero');

size.addEventListener('change', () => {

    generar();

});

generar();
