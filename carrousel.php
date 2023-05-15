<?php
/**
 * Plugin Name: Carrousel
 * Author: Vincent Hum
 * Description: Permet d'afficher les images d'une galerie dans une boîte modale naviguable
 */

 /* style.css  formater et animer le carrousel */
 /* carrousel.js  pour contrôler le carrousel */
 /* boîte modale qui contiendra le carrousel */

 /*
 filemtime() // retourne en milliseconde le temps de la dernière sauvegarde
plugin_dir_path() // retourne le chemin du répertoire du plugin
__FILE__ // une constante contenant le chemin du fichier en train de s'exécuter
wp_enqueue_style() // Intègre le link:css dans la page
wp_enqueue_script() // intègre le script dans la page
wp_enqueue_scripts // le hook qui permettra d'enfiler le css et le script
*/

function enfiler_script_css()
{
   $version_css =  filemtime(plugin_dir_path(__FILE__) . 'style.css');
   $version_js = filemtime(plugin_dir_path(__FILE__) . 'js/carrousel.js');
   wp_enqueue_style('style_carrousel',
        plugin_dir_url(__FILE__) . 'style.css',
        array(),
        $version_css
);
    wp_enqueue_script('js_carrousel',
            plugin_dir_url(__FILE__) . 'js/carrousel.js',
            array(),
            $version_js,
            true // ajoute le script carrousel.js à la fin de la page
    );

}
add_action('wp_enqueue_scripts', 'enfiler_script_css' );

function genere_boite()
{
    return '<div class="carrousel">
                <button class="carrousel__x"><svg xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828"><path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z"/></svg></button>
                <figure class="carrousel__figure"></figure>
                <form class="carrousel__form"></form>
                <button class="carrousel__precedent"><svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555"><path d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z"/></svg></buton>
                <button class="carrousel__suivant"><svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555"><path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"/></svg></buton>
            </div>';
}
add_shortcode('carrousel', 'genere_boite');