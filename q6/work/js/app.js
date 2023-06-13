  $(function () {
    //.select-boxが変更されたら、
    $(".select-box").on("change",
      function () {
        //選択された.select-boxがgetBoxである。
        const getBox = $(this).val();
          //foodList が.food-list liである。
        const foodList = $(".food-list li");
        //選択された.select-boxがall（全て）である場合は.food-list liを全て表示。
        "all" === getBox ? foodList.show() :
          //allでない場合は、(indexNumはインデックス番号、categoryTypeはcategory-type、getTypeは選択されたcategory-type)
          $.each(foodList, function (indexNum, categoryType) {
            //選択された.select-boxのcategory-typeの中の.food-list liに該当するものを表示し、
            const getType = $(categoryType).data("category-type");
            //該当しないものは表示しない。
            getBox === getType ? $(categoryType).show() : $(categoryType).hide()
          })
      })
  });