;(function($) {

    $.fn.slider = function(options) {
        var elements = this;
        var opts = $.extend({}, $.fn.slider.defaults, options);
        elements.each(function() {
            $(this).data('slider', new Slider($(this), opts));
        });
        return this;
    };
    $.fn.slider.defaults = {
        move: 'slide', // todo アニメーションの種類
        continuity: true, // 連続　true or false
        auto: true, // 自動再生 true or false
        intervalTime: 3000, // 表示時間（ms） autoがtrueのとき　
        duration: 800, // 遷移時間（ms）
        callback: null
    };
    function Slider(root, options) {
        var self = this,
            viewport = root.find('.viewport:first'),
            contents = root.find('.contents:first'),
            pages = contents.children(),
            btnNext = root.find('.next:first'),
            btnPrev = root.find('.prev:first'),
            pageSize = 0,
            steps = 0,
            current = 0,
            timer = undefined,
            forward = true;

        var setTimer = function() {
            if(options.auto) {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    current = current + 1 === steps ? -1 : current;
                    forward = current + 1 === steps ? false : current === 0 ? true : forward;
                    self.anim(forward ? 1 : -1);
                }, options.intervalTime);
            }
        };

        var setEvents = function() {
            btnPrev.on('click', function(e) {
                e.preventDefault();
                current = current - 1 === -1 ?
                    options.continuity ? current : steps : current;
                self.anim(-1);
            });
            btnNext.on('click', function(e) {
                e.preventDefault();
                current = current + 1 === steps ?
                    options.continuity ? current : -1 : current;
                self.anim(1);
            });
        };

        this.anim = function(direction) {
            current += direction;
            if(current >= -1 && current <= steps) {
                contents.animate({
                    'left': -(current * pageSize)
                }, options.duration, function() {
                    if(options.continuity) {
                        if(current === steps - 1) {
                            current = 0;
                            contents.animate({
                                'left': 0
                            },-1);
                        }else if(current === -1) {
                            current = steps - 2;
                            contents.animate({
                                'left': -(pageSize * (steps-2))
                            },-1);
                        }
                    }
                    if(typeof options.callback === 'function') {
                        options.callback.call(this, pages[current], current);
                    }
                });
                setTimer();
            }
        };

        var initialize = function() {

            pages.width(viewport.width());
            steps = pages.length;
            pageSize = $(pages[0]).outerWidth(true);
            // loopがtrueのとき
            if(options.continuity === true) {
                contents.prepend($('li:last-child', contents).clone().css('margin-left', '-'+ pageSize +'px'));
                contents.append($('li:nth-child(2)', contents).clone());
                steps++;
            }
            contents.css('width', (pageSize * steps));
            self.anim(0);
            setEvents();
            return self;
        };

        return initialize();
    }
})(jQuery);