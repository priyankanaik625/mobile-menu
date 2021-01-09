const menu = document.querySelector(".menu");
const drawer = document.querySelector('.drawer__button');
const close = document.querySelector('.menu__close');

const getSiblings = elem => {
    return Array.prototype.filter.call(elem.parentNode.children, sibling => {
        return sibling !== elem;
    });
};  

//menu toggles/accordion
accordion = () => {
    const toggleButtons = menu.querySelectorAll(".menu__toggle");
    const menuLinks = menu.querySelectorAll(".menu__nav a");

    toggleButtons[0].setAttribute('tabindex', "0");
    menuLinks[0].setAttribute('tabindex', "0");
  
    toggleButtons.forEach(toggle => {

        //Core Functionality
        toggle.addEventListener('click', () => {

            //core-toggles
            toggle.parentNode.classList.toggle('active'); 

            const siblings = getSiblings(toggle.parentNode);
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
            })
            
           
            // get total height of childrens
            let totalHeight = 0;       
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

        // Acessibility
        toggle.addEventListener('click', () => {
            let ariaExpanded = toggle.previousSibling.getAttribute('aria-expanded');
            ariaExpanded = ariaExpanded=="false" ? true : false;
            toggle.previousSibling.setAttribute('aria-expanded',ariaExpanded);

            //Sibilings    
            const siblings = getSiblings(toggle.parentNode);
            siblings.forEach(sibling => {                
                sibling.querySelector('a').setAttribute('aria-expanded',false);
            })

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