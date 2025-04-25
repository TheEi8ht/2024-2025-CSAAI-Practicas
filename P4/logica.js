
function victoria() {

    win.innerHTML = `Has ganado!!!<br>Has realizado un total de ${displays.movs} intentos en un tiempo de ${displays.time.sec}.${displays.time.cen} segundos`
    win.classList.add('victoria');

    displays.parar();

}

function reset()    {

    win.classList.remove('victoria');

    cartas_seleccionadas.comprobando = true;
    botones.restart.style.display = 'none';
    botones.start.style.display = 'inline-block';
    size.disabled = false;
    size.classList.remove('deshabilitado');

    Array.from(tablero.children).forEach(carta => {

        carta.classList.remove('girada');

    });
    
    cartas_seleccionadas[1] = null;
    cartas_seleccionadas[2] = null;
    cartas_seleccionadas.acertadas = 0;
    displays.reset();

    setTimeout(() => {

        generar();
        cartas_seleccionadas.comprobando = false;

    }, 600);
    

}

function girar(carta)    {
    
    if (!displays.timer)    {

        iniciar();

    }

    if (!cartas_seleccionadas.comprobando)   {

        displays.movs ++;
        displays.movimientos.innerHTML = `${displays.movs.toString()} Movimientos`;

        flip = carta.parentNode;
        flip.classList.add('girada');

        cartas_seleccionadas[displays.movs % 2 + 1] = flip;

        if (displays.movs % 2 == 0) {

            cartas_seleccionadas.comprobar();

        }

    }

}

function sel_imagenes(n)  {

    let img_sel = [];
    let img_disp = [...imagenes];
    let img_i = null;
    let rn = 0;

    for (let i = 0; i < n; i++) {

        rn = Math.floor(Math.random()*img_disp.length);
        img_i = document.createElement('img');
        img_i.src = 'sources/' + img_disp[rn].src;
        img_i.alt = img_disp[rn].name;
        img_sel.push(img_i);
        img_disp.splice(rn, 1);
    }

    img_sel = img_sel.concat(img_sel.map(img => img.cloneNode(true)));

    for (let i = 0; i < img_sel.length; i++) {

        rn = Math.floor(Math.random() * img_sel.length);
        [img_sel[i], img_sel[rn]] = [img_sel[rn], img_sel[i]];

    }

    return img_sel;

}

function generar()  {

    let n = size.value;

    Array.from(tablero.children).forEach(hijo => {

        tablero.removeChild(hijo);

    });

    let carta = null;
    let frente = null;
    let atras = null;

    let imgs = sel_imagenes(Math.pow(n, 2)/2);

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

        atras.appendChild(imgs[i]);

        frente.onclick = (evt) => {

            girar(evt.target);

        };

        carta.appendChild(frente);
        carta.appendChild(atras);
        tablero.appendChild(carta);

    }

}

function iniciar()  {

    displays.crono();
    botones.start.style.display = 'none';
    botones.restart.style.display = 'inline-block';
    size.disabled = true;
    size.classList.add('deshabilitado');

}

let botones = {

    start: document.getElementById('comenzar'),
    restart: document.getElementById('reiniciar'),
    size: document.getElementById('size')

};

botones.start.onclick = iniciar;

botones.restart.onclick = reset;

let tablero = document.getElementById('tablero');
let win = document.getElementById('victoria');

let imagenes = [
    {src: 'alegria.webp', name: 'Alegría'},
    {src: 'asco.webp', name: 'Asco'},
    {src: 'buzz.webp', name: 'Buzz Lightyear'},
    {src: 'casa.webp', name: 'Casa Up'},
    {src: 'donald.webp', name: 'Pato Donald'},
    {src: 'dory.webp', name: 'Dory'},
    {src: 'Furia.webp', name: 'Furia'},
    {src: 'goofy.webp', name: 'Goofy'},
    {src: 'mickey.webp', name: 'Mickey Mouse'},
    {src: 'miedo.webp', name: 'Miedo'},
    {src: 'mike.webp', name: 'Mike Wazowski'},
    {src: 'minnie.png', name: 'Minnie Mouse'},
    {src: 'nemo.webp', name: 'Nemo'},
    {src: 'pluto.webp', name: 'Pluto'},
    {src: 'potato.webp', name: 'Señor Potato'},
    {src: 'Stitch.webp', name: 'Stitch'},
    {src: 'tristeza.webp', name: 'Tristeza'},
    {src: 'Woody.webp', name: 'Woody'}
]

size.addEventListener('change', () => {

    generar();

});

let cartas_seleccionadas = {

    1: null,
    2: null,
    acertadas: 0,
    comprobando: false,
    comprobar: function()   {

        this.comprobando = true;

        let self = this;

        let ayu = false;

        if (self[1].children[1].firstChild.alt == self[2].children[1].firstChild.alt)   {

            self.acertadas ++;
            ayu = true;
            

        }

        if (self.acertadas == Math.pow(botones.size.value, 2)/2)    {

            victoria();

        }

        setTimeout(function() {

            if  (!ayu)    {

                self[1].classList.remove('girada');
                self[2].classList.remove('girada');

            }

            self.comprobando = false;

        }, 500);

    }

};

let displays = {

    movimientos: document.getElementById('intentos').firstChild,
    tiempo: document.getElementById('tiempo').firstChild,
    movs: 0,
    time: {min: 0, sec: 0, cen: 0},
    timer: null,
    crono: function() {

        let self = this;

        let texto = null;

        if (!this.timer)    {
            
            self.timer = setInterval(() => {

                self.time.cen ++;

                if (self.time.cen == 100)    {

                    self.time.sec ++;
                    self.time.cen = 0;

                }

                texto = self.time.sec.toString() + '.' + self.time.cen.toString().padStart(2, '0') + ' Segundos';

                self.tiempo.innerHTML = texto;

            }, 10);

        }

    },

    parar: function() {

        clearInterval(this.timer);
        this.timer = null;

    },
    reset: function() {

        this.movs = 0;
        this.parar();
        this.time = {min: 0, sec: 0, cen: 0};
        this.movimientos.innerHTML = '0 Movimientos';
        this.tiempo.innerHTML = '0 Segundos';

    }

};

generar();
