let field = document.querySelector(".field");

let typed = [];

let init = () => {
    field.innerHTML = "&#9615;";
};

let handle_keys = (e) => {
    if (e.type == "keydown") {
        console.log(typed);
        handle_chars(e.key);
        handle_special_keys(e.key);
        output_text();
        remove_cursor();
    } else {
        return null;
    }
};

let output_text = () => {
    cursor();

    //remove text if only backspace is left in typed array
    if (typed.length <= 1 && typed[0] == "Backspace") {
        field.innerHTML = "";
    }

    if (typed.length >= 0) {
        field.innerHTML = typed.join("");
    }
};

let handle_chars = (key) => {
    typed.push(key);
};

let handle_special_keys = (key) => {
    if (key.length > 1) {
        if (key == "Backspace" || key == "Delete") {
            typed.pop();
            typed.pop();
        } else if (key == "Enter") {
            typed.pop();
            typed.push("&#10;&#13;");
        } else if (key == "Tab") {
            typed.pop();
            typed.push("    ");
        } else if (key == "ArrowLeft") {
            typed.pop();

            typed.splice(typed.length - 2, 0, "&#9615;");
        } else {
            typed.pop();
        }
    }
};

let cursor = () => {
    typed.push("&#9615;");
};

let remove_cursor = () => {
    typed.splice(typed.length - 1, 1);
};

document.body.onload = () => {
    init();
};

document.body.addEventListener("keydown", handle_keys, false);
document.body.addEventListener("keyup", handle_keys, false);
