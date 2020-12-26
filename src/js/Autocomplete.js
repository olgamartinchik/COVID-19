export const Autocomplete = (selector, data) => {

    let inputs = document.querySelectorAll(selector);

    function ciSearch(what = '', where = '') {
        return where.toUpperCase().search(what.toUpperCase());
    }

    inputs.forEach(input => {

        input.classList.add('autocomplete-input');
        let wrap = document.createElement('div');
        wrap.className = 'autocomplete-wrap';
        input.parentNode.insertBefore(wrap, input);
        wrap.appendChild(input);

        let list = document.createElement('div');
        list.className = 'autocomplete-list';
        wrap.appendChild(list);

        let matches = [];
        let listItems = [];
        let focusedItem = -1;

        function setActive(active = true) {
            if (active)
                wrap.classList.add('active');
            else
                wrap.classList.remove('active');
        }

        function focusItem(index) {
            if (!listItems.length) return false;
            if (index > listItems.length - 1) return focusItem(0);
            if (index < 0) return focusItem(listItems.length - 1);
            focusedItem = index;
            unfocusAllItems();
            listItems[focusedItem].classList.add('focused');
        }

        function unfocusAllItems() {
            listItems.forEach(item => {
                item.classList.remove('focused');
            });
        }

        function selectItem(index) {
            if (!listItems[index]) return false;
            input.value = listItems[index].innerText;
            setActive(false);
        }

        input.addEventListener('input', (e) => {

            let value = input.value;

            if (!value) {

                return setActive(false);
            }


            list.innerHTML = '';
            listItems = [];

            data.forEach((dataItem, index) => {

                let search = ciSearch(value, dataItem);
                if (search === -1) {

                    return false;
                }
                matches.push(index);

                let parts = [
                    dataItem.substr(0, search),
                    dataItem.substr(search, value.length),
                    dataItem.substr(search + value.length, dataItem.length - search - value.length)
                ];

                let item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = parts[0] + '<strong>' + parts[1] + '</strong>' + parts[2];
                list.appendChild(item);
                listItems.push(item);

                item.addEventListener('click', function() {
                    selectItem(listItems.indexOf(item));
                    searchListCountry();

                    // listItems = [];
                });

            });

            if (listItems.length > 0) {
                focusItem(0);
                setActive(true);
            } else setActive(false);

        });

        input.addEventListener('keydown', e => {

            let keyCode = e.keyCode;

            if (keyCode === 40) { // arrow down
                e.preventDefault();
                focusedItem++;
                focusItem(focusedItem);
            } else if (keyCode === 38) { //arrow up
                e.preventDefault();
                if (focusedItem > 0) focusedItem--;
                focusItem(focusedItem);
            } else if (keyCode === 27) { // escape
                setActive(false);
            } else if (keyCode === 13) { // enter
                selectItem(focusedItem);
                searchListCountry()
                if (input.value === '') {
                    listItems = []
                        // document.location.reload();
                }
            }
        });
        input.addEventListener('click', (e) => {
                input.value = '';
                focusedItem = -1;
            })
            ////////////// 
        function searchListCountry() {


            let country = document.querySelectorAll('.case-country li')
            if (country) {
                if (input.value !== '') {
                    country.forEach(elem => {
                        if (elem.innerText.search(input.value) === -1) {
                            elem.classList.remove('country-active');
                        } else {
                            elem.classList.add('country-active');
                            elem.scrollIntoView();
                        }
                    })
                } else {
                    country.forEach(elem => {
                        elem.classList.remove('country-active');
                    })
                }
            }

        }

        ///////////////

        document.body.addEventListener('click', function(e) {
            if (!wrap.contains(e.target)) setActive(false);
            listItems = [];
            focusedItem = -1;
        });
    })


}
export const searchCountryWithClick = () => {
    setTimeout(() => {
        let country = document.querySelector('.case-country-sick').children[0].children;
        let countryDeathes = document.querySelector('.case-country-deathes').children[0].children;
        let countryRecovered = document.querySelector('.case-country-recovered').children[0].children;



        for (let i = 0; i < country.length; i++) {


            country[i].addEventListener('click', (e) => {

                for (let c = 0; c < country.length; c++) {
                    country[c].classList.remove('country-active')
                }


                country[i].classList.add('country-active');
                for (let k = 0; k < countryDeathes.length; k++) {
                    console.log(countryDeathes[k])
                    if (country[i].children[2].innerHTML === countryDeathes[k].children[2].innerHTML) {
                        countryDeathes[k].classList.add('country-active');
                        countryDeathes[k].scrollIntoView();
                    } else {
                        countryDeathes[k].classList.remove('country-active')
                    }
                }
                for (let j = 0; j < countryRecovered.length; j++) {
                    if (country[i].children[2].innerHTML === countryRecovered[j].children[2].innerHTML) {
                        countryRecovered[j].classList.add('country-active');
                        countryRecovered[j].scrollIntoView();
                    } else {
                        countryRecovered[j].classList.remove('country-active')
                    }
                }


            })
        }

    }, 15000)

}