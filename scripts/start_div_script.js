function init_start_div()
{
    document.getElementById("start_screen_button").addEventListener("click", ()=>{
        document.getElementById("start_div").remove();
    });
}

export{init_start_div}