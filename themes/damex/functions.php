<?php 
// Setup
add_filter( "https_local_ssl_verify", "__return_false" );
add_filter( "https_ssl_verify", "__return_false" );

// Includes
include( get_theme_file_path( './includes/front/enqueue.php' ) );
include( get_theme_file_path( './includes/front/current-year.php' ) );
include( get_theme_file_path( './includes/setup.php' ) );
include( get_theme_file_path("./includes/backend/global-options.php"));


// Hooks
add_action( 'wp_enqueue_scripts', 'ju_enqueue');
add_action("after_setup_theme", "ju_setup_theme");
?>