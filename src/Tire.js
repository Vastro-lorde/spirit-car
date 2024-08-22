class Tire {
    constructor(x, y, width, height, carAngle, position, offset = 10) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = carAngle;
        this.maxAngle = 60;
        this.offset = offset;
        this.position = position;
        // this.controls = new Controls().active = false;
    }

    
    draw(ctx, car) {
        ctx.beginPath();
        ctx.translate(-this.x, -this.y)
        let a , b = 0;
        if (this.position === 1) {
            a = (car.x - car.width / 2) - this.offset;
            b = (car.y - car.height / 2) ;
        }
        if (this.position === 2) {
            a = car.x + ((car.width / 2) - this.width) + this.offset;
            b = (car.y - car.height / 2);
        }
        if (this.position === 3) {
            a = (car.x - car.width / 2) - this.offset;
            b = car.y + ((car.height / 2) - this.height);
        }
        if (this.position === 4) {
            a = car.x + ((car.width / 2) - this.width) + this.offset;
            b = car.y + ((car.height / 2) - this.height);
        }
        
        
        ctx.roundRect(
            a,
            b,
            this.width,
            this.height,
            30
        );
        
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.translate(this.x, this.y)

        // if (this.position === 1 || this.position === 2) {
        //     console.log(this.angle, this.x, this.y);
        //     ctx.rotate(this.angle);
        // }

    }
    
    turn(carAngle, direction){
        if ((carAngle <= this.maxAngle) && (this.position === 1 || this.position === 2)) {
            if (direction === "left") {
                this.angle -= carAngle
            }
            if (direction === "rigth") {
                this.angle += carAngle
            }
        }
    }
}