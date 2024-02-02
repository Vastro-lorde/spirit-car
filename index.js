const canvas = document.getElementById('canvas');
canvas.width = 500;


const ctx = canvas.getContext('2d');
const car = new Car(250, 250, 60, 100);
car.drawCar(ctx);

render()

function render() {
    car.update();
    canvas.height = window.innerHeight;
    car.drawCar(ctx);
    requestAnimationFrame(render);
}