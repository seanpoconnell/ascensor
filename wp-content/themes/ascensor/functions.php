<?php

/**
 * Define Constants
 */

define('THEME', get_template_directory_uri());
define('CSS', THEME . '/dist/styles');
define('JS', THEME . '/dist/scripts');
define('IMG', THEME . '/dist/images');


/**
 * Register Menu
 */

register_nav_menu('main', 'Main Menu');


/**
 * HTML5 Theme Support
 */

function wpdocs_after_setup_theme()
{
    add_theme_support('html5', array('search-form'));
}

add_action('after_setup_theme', 'wpdocs_after_setup_theme');


/**
 * Disable Admin Menu Items
 */

/*function remove_admin_menu_items(){
	remove_menu_page( 'edit.php' );
}
add_action( 'admin_menu', 'remove_admin_menu_items' );*/
function remove_editor_menu()
{
    remove_action('admin_menu', '_add_themes_utility_last', 101);
}

add_action('_admin_menu', 'remove_editor_menu', 1);


/**
 * Add the styles & scripts.
 */

function add_styles()
{
    // CSS
    wp_register_style('main-css', CSS . '/main.css', array(), null);
    wp_enqueue_style('main-css');
}

add_action('wp_enqueue_scripts', 'add_styles');
function add_scripts()
{
    // JS
    wp_register_script('main-js', JS . '/lib.js', array('jquery'), null, true);
    wp_enqueue_script('main-js');

    wp_register_script('script-js', JS . '/script.js', array('jquery'), null, true);
    wp_enqueue_script('script-js');
}

add_action('wp_enqueue_scripts', 'add_scripts');


/**
 * Remove WordPress version from the wp_head() function.
 */

remove_action('wp_head', 'wp_generator');


/**
 * Register ACF Options Pages
 */

//if( function_exists('acf_add_options_page') ) {
//acf_add_options_page();
//acf_add_options_sub_page('General');
//}


/**
 * Featured Images
 */

//add_theme_support( 'post-thumbnails' );