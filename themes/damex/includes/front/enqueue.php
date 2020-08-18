<?php 


function ju_enqueue() {
    $uri = get_theme_file_uri();
    $ver = JU_DEV_MODE ? time() : false;

    wp_register_style("dl_google_fonts", "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" , [], $ver);
    wp_register_style("map-icons", get_template_directory_uri() . "/assets/scss/map.icons.min.scss" , [], $ver);
    
    wp_enqueue_style( 'load-fa', 'https://use.fontawesome.com/releases/v5.5.0/css/all.css' );
    wp_enqueue_style("dl_google_fonts");
    wp_enqueue_style("map-icons");
    
    wp_register_script("dist-js", get_template_directory_uri() . "/assets/src/dist/main.js");
    wp_register_script("swipped-events", get_template_directory_uri() . "/assets/src/dist/swiped-events.min.js");
    
    wp_enqueue_script("dist-js", "", [], false, true);
    wp_enqueue_script("swipped-events", "", [], false, true);
}