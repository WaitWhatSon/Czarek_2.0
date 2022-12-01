import { init_commands_list } from "./scripts/command_generator.js";
import { init_copy_code } from "./scripts/copy_code_to_clipboard.js";
import { init_navbars } from "./scripts/navbars_controls.js";
import { init_code_generator } from "./scripts/nxt_code_generation.js"
import { init_simulation } from "./scripts/simulation.js";

window.onload = function () {

    init_navbars();
    init_copy_code();
    init_simulation();
    init_code_generator();
    init_commands_list();

}