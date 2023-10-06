export default class Player {
    public id: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;
    public score: number;

    constructor(x: number, y: number, width: number, height: number, color: string, id: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.score = 0;
    }

    draw(context: any) {
        console.log(this.id);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.font = "38px Arial";
        context.fillText(this.score, this.x < 400 ? 360 - (this.score.toString().length - 1) * 12 : 420, 40);
    }
}
