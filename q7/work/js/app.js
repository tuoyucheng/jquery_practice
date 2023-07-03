$(function () {
  //.btn__submitがクリックされたら、
  $(".btn__submit").on("click", function () {
    //console.logに名字が表示される。
    console.log("名字");
    console.log($("#family__name").val());
    //console.logに名前が表示される。
    console.log("名前");
    console.log($("#given__name").val());
    //console.logに生年月日が表示される。
    console.log("生年月日");
    console.log($(".year").val() + "年" + $(".month").val() + "月" + $(".day").val() + "日");
    //console.logに選ばれた性別が表示される。
    console.log("性別");
    console.log($('[name="gender"]:checked').val());
    //console.logに職業が表示される。
    console.log("職業");
    console.log($(".occupation").val());
    //console.logにアカウント情報が表示される。
    console.log("アカウント情報");
    console.log($("#account__name").val());
    //console.logにメールアドレスが表示される。
    console.log("メールアドレス");
    console.log($("#email").val());
    //console.logにパスワードが表示される。
    console.log("パスワード");
    console.log($("#password").val());
    //console.logに確認用パスワードが表示される。
    console.log("確認用パスワード");
    console.log($("#duplication__password").val());
    //console.logに住所が表示される。
    console.log("住所");
    console.log($("#address").val());
    //console.logに電話番号が表示される。
    console.log("電話番号");
    console.log($("#tel").val());
    //console.logにチェックされた購読情報が表示される。
    console.log("購読情報");
    $('[name="subscription"]:checked').each(function () {
      console.log($(this).val())
    })
  })
}); 