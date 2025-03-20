
// Poner el display del cronometro

let display = document.getElementById('cont');
let crono = new Crono(display);

function reset()    {

    crono.stop();
    crono.reset();

    intentos.init(10);
    contra.init(4);
    numeros.init();

};

// Coger el número de intentos restantes

let intentos = {

    init: function(total)   {

        console.log('intentos (init)');

        this.restantes = total;
        this.obj.innerHTML = this.msj + this.restantes.toString();

    },

    obj: document.getElementById('intentos'),

    msj: 'Intentos restantes: ',

    intento: function() {

        this.restantes --;

        if (this.restantes == 0)    {

            alert("Has perdido la partida :(");

            reset();

        };

        this.obj.innerHTML = this.msj + this.restantes.toString();

    }

};

intentos.init(10);

// let intentos = document.getElementById('num_intentos');

// Coger las teclas de los números

let numeros = {

init: function()    {

    console.log('numeros (init)');

    let self = this;

    for (i = 0; i <= 9; i++)    {

        self[i] = document.getElementById('n' + i.toString());

        self[i].style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        self[i].style.color = 'white';

        self[i].onclick = function(evt)    {

            crono.start();

            const num = evt.target.innerHTML;
            const clave = Object.values(contra.cont);

            if (clave.includes(num))  {

                const ayu = Object.keys(contra.cont).find(key => contra.cont[key] == num);
                contra.vals[ayu].innerHTML = num;
                contra.vals[ayu].style.color = '#00FF00';
                contra.cont[ayu] = null;

                contra.aciertos ++;

            } else  {

                evt.target.style.backgroundColor = '#FF9900';
                evt.target.style.color = 'black';

            };

            if (contra.aciertos == 4) {

                crono.stop();

            };

            intentos.intento();

        };

    };

}

};

numeros.init();

// Coger botones: Start, Stop y Restart

const empezar = document.getElementById('start');

empezar.onclick = function()  {

    crono.start();

};

const parar = document.getElementById('stop');

parar.onclick = function()   {

    crono.stop();

};

const reseteo = document.getElementById('restart');

reseteo.onclick = function()    {

    reset();

}

// Codigo secreto

let contra = {

    init: function(n)    {

        console.log('contraseña (init)');

        let codigo = Array.from(Math.floor(Math.random() * (10 ** n)).toString().padStart(4, '0'));
        
        this.cont = {};
        this.cont['c0'] = codigo[3];
        this.cont['c1'] = codigo[2];
        this.cont['c2'] = codigo[1];
        this.cont['c3'] = codigo[0];

        this.aciertos = 0;

        for (key of Object.keys(this.vals)) {

            this.vals[key].innerHTML = '*';
            this.vals[key].style.color = 'white';

        };

    },

    vals: {

        'c0': document.getElementById('c0'),
        'c1': document.getElementById('c1'),
        'c2': document.getElementById('c2'),
        'c3': document.getElementById('c3')

    }

};

contra.init(4);