
class Jugador   {

    constructor(skin, btns, vx, vp, id, x=0)   {

        this.skin = skin;
        this.botones = botones;
        this.vx = vx;
        this.v_proyectil = vp;
        this.btns = btns;
        this.x = x;
        this.y = canvas.height - 55;
        this.vidas = 3;
        this.id = id;

        let self  = this;
        self.teclas = {};

        document.addEventListener('keydown', (evt) => {

            if ((evt.key === ' ' || evt.key === 'w') && evt.repeat && !modo_desarrollador)  {

                delete self.teclas[evt.key];

            }   else    {

                self.teclas[evt.key] = true;

            }
        
        });

        document.addEventListener('keyup', (evt) => {

            delete self.teclas[evt.key];

        });

    }

    logica()    {

        if (this.teclas[this.btns[2]])    {
                
            proyectiles.lista.push(new Proyectil(this.x + 17.5, this.y - 8, 'red', 0, this.v_proyectil));
            
            if (!modo_desarrollador)    {

                delete this.teclas[this.btns[2]];

            }
    
        }
        
        if (this.teclas[this.btns[1]]) {

            this.x += this.vx;

        }
        
        if (this.teclas[this.btns[0]])  {

            this.x -= this.vx;

        }

        if (this.x < 0) {

            this.x = 0;

        }   else if (this.x > canvas.width - 35)   {

            this.x = canvas.width - 35;

        }

    }

    mostrar()    {

        ctx.drawImage(this.skin, this.x, this.y);

        for (let i = 0; i < this.vidas; i ++)   {

            ctx.drawImage(vida_img, (i*22)*(1 - this.id) + (canvas.width - i*22 - 19)*(this.id), canvas.height - 20);

        }

    }

}