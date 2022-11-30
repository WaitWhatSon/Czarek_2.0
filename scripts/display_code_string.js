function display_code_string(text) {
    const textarea = document.getElementById("code_display");
    textarea.value = text;
}

export { display_code_string }