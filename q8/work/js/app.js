$(function () {
  function verb(e) {
    //エラーメッセージを消す。
    $(".message").remove();
    //空の変数bottleを作る。
    var bottle;
    //eはもらってきたデータ一番初め（0）のアイテムをbottleに入れる。bがnullと一緒なのか？nullと一緒だったらvoid0が選ばれる。nullと一緒ではない場合はbottle.lengthが実行される。apiからもらったデータの数だけ繰り返しcupの中に入れる。
    0 < (null == (bottle = e[0].items) ? void 0 : bottle.length) ? $.each(e[0].items, function (h, cup) {
      var g = '<li class="lists-item"><div class="list-inner"><p>タイトル：' +
        ((cup.title ? cup.title : "タイトル不明") +
          "</p><p>作者：") +
        ((cup["dc:creator"] ? cup["dc:creator"] : "作者不明") +
          "</p><p>出版社") +
        ((cup["dc:publisher"] ? cup["dc:publisher"][0] : "出版社") +
          '</p><a href="') + (cup.link["@id"] +
          '" target="_blank">書籍情報</a></div></li>');
      //.listsのなかにgが入る。
      $(".lists").prepend(g)
      //0＜void0を実行して、下記が表示される。
    }) : $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードを検索してください。</div>')
  }
  var page = 1,
    f = "";
  //検索ボタンを押した場合、
  $(".search-btn").on("click", function () {
    //#search-inputにあるバリューをsearchInputValueの中に入れる。
    var searchInputValue = $("#search-input").val();
    //searchInputValueがfと違う場合はpageに1を入れて、listsをからにしてほしい。fにsearchInputValueを入れる。pageとfが同じ場合page++が実行される。
    searchInputValue !== f ? (page= 1, $(".lists").empty(), f = searchInputValue) : page++;

    $.ajax({
      //ajaxが実行されて、リンク先からデータを持ってくる。(searchInputValueに入力した内容、pageは持ってきたデータの1ページ目の内容)
      url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + searchInputValue + "&format=json&p=" + page + "&count=20",
      method: "GET"
      //通信が成功した場合、doneが実行され、失敗したらfailが実行される。
    }).done(function (bottle) {
      //成功したデータがbottleに入る。
      verb(bottle["@graph"])
      //bottleになかに失敗データが入っている。
    }).fail(function (bottle) {
      //failの時はリストを空にする。
      $(".lists").empty();
      //メッセージを削除する。（この操作の前に既に失敗していることを想定している。そのエラーメッセージを消す。）
      $(".message").remove();
      //bottleのステータスは0か？0だったら下記メッセージを表示。（0、400はエラーステータスのこと）
      0 === b.status ? $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>') :
        //bottleのステータスが400だったら下記メッセージを表示。
        400 === b.status ? $(".lists").before('<div class="message">検索キーワードがありません。<br>文字以上で検索してください。</div>') :
        //0でも400でもなかったら、下記メッセージを表示。
        $(".lists").before('<div class="message">予期せぬエラーが起きました。<br>再読み込みを行ってください。</div>')
    })
  });
  //.reset-btnが押された場合。
  $(".reset-btn").on("click", function () {
    //pageに1を入れる
    page = 1;
    //fを空にする
    f = "";
    //.listsが付いている所を空にする。
    $(".lists").empty();
    //エラーメッセージを消す。
    $(".message").remove();
    //検索したキーワードを消す。
    $("#search-input").val("")
  })
});