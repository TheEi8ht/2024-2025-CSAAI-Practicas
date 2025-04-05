
class Jugador   {

    constructor(skin, vx, vp, proyectiles, canvas)   {

        this.skin = skin;
        this.vx = vx;
        this.v_proyectil = vp;
        this.proyectiles = proyectiles;
        this.x = canvas.width/2 - 18;
        this.y = canvas.height - 55;
        this.canvas = canvas;

        let self  = this;
        self.teclas = {};

        document.addEventListener('keydown', (evt) => {

            if (evt.key === ' ' && evt.repeat)  {

                delete self.teclas[' ']

            }   else    {

                self.teclas[evt.key] = true;

            }
        
        });

        document.addEventListener('keyup', (evt) => {

            delete self.teclas[evt.key];

        });

    }

    logica()    {

        if (this.teclas[' '])    {
                
            this.proyectiles.lista.push(new Proyectil(this.x + 17.5, this.y - 8, this.v_proyectil));
            
            delete this.teclas[' '];
    
        }
        
        if (this.teclas['ArrowRight']) {

            this.x += this.vx;

        }
        
        if (this.teclas['ArrowLeft'])  {

            this.x -= this.vx;

        }

        if (this.x < 0) {

            this.x = 0;

        }   else if (this.x > this.canvas.width - 35)   {

            this.x = this.canvas.width - 35;

        }

    }

    mostrar(ctx)    {

        ctx.save();

        ctx.drawImage(this.skin, this.x, this.y)

        ctx.restore();

    }

}