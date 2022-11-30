function enforceMinMax(el) {
    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
        if (el.value.includes("+")) {
            el.value.replace('+','');
        }
        if (el.value.charAt(0) === '0' && el.value.length > 1) {
            el.value = el.value.substring(1);
        }
    }
}

function preventEmpty(el) {
    if (el.value === "") {
        el.value = el.min;
    }
}

function blockInvalidChar(el) {
    console.log(el.value);
    // not implemented
}


export { enforceMinMax, preventEmpty, blockInvalidChar }