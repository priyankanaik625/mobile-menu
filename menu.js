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