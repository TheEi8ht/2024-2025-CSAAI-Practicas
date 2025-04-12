
class Enemigo   {

    constructor(x, y, vx=1, vy=10, p_disp=0) {

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.largo = 35;
        this.ancho = 35;
        this.eliminado = false;
        this.prob_disparo = p_disp;

    }

    logica(enemigos)    {

        if (this.y >= canvas.height - 85 && !this.derrota || jugadores.lista.length <= 0)  {

            enemigos.splice(0, enemigos.length);
            fin_partida();

            sonido_derrota.currentTime = 0;
            sonido_derrota.play()

        }

        this.x += this.vx;

        if (Math.random() <= this.prob_disparo/60) {

            proyectiles.lista.push(new Proyectil(this.x + this.ancho/2, this.y + this.largo + 8, 'green', 0, -1, 8, 3, true));

        }

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