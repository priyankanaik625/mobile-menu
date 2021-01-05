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
    toggleButtons.forEach(toggle => {
        toggle.addEventListener('click', () => {
            
            //Accessibility variables
            let ariaHidden = toggle.previousSibling.getAttribute('aria-hidden');
            let ariaExpanded = toggle.previousSibling.getAttribute('aria-expanded');
            ariaHidden = ariaHidden==="true" ? false : true;
            ariaExpanded = ariaExpanded==="false" ? true : false;
            
            const siblings = getSiblings(toggle.parentNode);
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
                
                // Accessibility
                sibling.querySelector('a').setAttribute('aria-hidden',true);
                sibling.querySelector('a').setAttribute('aria-expanded',false);
            })
            toggle.parentNode.classList.toggle('active');
        
            // Accessibility
            toggle.previousSibling.setAttribute('aria-hidden',ariaHidden);
            toggle.previousSibling.setAttribute('aria-expanded',ariaExpanded);

            
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