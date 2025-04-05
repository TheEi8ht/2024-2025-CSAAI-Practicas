
class Partida   {

    constructor(jugadores, enemigos, proyectiles)   {

        this.enemigos = enemigos;
        this.jugadores = jugadores;
        this.proyectiles = proyectiles;
        this.derrota = false;
        this.victoria = false;

        this.jugadores.lista.push(new Jugador(skin_nave, 2, 1, proyectiles, canvas));

    }

    nivel(filas, columnas) {

        let espaciado = 35 + 120/columnas;

        for (let fila = 1; fila <= filas; fila ++)  {

            for (let columna = 1; columna <= columnas; columna ++) {

                this.enemigos.lista.push(new Enemigo(espaciado*columna + (canvas.width - columnas*espaciado)/2 - espaciado,
                espaciado*fila, canvas= canvas));

            }

        }

    }

    logica()    {

        this.jugadores.logica();
        this.enemigos.logica();
        this.proyectiles.logica(this.enemigos.lista);

        if (this.enemigos.lista.length === 0)   {

            this.victoria = true;

        }
    }

    mostrar(ctx)   {

        this.jugadores.mostrar(ctx);
        this.enemigos.mostrar(ctx);
        this.proyectiles.mostrar(ctx);

        if (this.derrota)   {

            ctx.font = "48px Arial";
            ctx.fillStyle = 'red'
            ctx.fillText("GAME OVER", ctx.canvas.width/2 - 145, ctx.canvas.height/2);

        } else if (this.victoria)   {

            ctx.font = "48px Arial";
            ctx.fillStyle = 'rgb(0, 255, 0)'
            ctx.fillText("Victoria", ctx.canvas.width/2 - 100, ctx.canvas.height/2);

            this.victoria = false;
            this.nivel(3, 8, canvas);

        }

    }

}