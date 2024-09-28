
class Road {
    /**
     * Constructor for Road class.
     * @param {object} options - An object that contains the parameters of the road.
     * @param {number} options.x - The x-coordinate of the road's center.
     * @param {number} options.lanes - The number of lanes in the road.
     * @param {number} [options.width=window.innerWidth] - The width of the road.
     * @param {number} [options.edgeMargin=0.9] - The margin between the edge of the canvas and the edge of the road.
     * @param {number} [options.lineWidth=10] - The width of the lines that make up the road.
     */
    constructor({x, lanes, width, edgeMargin = 0.9, lineWidth = 10}) {
        this.x = x;
        this.lanes = lanes;
        this.edgeMargin = edgeMargin;
        this.width = width * edgeMargin;
        this.lineWidth = lineWidth;
        this.left = x - this.width / 2;
        this.right =  x + this.width / 2;
        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom}
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight],
        ];
    }

    draw(ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = 'white';

        for (let i = 0; i <= this.lanes; i++) {
            const x = linearInterpolation(this.left, this.right, i/ this.lanes)

            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();

        }
        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo( border[0].x, border[0].y); // Start from the left border of the road and go to the top border of the road
            ctx.lineTo( border[1].x, border[1].y); // Go to the right border of the road and go to the bottom border of the road
            ctx.stroke();
        })
        
    }

    getLaneCenter(lane) {
        lane = clamp(0, this.lanes - 1, lane);

        const laneWidth = this.width / this.lanes;
        return linearInterpolation(this.left, this.right, lane / this.lanes) + laneWidth / 2;
    }
}