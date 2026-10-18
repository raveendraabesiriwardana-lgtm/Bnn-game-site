jQuery(document).ready(function ($) {
    $('[id^="wplp_widget_"].default').each(function () {
        var wplp_swiper = $(this);
        widget_id = $(this).data('post');
        widget_params = window['WPLP_' + widget_id];

        if (widget_params !== undefined) {
            $('.wplp-swiper .swiper-button-next').show();
            $('.wplp-swiper .swiper-button-prev').show();
            $('.wplp-swiper .swiper-pagination'). show();
            var mySwiperParams = {
                spaceBetween: 15,
                watchOverflow: true,
                noSwipingClass: 'swiper-no-swiping',
                // Responsive breakpoints
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetweenSlides: parseInt(widget_params.space_between)
                    }
                }
            };

            // 0 = None
            // 1 = Arrows
            // 2 = Arrows with bullets
            // 3 = Bullets
            if (typeof widget_params.pagination != 'undefined') {
                switch (widget_params.pagination) {
                    case '0':
                        mySwiperParams.navigation = {
                            enabled: false
                        };
                        break;
                    case '1':
                        mySwiperParams.navigation = {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        };
                        break;
                    case '2':
                        mySwiperParams.navigation = {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',

                        };
                        mySwiperParams.pagination = {
                            el: '.swiper-pagination',
                            clickable: true,
                            type: 'bullets',
                        };
                        break;
                    case '3':
                        mySwiperParams.navigation = {
                            enabled: false
                        };
                        mySwiperParams.pagination = {
                            el: '.swiper-pagination',
                            clickable: true,
                            type: 'bullets',
                        };
                        break;
                }
            }

            if (typeof widget_params.space_between != 'undefined' && !isNaN(widget_params.space_between)) {
                mySwiperParams.spaceBetween = parseInt(widget_params.space_between);
            }

            if (typeof widget_params.layzyload_img != 'undefined') {
                switch (widget_params.layzyload_img) {
                    case '0':
                        mySwiperParams.lazy = false;
                        break;
                    case '1':
                        mySwiperParams.lazy = true;
                        mySwiperParams.preloadImages = false;
                        break;
                } 
            }

            // Enable loop by default
            mySwiperParams.loop = true;
            if (typeof widget_params.addon_enable != 'undefined' && widget_params.addon_enable == '1') {
                if (typeof widget_params.slidespeed != 'undefined' && !isNaN(widget_params.slidespeed)) {
                    mySwiperParams.speed = parseInt(widget_params.slidespeed);
                }

                if (typeof widget_params.animationloop != 'undefined') {
                    switch (widget_params.animationloop) {
                        case '0':
                            mySwiperParams.loop = false;
                            break;
                        case '1':
                            mySwiperParams.loop = true;
                            break;
                    }
                }

                if (typeof widget_params.touch != 'undefined') {
                    switch (widget_params.touch) {
                        case '0':
                            wplp_swiper.find('.swiper-wrapper').removeClass('swiper-no-swiping');
                            break;
                        case '1':
                            wplp_swiper.find('.swiper-wrapper').addClass('swiper-no-swiping');
                            break;
                    }
                }
            } else {
                widget_params.slideshowspeed = 7000;
                mySwiperParams.speed = 600;
            }

            if (typeof widget_params.autoanimate != 'undefined' && widget_params.autoanimate == '1'
                && typeof widget_params.slideshowspeed != 'undefined' && !isNaN(widget_params.slideshowspeed)) {
                mySwiperParams.autoplay = {
                    delay: parseInt(widget_params.slideshowspeed)
                };
            }

            // animation
            // 0 = fade
            // 1 = slide
            if (typeof widget_params.autoanimatetrans != 'undefined') {
                switch (widget_params.autoanimatetrans) {
                    case '0':
                        mySwiperParams.effect = 'fade';
                        mySwiperParams.fadeEffect = {
                            crossFade: true
                        };
                        break;
                    case '1':
                        mySwiperParams.effect = "slide";
                        break;
                }
            }
            
            if (typeof widget_params.slidedirection != 'undefined') {
                let nbcol = 1;
                let nbrow = 1;
                if (typeof widget_params.nbcol != 'undefined') {
                    nbcol = parseInt(widget_params.nbcol);
                }
                if (typeof widget_params.nbrow != 'undefined') {
                    nbrow = parseInt(widget_params.nbrow);
                }

                switch (widget_params.slidedirection) {
                    case '0':
                        mySwiperParams.direction = 'horizontal';
                        if (nbcol > 0 && nbrow > 0) {
                            mySwiperParams.slidesPerView = nbcol;
                            mySwiperParams.slidesPerGroup = nbcol;

                            // fade effect only work well with one slide per view, slidesPerView = 1;
                            if (mySwiperParams.slidesPerView > 1 ) {
                                mySwiperParams.effect = 'slide';
                            }

                            if (mySwiperParams.slidesPerView > 1 ) {
                                if (mySwiperParams.lazy) {
                                    mySwiperParams.watchSlidesProgress = true;
                                }

                                mySwiperParams.breakpoints['768'] = {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetweenSlides: parseInt(widget_params.space_between)
                                };

                                if (mySwiperParams.slidesPerView >= 2) {                                            
                                    mySwiperParams.breakpoints['992'] = {
                                        slidesPerView: mySwiperParams.slidesPerView,
                                        slidesPerGroup: mySwiperParams.slidesPerView,
                                        spaceBetweenSlides: parseInt(widget_params.space_between)
                                    };
                                }   
                            }

                            if (nbrow > 1) {
                                mySwiperParams.loop = false; // Loop don't work with multiple row
                                if (mySwiperParams.effect !== 'fade') {
                                    mySwiperParams.grid = {
                                        fill: 'row',
                                        rows: nbrow
                                    }

                                    mySwiperParams.breakpoints['320'].grid = {
                                        fill: 'column',
                                        rows: nbrow
                                    };
                                    if (typeof mySwiperParams.breakpoints['768'] != 'undefined') {
                                        mySwiperParams.breakpoints['768'].grid = {
                                            fill: 'row',
                                            rows: nbrow
                                        };
                                    }

                                    if (typeof mySwiperParams.breakpoints['992'] != 'undefined') {
                                        mySwiperParams.breakpoints['992'].grid = {
                                            fill: 'row',
                                            rows: nbrow
                                        };
                                    }                
                                } else {
                                    mySwiperParams.loop = true;
                                }
                            }
                        }
                        break;
                    case '1': // vertical: only work with one slide per view
                        mySwiperParams.direction = 'vertical';
                        break;
                }
            }

            var mySwiper = new Swiper('#wplp_widget_' + widget_params.id, mySwiperParams);

            mySwiper.on('slideChange', function () {
                setTimeout(function() {
                    if (mySwiperParams.grid === 'undefined') {
                        mySwiper.visibleSlides.find('.swiper-lazy-preloader').remove();
                    } else {
                        $('#wplp_widget_' + widget_params.id).find('.swiper-lazy-preloader').remove();
                    }
                }, 500);
            });

            if (typeof widget_params.addon_enable != 'undefined' && widget_params.addon_enable == '1' && typeof mySwiperParams.autoplay != 'undefined') {
                var check_pauseaction = 0;
                if (typeof widget_params.pausehover != 'undefined' && widget_params.pausehover == '1') {
                    $('.wplp-swiper').mouseenter(function() {
                        mySwiper.autoplay.stop();
                    });

                    $('.wplp-swiper').mouseleave(function() {
                        if (!check_pauseaction) {
                            mySwiper.autoplay.start();
                        }
                    });
                }

                if (typeof widget_params.pauseaction != 'undefined') {
                    switch (widget_params.pauseaction) {
                        case '0':
                            $('.swiper-button-next').click(function() {
                                mySwiper.autoplay.start();
                            });
                            $('.swiper-button-prev').click(function() {
                                mySwiper.autoplay.start();
                            });
                            break;
                        case '1':
                            $('.swiper-button-next').click(function() {
                                check_pauseaction = 1;
                                mySwiper.autoplay.stop();
                            });
                            $('.swiper-button-prev').click(function() {
                                check_pauseaction = 1;
                                mySwiper.autoplay.stop();
                            });
                            break;
                    }
                }
            }

            if (wplp_swiper.hasClass('swiper-vertical')) {
                var height = wplp_swiper.find('.swiper-slide .thumbnail:first').height();
                height = parseInt(height) - 35;
                wplp_swiper.height(height);
            }
            if (wplp_swiper.hasClass('swiper-horizontal')) {
                if ($(window).width() <= 767) {
                    $('#wplp_widget_' + widget_params.id+' .wplp_listposts.swiper-wrapper').addClass('swiper-slide-mb');
                } else {
                    $('#wplp_widget_' + widget_params.id+' .wplp_listposts.swiper-wrapper').removeClass('swiper-slide-mb');
                }
            }
        }
    });
    
    $(window).resize(function(){
        $('[id^="wplp_widget_"].default').each(function () {
            if ($(this).hasClass('swiper-vertical')) {
                var height = $(this).find('.swiper-slide .thumbnail:first').height();
                height = parseInt(height) - 35;
                $(this).height(height);
            }
            if ($(this).hasClass('swiper-horizontal')) {
                if ($(window).width() <= 767) {
                    $('#wplp_widget_' + widget_params.id+' .wplp_listposts.swiper-wrapper').addClass('swiper-slide-mb');
                } else {
                    $('#wplp_widget_' + widget_params.id+' .wplp_listposts.swiper-wrapper').removeClass('swiper-slide-mb');
                }
            }
        })
    });
});

