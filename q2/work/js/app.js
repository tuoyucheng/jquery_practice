$(function () {
  //openボタンをクリックしたときに、
  $(".modal_open_button").click(function () {
    //白い枠がフェードインする。
    $(".modal_win").fadeIn()
  });
  //×ボタンをクリックしたときに、
  $(".modal_close_button").click(function () {
    //白い枠がフェードアウトする。
    $(".modal_win").fadeOut()
  })
})