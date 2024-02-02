class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.width = width;
        this.height = height; 
        this.speed = 0;
        this.maxSpeed = 4;
        this.friction = 0.05;
        this.acceleration = 0.2;
        this.frontTires = [];
        this.backTires = [];
        this.controls = new Controls();
    }

    update(){
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.backward) {
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        if (this.controls.left) {
            for (const tire of this.frontTires) {
                tire.turn(0.03, 'left');
            }
            if (this.speed != 0){
                this.angle += 0.03;
            }
            console.log(this.frontTires[0].angle);
        }
        if (this.controls.right) {
            for (const tire of this.frontTires) {
                tire.turn(0.03, 'left');
            }
            if (this.speed != 0){
                this.angle -= 0.03;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    drawCar(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y)
        ctx.rotate(-this.angle)
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.fillStyle = 'blue';
        ctx.fill();


        const tire = new Tire(this.x, this.y, 20, 40, this.angle, 1);
        const tire2 = new Tire(this.x, this.y, 20, 40, this.angle, 2);
        const tire4 = new Tire(this.x, this.y, 20, 40, this.angle, 3);
        const tire3 = new Tire(this.x, this.y, 20, 40, this.angle, 4);

        
        tire.draw(ctx, this);
        tire2.draw(ctx, this);
        tire3.draw(ctx, this);
        tire4.draw(ctx, this);
        this.frontTires.push(tire);
        this.frontTires.push(tire2);
        
        this.backTires.push(tire3);
        this.backTires.push(tire4);
        
        ctx.restore()
    }

    
    
}

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