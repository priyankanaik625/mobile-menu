fetch('./data.json')
    .then(results => results.json())
    .then(data => appendData(data, accordion))
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
    callback();
}

const menu = document.querySelector(".menu");
const drawer = document.querySelector('.info__drawer');
const close = document.querySelector('.menu__close');

const getSiblings = elem => {
    return Array.prototype.filter.call(elem.parentNode.children, sibling => {
        return sibling !== elem;
    });
};

//menu toggles/accordion
accordion = () => {
    const toggleButtons = menu.querySelectorAll(".menu__toggle");
    toggleButtons.forEach(toggle => {
        toggle.addEventListener('click', () => {
            
            const siblings = getSiblings(toggle.parentNode);
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
            })
            toggle.parentNode.classList.toggle('active');
            
            // get total height of childrens
            var totalHeight = 0;       
            toggle.parentNode.childNodes.forEach(item => {
                totalHeight += item.scrollHeight; 
            });

            if(toggle.parentNode.classList.contains('active')) {
                toggle.parentNode.querySelector('ul').style.maxHeight = totalHeight - 10 + 'px';

                const siblings = getSiblings(toggle.parentNode);
                siblings.forEach(sibling => {                   
                    sibling.querySelector('ul').style.maxHeight = 0;
                })  
            }
            else {
                toggle.parentNode.querySelector('ul').style.maxHeight = 0;  
            }

        });
    }); 
}


//Operations on Drawer
drawer.addEventListener('click', () => {
    menu.classList.add('active');
});

close.addEventListener('click', () => {
    menu.classList.remove('active');
});

document.addEventListener('click', (event) => {
  if (event.target !== drawer && menu !== event.target && !menu.contains(event.target)) {    
    menu.classList.remove('active');
  }
})