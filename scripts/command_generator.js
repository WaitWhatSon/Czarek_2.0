import { enforceMinMax, preventEmpty } from "./inputs_validation.js"

function init_commands_list() {
    const command_button = document.getElementById("add_command_button");
    command_button.addEventListener("click", create_command_block);
}

function create_command_block() {
    return new CommandElement();
}

class CommandElement {
    constructor() {
        const commands = document.getElementById("commands_list");
        this.block = document.createElement("div");
        this.block.classList.add("command-element");
        this.block.classList.add("container");
        commands.appendChild(this.block);

        let first_row = document.createElement("div");
        first_row.classList.add("row", "p-2");
        let second_row = document.createElement("div");
        second_row.classList.add("row", "p-2");

        let type_select = create_type_select();
        let delete_button = create_delete_button(this.delete.bind(this));

        type_select.classList.add("col-sm-10");
        delete_button.classList.add("col-sm-2");

        first_row.appendChild(type_select);
        first_row.appendChild(delete_button);

        this.block.appendChild(first_row);

        let go_options = create_go_options(this);
        let turn_options = create_turn_options(this);

        go_options.classList.add("row", "p-2");
        turn_options.classList.add("row", "p-2");

        this.block.appendChild(go_options);
        this.block.appendChild(turn_options);

        this.type = undefined;

        type_select.addEventListener("change", (event) => {
            if (event.target.value === "GO") {
                go_options.style.display = "block";
                turn_options.style.display = "none";
                this.block.classList.remove("turn");
                this.block.classList.add("go");
                this.type = "GO";
            }
            else if (event.target.value === "TURN") {
                turn_options.style.display = "block";
                go_options.style.display = "none";
                this.block.classList.remove("go");
                this.block.classList.add("turn");
                this.type = "TURN";
            }
        });

        // save ref
        this.block.ref = this;
    }

    get block() {
        return this._block;
    }

    set block(command) {
        this._block = command;
    }

    delete() {
        const commands = document.getElementById("commands_list");
        commands.removeChild(this.block);
    }

    get_command() {
        if (this.type === "GO") {
            return {
                type: this.type,
                direction: this.direction_select_fb.value,
                distance: parseInt(this.distance_input.value),
                power: parseInt(this.power_input.value)
            }
        }
        else if (this.type === "TURN") {
            return {
                type: this.type,
                direction: this.direction_select.value,
                angle: parseInt(this.angle_input.value)
            }
        }
        else {
            return undefined;
        }
    }

}

function create_type_select() {
    let type_select = document.createElement("select");
    type_select.style.display = "inline-block";
    type_select.style.float = "none";
    let option_go = document.createElement("option");
    option_go.innerHTML = "GO";
    let option_turn = document.createElement("option");
    option_turn.innerHTML = "TURN";
    let option_none = document.createElement("option");
    option_none.disabled = true;
    option_none.selected = true;
    option_none.innerHTML = "-???-";

    type_select.appendChild(option_none);
    type_select.appendChild(option_go);
    type_select.appendChild(option_turn);

    return type_select;
}

function create_go_options(parent) {
    let div = document.createElement("div");
    div.style.display = "none";

    let direction_label = document.createElement("label");
    direction_label.innerHTML = "direction: ";

    let direction_select_fb = document.createElement("select");
    parent.direction_select_fb = direction_select_fb;
    let option_forward = document.createElement("option");
    option_forward.innerHTML = "FORWARD";
    let option_backward = document.createElement("option");
    option_backward.innerHTML = "BACKWARD";
    direction_select_fb.appendChild(option_forward);
    direction_select_fb.appendChild(option_backward);

    let distance_label = document.createElement("label");
    distance_label.innerHTML = "distance: ";

    let distance_input = document.createElement("input");
    parent.distance_input = distance_input;
    distance_input.type = "number";
    distance_input.min = 0;
    distance_input.max = 100;
    distance_input.defaultValue = 10;
    distance_input.addEventListener("input", () => enforceMinMax(distance_input));
    distance_input.addEventListener("focusout", () => preventEmpty(distance_input));

    let power_label = document.createElement("label");
    power_label.innerHTML = "power: ";

    let power_input = document.createElement("input");
    parent.power_input = power_input;
    power_input.type = "number";
    power_input.min = 0;
    power_input.max = 100;
    power_input.defaultValue = 75;
    power_input.addEventListener("input", () => enforceMinMax(power_input));
    power_input.addEventListener("focusout", () => preventEmpty(power_input));

    div.appendChild(direction_label);
    div.appendChild(direction_select_fb);
    div.appendChild(document.createElement("br"));
    div.appendChild(distance_label);
    div.appendChild(distance_input);
    div.appendChild(document.createElement("br"));
    div.appendChild(power_label);
    div.appendChild(power_input);

    return div;
}

function create_turn_options(parent) {
    let div = document.createElement("div");
    div.style.display = "none";

    let direction_label = document.createElement("label");
    direction_label.innerHTML = "direction: ";

    let direction_select = document.createElement("select");
    parent.direction_select = direction_select;
    let option_left = document.createElement("option");
    option_left.innerHTML = "LEFT";
    let option_right = document.createElement("option");
    option_right.innerHTML = "RIGHT";
    direction_select.appendChild(option_left);
    direction_select.appendChild(option_right);

    let angle_label = document.createElement("label");
    angle_label.innerHTML = "angle: ";

    let angle_input = document.createElement("input");
    parent.angle_input = angle_input;
    angle_input.type = "number";
    angle_input.min = 0;
    angle_input.max = 180;
    angle_input.defaultValue = 90;
    angle_input.addEventListener("input", () => enforceMinMax(angle_input));
    angle_input.addEventListener("focusout", () => preventEmpty(angle_input));

    div.appendChild(direction_label);
    div.appendChild(direction_select);
    div.appendChild(document.createElement("br"));
    div.appendChild(angle_label);
    div.appendChild(angle_input);

    return div;
}

function create_delete_button(delete_function) {
    let delete_button = document.createElement("button");
    delete_button.addEventListener("click", delete_function);
    delete_button.innerHTML = '<span title="delete command" class="material-icons content_center">close</span>';
    delete_button.classList.add("delete_command_button");
    delete_button.style.display = "inline";
    return delete_button;
}

export { init_commands_list }