const fs = require("fs");

class Editor {
    constructor() {
        this.field = document.querySelector(".field");
        this.typed = [];
        this.modal_flag = false;
    }
    init() {
        this.field.innerHTML = "&#9615;";
        this.handle_keys();

        document.querySelector("#new").addEventListener("click", this.new_doc, false);
        document.querySelector("#open").addEventListener("click", this.open_doc, false);
        document.querySelector("#save").addEventListener("click", this.save_doc, false);
    }
    handle_keys() {
        document.body.addEventListener(
            "keydown",
            (e) => {
                if (e.type == "keydown" && this.modal_flag == false) {
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

    //Navbar section

    new_doc = () => {
        document.querySelector(".field").innerHTML = "&#9615;";
        this.typed = [];
    };
    open_doc = () => {
        this.modal_flag = true;
        this.typed = [];
        document.querySelector(".field").innerHTML = "";
        document.querySelector(".modal").style.display = "block";
        document.querySelector("#confirm").addEventListener(
            "click",
            () => {
                let filename = document.querySelector("#filename").value;

                fs.readFile(filename, "utf8", (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    document.querySelector(".modal").style.display = "none";
                    this.modal_flag = false;

                    document.querySelector(".field").innerHTML = data + "&#9615;";
                    data = data.split("");
                    data.map((e) => {
                        this.typed.push(e);
                    });
                    document.querySelector("#filename").value = "";
                });
            },
            false
        );
    };
    save_doc = () => {
        this.modal_flag = true;
        const content = document.querySelector(".field").innerHTML.split("").slice(0, this.typed.length).join("");
        document.querySelector(".modal").style.display = "block";
        document.querySelector("#confirm").addEventListener(
            "click",
            () => {
                let filename = document.querySelector("#filename").value;
                fs.writeFile(filename, content, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    // file written successfully
                    console.log("successfully saved!");
                    document.querySelector(".modal").style.display = "none";
                    this.modal_flag = false;
                    document.querySelector("#filename").value = "";
                });
            },
            false
        );
    };
}

let editor = new Editor();

document.body.onload = () => {
    editor.init();
};
