// Everything that needs to be checked when document is ready
$(document).ready(function ()
{
	if ($("#searchInput").val() == "")
	{
		$("#searchButton").prop('disabled', true);
	}
	
	$(document).ready(function ()
	{
		$('.select2').select2();
	});
});

/* navbar scrollen */
$(window).scroll(function ()
{
	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});

$(".carousel-item:first").addClass("active");
$('.carousel').carousel();

// Disable and enable search when input is empty
$("#searchInput").keyup(function ()
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