$(function() {
    var $el = $('.background');
    $(window).on('scroll', function () {
        var scroll = $(document).scrollTop();
        $el.css({
            'background-position':'50% '+(0.4*scroll)+'px'
        });
    });
});
