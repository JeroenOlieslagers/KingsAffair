$(function (){

    /* Audio Loop Limit
    var loopLimit = 4;
    var loopCounter = 0;
    document.getElementById('loop-limited').addEventListener('ended', function () {
        if (loopCounter < loopLimit) {
            this.currentTime = 0;
            this.play();
            loopCounter++;
        }
    }, false);*/
    var count = 0;
    var goal = false;
    $(".circle").click(function () {
        var css = 'html {-webkit-filter: invert(100%);' +
            '-moz-filter: invert(100%);' +
            '-o-filter: invert(100%);' +
            '-ms-filter: invert(100%); }',
            head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        if (!window.counter) { window.counter = 1; } else {
        window.counter++;
            if (window.counter % 2 == 0) { var css = 'html {-webkit-filter: invert(0%); -moz-filter: invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }' }
        };

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
        $(".circle").animate({
            height: '+=50px',
            width: '+=50px',
            opacity: '-=0.1',
            borderTopLeftRadius: '-=1em',
            borderTopRightRadius: '-=1em',
            borderBottomLeftRadius: '-=1em',
            borderBottomRightRadius: '-=1em',
            borderWidth: '+=0.5em',
        });
        $(".circle").animate({
            height: '-=50px',
            width: '-=50px',
        });
        if (goal) {
            $(".circle")
                .html("Sub 2 PewDiePie\n" + count + "/420 (Get arrow keys ready)");
        }
        if (!goal) {
            $(".circle")
                .html("?!");
        }
        if (count%10 == 0) {
            $(".circle").animate({
                height: '10em',
                width: '10em',
                opacity: 1,
                borderTopLeftRadius: '10em',
                borderTopRightRadius: '10em',
                borderBottomLeftRadius: '10em',
                borderBottomRightRadius: '10em',
                borderWidth: '0.1em',
            });
        }
        if (count == 9) {
            goal = true;
        }
        if (count == 100) {
            //Excuse me, no cheating
            //Get clicking
            window.location.href = 'secret/secret.html';
        }
        count++;
    });

    if ($(window).width() >= 1200 && $(window).height() >= 800) {
        $(function () {
            var scene;
            // get all slides
            var slides = document.querySelectorAll("section.full-screen");

            // create scene for every slide
            for (var i = 0; i < slides.length; i++) {
                scene = new ScrollMagic.Scene({
                    triggerElement: slides[i],
                    triggerHook: 'onLeave'
                })
                    .setPin(slides[i])
                    .addTo(controller);
            };
        });    
    }
    //ScrollMagic animations
    var new_tween = TweenMax.staggerTo(".box", 1, {
        y: -600,
        ease: Elastic.easeIn.config(1, 0.3)
    },
        0.5);


    var controller = new ScrollMagic.Controller();

    var new_scene = new ScrollMagic.Scene({
        offset: 200
    }).

        setTween(new_tween)

    controller.addScene([new_scene]);

    
    
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-75px";
        }
        prevScrollpos = currentScrollPos;
    }
    
    controller.scrollTo(function (newpos) {
        TweenMax.to(window, 0.5, { scrollTo: { y: newpos } });
    });

    
    //  bind scroll to anchor links
    $(document).on("click", "a[href^='#']", function (e) {
        var id = $(this).attr("href");
        if ($(id).length > 0) {
            e.preventDefault();

            // trigger scroll
            controller.scrollTo(id);

        }
    });
});