(function ( $ ) {
    $.fn.wplp_swiper = function(options, settings) {
        var swiper = new Swiper(`#wplp_widget_${settings.id}.wplp_widget_default`, options);
        swiper.on('slideChange', function () {
            setTimeout(function() {
                if (options.grid === 'undefined') {
                    swiper.visibleSlides.find('.swiper-lazy-preloader').remove();
                } else {
                    $('#wplp_widget_' + settings.id).find('.swiper-lazy-preloader').remove();
                }
            }, 500);
        });
        console.log(options);
        if (typeof settings.addon_enable != 'undefined' && settings.addon_enable == '1' && typeof options.autoplay != 'undefined') {
            var check_pauseaction = 0;
            if (typeof settings.pausehover != 'undefined' && settings.pausehover == '1') {
                $('.wplp-swiper').mouseenter(function() {
                    swiper.autoplay.stop();
                });

                $('.wplp-swiper').mouseleave(function() {
                    if (!check_pauseaction) {
                        swiper.autoplay.start();
                    }
                });
            }

            if (typeof settings.pauseaction != 'undefined') {
                switch (settings.pauseaction) {
                case '0':
                    $('.swiper-button-next').click(function() {
                        swiper.autoplay.start();
                    });
                    $('.swiper-button-prev').click(function() {
                        swiper.autoplay.start();
                    });
                    break;
                case '1':
                    $('.swiper-button-next').click(function() {
                        check_pauseaction = 1;
                        swiper.autoplay.stop();
                    });
                    $('.swiper-button-prev').click(function() {
                        check_pauseaction = 1;
                        swiper.autoplay.stop();
                    });
                    break;
                }
            }
        }

        return true;
    };
}( jQuery ));