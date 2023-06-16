$(function () {
  function infoShow(firstDate) {
    //エラーメッセージを消す。
    $(".message").remove();
    //空の変数creationを作る。
    let creation;
    //firstDate(持ってきたデータの一番初め)のアイテムをcreationに入れる。creationがnullと一緒なのか？nullと一緒だったらvoid 0が選ばれる。nullと一緒ではない場合はcreate.lengthが実行される。apiからもらったデータの数だけ繰り返しbookの中に入れる。
    0 < (null == (creation = firstDate[0].items) ? void 0 : creation.length) ? $.each(firstDate[0].items, function (name, book) {
      let getInformation = '<li class="lists-item"><div class="list-inner"><p>タイトル：' +
        ((book.title ? book.title : "タイトル不明") +
          "</p><p>作者：") +
        ((book["dc:creator"] ? book["dc:creator"] : "作者不明") +
          "</p><p>出版社") +
        ((book["dc:publisher"] ? book["dc:publisher"][0] : "出版社") +
          '</p><a href="') + (book.link["@id"] +
          '" target="_blank">書籍情報</a></div></li>');
      //.listsのなかにgetInformationが入る。
      $(".lists").prepend(getInformation)
      //0＜void0を実行して、下記が表示される。
    }) : $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードを検索してください。</div>')
  }
  //pageOne（データの1ページ目の内容）を宣言。
  let pageOne = 1;
  //quotation（""）を宣言。
  let quotation = "";
  //検索ボタンを押したとき、
  $(".search-btn").on("click", function () {
    //#search-inputにあるバリューをkeywordの中に入れる。
    const keyword = $("#search-input").val();
    //keywordがquotationと違う場合はpageOneに1を入れて、
    if (keyword !== quotation) {
      pageOne = 1;
      //listsを空にする。
      $(".lists").empty();
      //quotationにkeywordを入れる。
      quotation = keyword;
      //pageOneとquotationが同じ場合は、pageOne++が実行される。
    } else {
      pageOne++;
    }
    //ajaxが実行されて、リンク先からデータを持ってくる。(keywordに入力した内容、pageOneは持ってきたデータの1ページ目の内容)
    $.ajax({
      url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + keyword + "&format=json&p=" + pageOne + "&count=20",
      method: "GET"
      //通信が成功した場合、doneが実行され、失敗したらfailが実行される。
    }).done(function (creation) {
      //成功したデータがcreationに入る。
      infoShow(creation["@graph"])
      //creationのなかに失敗データが入っている。
    }).fail(function (jqXHR) {
      //failの時はリストを空にする。
      $(".lists").empty();
      //メッセージを削除する。（この操作の前に既に失敗していることを想定している。そのエラーメッセージを消す。）
      $(".message").remove();
      //jqXHRのステータスは0か？0だったら下記メッセージを表示。（0、400はエラーステータスのこと）
      if (jqXHR.status === 0) {
        $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>');
        //jqXHRのステータスが400だったら下記メッセージを表示。
      } else if (jqXHR.status === 400) {
        $(".lists").before('<div class="message">検索キーワードがありません。<br>文字以上で検索してください。</div>');
        //0でも400でもなかったら、下記メッセージを表示。
      } else {
        $(".lists").before('<div class="message">予期せぬエラーが起きました。<br>再読み込みを行ってください。</div>');
      }
    })
  });
  //.reset-btnが押された場合。
  $(".reset-btn").on("click", function () {
    //pageOneに1を入れる
    pageOne = 1;
    //quotationを空にする
    quotation = "";
    //.listsが付いている所を空にする。
    $(".lists").empty();
    //エラーメッセージを消す。
    $(".message").remove();
    //検索したキーワードを消す。
    $("#search-input").val("")
  })
});