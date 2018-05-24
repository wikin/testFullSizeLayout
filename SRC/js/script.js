$(function(){

    if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        $('.slider>img').each(function () {
            var imgUrl = $(this).prop('src');
            $(this)
                .css('background-image','url(' + imgUrl + ')')
                .prop('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')
        });
    }
    
    
    setInterval(function(){
        var img = $(".slider>img:eq(0)");
        img.animate({'margin-left':'-100%'}, 400, function(){
            img.appendTo(".slider");
            img.css('margin-left', 0);
        });
    }, 6000);
})
