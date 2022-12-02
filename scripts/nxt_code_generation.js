import { get_control_value } from "./controls_functions.js";
import { display_code_string } from "./display_code_string.js";
import { get_commands_list } from "./get_commands_list.js";

function init_code_generator() {
    const code_button = document.getElementById("generate_code_button");
    code_button.addEventListener("click", () => { generate_script_test("IMPORT TEST") });
}

function generate_script_test(test) {
    
    console.log(test);

    // PARAMETRY ROBOTA DO POBRANIA DO GENEROWANIA KODU:
    // LEWY SILNIK ID
    console.log(get_control_value("left_motor_id"));
    // PRAWY SILNIK ID
    console.log(get_control_value("right_motor_id"));
    // OFFSET NA LEWE KÓŁKO
    console.log(get_control_value("left_offset_id"));
    // OFFSET NA PRAWE KÓŁKO
    console.log(get_control_value("right_offset_id"));
    // ROZSTAW KÓŁEK
    console.log(get_control_value("track_width_id"));
    // ŚREDNICA KÓŁKA
    console.log(get_control_value("diameter_id"));


    // POBRANA LISTA POLECEŃ I PĘTLA (może się przydać)
    const commands = get_commands_list();

    for (let command of commands) {
        if (command.type === "GO") {
            // parametry jeśli "jedź"
            // direction: "FORWARD" / "BACKWARD"
            // distance: liczba
            // power: liczba
            // go(command.direction, command.distance, command.power);
        }
        else if (command.type === "TURN") {
            // parametry jeśli "skręć"
            // direction: "LEFT" / "RIGHT"
            // power: liczba
            // turn(command.direction, command.angle);
        }
    }


    // AKTUALIZUJ WYŚWIETLONY KOD
    display_code_string("BASIA-GENERATED CODE WILL GO HERE");

}

export { init_code_generator }