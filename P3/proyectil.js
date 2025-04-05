class Proyectil {

    constructor(x, y, vy=1, largo=8, ancho=3, color='red') {

        this.x = x;
        this.y = y;
        this.vy = vy;
        this.largo = largo;
        this.ancho = ancho;
        this.color = color;

    }

    logica()    {

        this.y -= this.vy

    }

    mostrar(ctx)   {

        ctx.save()

        ctx.beginPath();

        ctx.lineWidth = this.ancho;
        ctx.strokeStyle = this.color;

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.largo);

        ctx.stroke();

        ctx.closePath();

    }

}