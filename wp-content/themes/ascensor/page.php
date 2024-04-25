<?php if ( is_page( 'home' ) ) : ?>

	<?php include( TEMPLATEPATH . DIRECTORY_SEPARATOR . 'index.php' ); ?>

<?php else : ?>
	<?php get_header(); ?>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

	<?php endwhile; endif; ?>
	<?php wp_reset_postdata(); ?>
	<?php get_footer(); ?>

<?php endif; ?>
