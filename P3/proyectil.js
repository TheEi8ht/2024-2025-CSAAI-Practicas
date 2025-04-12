class Proyectil {

    constructor(x, y, color='red', vx=0, vy=1, largo=8, ancho=3) {

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.largo = largo;
        this.ancho = ancho;
        this.color = color;

        sonido_disparo.currentTime = 0;
        sonido_disparo.play();

    }

    colision()  {

        for (let enemigo = 0; enemigo < enemigos.lista.length; enemigo ++)   {

            let enemy = enemigos.lista[enemigo]

            if (this.x >= enemy.x && this.x <= enemy.x + 35 &&
                this.y + this.largo >= enemy.y && this.y <= enemy.y + 35
                && !enemy.eliminado
            )    {

                this.y = -this.largo;
                enemy.eliminado = true;
                explosiones.lista.push(new Explosion(enemy.x, enemy.y));
                sonido_explosion.currentTime = 0;
                sonido_explosion.play();

                partida.puntos += 10;

                jugadores.enemigos_restantes -= 1;

            }

        }

    }

    logica()    {

        this.y -= this.vy
        this.colision();

    }

    mostrar()   {

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