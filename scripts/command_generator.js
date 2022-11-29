function create_command_block() {

    return new CommandElement();

}

class CommandElement {
    constructor() {
        const commands = document.getElementById("commands_list");
        this.block = document.createElement("div");
        this.block.classList.add("command-element");
        commands.appendChild(this.block);

        let type_select = create_type_select();
        let go_options = create_go_options();
        let turn_options = create_turn_options();
        let delete_button = create_delete_button(this.delete.bind(this));

        this.block.appendChild(type_select);
        this.block.appendChild(go_options);
        this.block.appendChild(turn_options);
        this.block.appendChild(delete_button);

        type_select.addEventListener("change", (event) => {
            if (event.target.value === "GO") {
                go_options.style.display = "block";
                turn_options.style.display = "none";
            }
            else if (event.target.value === "TURN") {
                turn_options.style.display = "block";
                go_options.style.display = "none";
            }
        });

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


}


function create_type_select() {
    let type_select = document.createElement("select");
    let option_go = document.createElement("option");
    option_go.innerHTML = "GO";
    let option_turn = document.createElement("option");
    option_turn.innerHTML = "TURN";
    let option_none = document.createElement("option");
    option_none.disabled = true;
    option_none.selected = true;
    option_none.innerHTML = "--select--";

    type_select.appendChild(option_none);
    type_select.appendChild(option_go);
    type_select.appendChild(option_turn);

    return type_select;
}

function create_go_options() {
    let div = document.createElement("div");
    div.style.display = "none";

    let power_input = document.createElement("input");
    power_input.type = "number";
    power_input.min = 0;
    power_input.max = 100;
    power_input.style.width = "4em";
    power_input.addEventListener("input", () => enforceMinMax(power_input));

    div.appendChild(power_input);

    return div;
}

function create_turn_options() {
    let div = document.createElement("div");
    div.style.display = "none";

    let direction_select = document.createElement("select");
    let option_left = document.createElement("option");
    option_left.innerHTML = "LEFT";
    let option_right = document.createElement("option");
    option_right.innerHTML = "RIGHT";

    direction_select.appendChild(option_left);
    direction_select.appendChild(option_right);

    div.appendChild(direction_select);

    return div;
}

function create_delete_button(delete_function) {
    let delete_button = document.createElement("button");
    delete_button.addEventListener("click", delete_function);
    delete_button.innerHTML = '<span title="delete command" class="material-icons">close</span>';
    delete_button.classList.add("delete_command_button");
    return delete_button;
}

function enforceMinMax(el) {
    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
    }
}


export { create_command_block, }