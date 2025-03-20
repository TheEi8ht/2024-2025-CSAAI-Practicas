
// Función que rinicia todo

function reset()    {

    console.log('Reseteando')

    crono.stop();
    crono.reset();

    display.removeAttribute('style');

    intentos.init(intentos_i);
    contra.init(4);
    numeros.init();

};

// Modos de juego

let restar = true;
let intentos_i = 10;

// Facil

let facil = document.getElementById('facil');

facil.style.backgroundColor = 'rgba(0, 144, 0, 0.8)';

facil.onclick = function()  {

    restar = false;
    intentos_i = 10;

    reset();

    facil.style.backgroundColor = 'rgba(0, 144, 0, 0.8)';
    normal.removeAttribute('style');
    dificil.removeAttribute('style');

};

let normal = document.getElementById('normal');

normal.onclick = function() {

    restar = true;
    intentos_i = 10;

    reset();

    normal.style.backgroundColor = 'rgba(155, 106, 0, 0.84)';
    facil.removeAttribute('style');
    dificil.removeAttribute('style');

};

let dificil = document.getElementById('dificil');

dificil.onclick = function()    {

    restar = false;
    intentos_i = 5;

    reset();

    dificil.style.backgroundColor = 'rgba(80, 80, 80, 0.5)';
    facil.removeAttribute('style');
    normal.removeAttribute('style');

};

// Codigo secreto

let contra = {

    init: function(n)    {

        console.log('Contraseña (init)');

        // Crear el código secreto

        let codigo = Math.floor(Math.random() * (10 ** n)).toString().padStart(4, '0');

        console.log(codigo);
        
        codigo = Array.from(codigo);
        
        // Guardar cada digito en una variable

        this.cont = {};
        this.cont['c0'] = codigo[3];
        this.cont['c1'] = codigo[2];
        this.cont['c2'] = codigo[1];
        this.cont['c3'] = codigo[0];

        this.aciertos = 0;

        // Poner los valores por defecto

        for (key of Object.keys(this.vals)) {

            this.vals[key].innerHTML = '*';
            this.vals[key].removeAttribute('style');

        };

    },

    vals: {

        'c0': document.getElementById('c0'),
        'c1': document.getElementById('c1'),
        'c2': document.getElementById('c2'),
        'c3': document.getElementById('c3')

    },

    cambiar: function(clave, valor) {

        // Función para hacer cambiar el valor de un asterisco por su número

        this.aciertos ++;

        this.vals[clave].style.animation = 'correcto 0.15s infinite alternate';

        let self = this;

        setTimeout(() => {

            self.vals[clave].style.animation = null;

        }, 1500)

        this.vals[clave].innerHTML = valor;
        this.vals[clave].style.color = 'rgb(0, 255, 0)';
        this.cont[clave] = null;

        if (this.aciertos == 4) {

            crono.stop();
            display.style.animation = null;

        };

    },

};

contra.init(4);

// Poner el display del cronometro

let display = document.getElementById('cont');
let crono = new Crono(display);

// Coger el número de intentos restantes

let intentos = {

    init: function(total)   {

        console.log('intentos (init)');

        this.restantes = total;
        this.obj.innerHTML = this.msj + this.restantes.toString();
        this.obj.removeAttribute('style');

    },

    obj: document.getElementById('intentos'),

    msj: 'Intentos restantes: ',

    in_animacion: false,

    intento: function(acierto) {

        if (!acierto || (acierto & restar)) {

            this.restantes --;

        };

        if (this.restantes == 6)    {

            this.obj.style.color = 'rgb(255, 150, 0)';
            this.obj.style.borderColor = 'rgb(255, 150, 0)';
            this.obj.style.animation = 'parpadeo 0.16s infinite alternate';
            display.style.animation = 'parpadeo 0.16s infinite alternate';
            display.style.borderColor = 'rgb(255, 150, 0)';

            let self = this;

            setTimeout(() => {

                if (!self.in_animacion)    {

                    self.obj.style.animation = null;
                    display.style.animation = null;

                };

            }, 1000);

        } else if (this.restantes == 3) {

            this.obj.style.color = 'rgb(255, 0, 0)';
            this.obj.style.borderColor = 'rgb(255, 0, 0)';
            this.obj.style.animation = 'parpadeo_ult 0.18s infinite alternate';
            display.style.animation = 'parpadeo_ult 0.18s infinite alternate';
            display.style.borderColor = 'rgb(255, 0, 0)';
            this.in_animacion = !this.in_animacion;

            let self = this;

            setTimeout(() => {

                this.in_animacion = !this.in_animacion;
                self.obj.style.animation = null;

            }, 1000);

        };
        
        if (contra.aciertos != 4 & this.restantes == 0)   {

            alert("Has perdido la partida :(");

            reset();

        };

        this.obj.innerHTML = this.msj + this.restantes.toString();

    }

};

intentos.init(intentos_i);

// let intentos = document.getElementById('num_intentos');

// Coger las teclas de los números

let numeros = {

init: function()    {

    console.log('numeros (init)');

    let self = this;

    for (i = 0; i <= 9; i++)    {

        self[i] = document.getElementById('n' + i.toString());

        self[i].removeAttribute('style')

        self[i].onclick = function(evt)    {

            crono.start();

            const num = evt.target.innerHTML;
            const clave = Object.values(contra.cont);

            let acierto =  false;

            if (clave.includes(num))  {

                const ayu = Object.keys(contra.cont).find(key => contra.cont[key] == num);
                contra.cambiar(ayu, num)

                acierto = true;

            } else  {

                evt.target.style.backgroundColor = 'rgba(74, 108, 217, 0.7)';
                evt.target.style.color = 'orange';

            };

            intentos.intento(acierto);

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

};
