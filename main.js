import { create_command_block } from "./scripts/command_generator.js";
import {generate_script_test} from "./scripts/nxt_code_generation.js"

window.onload = function(){

    console.log("hello world");
    generate_script_test("IMPORT TEST");

    const command_button = document.getElementById("add_command_button");
    command_button.addEventListener("click", add_command);

    

}

function add_command()
{
    let command = create_command_block();
}