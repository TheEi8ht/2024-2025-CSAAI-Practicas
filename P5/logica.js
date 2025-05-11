
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

    mostrar_usado() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00FF00';
        ctx.fillStyle = 'green';

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
        
        ctx.beginPath();

        let start = redes.nodos[camino[0]];
        let end = redes.nodos[camino[1]];
        let peso = Math.round(camino[2]*100)/100;

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
        ctx.fillText(`pw ${peso}`, Math.min(start.x, end.x) + Math.abs(start.x - end.x)/2, Math.min(start.y, end.y) + Math.abs(start.y - end.y)/2 + 10);

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
        
        nodo.caminos.push({in: nodo, go: caminos_disponibles[n_random], peso: peso});
        caminos_disponibles[n_random].caminos.push({in: caminos_disponibles[n_random], go: nodo, peso: peso});
        
        redes.caminos.push([nodo.id, nodo_escogido.id, peso]);

    }

}

function generar()  {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    redes.nodos = [];
    redes.caminos = [];
    redes.camino_generado = [];
    redes.tiempo_total = 0;

    displays.tiempo.innerHTML = 'Tiempo total: 0 segundos';

    const n_nodos = Math.floor((3/Math.sqrt(1.5))*Math.sqrt(Math.random()*1.5) + 3);
    let delay;
    let x;
    let y;
    let radio = 35;

    displays.nodos.innerHTML = `${n_nodos} Nodos`;
    displays.info.innerHTML = 'Red generada correctamente.';

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

function nodos_usados()  {

    for (let nodo of redes.camino_generado) {

        nodo.mostrar_usado();

    }

}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let redes = {nodos: [], caminos: [], camino_generado: [], tiempo_total: 0};

let botones = {generar: document.getElementById('generar'), calcular: document.getElementById('calcular')};

let displays = {nodos: document.getElementById('nodos'), tiempo: document.getElementById('tiempo'), info: document.getElementById('info')};

botones.generar.onclick = generar;
botones.calcular.onclick = () => {
    

    if (redes.nodos.length > 0) {

        [redes.camino_generado, redes.tiempo_total] = findDijkstra(redes.nodos[0], redes.nodos[redes.nodos.length - 1]);

        nodos_usados();

        displays.info.innerHTML = 'Camino calculado correctamente.';
        displays.tiempo.innerHTML = `Tiempo total: ${(Math.round(redes.tiempo_total*100)/100).toString().padEnd(2, '0')} segundos`;

    }   else    {

        displays.info.innerHTML = 'No se puede calcular la ruta. Genere una red primero.';

    }
    
};

