var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function (a) {
  return a.raw = a
};
$jscomp.createTemplateTagFirstArgWithRaw = function (a, d) {
  a.raw = d;
  return a
};
$(function () {
  function a(e) {
    $(".message").remove();
    var b;
    0 < (null == (b = e[0].items) ? void 0 : b.length) ? $.each(e[0].items, function (h, c) {
      var g = '<li class="lists-item"><div class="list-inner"><p>タイトル：' +
        ((c.title ? c.title : "タイトル不明") +
          "</p><p>作者：") +
        ((c["dc:creator"] ? c["dc:creator"] : "作者不明") +
          "</p><p>出版社") +
        ((c["dc:publisher"] ? c["dc:publisher"][0] : "出版社") +
          '</p><a href="') + (c.link["@id"] +
          '" target="_blank">書籍情報</a></div></li>');
      $(".lists").prepend(g)
    }) : $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードを検索してください。</div>')
  }
  var d = 1,
    f = "";
  $(".search-btn").on("click", function () {
    var e = $("#search-input").val();
    e !== f ? (d = 1, $(".lists").empty(), f = e) : d++;
    $.ajax({
      url: "https://ci.nii.ac.jp/books/opensearch/search?title=" +
        e + "&format=json&p=" + d + "&count=20",
      method: "GET"
    }).done(function (b) {
      a(b["@graph"])
    }).fail(function (b) {
      $(".lists").empty();
      $(".message").remove();
      0 === b.status ? $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>') :
        400 === b.status ? $(".lists").before('<div class="message">検索キーワードがありません。<br>文字以上で検索してください。</div>') :
        $(".lists").before('<div class="message">予期せぬエラーが起きました。<br>再読み込みを行ってください。</div>')
    })
  });
  $(".reset-btn").on("click", function () {
    d = 1;
    f = "";
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("")
  })
});