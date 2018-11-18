$(document).ready(function(){

    $(".review").mouseenter(function(e){
        $(this).find(".review-content").css({
            "margin-top": "-20px",
            "box-shadow": "0 30px 60px 0 rgba(54, 54, 54, 0.15)"
        });
        $(this).find(".review-author").css("margin-top", "40px");

    });
    $(".review").mouseleave(function(e){
        if (($(this) == e.target) && ($(this).has(e.target).length === 1)){
            return false;
        }
        $(this).find(".review-content").css({
            "margin-top": "0",
            "box-shadow": "none"
        });
        $(this).find(".review-author").css("margin-top", "20px");

    });

    console.log( 1 );
});