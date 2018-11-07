/* Author: Slash Soft, Create: Feb. 4, 2017 Var 1.0.1, Website: http://www.slashsoft.cn/ */

(function ($) {
  var nowPage = 1,prevPage = 0
  var arr = [1, 2, [3,4], [5,6], [7,8], [9,10], 11]
  var page = {}
  var up = 0
  $.extend({
    'orient': function () {
      switch (window.orientation) {
        case 0:
        case 180:
          if ($('#o').length > 0) {
            $('#o').remove();
          }
          break;
        case -90:
        case 90:
          if ($('#o').length == 0) {
            $('body').append('<div id="o"><i>微信会员中心不支持横屏</i></div>');
          }
          break;
      }
    },
    'init_main': function () {
      $('#m>div').each(function () {
        var _this = $(this);
        _this.swipe({
          threshold: 30,
          swipeUp: function () {
            if (0 < _this.index()) {
              up++; nowPage = arr[up];
              if(up>1&&up<6){
                nowPage = arr[up][page['p'+up]||0]
              }
              prevPage = arr[up-1]
              if(up>2){
                prevPage = arr[up-1][page['p'+(up-1)]||0]
              }
              _this.animate({top: '-100%'});
              stm_clicki('send', 'pageview', {'page': nowPage, 'title': '第'+nowPage+'页'});
              stm_clicki('send', 'event', prevPage+'到'+nowPage, '上滑');
            }
          },
          swipeDown: function () {
            if (6 != _this.index()) {
              up--
              nowPage = arr[up]
              if(up>1&&up<6){
                nowPage = arr[up][page['p'+up]||0]
              }
              prevPage = arr[up+1]
              if(up>=1&&up<5){
                prevPage = arr[up+1][page['p'+(up+1)]||0]
              }
              _this.next().animate({top: '0'});
              stm_clicki('send', 'pageview', {'page': nowPage, 'title': '第'+nowPage+'页'});
              stm_clicki('send', 'event', prevPage+'到'+nowPage, '下滑');
            }
          },
        });
      });
    },
  });
  $(document).ready(function () {
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      on: {
        slideChangeTransitionStart: function () {
          /*console.log(this.activeIndex);*/ //非循环模式下
          if (this.realIndex == 1) {
            page['p' + up] = 1
            nowPage = arr[up][1] ; prevPage = arr[up][0]
            stm_clicki('send', 'pageview', {'page': nowPage, 'title': '第'+nowPage+'页'});
            stm_clicki('send', 'event', prevPage+'到'+nowPage, '横滑');
          } else if (nowPage > 1) {
            page['p' + up] = 0
            nowPage = arr[up][0] ; prevPage = arr[up][1]
            stm_clicki('send', 'pageview', {'page': nowPage, 'title': '第'+nowPage+'页'});
            stm_clicki('send', 'event', prevPage+'到'+nowPage, '横滑');
          }
        }
      }
    });
    $.init_main()
    $.orient();
    $(window).resize(function () {
      $.orient();
    });

    if (FastClick) FastClick.attach(document.body);
  });

})(jQuery);
