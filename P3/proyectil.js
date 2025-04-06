class Proyectil {

    constructor(x, y, vy=1, largo=8, ancho=3, color='red') {

        this.x = x;
        this.y = y;
        this.vy = vy;
        this.largo = largo;
        this.ancho = ancho;
        this.color = color;

        sonido_disparo.currentTime = 0;
        sonido_disparo.play();

    }

    colision(enemigos)  {

        for (let enemigo = 0; enemigo < enemigos.length; enemigo ++)   {

            if (this.x >= enemigos[enemigo].x && this.x <= enemigos[enemigo].x + 35 &&
                this.y + this.largo >= enemigos[enemigo].y && this.y <= enemigos[enemigo].y + 35
            )    {

                this.y = -this.largo;
                enemigos[enemigo].eliminado = true;
                explosiones.lista.push(new Explosion(enemigos[enemigo].x, enemigos[enemigo].y));
                sonido_explosion.currentTime = 0;
                sonido_explosion.play();

                partida.puntos += 10;

            }

        }

    }

    logica(enemigos, proyectiles)    {

        this.y -= this.vy
        this.colision(enemigos, proyectiles);

    }

    mostrar(ctx)   {

        ctx.save()

        ctx.beginPath();

        ctx.lineWidth = this.ancho;
        ctx.strokeStyle = this.color;

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.largo);

        ctx.stroke();

        ctx.closePath();

        ctx.restore();

    }

}