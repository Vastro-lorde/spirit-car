class Car {
    constructor({x, y, width, height, color}) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.width = width;
        this.height = height; 
        this.speed = 0;
        this.maxSpeed = 6;
        this.friction = 0.05;
        this.acceleration = 0.1;
        this.handling = 0.02; // Rate of car body rotation per frame when steering

        this.steeringAngle = 0; // Current angle of the front tires for steering
        this.maxSteerAngle = Math.PI / 6; // Max 30 degrees for tire steering
        this.steerRate = 0.03; // How fast tires turn per frame

        this.tires = [];
        this.#createTires(4);
        this.frontTires = [this.tires[0], this.tires[1]];
        this.backTires = [this.tires[2], this.tires[3]];

        this.sensors = new Sensors(this);
        this.controls = new Controls();
        this.color = color
    }

    update(){
        this.#move()
        this.sensors.update();
    }

    #move(){
        // Speed and acceleration
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

        // Steering logic
        let steerInput = 0;
        if (this.controls.left) {
            steerInput = 1;
        } else if (this.controls.right) { // Use else if to prevent issues if both are pressed
            steerInput = -1;
        }

        // Update tire steering angle
        if (steerInput !== 0) {
            this.steeringAngle += this.steerRate * steerInput;
            this.steeringAngle = clamp(-this.maxSteerAngle, this.maxSteerAngle, this.steeringAngle);
        } else {
            // Auto-return steering to center smoothly
            if (Math.abs(this.steeringAngle) > this.steerRate / 2) {
                 this.steeringAngle -= Math.sign(this.steeringAngle) * this.steerRate / 2;
            } else {
                this.steeringAngle = 0;
            }
        }

        // Apply steering angle to front tires
        for (const tire of this.frontTires) {
            tire.angle = -this.steeringAngle; // Inverted to make tires turn correctly
        }

        // Update car's body angle (turning the car)
        if (this.speed !== 0) { // Only turn body if moving
            const directionMultiplier = this.speed > 0 ? 1 : -1; // Flips turn direction if reversing
            // Car's rotation is influenced by how much the tires are steered and car's handling capability
            this.angle += this.handling * (this.steeringAngle / this.maxSteerAngle) * directionMultiplier;
        }

        // Update position
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
        
    }
    
    #createTires(mumberOfTires){
        for (let i = 1; i <= mumberOfTires; i++) {
            this.tires.push(new Tire({car: this, width: 20, height: 40, carAngle: 0, position: i}));
        }
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
        ctx.fillStyle = this.color;
        ctx.fill();

        // --- bonet ----//
        ctx.beginPath()
        ctx.rect(
            -this.width / 2.5,
            -this.height / 1.7,
            this.width / 1.2,
            this.height / 3
        );
        ctx.fillStyle = this.color;
        ctx.fill();
        // --- end ----//
            
        for (const tire of this.tires) {
            tire.draw(ctx);
        }

        // roof
        ctx.beginPath()
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.fillStyle = this.color;
        ctx.fill();
        // --- end ----//

        // wind screen
        ctx.beginPath()
        ctx.rect(
            -this.width / 2.4,
            -this.height / 2,
            this.width / 1.2,
            this.height / 4.5
        );
        ctx.fillStyle = 'black';
        ctx.fill();
        // --- end ----//

        // back window
        ctx.beginPath()
        ctx.rect(
            -this.width / 2.4,
            this.height / 6,
            this.width / 1.2,
            this.height / 4.5
        );
        ctx.fillStyle = 'black';
        ctx.fill();

        // front window


        ctx.restore();


        this.sensors.draw(ctx);

    }
}
