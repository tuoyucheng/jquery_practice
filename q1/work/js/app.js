$(function () {

  //読み込み時に文字色をグリーンに変える。
  $("#q1").css("color", "green");

  //クリックした時に、
  $("#q2").on("click", function () {
    //背景色をピンクに変える。
    $(this).css("background", "pink")
  });

  //クリックしたときに、
  $("#q3").on("click", function () {
    //3秒間でフェードアウトする。
    $(this).fadeOut(3E3)
  });

  //クリックした時に、
  $("#q4").on("click", function () {
    //largeの属性を追加する。
    $(this).addClass("large")
  });

  //クリックしたときに、
  $("#q5").on("click", function () {
    //ボタンの中に「DOMの中の前」と表記
    $(this).prepend("DOMの中の前")
    //ボタンの中に「DOMの中の後」と表記
    .append("DOMの中の後")
      //ボタンの前に｛DOMの前」と表記
      .before("DOMの前")
      //ボタンの後に「DOMの後」と表記
      .after("DOMの後")
  });

  //クリックした時に、
  $("#q6").on("click", function () {
    // 対象に位置に2秒間かけて動かす。
    $(this).animate({
      "margin-top": 100,
      "margin-left": 100
    },2E3)
  });

  //クリックしたときに、
  $("#q7").on("click",
    //idのノードをコンソール表示。
    function () {
      console.log(this)
    });

  //カーソルを置いた時に、
  $("#q8").on({
    //large属性を追加。
    mouseenter: function () {
      $(this).addClass("large")
    },
    //カーソルを外した時に、
    mouseleave: function () {
      //large属性を除く。
      $(this).removeClass("large")
    }
  });

  //クリックしたときに、
  $("#q9 li").on("click", function () {
    //対象のインデックス番号を
    const getIndex = $(this).index();
    //アラート表示。
    alert(getIndex)
  });

  //Q10をクリックしたときに、
  $("#q10 li").on("click", function () {
    //Q11のインデックス番号を取得し、
    const getIndex = $(this).index();
    console.log($("#q11 li").eq(getIndex));
    //対象のインデックス番号のテキストに、large-text属性を追加して表示。
    $("#q11 li").eq(getIndex).addClass("large-text")
  })
});