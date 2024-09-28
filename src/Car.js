class Car {
    constructor({x, y, width, height, color}) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.tireAngle = this.angle
        this.width = width;
        this.height = height; 
        this.speed = 0;
        this.maxSpeed = 6;
        this.friction = 0.05;
        this.acceleration = 0.1;
        this.handling = 0.01;
        
        this.controls = new Controls();
        this.color = color
        
    }

    update(){
        this.#move()
    }

    #move(){
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.backward) {
            this.speed -= this.acceleration * 2;
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
            // if (this.speed === 0) {
            //     for (const tire of this.frontTires) {
            //         // tire.controls.active === true;
            //         tire.turn(this.angle, 'left');
            //     }
            // }
            if (this.speed != 0){
                this.angle += this.handling;
            }
            this.tireAngle += this.angle;
        }
        if (this.controls.right) {
            // if (this.speed === 0) {
            //     for (const tire of this.frontTires) {
            //         // tire.controls.active === true;
            //         tire.turn(this.angle, 'rigth');
            //     }
            // }
            if (this.speed != 0){
                this.angle -= this.handling;
            }
            this.tireAngle -= this.angle;
        }

        
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
        
    }

    drawCar(ctx){
        ctx.save();
        
        const tire = new Tire({x: this.x, y: this.y, width: 20, height: 40, carAngle: this.tireAngle, position: 1});
        const tire2 = new Tire({x: this.x, y: this.y, width: 20, height: 40, carAngle: this.tireAngle, position: 2});
        const tire4 = new Tire({x: this.x, y: this.y, width: 20, height: 40, carAngle: this.angle, position: 3});
        const tire3 = new Tire({x: this.x, y: this.y, width: 20, height: 40, carAngle: this.angle, position: 4});
        
        ctx.beginPath();
        ctx.translate(this.x, this.y)
        ctx.rotate(-this.angle)
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.beginPath()
        ctx.rect(
            -this.width / 3.1,
            -this.height / 1.6,
            this.width / 1.6,
            this.height / 3
        );
        ctx.fillStyle = this.color;
        ctx.fill();
            
        tire.draw(ctx, this)
        tire2.draw(ctx, this)
        tire3.draw(ctx, this)
        tire4.draw(ctx, this)
        this.frontTires = [tire, tire2];
        this.backTires = [tire3, tire4];

        
        // this.frontTires.forEach((frontTire)=>{
        //     frontTire.draw(ctx, this);
        // })
        // this.backTires.forEach((backTire)=>{
        //     backTire.draw(ctx, this);
        // })

        
        
        ctx.restore()
    }

    
    
}

