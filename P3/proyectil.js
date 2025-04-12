class Proyectil {

    constructor(x, y, color='red', vx=0, vy=1, largo=8, ancho=3, disp_enemigo=false) {

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.largo = largo;
        this.ancho = ancho;
        this.color = color;
        this.enemigo = disp_enemigo;

        sonido_disparo.currentTime = 0;
        sonido_disparo.play();

    }

    colision()  {

        if (!this.enemigo)  {

            for (let enemigo = 0; enemigo < enemigos.lista.length; enemigo ++)   {

                let enemy = enemigos.lista[enemigo]
    
                if (this.x + this.ancho >= enemy.x && this.x <= enemy.x + 35 &&
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

        } else  {

            for (let jug = 0; jug < jugadores.lista.length; jug ++) {

                let jugador = jugadores.lista[jug];

                if (this.x + this.ancho >= jugador.x && this.x <= jugador.x + 35 &&
                    this.y + this.largo >= jugador.y && this.y <= jugador.y + 35
                )    {

                    jugador.vidas -= 1;
                    this.y = canvas.height;
                    sonido_impacto.currentTime = 0;
                    sonido_impacto.play();

                }

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