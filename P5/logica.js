
class Nodo  {

    constructor(id, del, x, y, radio)   {

        this.id = id;
        this.delay = del;
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.caminos = [];

    }

    mostrar()   {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'blue';

        ctx.stroke();
        ctx.fill();

        ctx.closePath();

        ctx.font = "15px Helvetica";
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`N${this.id}`, this.x, this.y - 5);
        ctx.fillText(`${this.delay.toString().padEnd(6, '0')}s`, this.x, this.y + 10);

    }


}

function mostrar_caminos()  {

    for (let camino of redes.caminos)    {
        
        ctx.beginPath()

        start = redes.nodos[camino[0]];
        end = redes.nodos[camino[1]];
        peso = Math.round(camino[2]*100)/100;

        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'gray';
        ctx.stroke();

        ctx.closePath();

        ctx.font = "15px Helvetica";
        ctx.fillStyle = 'rgb(0, 229, 255)';
        ctx.textAlign = 'center';
        ctx.fillText(`N${start.id} - N${end.id}`, Math.min(start.x, end.x) + Math.abs(start.x - end.x)/2, Math.min(start.y, end.y) + Math.abs(start.y - end.y)/2 - 10);
        ctx.fillText(`pw ${peso}`, Math.min(start.x, end.x) + Math.abs(start.x - end.x)/2, Math.min(start.y, end.y) + Math.abs(start.y - end.y)/2 + 10)

    }

}


function caminosDisponibles(nodo)   {
    
    let nodos_disponibles = [...redes.nodos].splice(nodo.id+1, redes.nodos.length - nodo.id - 1).filter(val => val.caminos.length < 2);
    let nodos_eliminados = [];
    let nodos_aux = [];
    let nodos_aux2 = [];

    for (let i = 0; i < nodos_disponibles.length; i ++)   {

        if (nodos_disponibles[i].caminos.length > 0)  {

            nodos_aux = [...nodos_disponibles].splice(i + 1, nodos_disponibles.length - i - 1).filter((val) => val.caminos.length == 1);
            nodos_aux2 = [...nodos_disponibles].splice(0, i).filter(val => val.caminos.length > 0);

            if (nodos_disponibles[i].caminos[0].go == nodo || ((nodos_aux.length == 0) && i != nodos_disponibles.length-1) || (nodos_aux2.length == 0 && i != 0)) {

                nodos_eliminados.push(i);

            }

        }

    }

    for (let i = 0; i < nodos_eliminados.length; i ++)  {

        nodos_disponibles.splice(nodos_eliminados[nodos_eliminados.length - i - 1], 1);

    }

    return nodos_disponibles;


}

function crearCaminos(nodo)  {

    let caminos_disponibles;
    let n_random;
    let len_caminos = [...nodo.caminos].length;
    let nodo_escogido;
    let peso;

    for (let i = 0; i < 2 - len_caminos; i ++)  {
        
        caminos_disponibles = caminosDisponibles(nodo);

        n_random = Math.floor(Math.random()*caminos_disponibles.length);
        nodo_escogido = caminos_disponibles[n_random];

        peso = Math.sqrt(Math.pow(nodo.x - nodo_escogido.x, 2) + Math.pow(nodo.y - nodo_escogido.y, 2));
        
        nodo.caminos.push({go: caminos_disponibles[n_random], peso: peso});
        caminos_disponibles[n_random].caminos.push({go: nodo, peso: peso});
        
        redes.caminos.push([nodo.id, nodo_escogido.id, peso])

    }

}

function generar()  {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    redes.nodos = [];
    redes.caminos = [];
    const n_nodos = Math.floor((3/Math.sqrt(1.5))*Math.sqrt(Math.random()*1.5) + 3);
    let delay;
    let x;
    let y;
    let radio = 35;

    displays.nodos.innerHTML = `${n_nodos} Nodos`;
    displays.info.innerHTML = 'Red generada.'

    for (let i = 0; i < n_nodos; i ++)  {

        delay = Math.round((400/(0.35*Math.sqrt(2*Math.PI))) * Math.pow(Math.E, -0.5*Math.pow((Math.random() - 0.5)/0.35, 2)) * 100)/100;
        x = (canvas.width/n_nodos - (2*radio))*Math.random() + radio + (i*canvas.width/n_nodos);
        y = (canvas.height - (2*radio))*Math.random() + radio;

        redes.nodos.push(new Nodo(i, delay, x, y, radio));

    }

    for (let i = 0; i < n_nodos; i++)   {

        crearCaminos(redes.nodos[i]);

    }

    mostrar_caminos();

    for (let i = 0; i < n_nodos; i++)   {

        redes.nodos[i].mostrar();

    }

}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let redes = {nodos: [], caminos: []};

let botones = {generar: document.getElementById('generar'), calcular: document.getElementById('calcular')};

let displays = {nodos: document.getElementById('nodos'), info: document.getElementById('info')};

botones.generar.onclick = generar;