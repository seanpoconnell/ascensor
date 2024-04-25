<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>"/>
    <title><?php wp_title(); ?></title>
	<?php //bloginfo('template_url'); ?>
	<?php //wp_nav_menu( array( 'container' => false, 'menu_class' => 'menu clearfix off' ) ); ?>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>