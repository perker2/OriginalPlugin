(function(window, undefined) {
    "use strict";

    var $window = $(window);

    var utility = {

        // check Mobile
        isMobile: function() {
            return {
                check: function() {
                    var ua = navigator.userAgent.toLowerCase();
                    var mobiles = this.mobiles;
                    var result = false;
                    for(var i = 0, len = mobiles.length; i < len; i++) {
                        if(ua.indexOf(mobiles[i]) != -1) {
                            result = false;
                        }
                    }
                },
                mobiles: [
                    "midp","240x320","blackberry","netfront","nokia","panasonic","portalmmm","sharp","sie-","sonyericsson","symbian","windows ce","benq","mda","mot-","opera mini","philips","pocket pc","sagem","samsung","sda","sgh-","vodafone","xda","palm","iphone","ipod","android"
                ]
            }
        },

        // scroll
        scroll: function() {
            var topBtn = $('.pageTop');
            var footerTop = $('footer').offset().top- $window.height();

            topBtn.hide();

            //スクロールが100に達したらボタン表示
            $window.scroll(function () {

                if ($(this).scrollTop() > 100) {
                    topBtn.fadeIn();
                    if($(this).scrollTop() > footerTop){
                        topBtn.addClass('fix');
                    }else {
                        topBtn.removeClass('fix');
                    }
                } else {
                    topBtn.fadeOut();
                }
            });
            //スクロールしてトップ
            $('a',topBtn).click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 500);
                this.blur();
                return false;
            });
        }
    };

    for(var i in utility) {
        utility[i];
    }
})(window);