// export let array1 = ["USA", "India", "Bosnia and Herzegovina", "Brazil", "Russia", "France", "Turkey", "UK", "Italy", "Spain", "Argentina", "Germany", "Colombia", "Mexico", "Poland", "Iran", "Peru", "Ukraine", "South Africa", "Netherlands", "Indonesia", "Belgium", "Czechia", "Romania", "Chile", "Iraq", "Canada", "Bangladesh", "Philippines", "Pakistan", "Morocco", "Switzerland", "Israel", "Portugal", "Sweden", "Saudi Arabia"];
// import { array1 } from "./js/apiCountry";

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

            if (!value) return setActive(false);


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

                    listItems = [];
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
                    document.location.reload();
                }
            }
        });
        input.addEventListener('focus', (e) => {
                input.value = ''

            })
            ////////////// 
        function searchListCountry() {

            let country = document.querySelectorAll('.case-country li')
            if (input.value !== '') {
                country.forEach(elem => {
                    if (elem.innerText.search(input.value) === -1) {
                        elem.classList.remove('country-active');
                    } else {
                        elem.classList.add('country-active');
                        for (let i = 0; i < elem.length; i++) {
                            let index = country[i].indexOf(elem[i]);
                            let removed = country[i].splice(index, 1);
                            country[i].unshift(removed[0]);
                        }
                    }
                })
            } else {
                country.forEach(elem => {
                        elem.classList.remove('country-active');
                    })
                    // document.location.reload();
            }

        }
        // searchListCountry()
        ///////////////

        document.body.addEventListener('click', function(e) {
            if (!wrap.contains(e.target)) setActive(false);
        });
    });
}