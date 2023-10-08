export default class Player {
    public id: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;

    constructor(x: number, y: number, width: number, height: number, color: string, id: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(context: any) {
        context.fillStyle = this.color;
        context.beginPath();
        context.roundRect(this.x, this.y, this.width, this.height, [20]);
        context.fill();
    }
}
