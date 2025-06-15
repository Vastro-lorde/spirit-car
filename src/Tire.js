class Tire {
    constructor({car, width, height, carAngle, position, offset = 10}) {
        this.x = car.x;
        this.y = car.y;
        this.car = car;
        this.width = width;
        this.height = height;
        this.angle = 0; // Tire angle is relative to the car's body, for steering
        this.maxAngle = Math.PI / 3; // Max steer angle for tire itself (e.g., 60 degrees), if using turn() method
        this.offset = offset;
        this.position = position;
        // this.controls = new Controls().active = false;
    }

    
    draw(ctx) {
        // The canvas context is already translated to the car's center and rotated by the car's angle.
        // Tire positions (a,b) are top-left corner, relative to the car's center (0,0).
        let a, b;
        if (this.position === 1) {  // Front left tire
            a = -this.car.width / 2 - this.offset;
            b = -this.car.height / 2;
        }
        if (this.position === 2) { // Front right tire
            a = (this.car.width / 2) - this.width + this.offset;
            b = -this.car.height / 2;
        }
        if (this.position === 3) { // Back left tire
            a = -this.car.width / 2 - this.offset;
            b = this.car.height / 2 - this.height;
        }
        if (this.position === 4) { // Back right tire
            a = (this.car.width / 2) - this.width + this.offset;
            b = this.car.height / 2 - this.height;
        }
        
        ctx.save(); // Save context for this tire's transformations

        // Translate to tire's center, rotate, then translate back
        // This ensures rotation happens around the tire's own center
        ctx.translate(a + this.width / 2, b + this.height / 2);
        if (this.position === 1 || this.position === 2) { // Front tires can steer
            ctx.rotate(this.angle);
        }
        ctx.translate(-(a + this.width / 2), -(b + this.height / 2));

        ctx.beginPath(); // Start path for the tire rectangle
        
        ctx.roundRect(
            a,
            b,
            this.width,
            this.height,
            5
        );
        
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore(); // Restore context to previous state`

    }
    
    turn(turnIncrement, direction){ // turnIncrement should be in radians
        // This method is not currently used by the Car class's main steering logic
        if ((this.position === 1 || this.position === 2)) {
            
            if (direction === "left") {
                this.angle = Math.max(-this.maxAngle, this.angle - turnIncrement);
            }
            if (direction === "right") { // Corrected typo "rigth" to "right"
                this.angle = Math.min(this.maxAngle, this.angle + turnIncrement);
            }
        }
    }
}
