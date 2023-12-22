let darkmode=document.querySelector('#darkmode');
darkmode.onclick=()=>
{
    if(darkmode.classList.contains('ri-moon-fill'))
    {
        darkmode.classList.replace('ri-moon-fill','ri-sun-fill');
        document.body.classList.add('color');
    }
    else{
        darkmode.classList.replace('ri-sun-fill','ri-moon-fill');
        document.body.classList.remove('color')
    }
}

const sr=ScrollReveal({
    distance:'10px',
    duration:'2400',
    rest:true

});
sr.reveal('.contenido-texto',{delay:250,origen:'top'});
sr.reveal('.contenido-img',{delay:450,origen:'bottom'});
sr.reveal('.flecha',{delay:550,origen:'left'});


