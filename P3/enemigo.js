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

    }

    logica(enemigos)    {

        let self  = this;

        if (this.y >= this.canvas.height - 85)  {

            this.canvas.dispatchEvent(new Event('gameover'));
            enemigos.splice(0, enemigos.length);

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

            self.x = self.vx*2;

        }   else    {

            this.x += this.vx;

        }

    }

    mostrar(ctx)    {

        ctx.save();

        ctx.drawImage(skin_alien, this.x, this.y);

        ctx.restore();

    }

}