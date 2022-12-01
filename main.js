import { create_command_block } from "./scripts/command_generator.js";
import { init_copy_code } from "./scripts/copy_code_to_clipboard.js";
import { init_navbars } from "./scripts/navbars_controls.js";
import {generate_script_test} from "./scripts/nxt_code_generation.js"
import { init_simulation } from "./scripts/simulation.js";

window.onload = function(){

    console.log("hello world");
    
    init_navbars();
    init_copy_code();

    init_simulation();

    const command_button = document.getElementById("add_command_button");
    command_button.addEventListener("click", add_command);

    const code_button = document.getElementById("generate_code_button");
    code_button.addEventListener("click", () => {generate_script_test("IMPORT TEST")});

}

function add_command()
{
    let command = create_command_block();
}