$(document).ready(() => {
  $("#saveArticle").on("click", function(){
    $.ajax({
      type: "POST",
      url: "/",
      data: this.attributes["data-id"].value
    }).done(function() {
      // Reloads page after call is done
      window.location.reload();
      console.log("done");
    });
  });

  $("#unsaveArticle").on("click", function(){
    $.ajax({
      type: "POST",
      url: "/saved",
      data: this.attributes["data-id"].value
    }).done(function() {
      // Reloads page after call is done
      window.location.reload();
      console.log("done");
    });
  });
});