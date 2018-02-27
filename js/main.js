$.getJSON('https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F225490082%2Fc80dd964a2', function(data){
	$('.youtube').append(data.html);
	var video = $('.youtube iframe').data('aspectRatio', (data.height / data.width))
								.removeAttr('width')
								.removeAttr('height');
	var width = $('.youtube').width();
	var height = width  * video.data('aspectRatio');
	video.width(width).height(height);
});

$(window).resize(function(){
	var video = $('.youtube iframe');
	var width = $('.youtube').width();
	var height = width  * video.data('aspectRatio');
	video.width(width).height(height);
});

$('.sponsor .more').on('click', function(){
	$(this).parent().siblings('.hidden').show();
	$(this).hide();
});

$('.sponsor .less').on('click', function(){
	$(this).parents('.sponsor').find('.hidden').hide();
	$(this).parents('.sponsor').find('.more').show();
});
