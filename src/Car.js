class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
        this.speed = 0;
        this.acceleration = 0.2;
        this.frontTires = [];
        this.backTires = [];
    }

    drawCar(ctx){
        
        const tire = new Tire(this.x, this.y, 20, 40);
        tire.draw(ctx, this, 1);
        const tire2 = new Tire(this.x, this.y, 20, 40);
        tire2.draw(ctx, this, 2);
        const tire3 = new Tire(this.x, this.y, 20, 40);
        tire3.draw(ctx, this, 3);
        const tire4 = new Tire(this.x, this.y, 20, 40);
        tire4.draw(ctx, this, 4);
        ctx.beginPath();
        ctx.rect(
            this.x -this.width / 2,
            this.y -this.height / 2,
            this.width,
            this.height
        );
        ctx.fillStyle = 'blue';
        ctx.fill();
    }

    
    
}

class Tire {
    constructor(x, y, width, height, offset = 10) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.offset = offset;
    }
    draw(ctx, car, position, angle) {
        let a , b = 0;
        if (position === 1) {
            a = (car.x - car.width / 2) - this.offset;
            b = (car.y - car.height / 2) ;
        }
        if (position === 2) {
            a = car.x + ((car.width / 2) - this.width) + this.offset;
            b = (car.y - car.height / 2);
        }
        if (position === 3) {
            a = (car.x - car.width / 2) - this.offset;
            b = car.y + ((car.height / 2) - this.height);
        }
        if (position === 4) {
            a = car.x + ((car.width / 2) - this.width) + this.offset;
            b = car.y + ((car.height / 2) - this.height);
        }
        ctx.beginPath();
        ctx.roundRect(
            a,
            b,
            this.width,
            this.height,
            30
        );
        ctx.fillStyle = 'black';
        ctx.fill();
    }
    turn(angle){
        
    }
}