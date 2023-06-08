$(function () {
  function verb(e) {
    //エラーメッセージを消す。
    $(".message").remove();
    //空の変数createを作る。
    let create;
    //eはもらってきたデータ一番初め（0）のアイテムをcreateに入れる。createがnullと一緒なのか？nullと一緒だったらvoid 0が選ばれる。nullと一緒ではない場合はcreate.lengthが実行される。apiからもらったデータの数だけ繰り返しcの中に入れる。
    0 < (null == (create = e[0].items) ? void 0 : create.length) ? $.each(e[0].items, function (h, c) {
      let get = '<li class="lists-item"><div class="list-inner"><p>タイトル：' +
        ((c.title ? c.title : "タイトル不明") +
          "</p><p>作者：") +
        ((c["dc:creator"] ? c["dc:creator"] : "作者不明") +
          "</p><p>出版社") +
        ((c["dc:publisher"] ? c["dc:publisher"][0] : "出版社") +
          '</p><a href="') + (c.link["@id"] +
          '" target="_blank">書籍情報</a></div></li>');
      //.listsのなかにgetが入る。
      $(".lists").prepend(get)
      //0＜void0を実行して、下記が表示される。
    }) : $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードを検索してください。</div>')
  }
  let find = 1,
    f = "";
  //検索ボタンを押した場合、
  $(".search-btn").on("click", function () {
    //#search-inputにあるバリューをsearchの中に入れる。
    let search = $("#search-input").val();
    //searchがfと違う場合はfindに1を入れて、listsを空にしてほしい。fにsearchを入れる。findとfが同じ場合find++が実行される。
    search !== f ? (find = 1, $(".lists").empty(), f = search) : find++;

    $.ajax({
      //ajaxが実行されて、リンク先からデータを持ってくる。(searchに入力した内容、findは持ってきたデータの1ページ目の内容)
      url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + search + "&format=json&p=" + find + "&count=20",
      method: "GET"
      //通信が成功した場合、doneが実行され、失敗したらfailが実行される。
    }).done(function (create) {
      //成功したデータがcreateに入る。
      verb(create["@graph"])
      //createになかに失敗データが入っている。
    }).fail(function (create) {
      //failの時はリストを空にする。
      $(".lists").empty();
      //メッセージを削除する。（この操作の前に既に失敗していることを想定している。そのエラーメッセージを消す。）
      $(".message").remove();
      //createのステータスは0か？0だったら下記メッセージを表示。（0、400はエラーステータスのこと）
      0 === create.status ? $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>') :
        //createのステータスが400だったら下記メッセージを表示。
        400 === create.status ? $(".lists").before('<div class="message">検索キーワードがありません。<br>文字以上で検索してください。</div>') :
        //0でも400でもなかったら、下記メッセージを表示。
        $(".lists").before('<div class="message">予期せぬエラーが起きました。<br>再読み込みを行ってください。</div>')
    })
  });
  //.reset-btnが押された場合。
  $(".reset-btn").on("click", function () {
    //findに1を入れる
    find = 1;
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