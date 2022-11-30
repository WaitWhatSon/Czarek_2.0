function init_copy_code() {

    document.getElementById("copy_code_button").addEventListener("click", () => {

        var copyText = document.getElementById("code_display");

        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        navigator.clipboard.writeText(copyText.value);

        // alert("Ctrl + C done!");
    });

}

export { init_copy_code }