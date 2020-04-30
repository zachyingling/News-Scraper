$(document).ready(() => {
  $("#saveArticle").on("click", function(){
    console.log(this.attributes["data-id"].value);
  });
});