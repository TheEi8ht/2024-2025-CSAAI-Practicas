
class Partida   {

    constructor()   {

        this.modo = 0;
        this.puntos = 0;
        this.level = 0;
        

    }

    nivel(filas, columnas) {
        
        this.level ++;

        menu_principal.style.display = 'none';
        boton_niveles.style.display = 'none';
        zona_jugadores.style.display = 'flex';
        this.modo = 1;

        for (let i = 0; i <= modo-1; i ++) {

            jugadores.lista.push(new Jugador(skins_naves[1 - i], botones_jugadores.tecla.slice(i*3, i*3 + 3), 2, 1, canvas.width/2 - 35/2 + (Math.pow(-1, i))*(300)*(modo-1)/2));

        }

        console.log(jugadores.lista);

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
        
        if (jugadores.enemigos_restantes <= 0 && this.modo != 2) {

            this.modo = 2;
            sonido_win.currentTime = 0;
            jugadores.lista.splice(0);
            explosiones.lista.splice(0)

        }   else if (this.modo == 1)  {

            sonido_win.play();
            jugadores.logica();
            enemigos.logica();
            proyectiles.logica(enemigos.lista);
            explosiones.logica();

        }

    }

    mostrar()   {

        if (this.modo == 0)   {

            this.menu();

        }   else if (this.modo == 1)  {

            this.jugando();

        }   else if (this.modo == 2)  {

            this.victoria();

        } else if (this.modo == 3)    {

            this.derrota();

        }

    }

    menu()  {

        if (modo == 1)  {

            ctx.font = "45px Helvetica";
            ctx.fillStyle = "white";
            ctx.fillText('1 Jugador', 222, 50);

            ctx.font = "30px Helvetica";
            ctx.fillText('Nave', 290, 125);
            ctx.drawImage(skins_naves[1], 308, 150);
            ctx.fillText('Controles', 262, 250);
            ctx.fillText('Disparo', 60, 325);
            ctx.fillText('Mov. Izquierda', 230, 325);
            ctx.fillText('Mov. Derecha', 450, 325);
            ctx.drawImage(barra_espaciadora, 90, 375);
            ctx.fillText('<', 315, 393);
            ctx.fillText('>', 535, 393);

        } else if (modo == 2)   {

            ctx.font = "45px Helvetica";
            ctx.fillStyle = "white";
            ctx.fillText('2 Jugadores', 200, 50);

            ctx.font = "35px Helvetica";
            ctx.fillText('Jugador 1', 90, 125);
            ctx.fillText('Jugador 2', 405, 125);
            ctx.font = "30px Helvetica"
            ctx.fillText('Nave', 290, 175);
            ctx.drawImage(skins_naves[0], 145, 150);
            ctx.drawImage(skins_naves[1], 460, 150);
            ctx.fillText('Controles',100, 250);
            ctx.fillText('Controles', 415, 250);

            ctx.font = "20px Helvetica"

            ctx.fillText('Disparo', 125, 325);
            ctx.fillText('Mov. Izquierda', 20, 410);
            ctx.fillText('Mov. Derecha', 170, 410);
            ctx.fillText('W', 148, 360);
            ctx.fillText('A', 75, 450);
            ctx.fillText('D', 225, 450);

            ctx.fillText('Disparo', 440, 325);
            ctx.fillText('Mov. Izquierda', 335, 410);
            ctx.fillText('Mov. Derecha', 485, 410);
            ctx.drawImage(barra_espaciadora, 455, 350);
            ctx.fillText('<', 390, 450);
            ctx.fillText('>', 540, 450);
        }

    }

    jugando()   {

        jugadores.mostrar();
        enemigos.mostrar();
        proyectiles.mostrar();
        explosiones.mostrar();

        ctx.font = "15px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(`Puntuación: ${this.puntos}`, 8, 20);
        ctx.fillText(this.level, canvas.width/2 - (Math.ceil(Math.log10(this.level + 1))*5), canvas.height - 5);

    }

    victoria()  {

        zona_jugadores.style.display = 'none';
        boton_niveles.style.display = 'flex';

        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(0, 255, 0)'
        ctx.fillText("Enhorabuena, Nivel superado !!!", ctx.canvas.width/2 - 190, ctx.canvas.height/2 - 50);

        for (let proy of proyectiles.lista)   {

            proy.y = 0;

        }

    }

    derrota()   {

        ctx.font = "48px Arial";
        ctx.fillStyle = 'red'
        ctx.fillText("GAME OVER", ctx.canvas.width/2 - 145, ctx.canvas.height/2);

    }

}