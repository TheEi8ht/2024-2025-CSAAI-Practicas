
class Enemigo   {

    constructor(x, y, vx=1, vy=10) {

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.largo = 35;
        this.ancho = 35;
        this.eliminado = false;
        console.log(this.vy);

    }

    logica(enemigos)    {

        if (this.y >= canvas.height - 85 && !this.derrota)  {

            enemigos.splice(0, enemigos.length);
            fin_partida();

            sonido_derrota.currentTime = 0;
            sonido_derrota.play()

        }

        this.x += this.vx;

    }

    mostrar()    {

        ctx.save();

        ctx.drawImage(skin_alien, this.x, this.y);

        ctx.restore();

    }

}


class Explosion {

    constructor(x, y)   {

        this.x = x;
        this.y = y;
        this.frames = 18;
        this.terminado = false;

    }

    logica()    {

        if (this.frames <= 0)   {

            this.terminado = true;

        }

        this.frames --;

    }

    mostrar()   {

        ctx.drawImage(skin_explosion, this.x, this.y, 35, 35);

    }

}