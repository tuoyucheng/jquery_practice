  $(function () {
    //.select-boxが変更されたら、
    $(".select-box").on("change",
      function () {
        //選択された.select-boxがbottleである。
        var bottle = $(this).val(),
        //cupが.food-list liである。
          cup = $(".food-list li");
          //選択された.select-boxがall（全て）である場合は.food-list liを全て表示。
        "all" === bottle ? cup.show() :
        //allでない場合は、　　　(eはインデックス番号、verbはcategory-type、dishは選択されたcategory-type)
          $.each(cup, function (e, verb) {
            //選択された.select-boxのcategory-typeの中の.food-list liに該当するものを表示し、
            var dish = $(verb).data("category-type");
            //該当しないものは表示しない。
            bottle === dish ? $(verb).show() : $(verb).hide()
          })
      })
  });