$(function () {
  //ハンバーガーメニューをクリックすると、
  $(".drawer_button").click(function () {
    //クローズボタンに変わる（逆も同様）
    $(this).toggleClass("active");
    //白い背景が右から左に出る。
    $(".drawer_bg").fadeToggle();
    //メニューが右から左に出てくる。
    $("nav").toggleClass("open")
  });
  //クローズボタンを押すと、
  $(".drawer_bg").click(function () {
    //ハンバーガーメニューが隠れる。
    $(this).hide();
    //白い背景が右から左になくなる。
    $(".drawer_button").removeClass("active");
    //メニューがなくなる。
    $("nav").removeClass("open")
  })

})