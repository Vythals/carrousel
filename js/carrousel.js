(function(){
   console.log('Début du carrousel') 
   let carrousel__ouvrir = document.querySelector('.carrousel__ouvrir')
   let carrousel = document.querySelector('.carrousel')
   let carrousel__x = document.querySelector('.carrousel__x')
   let carrousel__figure = document.querySelector('.carrousel__figure')

   let galerie = document.querySelector('.galerie')
   let galerie__img = galerie.querySelectorAll('img')

   carrousel__ouvrir.addEventListener('mousedown', function(){
      carrousel.classList.add('carrousel--activer')
      ajouter_les_images_de_galerie()
   })

   carrousel__x.addEventListener('mousedown', function(){
      carrousel.classList.remove('carrousel--activer')
   })
   function ajouter_les_images_de_galerie(){
      for (const elem of galerie__img){
         console.log(elem.getAttribute('src'))
         let img = document.createElement('img')
         img.classList.add('carrousel__img')
         img.src = elem.src
         carrousel__figure.appendChild(img)
      }
   }

})()