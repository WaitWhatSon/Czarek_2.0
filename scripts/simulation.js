import { get_commands_list } from "./get_commands_list.js";

const WIDTH = 512;
const HEIGHT = 512;

const ROBOT_CX = 50;
const ROBOT_CY = 50;

const vec_forward = [0.0, -1.0];

const robot = {
    svg: undefined, // obrazek
    x: undefined,   // koordynat x transformacji
    y: undefined,   // koordynat y transformacji
    running: false,
    angle: 0.0,
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function transform_current() {
    robot.svg.setAttribute("transform",
        `rotate(${robot.angle} ${robot.x + ROBOT_CX} ${robot.y + ROBOT_CY}) 
    translate(${robot.x} ${robot.y})`);
}

async function go(direction, distance, power) {
    if (power === 0) {
        return;
    }
    let vec;
    if (direction === "FORWARD") {
        vec = vec_forward;
    }
    else if (direction === "BACKWARD") {
        vec = [vec_forward[0], -vec_forward[1]];
    }

    for (let i = 0; i < distance; i++) {
        robot.x += vec[0];
        robot.y += vec[1];
        await transform_current();
        await delay(100 - power);
    }
}

async function rotate(angle) {
    // angle, x, y (point)
    robot.angle += angle;
    await transform_current();
}

async function turn(direction, angle) {
    let a;
    if (direction === "LEFT") {
        a = -1.0;
    }
    else if (direction === "RIGHT") {
        a = 1.0;
    }
    for (let i = 0; i < angle; i++) {
        await rotate(a);
        await delay(25);
    }
    // update vec_forvard
    let x_ = vec_forward[0];
    let y_ = vec_forward[1];

    vec_forward[0] = (x_ * Math.cos(angle * a * Math.PI / 180)) - (y_ * Math.sin(angle * a * Math.PI / 180));
    vec_forward[1] = (x_ * Math.sin(angle * a * Math.PI / 180)) + (y_ * Math.cos(angle * a * Math.PI / 180));
}

async function run() {

    if (!robot.running) {
        robot.running = true;
        const commands = get_commands_list();

        for (let command of commands) {
            if (command.type === "GO") {
                await go(command.direction, command.distance, command.power);
            }
            else if (command.type === "TURN") {
                await turn(command.direction, command.angle);
            }
        }
        robot.running = false;
    }

}

async function init_simulation() {
    const simulation = document.getElementById("simulation_svg");

    simulation.setAttribute('height', HEIGHT);
    simulation.setAttribute('width', WIDTH);

    robot.svg = simulation.getElementById("robot");
    robot.x = 100;
    robot.y = 100;
    await transform_current();

    const run_button = document.getElementById("run_commands_button");
    run_button.addEventListener("click", run);
}

export { init_simulation }