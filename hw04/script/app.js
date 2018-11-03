$( document ).ready(function() {

    console.log(1);
    $("#main-slider").slick({
        dots: false,
        arrows: false,
        adaptiveHeight: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

});