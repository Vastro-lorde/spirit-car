class Sensors {
    constructor(car) {
        this.car = car;
        this.rayCount = 50;
        this.rayLength = 300;
        this.raySpread = 2*Math.PI; // 45 degrees
        this.rays = [];
        // this.readings = [];
    }
    
    update() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = this.car.angle + linearInterpolation(
                this.raySpread / 2,
                -this.raySpread / 2,
                i / (this.rayCount - 1)
            );
            const startX = this.car.x;
            const startY = this.car.y;
            const start = { x: startX, y: startY };
            // Calculate the end point of the ray based on the angle and length
            // Using Math.cos and Math.sin to find the end point of the ray
            const endX = startX - Math.sin(rayAngle) * this.rayLength;
            const endY = startY - Math.cos(rayAngle) * this.rayLength;
            const end = { x: endX, y: endY };
            this.rays.push([start, end]);
        }
    }
    
    draw(ctx){
        console.log(this.rays);
        for (let i = 0; i < this.rayCount; i++) {
            const ray = this.rays[i];
            const rayStart  = ray[0];
            const rayEnd = ray[1];
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(255, 251, 0)';
            ctx.moveTo(rayStart.x, rayStart.y);
            ctx.lineTo(rayEnd.x, rayEnd.y);
            ctx.stroke();
        }    
    }
}