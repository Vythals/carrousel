(function(){
   console.log('Début du carrousel');
   let carrousel__ouvrir = document.querySelector('.carrousel__ouvrir');
   let carrousel = document.querySelector('.carrousel');
   let carrousel__x = document.querySelector('.carrousel__x');
   let carrousel__figure = document.querySelector('.carrousel__figure');
   let carrousel__form = document.querySelector('.carrousel__form');
   let galerie = document.querySelector('.galerie');
   let galerie__img = galerie.querySelectorAll('img');
 
   let position = 0;
   let index = 0;
   let ancienIndex = -1;
   let imagesAdded = false; // Nouvelle variable pour indiquer si les images ont déjà été ajoutées
 
   carrousel__ouvrir.addEventListener('mousedown', function(){
     carrousel.classList.add('carrousel--activer');
     if (!imagesAdded) { // Ajouter les images seulement s'ils n'ont pas déjà été ajoutés
       ajouter_les_images_de_galerie();
       imagesAdded = true;
     }
   });
 
   carrousel__x.addEventListener('mousedown', function(){
     carrousel.classList.remove('carrousel--activer');
   });
 
   galerie__img.forEach(function(elem) { // Ajouter l'écouteur d'événement à chaque image de la galerie
     elem.addEventListener('click', function() {
       carrousel.classList.add('carrousel--activer');
       if (!imagesAdded) { // Ajouter les images seulement s'ils n'ont pas déjà été ajoutés
         ajouter_les_images_de_galerie();
         imagesAdded = true;
       }
       index = elem.dataset.index; // Utiliser l'index de l'image cliquée
       affiche_image_carrousel();
     });
   });
 
   function ajouter_les_images_de_galerie() {
     for (const elem of galerie__img){
       ajouter_une_image_dans_courrousel(elem);
       ajouter_un_radio_bouton_dans_carrousel();
     }
   }
 
   function ajouter_une_image_dans_courrousel(elem) {
     let img = document.createElement('img');
     img.classList.add('carrousel__img');
     img.src = elem.src;
     carrousel__figure.appendChild(img);
   }
 
   function ajouter_un_radio_bouton_dans_carrousel() {
     let rad = document.createElement('input');
     rad.setAttribute('type', 'radio');
     rad.setAttribute('name', 'carrousel__rad');
     rad.classList.add('carrousel__rad');
     rad.dataset.index = position;
     rad.addEventListener('mousedown', function(){
       index =  this.dataset.index;
       affiche_image_carrousel();
     });
     position = position + 1;
     carrousel__form.append(rad);
   }
 
   function affiche_image_carrousel() {
     if (ancienIndex != -1){
       carrousel__figure.children[ancienIndex].style.opacity = "0";
     }
     carrousel__figure.children[index].style.opacity = "1";
     ancienIndex = index;
   }
 })();
 function afficherImage(index) {
   const images = document.querySelectorAll(".galerie__image img");
   const imageCarrousel = document.querySelector(".carrousel__figure");
   const formulaire = document.querySelector(".carrousel__form");
   const nbImages = images.length;
   let indice = index;
   
   if (indice >= nbImages) {
       indice = 0;
   } else if (indice < 0) {
       indice = nbImages - 1;
   }

   const image = images[indice];
   const imageUrl = image.getAttribute("src");
   const imageAlt = image.getAttribute("alt");
   
   imageCarrousel.style.backgroundImage = `url(${imageUrl})`;
   imageCarrousel.style.backgroundSize = "contain";
   imageCarrousel.style.backgroundPosition = "center";
   imageCarrousel.style.backgroundRepeat = "no-repeat";
   
   formulaire.innerHTML = `<h2>${imageAlt}</h2>`;
   
   const boutonPrecedent = document.querySelector(".carrousel__precedent");
   const boutonSuivant = document.querySelector(".carrousel__suivant");
   
   if (nbImages > 1) {
       boutonPrecedent.style.display = "block";
       boutonSuivant.style.display = "block";
       boutonPrecedent.addEventListener("click", () => {
           afficherImage(indice - 1);
       });
       boutonSuivant.addEventListener("click", () => {
           afficherImage(indice + 1);
       });
   } else {
       boutonPrecedent.style.display = "none";
       boutonSuivant.style.display = "none";
   }
   
   document.querySelector(".carrousel").classList.add("carrousel--activer");
}
jQuery(document).ready(function($) {
   // Variables globales
   var index = 0; // Index de l'image actuellement affichée
 
   // Cacher le bouton "Ouvrir le carrousel" au chargement de la page
   $('.carrousel__ouvrir').hide();
 
   // Gérer le clic sur une image pour afficher le carrousel
   $('.galerie__img').click(function() {
     // Récupérer l'index de l'image cliquée
     index = $(this).index();
     // Afficher le carrousel avec l'image cliquée
     afficherCarrousel(index);
   });
 
   // Gérer le clic sur le bouton "Suivant"
   $('.carrousel__suivant').click(function() {
     // Incrémenter l'index de l'image
     index++;
     // Si on dépasse la dernière image, revenir à la première
     if (index >= $('.galerie__img').length) {
       index = 0;
     }
     // Afficher l'image suivante dans le carrousel
     afficherImage(index);
   });
 
   // Gérer le clic sur le bouton "Précédent"
   $('.carrousel__precedent').click(function() {
     // Décrémenter l'index de l'image
     index--;
     // Si on dépasse la première image, revenir à la dernière
     if (index < 0) {
       index = $('.galerie__img').length - 1;
     }
     // Afficher l'image précédente dans le carrousel
     afficherImage(index);
   });
 
   // Fonction pour afficher le carrousel avec une image spécifique
   function afficherCarrousel(index) {
     // Afficher le carrousel
     $('.carrousel').addClass('carrousel--activer');
     // Afficher l'image spécifique dans le carrousel
     afficherImage(index);
   }
 
   // Fonction pour afficher une image spécifique dans le carrousel
   function afficherImage(index) {
     // Récupérer l'image correspondant à l'index
     var $img = $('.galerie__img').eq(index);
     // Récupérer l'URL de l'image
     var url = $img.attr('src');
     // Afficher l'image dans le carrousel
     $('.carrousel__img').attr('src', url).animate({opacity: 1}, 500);
     // Mettre à jour le texte alternatif de l'image
     $('.carrousel__img').attr('alt', $img.attr('alt'));
   }
 
   // Gérer le clic sur le bouton "Fermer"
   $('.carrousel__x').click(function() {
     // Cacher le carrousel
     $('.carrousel').removeClass('carrousel--activer');
     // Réinitialiser l'opacité de l'image
     $('.carrousel__img').css('opacity', 0);
   });
 });
 
 