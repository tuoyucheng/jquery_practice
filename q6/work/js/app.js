  $(function () {
    $(".select-box").on("change",
      function () {
        var b = $(this).val(),
          c = $(".food-list li");
        "all" === b ? c.show() :
          $.each(c, function (e, a) {
            var d = $(a).data("category-type");
            b === d ? $(a).show() : $(a).hide()
          })
      })
  });