const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth  > 640 ? window.innerWidth / 2 : window.innerWidth ;


const ctx = canvas.getContext('2d');
const road = new Road({x: canvas.width / 2, width: canvas.width, lanes: 4, edgeMargin: 0.95, lineWidth: 10});
const car = new Car({x: road.getLaneCenter(0), y: window.innerHeight / 1 - 100, width: 60, height: 100, color: "blue"});

render()

/**
 * The main game loop. This function is called once to start the game and then
 * repeatedly called by requestAnimationFrame to keep the game running.
 *
 * This function will:
 * - Update the car's position based on user input.
 * - Set the canvas height to the window's height.
 * - Draw the road, then the car.
 * - Request the next frame from the browser.
 */
function render() {
    car.update();
    canvas.height = window.innerHeight;

    ctx.save()
    ctx.translate(0, -car.y + (window.innerHeight * 0.7)) // Center the canvas on the car's y position
    road.draw(ctx);
    car.drawCar(ctx);

    ctx.restore()
    requestAnimationFrame(render);
}