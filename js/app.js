import CssLoader from "./CssLoader.js";

window.addEventListener('DOMContentLoaded', event => {
    CssLoader.setStyles({
        p: {
            color: 'red',
            fontSize: '36px'
        },
        _text: {
            background: 'blue'
        },
        '*': {
            margin: 0,
            padding: 0
        },
        'p:hover': {
            background: 'green'
        }
    });

    CssLoader.setStyles({
        '#id_text': {
            display: 'block',
            height: '500px'
        }
    })

    CssLoader.setStyles({
        '*': {
            color: 'pink',
            fontSize: '56px'
        }
    }, true, '.test_context')


    setTimeout(() => {
        let el = document.createElement('div');
        el.innerHTML = `<div class="dada">
                <div class="test_context">
                    <span>context sdgsdg</span>
                </div>
            </div>`;
        document.body.append(el)
    },5000)
    setTimeout(() => {
        let el = document.createElement('div');
        el.innerHTML = `<div class="dada">
                <div class="test_context">
                    <span>context sdgsdg</span>
                </div>
            </div>`;
        document.body.append(el)
    },6000)
})