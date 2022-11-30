function init_navbars()
{
    const simulator_nav_button = document.getElementById("simulator_nav_button");
    const code_nav_button = document.getElementById("code_nav_button");
    const commands_nav_button = document.getElementById("commands_nav_button");
    const controls_nav_button = document.getElementById("controls_nav_button");
    
    const simulator = document.getElementById("simulator_div");
    const code = document.getElementById("code_div");
    const commands = document.getElementById("commands_div");
    const controls = document.getElementById("controls_div");

    simulator_nav_button.addEventListener("click", ()=>{
        simulator.style.display = "block";
        code.style.display = "none";
    });
    code_nav_button.addEventListener("click", ()=>{
        code.style.display = "block";
        simulator.style.display = "none";
    });
    commands_nav_button.addEventListener("click", ()=>{
        commands.style.display = "block";
        controls.style.display = "none";
    });
    controls_nav_button.addEventListener("click", ()=>{
        controls.style.display = "block";
        commands.style.display = "none";
    });
    

}

export {init_navbars}