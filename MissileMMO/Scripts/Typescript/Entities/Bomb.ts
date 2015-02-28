class Bomb extends createjs.Shape {
    private direction: number;
    private velocity: number;
    private beginX: number;
    private beginY: number;

    constructor(startx: number, starty: number, direction: number, velocity: number) {
        super();
        this.beginX = startx;
        this.beginY = starty;
        this.x = startx;
        this.y = starty;
        this.direction = direction;
        this.velocity = velocity;
        this.graphics = new createjs.Graphics();
    }

    public _tick(): void {
        this.x += this.velocity * Math.cos(this.direction);
        this.y += this.velocity * Math.sin(this.direction);
        this.graphics.clear();
        this.graphics.beginFill("#ffff00");
        this.graphics.drawCircle(0, 0, 2);
        this.graphics.beginStroke("#ffff00");
        this.graphics.moveTo(this.beginX - this.x, this.beginY - this.y);
        this.graphics.lineTo(0, 0);
    }
}