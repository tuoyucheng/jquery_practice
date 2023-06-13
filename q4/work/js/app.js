$(function () {
  //nav liをクリックしたときに、
  $(".nav li").click(function () {
    //インデックスを取得し、
    const navListIndex = $(".nav li").index(this);
    //description liに対象のインデックスのis-hiddenを追加し表示する。
    $(".description li").addClass("is-hidden");
    //別のnav liをクリックすると、現在のis-hiddenが除かれ、
    //クリックした対象のis-hiddenを表記する。
    $(".description li").eq(navListIndex ).removeClass("is-hidden")
  })
});