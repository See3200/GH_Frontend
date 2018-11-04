$( document ).ready(function() {

    $("#main-slider").slick({
        dots: false,
        arrows: false,
        adaptiveHeight: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    if ($('#go-top').length) {
        console.log(1);
        var target = $("#go-top");
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    target.show(200);
                } else {
                    target.hide();
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        target.on('click', function (e) {
            console.log(2);
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
});