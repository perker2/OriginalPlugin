var scroll = function(pageTopElem, bottomTarget) {

    var btnPageTop = $(pageTopElem);
    var bottom= $(bottomTarget).offset().top - $(window).height();

    btnPageTop.hide();

    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {

        if ($(this).scrollTop() > 100) {
            btnPageTop.fadeIn();
            if($(this).scrollTop() > bottom){
                btnPageTop.addClass('fix');
            }else {
                btnPageTop.removeClass('fix');
            }
        } else {
            btnPageTop.fadeOut();
        }
    });
    //スクロールしてトップ
    $('a', btnPageTop).click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        this.blur();
        return false;
    });
};