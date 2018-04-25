/* Enable tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

/* Some Variables */
var height_pixels = 0;
var myRegex = /adresse {1}[A-Za-z0-9']* ?[.?,!]{1}/;
var incorrectQuestion = "Désolé mon enfant, mais je suis un vieux papy. Je ne comprends pas très bien ta question. Quelle adresse veux-tu ?";

/* Create a new paragraph */
function createBox(content) {
    var pElt = document.createElement("p");
    pElt.textContent = content;
    pElt.style.width = "200px";
    pElt.style.backgroundColor = "blue";
    pElt.style.color = "white";
    pElt.style.borderRadius = "10px";
    pElt.style.padding = "5px";
    document.getElementsByClassName("dialog")[0].appendChild(pElt);
};

/* Scroll automatically to the bottom of the page */
function scroll() {
    var nb = $(".dialog p:last").outerHeight(true);
    height_pixels += nb;
    $(".dialog").scrollTop(height_pixels);
};

/* Display a new message */
function displayMessage(content) {
    createBox(content);
    scroll();
};

/* Custom the answers of GrandPy Bot */
function customized() {
    var screenSize = $(".dialog").outerWidth(true) - 230;
    $(".dialog p:last").css({"margin-left" : screenSize, "background-color" : "red"});
};

/* Search the adress and display the informations */
function searchAdress(content) {
    if (myRegex.test(content)) {
        var adress = myRegex.exec(content);
        displayMessage(adress);
        customized();
    }
    else {
        displayMessage(incorrectQuestion);
        customized();
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