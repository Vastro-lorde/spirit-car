const canvas = document.getElementById('canvas');
canvas.width = 500;


const ctx = canvas.getContext('2d');
const car = new Car({x: 250, y: 250, width: 60, height: 100, color: "blue"});
car.drawCar(ctx);

render()

function render() {
    car.update();
    canvas.height = window.innerHeight;
    car.drawCar(ctx);
    requestAnimationFrame(render);
}