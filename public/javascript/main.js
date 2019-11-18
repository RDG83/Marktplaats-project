/* navbar scrollen */
$(window).scroll(function ()
{
	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});

$(".carousel-item:first").addClass("active");
$('.carousel').carousel();