class Tire {
    constructor({x, y, width, height, carAngle, position, offset = 10}) {
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
        
        
        // if(car.controls.left && this.position <= 2){
        //     // ctx.rotate(-this.angle)
        //     // console.clear()
        //     // console.table(this)
        //     // console.table(car)
        // }
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

// class Tire {
//     constructor({x, y, width, height, carAngle, position, offset = 10}) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.angle = carAngle; // Initialize with no rotation
//         this.maxAngle = Math.PI / 6; // Maximum tire turn angle (30 degrees)
//         this.offset = offset;
//         this.position = position;
//         this.direction = null; // To track the turning direction
//     }

//     draw(ctx, car) {
//         ctx.save(); // Save the current canvas state
        
//         // Calculate the tire's position relative to the car's position and angle
//         let a, b;
//         const cosAngle = Math.cos(car.angle);
//         const sinAngle = Math.sin(car.angle);
    
//         if (this.position === 1) {
//             a = car.x - cosAngle * (car.width / 2 - this.offset) - sinAngle * (car.height / 2);
//             b = car.y - sinAngle * (car.width / 2 - this.offset) + cosAngle * (car.height / 2);
//         } else if (this.position === 2) {
//             a = car.x + cosAngle * (car.width / 2 - this.width + this.offset) - sinAngle * (car.height / 2);
//             b = car.y + sinAngle * (car.width / 2 - this.width + this.offset) + cosAngle * (car.height / 2);
//         } else if (this.position === 3) {
//             a = car.x - cosAngle * (car.width / 2 - this.offset) + sinAngle * (car.height / 2 - this.height);
//             b = car.y - sinAngle * (car.width / 2 - this.offset) - cosAngle * (car.height / 2 - this.height);
//         } else if (this.position === 4) {
//             a = car.x + cosAngle * (car.width / 2 - this.width + this.offset) + sinAngle * (car.height / 2 - this.height);
//             b = car.y + sinAngle * (car.width / 2 - this.width + this.offset) - cosAngle * (car.height / 2 - this.height);
//         }
    
//         ctx.translate(a + this.width / 2, b + this.height / 2); // Move to the tire center
//         ctx.rotate(this.angle); // Rotate the tire based on its angle
//         ctx.translate(-(a + this.width / 2), -(b + this.height / 2)); // Move back
    
//         ctx.beginPath();
//         ctx.roundRect(
//             a,
//             b,
//             this.width,
//             this.height,
//             10
//         );
        
//         ctx.fillStyle = 'black';
//         ctx.fill();
        
//         ctx.restore(); // Restore the canvas state
//     }
    

//     turn(carAngle, direction) {
//         if ((Math.abs(this.angle) < this.maxAngle) && (this.position === 1 || this.position === 2)) {
//             if (direction === "left") {
//                 this.angle = Math.max(-this.maxAngle, this.angle - carAngle);
//             }
//             if (direction === "right") {
//                 this.angle = Math.min(this.maxAngle, this.angle + carAngle);
//             }
//         }
//     }
// }
