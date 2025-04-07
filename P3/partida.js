
class Partida   {

    constructor()   {

        this.derrota = false;
        this.victoria = false;
        this.puntos = 0;
        this.level = 0;

        for (let i = 0; i <= modo-1; i ++) {

            jugadores.lista.push(new Jugador(skins_naves[1 - i], botones_jugadores.tecla.slice(i*3, i*3 + 3), 2, 1, canvas.width/2 - 18));

        }
        

    }

    nivel(filas, columnas) {

        this.level ++;

        boton_niveles.style.display = 'none';
        zona_jugadores.style.display = 'flex';
        this.victoria = false;

        jugadores.enemigos_restantes = filas*columnas;

        let espaciado = 35 + 120/columnas;

        for (let fila = 1; fila <= filas; fila ++)  {

            for (let columna = 1; columna <= columnas; columna ++) {

                enemigos.lista.push(new Enemigo(espaciado*columna + (canvas.width - columnas*espaciado)/2 - espaciado,
                espaciado*fila, canvas));

            }

        }

    }

    logica()    {

        jugadores.logica();
        enemigos.logica();
        proyectiles.logica(enemigos.lista);
        explosiones.logica();

        if (jugadores.enemigos_restantes <= 0 && !this.victoria)   {

            this.victoria = true;
            sonido_win.currentTime = 0;
            sonido_win.play();

        }
    }

    mostrar()   {

        jugadores.mostrar();
        enemigos.mostrar();
        proyectiles.mostrar();
        explosiones.mostrar();

        ctx.font = "15px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(`Puntuación: ${this.puntos}`, 8, 20);
        ctx.fillText(this.level, canvas.width/2 - (Math.ceil(Math.log10(this.level + 1))*5), canvas.height - 5);

        if (this.derrota)   {

            ctx.font = "48px Arial";
            ctx.fillStyle = 'red'
            ctx.fillText("GAME OVER", ctx.canvas.width/2 - 145, ctx.canvas.height/2);

        } else if (this.victoria)   {

            
            zona_jugadores.style.display = 'none';
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