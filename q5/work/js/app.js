$(function () {
  //メニューバーにカーソルを置くと、
  $(".dropdwn li").hover(function () {
      //子要素のメニューがスライドダウンで表示され、すべて出ると停止する。
      $(this).children("ul").stop().slideDown()
    },
    function () {
      //カーソルを外すと、スライドアップでメニューが閉じられる。
      $(this).children("ul").stop().slideUp()
    }
  )
});