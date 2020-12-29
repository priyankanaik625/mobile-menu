
fetch('./data.json')
    .then(results => results.json())
    .then(data => appendData(data, accordion)) // function accordion is from the file menu.js
    .catch(err => console.log('Error:' + err))

const appendData = (receivedData, callback) => {
    const menuNavigation = document.getElementById("menu__nav");

    var temp = '';
    temp += '<ul class="menu__list-level1" role="menubar">'

    if(receivedData.level1) {
        receivedData.level1.forEach(item => {
            temp += '<li class="menu__item-level1" role="none">'
            temp += '<a class="menu__link-level1" role="menuitem" href='+item.url+' >' + item.name + '</a>'
            temp += '<button class="menu__toggle"><i>⌄</i></button>'
            temp += '<ul class="menu__list-level2" role="menubar">'

            if(item.level2) {
                item.level2.forEach(item => {
                    temp += '<li class="menu__item-level2" role="none">'
                    temp += '<a class="menu__link-level2" role="menuitem" href='+item.url+' >' + item.name + '</a>'
                    temp += '<button class="menu__toggle"><i>⌄</i></button>'
                    temp += '<ul class="menu__list-level3" role="menubar">'
                    
                    if(item.level3) {
                        item.level3.forEach(item => {
                            temp += '<li class="menu__item-level3">'
                            temp += '<a class="menu__link-level3" role="menuitem" href='+item.url+' >' + item.name + '</a>'
                        });
                        temp += '</ul></li>'
                    }
                });
                temp += '</ul></li>'
            }
        });
    }

    temp += '</ul>'
    menuNavigation.innerHTML = temp;
    if(accordion) callback();
}