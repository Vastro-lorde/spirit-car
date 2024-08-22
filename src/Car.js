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
            if (this.speed === 0) {
                for (const tire of this.frontTires) {
                    // tire.controls.active === true;
                    tire.turn(0.03, 'left');
                }
            }
            if (this.speed != 0){
                this.angle += 0.03;
            }
        }
        if (this.controls.right) {
            if (this.speed === 0) {
                for (const tire of this.frontTires) {
                    // tire.controls.active === true;
                    tire.turn(0.03, 'rigth');
                }
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
        ctx.fillStyle = 'red';
        ctx.fill();

        ctx.beginPath()
        ctx.rect(
            -this.width / 4,
            -this.height / 8,
            this.width / 3,
            this.height / 3
        );
        ctx.fillStyle = '000';
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

