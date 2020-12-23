export const Keyboard = {

    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        input: document.querySelectorAll("#input-select")[0],
        btnKeyboard: document.querySelector('.btn_keyboard'),
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        sound: false,
        language: "en",
        stepLeft: 0,
        stepRight: 0,
        positionX: 0
    },

    init() {

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");


        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        this.elements.input.addEventListener('focus', (e) => {
            this.elements.btnKeyboard.style.visibility = 'visible';

            // if (this.elements.btnKeyboard.style.visibility !== 'visible') {
            //     this.elements.btnKeyboard.style.visibility = 'visible';
            //     console.log(this.elements.btnKeyboard)
            //     this.elements.btnKeyboard.addEventListener('click', () => {
            //         this.open(this.elements.input.value, currentValue => {

            //             this.elements.input.value = currentValue;

            //         });
            //     })
            // }


        });

        this.elements.btnKeyboard.addEventListener('click', () => {
            this.open(this.elements.input.value, currentValue => {
                this.elements.input.value = currentValue;
                const inputEvent = new Event('input', {
                    bubbles: true,
                    cancelable: true
                });
                this.elements.input.dispatchEvent(inputEvent);
            });
        })



        function aaa(b) {
            b.classList.remove("keyboard__press");
        }


        this.elements.input.addEventListener('keydown', (e) => {

            for (let i = 0; i < this.elements.keys.length; i++) {

                if (this.elements.keys[i].innerHTML === e.key.toLowerCase()) {
                    this.elements.keys[i].classList.add("keyboard__press");
                    let b = this.elements.keys[i]
                    setTimeout(aaa, 500, b);


                }
            }

            if (e.key === 'Backspace') {
                let button = this.elements.keys[10]
                button.classList.add("keyboard__press");
                setTimeout(aaa, 500, button);
            }
            if (e.key === 'CapsLock') {
                let button = this.elements.keys[23]
                button.classList.add("keyboard__press");
                setTimeout(aaa, 500, button);
            }
            if (e.key === 'Enter') {
                let button = this.elements.keys[35]
                button.classList.add("keyboard__press");
                setTimeout(aaa, 500, button);
            }
            if (e.key === 'Shift') {
                let button = this.elements.keys[48]
                button.classList.add("keyboard__press");
                setTimeout(aaa, 500, button);
            }
            if (e.key === ' ') {
                let button = this.elements.keys[49]
                button.classList.add("keyboard__press");
                setTimeout(aaa, 500, button);
            }

        })

    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
            "shift", "space", "en", "left", "right",
        ]

        const keyLayoutRu = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
            "shift", "space", "ru", "left", "right",
        ]

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "]", "enter", "/"].indexOf(key) !== -1;


            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {

                case "left":

                    keyElement.innerHTML = createIconHTML("arrow_back");
                    keyElement.addEventListener('click', () => {

                        if (this.properties.positionX !== 0) {
                            this.properties.stepLeft++
                        }

                        this.elements.input.focus();
                        this.properties.positionX = this.elements.input.value.length - this.properties.stepLeft + this.properties.stepRight;
                        this.elements.input.setSelectionRange(this.properties.positionX, this.properties.positionX)

                    })
                    break;

                case "right":
                    keyElement.innerHTML = createIconHTML("arrow_forward");
                    keyElement.addEventListener('click', () => {
                        if (this.properties.positionX !== this.elements.input.value.length) {
                            this.properties.stepRight++
                        }
                        this.elements.input.focus();
                        this.properties.positionX = this.elements.input.value.length - this.properties.stepLeft + this.properties.stepRight;
                        this.elements.input.setSelectionRange(this.properties.positionX, this.properties.positionX)

                    })
                    break;

                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.addEventListener("click", () => {

                        if (this.properties.stepLeft === 0) {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        } else {
                            this.properties.value = this.properties.value.substr(0, this.properties.positionX - 1) + this.properties.value.substr(this.properties.positionX, this.properties.value.length - this.properties.positionX)
                        }


                        this._triggerEvent("oninput");
                        this.properties.stepRight--;
                        this.properties.stepLeft--;

                        this.properties.positionX = this.elements.input.value.length - this.properties.stepLeft + this.properties.stepRight;
                        this.elements.input.setSelectionRange(this.properties.positionX, this.properties.positionX)
                        this.elements.input.focus();

                    });

                    break;

                case "sound":
                    keyElement.classList.add("keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("volume_mute");
                    keyElement.addEventListener("click", () => {
                        this.properties.sound = !this.properties.sound;
                        keyElement.classList.toggle("keyboard__key--active", this.properties.sound);
                    });
                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {

                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = ("shift");
                    keyElement.addEventListener("click", () => {

                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
                    keyElement.addEventListener("click", () => {

                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");

                    });


                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                        this.elements.btnKeyboard.style.visibility = 'hidden';
                    });

                    break;

                case "en":
                    keyElement.innerHTML = this.properties.language;
                    keyElement.addEventListener("click", () => {
                        this.properties.language === "en" ? this.properties.language = "ru" : this.properties.language = "en";
                        keyElement.innerHTML = this.properties.language;
                        const keyArray = ["backspace", "caps", "enter", "done", "shift", "space"]

                        if (this.properties.language === "ru") {
                            for (let i = 0; i < this.elements.keys.length; i++) {
                                if (this.elements.keys[i].innerHTML.substring(0, 2) !== "<i") {
                                    this.elements.keys[i].innerHTML = keyLayoutRu[i];
                                }

                            }
                        } else {
                            for (let i = 0; i < this.elements.keys.length; i++) {

                                if (this.elements.keys[i].innerHTML.substring(0, 2) !== "<i") {
                                    this.elements.keys[i].innerHTML = keyLayout[i];
                                }
                            }
                        }

                    })
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.positionX = this.elements.input.value.length - this.properties.stepLeft + this.properties.stepRight;

                        key = keyElement.textContent
                        this.properties.value = this.properties.value.substr(0, this.properties.positionX) + key + this.properties.value.substr(this.properties.positionX, this.properties.value.length - this.properties.positionX)



                        this._triggerEvent("oninput");
                        this.elements.input.setSelectionRange(this.properties.positionX + 1, this.properties.positionX + 1)
                        this.elements.input.focus();

                    });



                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });


        return fragment;
    },


    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);

        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this.elements.input.focus();
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && key.innerHTML !== 'shift' && key.innerHTML !== 'ru' && key.innerHTML !== 'en') {
                key.textContent = (this.properties.capsLock) ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }

        }

    },

    _toggleShift() {
        let keysShift;
        this.properties.shift = !this.properties.shift;
        if (!this.properties.shift && this.properties.language === 'en') {
            keysShift = { '0': "1", '1': "2", '2': "3", '3': "4", '4': "5", '5': "6", '6': "7", '7': "8", '8': "9", '9': "0", '21': "[", '22': "]", '33': ';', '34': "'", '44': ',', '45': '.', '46': '/' }
        } else if (this.properties.shift && this.properties.language === 'en') {
            keysShift = { '0': "!", '1': "@", '2': "#", '3': "$", '4': "%", '5': "^", '6': "&", '7': "*", '8': "(", '9': ")", '21': "{", '22': "}", '33': ':', '34': '"', '44': '<', '45': '>', '46': '?' }
        } else if (this.properties.shift && this.properties.language === 'ru') {
            keysShift = { '0': "!", '1': "'", '2': "№", '3': ";", '4': "%", '5': ":", '6': "?", '7': "*", '8': "(", '9': ")", '46': "," }
        } else {
            keysShift = { '0': "1", '1': "2", '2': "3", '3': "4", '4': "5", '5': "6", '6': "7", '7': "8", '8': "9", '9': "0", '46': '.' }
        }

        for (let i = 0; i < this.elements.keys.length; i++) {
            if (i in keysShift) {
                this.elements.keys[i].innerHTML = keysShift[i]
            }

        }
        this._toggleCapsLock()


    },

    _changeLanguage() {



        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
            "shift", "space", "en"
        ]

        const keyLayoutRu = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "Р№", "С†", "Сѓ", "Рє", "Рµ", "РЅ", "Рі", "С€", "С‰", "Р·", "С…", "СЉ",
            "caps", "С„", "С‹", "РІ", "Р°", "Рї", "СЂ", "Рѕ", "Р»", "Рґ", "Р¶", "СЌ", "enter",
            "done", "СЏ", "С‡", "СЃ", "Рј", "Рё", "С‚", "СЊ", "Р±", "СЋ", ".",
            "shift", "space", "en"
        ]


    },



    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};