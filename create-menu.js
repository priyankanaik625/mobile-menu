
fetch('./data.json')
    .then(results => results.json())
    .then(data => appendData(data, accordion)) // function accordion is from the file menu.js.
    .catch(err => console.log('Error:' + err))

const appendData = (receivedData, callback) => {
    const menuNavigation = document.getElementById("menu__nav");

    var temp = '';
    temp += `<ul class="menu__list-level1" role="menubar" aria-label="Fahhrad.de Menu">`

    if(receivedData.navigation) {
        receivedData.navigation.forEach(item => {
            temp += `<li class="menu__item-level1" role="none">`
            temp += `<a class="menu__link-level1" role="menuitem" tabindex="-1" href=${item.url}> ${item.name} </a>`
            temp += `<button class="menu__toggle" aria-haspopup="true" aria-expanded="false" tabindex="-1"><i aria-label="Open Menu Item">⌄</i></button>`
            temp += `<ul class="menu__list-level2" role="menubar" aria-label="${item.name} submenu">`
            
            if(item.subnav) {
                item.subnav.forEach(item => {
                    temp += `<li class="menu__item-level2" role="none">`
                    temp += `<a class="menu__link-level2" role="menuitem" tabindex="-1" href=${item.url}> ${item.name} </a>`
                    temp += `<button class="menu__toggle" aria-haspopup="true" aria-expanded="false" tabindex="-1"><i aria-label="Open Menu Item">⌄</i></button>`
                    temp += `<ul class="menu__list-level3" role="menubar" aria-label="${item.name} submenu">`
                    
                    if(item.subnav) {
                        item.subnav.forEach(item => {
                            temp += `<li class="menu__item-level3">`
                            temp += `<a class="menu__link-level3" role="menuitem" tabindex="-1" href=${item.url} > ${item.name}</a>`
                        });
                        temp += `</ul></li>`
                    }
                });
                temp += `</ul></li>`
            }
        });
    }

    temp += `</ul>`
    menuNavigation.innerHTML = temp;
    if(callback) callback();
}