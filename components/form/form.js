(function() {
    'use strict';

    /**
     * Компонента "Форма"
     */
    class Form {
        /**
         * @constructor
         * @param  {Object} opts
         */
        constructor({el, data, onSubmit}) {
            this.el = el;
            this.data = data;
            this.onSubmit = onSubmit;

            this._initEvents();
            this.render();
        }

        /**
         * Создаем HTML
         */
        render() {
            this.el.innerHTML = `
            <form class="form pure-form">
                <fieldset>
                    <input class="form__input"
                        type="url" name="href"
                        required="required"
                        placeholder="url"/>
                    <input class="form__input"
                        type="text" name="anchor"
                        required="required"
                        placeholder="anchor"/>
                    <button class="form__btn pure-button" type="submit">
                        Save
                    </button>
                </fieldset>
            </form>`;
        }


        /**
         * Получение элемента формы по имени
         * @param  {string} name
         * @return {HTMLElement}
         */
        getField(name) {
            return this.el.querySelector(`[name="${name}"]`);
        }


        /**
        * Развешиваем события
        */
        _initEvents() {
            this.el.addEventListener('submit', this._onSubmit.bind(this));
        }


        /**
        * Отправка данных формы
        * @param {Event} event
        * @private
        */
        _onSubmit(event) {
            event.preventDefault();

            // this.onSubmit(this);
            this.trigger('save', {
                url: this.el.querySelector('input[name="href"]').value,
                anchor: this.el.querySelector('input[name="anchor"]').value
            });
            event.target.reset();
        }

        /**
         * Подписка на события
         * @param {string} eventName
         * @param {Function} callback
         */
        addEventListener(eventName, callback) {
            this.el.addEventListener(eventName, callback);
        }

        /**
         * Генерация события на элементе
         * @param {string} eventName
         * @param {*} eventData
         */
        trigger(eventName, eventData) {
            let event = new CustomEvent(eventName, {
                detail: eventData
            });

            this.el.dispatchEvent(event);
        }
    }

    // export
    window.Form = Form;
})();
