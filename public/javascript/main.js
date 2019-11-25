/* navbar scrollen */
$(window).scroll(function ()
{
	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});

$(".carousel-item:first").addClass("active");
$('.carousel').carousel();

// Disable and enable search when input is empty
$("#searchInput").keyup(function()
{
	if ($("#searchInput").val() == "")
	{
		$("#searchButton").prop('disabled', true);
	}
	else
	{
		$("#searchButton").prop('disabled', false);
	}
});