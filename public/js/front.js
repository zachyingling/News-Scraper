$(document).ready(() => {
  $("#saveArticle").on("click", function(){
    $.ajax({
      type: "POST",
      url: "/saved",
      data: this.attributes["data-id"].value,
    }).done(function() {
      console.log("done");
    });
  });
});