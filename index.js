const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const car = new Car(250, 250, 60, 100);
car.drawCar(ctx);

console.log(car);