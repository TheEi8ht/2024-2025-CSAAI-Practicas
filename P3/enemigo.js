
class Enemigo   {

    constructor(x, y, canvas, vx=1, vy=10, largo=35, ancho=35, color='rgb(0, 255, 0)') {

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.largo = largo;
        this.ancho = ancho;
        this.color = color;
        this.canvas = canvas;
        this.eliminado = false;

    }

    logica(enemigos)    {

        if (this.y >= this.canvas.height - 85 && !this.derrota)  {

            enemigos.splice(0, enemigos.length);
            fin_partida();

            sonido_derrota.currentTime = 0;
            sonido_derrota.play()

        }

        if (this.x + this.vx >= this.canvas.width - 35)   {

            enemigos.forEach(enemy => {
            
                enemy.vx *= -1;
                enemy.y += enemy.vy;

            });

            self.x = this.canvas.width - 35;

        }   else if (this.x + this.vx <= 0)   {



            enemigos.forEach(enemy => {
                
                enemy.vx *= -1;
                enemy.y += enemy.vy;

            });

            this.x = this.vx*2;

        }   else    {

            this.x += this.vx;

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