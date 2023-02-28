class Editor {
    constructor() {
        this.field = document.querySelector(".field");
        this.typed = [];
    }
    init() {
        this.field.innerHTML = "&#9615;";
        this.handle_keys();
    }
    handle_keys() {
        document.body.addEventListener(
            "keydown",
            (e) => {
                if (e.type == "keydown") {
                    console.log(this.typed);
                    this.handle_chars(e.key);
                    this.handle_special_keys(e.key);
                    this.output_text();
                    this.remove_cursor();
                } else {
                    return null;
                }
            },
            false
        );
    }

    output_text() {
        this.cursor();

        //remove text if only backspace is left in typed array
        if (this.typed.length <= 1 && this.typed[0] == "Backspace") {
            this.field.innerHTML = "";
        }

        if (this.typed.length >= 0) {
            this.field.innerHTML = this.typed.join("");
        }
    }

    handle_chars(key) {
        this.typed.push(key);
    }

    handle_special_keys = (key) => {
        if (key.length > 1) {
            if (key == "Backspace" || key == "Delete") {
                this.typed.pop();
                this.typed.pop();
            } else if (key == "Enter") {
                this.typed.pop();
                this.typed.push("&#10;&#13;");
            } else if (key == "Tab") {
                this.typed.pop();
                this.typed.push("    ");
            } else if (key == "ArrowLeft") {
                this.typed.pop();

                this.typed.splice(this.typed.length - 2, 0, "&#9615;");
            } else {
                this.typed.pop();
            }
        }
    };

    cursor() {
        this.typed.push("&#9615;");
    }

    remove_cursor() {
        this.typed.splice(this.typed.length - 1, 1);
    }
}

let editor = new Editor();

document.body.onload = () => {
    editor.init();
};
