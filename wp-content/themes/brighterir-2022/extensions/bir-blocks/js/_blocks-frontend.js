/*------------------------------------------
 * BLOCKS FRONTEND
 *------------------------------------------ */
(function ($) {
  /*------------------------------------------
   * BLOCKS FRONTEND: STRETCH ROW
   *------------------------------------------*/
  jQuery("document").ready(function ($) {
    var viewportWidth = document.querySelectorAll(".alignfull");

    var setMargin = function setMargin() {
      requestAnimationFrame(function () {
        [].forEach.call(viewportWidth, function (e) {
          e.style.marginLeft = "";
          e.style.marginLeft = -e.offsetLeft + "px";
          e.style.width = document.body.clientWidth + "px";
        });
      });
    };

    setMargin();
    window.onresize = setMargin;
  });
})(jQuery);
