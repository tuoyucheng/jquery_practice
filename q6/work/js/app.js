  $(function () {
    //.select-boxが変更されたら、
    $(".select-box").on("change",
      function () {
        //選択された.select-boxがgetBoxである。
        const getBox = $(this).val(),
        //cが.food-list liである。
          c = $(".food-list li");
          //選択された.select-boxがall（全て）である場合は.food-list liを全て表示。
        "all" === getBox ? c.show() :
        //allでない場合は、(eはインデックス番号、aはcategory-type、getTypeは選択されたcategory-type)
          $.each(c, function (e, a) {
            //選択された.select-boxのcategory-typeの中の.food-list liに該当するものを表示し、
            const getType = $(a).data("category-type");
            //該当しないものは表示しない。
            getBox === getType ? $(a).show() : $(a).hide()
          })
      })
  });