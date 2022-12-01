function go() {
    // TODO:
}

function turn() {
    // TODO:
}

function run() {
    // TODO:
}

function init_simulation() {
    const simulation = document.getElementById("simulation_svg");

    // const w = simulation.getBBox().width;
    // const h = simulation.getBBox().height;

    // console.log(w);
    // console.log(h);

    
    simulation.setAttribute('height', '512');
    simulation.setAttribute('width', '512');


    const robot = simulation.getElementById("robot");
    console.log(robot)


    // MOVE TO POINT
    robot.setAttribute("x", "50");
    robot.setAttribute("y", "50");
    
}

export { init_simulation }