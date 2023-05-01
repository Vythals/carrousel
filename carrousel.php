<?php
/**
 * Plugin name: Carrousel Vincent
 * Author: Vincent Hum
 * Description: Cette extension carrousel permettra d'afficher dans une boîte modale animée les images d'une galerie
 * Version: 1.0.0
 */

function mon_enqueue_css_js(){
    $version_css = filemtime(plugin_dir_path( __FILE__ ) . "style.css");
    $version_js = filemtime(plugin_dir_path(__FILE__) . "js/carrousel.js");

    wp_enqueue_style( 'em_plugin_carrousel_css',
                     plugin_dir_url(__FILE__) . "style.css",
                     array(),
                     $version_css);

    wp_enqueue_script(  'em_plugin_carrousel_js',
                    plugin_dir_url(__FILE__) . "js/carrousel.js",
                    array('jquery'),
                    $version_js,
                    true);
}

add_action('wp_enqueue_scripts', 'mon_enqueue_css_js');


function creation_carrousel()
{
    $images = get_post_gallery_images();
    $html_images = '';
    foreach ($images as $index => $url) {
        $html_images .= "<img src='{$url}' class='carrousel__img' alt='image-{$index}'>";
    }
    $html = "<button class='carrousel__ouvrir'>Ouvrir le carrousel</button>
        <div class='carrousel'>
            <button class='carrousel__x'>X</button>
            <div class='carrousel__container'>
                <figure class='carrousel__figure'>{$html_images}</figure>
                <form class='carrousel__form'></form>
            </div>
            <button class='carrousel__precedent'>Précédent</button>
            <button class='carrousel__suivant'>Suivant</button>
        </div> <!-- fin du carrousel -->
    ";
    return $html;
}
add_shortcode('carrousel', 'creation_carrousel');
