$(function () {
  function infoShow(firstData) {
    //エラーメッセージを消す。
    $(".message").remove();
    //空の変数creationを作る。
    const creation = firstData[0].items;
    //creationがnullか0以下だったら、
    if (creation === null || creation.length <= 0) {
      //.listsの前に下記のメッセージを表示させる。
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードを検索してください。</div>');
    } else {
      //取得したデータを表示する。（作者、タイトル、出版社　など）
      $.each(firstData[0].items, function (name, book) {
        const getInformation = '<li class="lists-item"><div class="list-inner"><p>タイトル：' +
          ((book.title ? book.title : "タイトル不明") + "</p><p>作者：") +
          ((book["dc:creator"] ? book["dc:creator"] : "作者不明") + "</p><p>出版社") +
          ((book["dc:publisher"] ? book["dc:publisher"][0] : "出版社") + '</p><a href="') + (book.link["@id"] + '" target="_blank">書籍情報</a></div></li>');
        //.listsのなかにgetInformationが入る。
        $(".lists").prepend(getInformation)
      })
    }
  }
  //pageNum（データの1ページ目の内容）を宣言。
  let pageNum = 1;
  //pageCheckKeyword（""）を宣言。
  let pageCheckKeyword = "";
  // messageShowを定義する。
  function messageShow(data) {
    //failの時はリストを空にする。
    $(".lists").empty();
    //メッセージを削除する。（この操作の前に既に失敗していることを想定している。そのエラーメッセージを消す。）
    $(".message").remove();
    //dataのステータスは0か？0だったら下記メッセージを表示。（0、400はエラーステータスのこと）
    if (data.status === 0) {
      $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>');
      //dataのステータスが400だったら下記メッセージを表示。
    } else if (data.status === 400) {
      $(".lists").before('<div class="message">検索キーワードがありません。<br>文字以上で検索してください。</div>');
      //0でも400でもなかったら、下記メッセージを表示。
    } else {
      $(".lists").before('<div class="message">予期せぬエラーが起きました。<br>再読み込みを行ってください。</div>');
    }
  }
  //検索ボタンを押したとき、
  $(".search-btn").on("click", function () {
    //#search-inputにあるバリューをkeywordの中に入れる。
    const keyword = $("#search-input").val();
    //keywordがpageCheckKeywordと違う場合はpageNumに1を入れて、
    if (keyword !== pageCheckKeyword) {
      pageNum = 1;
      //listsを空にする。
      $(".lists").empty();
      //pageCheckKeywordにkeywordを入れる。
      pageCheckKeyword = keyword;
      //pageNumとpageCheckKeywordが同じ場合は、pageNum++が実行される。
    } else {
      pageNum++;
    }
    //ajaxが実行されて、リンク先からデータを持ってくる。(keywordに入力した内容、pageNumは持ってきたデータの1ページ目の内容)
    $.ajax({
      url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + keyword + "&format=json&p=" + pageNum + "&count=20",
      method: "GET"
      //通信が成功した場合doneが実行され、成功したデータがcreationに入る。失敗したらfailが実行される。
    }).done(function (creation) {
      //成功したデータがcreationに入る。
      infoShow(creation["@graph"])
      //dataのなかに失敗データが入っている。
    }).fail(function (data) {
      //messageShowを実行する。
      messageShow(data)
    })
  });
  //.reset-btnが押された場合。
  $(".reset-btn").on("click", function () {
    //pageNumに1を入れる
    pageNum = 1;
    //pageCheckKeywordを空にする
    pageCheckKeyword = "";
    //.listsが付いている所を空にする。
    $(".lists").empty();
    //エラーメッセージを消す。
    $(".message").remove();
    //検索したキーワードを消す。
    $("#search-input").val("")
  })
});