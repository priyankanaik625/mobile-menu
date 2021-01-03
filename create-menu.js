
fetch('./data.json')
    .then(results => results.json())
    .then(data => appendData(data, accordion)) // function accordion is from the file menu.js.
    .catch(err => console.log('Error:' + err))

const appendData = (receivedData, callback) => {
    const menuNavigation = document.getElementById("menu__nav");

    var temp = '';
    temp += `<ul class="menu__list-level1" role="menubar">`

    if(receivedData.navigation) {
        receivedData.navigation.forEach(item => {
            temp += `<li class="menu__item-level1" role="none">`
            temp += `<a class="menu__link-level1" role="menuitem" aria-haspopup="true" href=${item.url}> ${item.name} </a>`
            temp += `<button class="menu__toggle"><i>⌄</i></button>`
            temp += `<ul class="menu__list-level2" role="menubar" aria-hidden="true" aria-label="${item.name} submenu">`
            
            if(item.subnav) {
                item.subnav.forEach(item => {
                    temp += `<li class="menu__item-level2" role="none">`
                    temp += `<a class="menu__link-level2" role="menuitem" aria-haspopup="true" href=${item.url}> ${item.name} </a>`
                    temp += `<button class="menu__toggle"><i>⌄</i></button>`
                    temp += `<ul class="menu__list-level3" role="menubar" aria-hidden="true" aria-label="${item.name} submenu">`
                    
                    if(item.subnav) {
                        item.subnav.forEach(item => {
                            temp += `<li class="menu__item-level3">`
                            temp += `<a class="menu__link-level3" role="menuitem" href=${item.url} > ${item.name} </a>`
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