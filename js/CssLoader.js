

class CssLoaderClass {

    #CssElement;
    #mountElement;
    #mutationObserver;
    #styles = {
        body: {}
    };

    constructor(mountElement = 'head') {
        this.#mountElement = mountElement;
        let CssElement = document.getElementById('CssLoader-Styles');
        if(!CssElement){
            this.mount();
        } else {
            this.#CssElement = CssElement;
        }
    }

    updateElements() {

    }

    mount() {
        let head = document.querySelector(this.#mountElement);
        this.#CssElement = document.createElement('style');
        head.append(this.#CssElement);
    }

    CamelToSpear(originStr){
        return originStr.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    }

    transformObjectStyleToString(stylesObject) {
        let str = '';
        for(var code in stylesObject) {
            for(var prop in stylesObject[code]){
                let firstLetter = prop.split('')[0];
                let nameElement;
                str += (code + ' ');
                switch (firstLetter) {
                    case '_':
                        str += '.';
                        nameElement = prop.split('').splice(1, prop.split('').length).join('');
                        break;
                    case '#':
                        str += '#';
                        nameElement = prop.split('').splice(1, prop.split('').length).join('');
                        break;
                    default:
                        nameElement = prop;
                        break;
                }
                if(nameElement.split('')[0] == '*') {
                    str += ' > ';
                }
                str += (nameElement + '{');
                for(var style in stylesObject[code][prop]) {
                    str += (this.CamelToSpear(style) + ':' + stylesObject[code][prop][style] + ';');
                }
                str += '}';
            }
        }

        console.log(str)
        return str;
    }

    generateId(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    setStyles(stylesObject, createContextForStyles = false, elementSelector) {
        let CssText = '';
        if(createContextForStyles) {
            let id = this.generateId(32);
            let elements = document.querySelectorAll(elementSelector);
            elements.forEach(el => {
                el.classList.add(id);
            })
            let observId = id;
            let observer1 = new MutationObserver((mutationList, observer) => {
                let newElement = mutationList[0].addedNodes[0];
                let element = newElement.querySelector(elementSelector);

                if(element) {
                    element.classList.add(observId);
                }
                console.log(element)
                console.log(newElement);
            });
            observer1.observe(document.body, {
                childList: true
            });

            // document.addEventListener('DOMContentInserted', () => {
            //     console.log('Insert!')
            //     let elements = document.querySelectorAll(elementSelector);
            //     elements.forEach(el => {
            //         if(!el.classList.contains(id)) {
            //             el.classList.add(id);
            //         }
            //     })
            // })
            id = '.' + id;
            this.#styles[id] = stylesObject;
            CssText = this.transformObjectStyleToString(this.#styles);

        } else {
            this.#styles['body'] = Object.assign(this.#styles['body'], stylesObject)
            CssText = this.transformObjectStyleToString(this.#styles);
        }
        console.log(this.#styles)
        this.#CssElement.innerHTML = CssText;
    }

    /*
    TYPES: {
        body: {
            h1: {
                align-text: 'center',
                color: 'red'
            }
        },
        'generated-w34dk3rmmf': {
            h1: {
                align-text: 'center',
                color: 'red'
            }
        }
    }
     */
}

let CssLoader = new CssLoaderClass();
export default CssLoader;