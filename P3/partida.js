
class Partida   {

    constructor(jugadores, enemigos, proyectiles)   {

        this.enemigos = enemigos;
        this.jugadores = jugadores;
        this.proyectiles = proyectiles;
        this.derrota = false;
        this.victoria = false;
        this.puntos = 0;

        this.jugadores.lista.push(new Jugador(skin_nave, 2, 1, proyectiles, canvas));

    }

    nivel(filas, columnas) {

        boton_niveles.style.display = 'none';
        this.victoria = false;

        jugadores.enemigos_restantes = filas*columnas;
        console.log(this.jugadores.enemigos_restantes);

        let espaciado = 35 + 120/columnas;

        for (let fila = 1; fila <= filas; fila ++)  {

            for (let columna = 1; columna <= columnas; columna ++) {

                this.enemigos.lista.push(new Enemigo(espaciado*columna + (canvas.width - columnas*espaciado)/2 - espaciado,
                espaciado*fila, canvas));

            }

        }

    }

    logica()    {

        this.jugadores.logica();
        this.enemigos.logica();
        this.proyectiles.logica(this.enemigos.lista);
        explosiones.logica();

        if (jugadores.enemigos_restantes <= 0 && !this.victoria)   {

            this.victoria = true;
            sonido_win.currentTime = 0;
            sonido_win.play();

        }
    }

    mostrar(ctx)   {

        this.jugadores.mostrar(ctx);
        this.enemigos.mostrar(ctx);
        this.proyectiles.mostrar(ctx);
        explosiones.mostrar();

        ctx.font = "15px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(`Puntuación: ${this.puntos}`, 20, 20)

        if (this.derrota)   {

            ctx.font = "48px Arial";
            ctx.fillStyle = 'red'
            ctx.fillText("GAME OVER", ctx.canvas.width/2 - 145, ctx.canvas.height/2);

        } else if (this.victoria)   {

            boton_niveles.style.display = 'flex';
            ctx.font = "30px Arial";
            ctx.fillStyle = 'rgb(0, 255, 0)'
            ctx.fillText("Enhorabuena, Nivel superado !!!", ctx.canvas.width/2 - 190, ctx.canvas.height/2 - 50);

            for (let proy of proyectiles.lista)   {

                proy.y = 0;

            }

        }

    }

}