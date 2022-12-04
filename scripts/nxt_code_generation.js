import { get_control_value } from "./controls_functions.js";
import { display_code_string } from "./display_code_string.js";
import { get_commands_list } from "./get_commands_list.js";

function init_code_generator() {
    const code_button = document.getElementById("generate_code_button");
    code_button.addEventListener("click", () => { generate_script_test("IMPORT TEST") });
}

function generate_turn(direction, angle, wheelDiameter, trackWidth) {
    const percentOf360 = angle / 360;
    const circleFragment = percentOf360 * 2 * Math.PI * trackWidth / 2;
    const circumference = 2 * Math.PI * wheelDiameter / 2;
    const turnAngle =  circleFragment / circumference * 360;

    if (direction === "LEFT") {
        return `\t turn_left(${turnAngle}); \n`;
    }
    else {
        return `\t turn_right(${turnAngle}); \n`;
    }
}

function generate_go(direction, distance, power, wheelDiameter) {
    const circumference = 2 * Math.PI * wheelDiameter / 2;
    const nTurns = distance / circumference;
    const turnAngle = Math.round(nTurns * 360);
    let powerNumber = power;

    if (direction === "BACKWARD") {
        powerNumber = powerNumber * (-1);
    }

    return `\t go(${turnAngle}, ${powerNumber}); \n`;
}

// TUTAJ JEST BRZYDKO WCIĘCIE KODU NXT, ŻEBY WYŚWIETLAŁO SIĘ BEZ DODATKOWYCH WCIĘĆ W APCE
// WIEM, ŻE BOLI W OCZY :(
function generate_inlines(leftMotorId, rightMotorId) {
    return `inline void turn_right(int angle) \n\
{ \n\
    Wait(100); \n\
    RotateMotorEx(OUT_${leftMotorId}${rightMotorId}, 75, angle, 100 + RIGHT_OFFSET, true, true); \n\
} \n\

inline void turn_left(int angle) \n\
{ \n\
    Wait(100); \n\
    RotateMotorEx(OUT_${leftMotorId}${rightMotorId}, 75, angle, -100 + LEFT_OFFSET, true, true); \n\
} \n\

inline void go(int angle, int direction) \n\
{ \n\
    Wait(100); \n\
    RotateMotorEx(OUT_${leftMotorId}${rightMotorId}, direction, angle, FRONT_OFFSET, true, true); \n\
} \n`;
}

function generate_defines(leftOffset, rightOffset) {
    if (isNaN(leftOffset)) {
        leftOffset = 0;
    }
    if (isNaN(rightOffset)) {
        rightOffset = 0;
    }
    let frontOffset = leftOffset + rightOffset;
    if (leftOffset < 0) {
        frontOffset = frontOffset * (-1);
    }

    return `#define LEFT_OFFSET ${leftOffset} \n\
#define RIGHT_OFFSET ${rightOffset} \n\
#define FRONT_OFFSET ${frontOffset}\n\n`;
}


function generate_script_test(test) {
    let code = '';
    const leftMotorId = get_control_value("left_motor_id").toUpperCase(),
        rightMotorId = get_control_value("right_motor_id").toUpperCase(),
        wheelDiameter = parseInt(get_control_value("diameter_id")),
        trackWidth = parseInt(get_control_value("track_width_id")),
        leftOffset = parseInt(get_control_value("left_offset_id")), 
        rightOffset = parseInt(get_control_value("right_offset_id"));

    code += generate_defines(leftOffset, rightOffset);
    code += generate_inlines(leftMotorId, rightMotorId);
    code += `\n task main() \n\
{ \n `;

    // POBRANA LISTA POLECEŃ I PĘTLA (może się przydać)
    const commands = get_commands_list();

    for (let command of commands) {
        if (command.type === "GO") {
            code += generate_go(command.direction, command.distance, command.power, wheelDiameter);
            // parametry jeśli "jedź"
            // direction: "FORWARD" / "BACKWARD"
            // distance: liczba
            // power: liczba
            // go(command.direction, command.distance, command.power);
        }
        else if (command.type === "TURN") {
            code += generate_turn(command.direction, command.angle, wheelDiameter, trackWidth);
            // parametry jeśli "skręć"
            // direction: "LEFT" / "RIGHT"
            // power: liczba
            // turn(command.direction, command.angle);
        }
    }

    code += `\n} \n`;
    // AKTUALIZUJ WYŚWIETLONY KOD
    display_code_string(code);

}

export { init_code_generator }