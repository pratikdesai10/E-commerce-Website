/*First slider*/
$(".slider-one")
.not(".slick-intialized")
.slick({
    autoplay:true,
    autoplaySpeed:4500,
    dots:true,
    prevArrow:".site-slider .slider-btn .prev",
    nextArrow:".site-slider .slider-btn .next"
});


/*Second slider*/
$(".slider-two")
.not(".slick-intialized")
.slick({
    prevArrow:".site-slider-two .prev",
    nextArrow:".site-slider-two .next",
    slidesToShow:4,
    slidesToScroll:2,
    autoplaySpeed:4500,
    autoplay:true
});

/*tablets slider*/
$('.tablet')
.not(".slick-intialized")
.slick({
    autoplay:true,
    autoplaySpeed:3000,
    dots:true,
    prevArrow:".tablet-slider .slider-btn .prev",
    nextArrow:".tablet-slider .slider-btn .next", 
});

/*mob slider*/
$('.mob')
.not(".slick-intialized")
.slick({
    autoplay:true,
    autoplaySpeed:3000,
    dots:true,
    prevArrow:".mob-slider .slider-btn .prev",
    nextArrow:".mob-slider .slider-btn .next", 
});

