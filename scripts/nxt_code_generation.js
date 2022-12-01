import { get_control_value } from "./controls_functions.js";
import { display_code_string } from "./display_code_string.js";

function init_code_generator() {
    const code_button = document.getElementById("generate_code_button");
    code_button.addEventListener("click", () => { generate_script_test("IMPORT TEST") });
}

function generate_script_test(test) {
    console.log(test);

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

    // pamiętaj o kastowaniu na liczby jeśli potrzebujesz liczb
    // parseInt()


    // AKTUALIZUJ WYŚWIETLONY KOD
    display_code_string("BASIA-GENERATED CODE WILL GO HERE");

}

export { init_code_generator }