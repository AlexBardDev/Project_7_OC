/* Enable tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

/* Some Variables */
var height_pixels = 0;
var myRegex = /adresse {1}[A-Za-z0-9' ]* ?[.?,!]{1}/;
var user_1 = "web client";
var user_2 = "GrandPy Bot";
var incorrectQuestion = "Désolé mon enfant, mais je suis un vieux papy. Je ne comprends pas très bien ta question. Quelle adresse veux-tu ?";

/* Create a new message */
function createMessage(content, user) {
    $("<p>" + content + "</p>").appendTo(".dialog");
    $(".dialog p:last").css({
        "width" : "200px",
        "color" : "white",
        "border-radius" : "10px",
        "padding" : "5px",
    });
    if (user === "web client") {
        $(".dialog p:last").css("background-color", "blue");
    }
    else {
        var screenSize = $(".dialog").outerWidth(true) - 230;
        $(".dialog p:last").css({"margin-left" : screenSize, "background-color" : "red"});
    }
};

/* Scroll automatically to the bottom of the page */
function scroll(elt) {
    var heightElement = $(".dialog " + elt).outerHeight(true);
    height_pixels += heightElement;
    $(".dialog").scrollTop(height_pixels);
};

/* Display a new message */
function displayMessage(content, user) {
    createMessage(content, user);
    scroll("p:last");
};

/* Create the loader */
function createLoader() {
    $("<img src='../static/ajax_loader.gif' alt='loader'/>").appendTo(".dialog");
    var screenSize = $(".dialog").outerWidth(true) - 150;
    $(".dialog img").css({
        "margin-left" : screenSize,
        "margin-bottom" : "10px"});
};

/* Display the loader */
function displayLoader() {
    createLoader();
    scroll("img");
};

/* Search the address and display the informations */
function searchaddress(content) {
    if (myRegex.test(content)) {
        var address = String(myRegex.exec(content));
        address = address.split(" ", 2);
        delete address[0];
        address = address.join("");
        displayLoader();
        setTimeout( function () {
            $(".dialog img").remove();
            $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCDUsZJNgvYtnQ1Z3ZgFY7KvsSRwr-ApLc", function (data) {
                var exact_address = data["results"][0]["formatted_address"];
                displayMessage( "Bien sûr mon poussin ! La voici : " + exact_address, user_2);
            });
        }, 1000);
    }
    else {
        displayMessage(incorrectQuestion, user_2);
    }
};

/* Send a new message */
$("textarea").on("keypress", function (e) {
    if (e.keyCode === 13) {
        var content = e.target.value;
        $(this).val("");
        if ($(".dialog p[class='text-center'").is(":visible")) {
            $(".dialog p[class='text-center'").hide();
        };
        displayMessage(content, user_1);
        searchaddress(content);
    }
});
