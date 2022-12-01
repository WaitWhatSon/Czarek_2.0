function get_commands_list() {
    const list = [];

    const commands = document.getElementById("commands_list");
    const nodes = commands.children;

    for (let node of nodes) {
        let command = node.ref.get_command();
        if(command != undefined)
        {
            list.push(command);
        }
    }

    return list
}

export { get_commands_list }