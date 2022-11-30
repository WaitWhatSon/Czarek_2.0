// POBIERZ AKTUALNĄ WARTOŚĆ Z CONTROLSÓW
function get_control_value(id) {
    const el = document.getElementById(id);
    return el.value;
}

export { get_control_value }