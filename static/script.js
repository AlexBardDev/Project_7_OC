/* Enable tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

var height_pixels = 0;
var myRegex = /adresse {1}[A-Za-z0-9']* ?[.?,!]{1}/;
var incorrectQuestion = "Désolé mon enfant, mais je suis un vieux papy. Je ne comprends pas très bien ta question. Quelle adresse veux-tu ?";

/* Scroll automatically to the bottom of the page */
function scroll() {
    var nb = $(".dialog p:last").outerHeight(true);
    height_pixels += nb;
    $(".dialog").scrollTop(height_pixels);
};

/* Display a new message */
function displayMessage(content) {
    var pElt = document.createElement("p");
    pElt.textContent = content;
    pElt.style.width = "200px";
    pElt.style.backgroundColor = "blue";
    pElt.style.color = "white";
    pElt.style.borderRadius = "10px";
    pElt.style.padding = "5px";
    document.getElementsByClassName("dialog")[0].appendChild(pElt);
    scroll();
};

function searchAdress(content) {
    if (myRegex.test(content)) {
        displayMessage(content);
    }
    else {
        displayMessage(incorrectQuestion);
    }
};

/* Send a new message */
$("textarea").on("keypress", function (e) {
    if (e.keyCode === 13) {
        var content = e.target.value;
        $(this).val("");
        $(".dialog p[class='text-center'").hide();
        displayMessage(content);
        searchAdress(content);
    }
});