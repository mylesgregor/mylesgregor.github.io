

	$(window).scroll(function() {
		if($(document).scrollTop() > 180) {

			$('nav').addClass('shrink');
		}
		else {
		$('nav').removeClass('shrink');
		}

	});

// Smooth Scrolling
var scrollLink = $('.scroll');

scrollLink.click(function(event){
	event.preventDefault();
	$("body,html").animate({
		scrollTop: $(this.hash).offset().top
	}, 1000)
})
