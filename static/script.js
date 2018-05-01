/* Enable tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

/* Some Variables */
var height_pixels = 0;
var myRegex = /adresse [A-Za-z' ]* [.?!]{1}/;
var user_1 = "web client";
var user_2 = "GrandPy Bot";
var nb_map = 0;
var data = "";
var incorrectQuestion = "Désolé mon enfant, mais je suis un vieux papy. Je ne comprends pas très bien ta question. Quelle adresse veux-tu ?";
var stories = ["Mais t'ai-je déjà raconté l'histoire de ce quartier qui m'a vu en culottes courtes ? ",
"Mais t'ai-je déjà raconté l'histoire de ce quartier où j'ai grandi ? ", "Mais t'ai-je déjà raconté l'histoire de ce quartier où j'ai rencontré ta mamie ? "];
var noStory = "Désolé mon enfant, mais je n'ai pas d'anecdotes à raconter sur ce lieu."

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
    $(".dialog img:last").css({
        "margin-left" : screenSize,
        "margin-bottom" : "10px"});
};

/* Display the loader */
function displayLoader() {
    createLoader();
    scroll("img:last");
};

/* Create a map */
function createMap(lat_place, lng_place) {
    nb_map++;
    $("<div id='map" + String(nb_map) + "'></div>").appendTo(".dialog");
    var screenSize = $(".dialog").outerWidth(true) - 430;
    $(".dialog div:last").css({
        "height" : "400px",
        "width" : "400px",
        "margin-bottom" : "10px",
        "margin-left" : screenSize,
    });
    $("<script>function initMap() {var place = {lat: " + lat_place + ", lng: " + lng_place + "}; var map = new google.maps.Map(document.getElementById('map" + String(nb_map) + "'), {zoom: 15,center: place});var marker = new google.maps.Marker({position: place,map: map});}</script>").appendTo("body");
    $("<script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBbwSbN7TkCEpCcAChqxfMDHbuBDwf6oao&callback=initMap'></script>").appendTo("body");
};

/* Display the Google maps map */
function displayMap(lat, lng) {
    createMap(lat, lng);
    scroll("div:last");
};

/* Search the address and display the informations */
function responseGrandPyBot(content) {
    if (myRegex.test(content)) {
        var address = String(myRegex.exec(content)).split(" ");
        if (address[1] === "de") {
            address = address[2];
        }
        else {
            address = address[1].split("'")[1];
        }
        displayLoader();
        setTimeout( function () {
            $(".dialog img:last").remove();
            $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCDUsZJNgvYtnQ1Z3ZgFY7KvsSRwr-ApLc", function (responseMaps) {
                data = responseMaps;
                var exact_address = data["results"][0]["formatted_address"];
                displayMessage( "Bien sûr mon poussin ! La voici : " + exact_address, user_2);
                displayLoader();
                setTimeout( function () {
                    $(".dialog img:last").remove();
                    var lat = data["results"][0]["geometry"]["location"]["lat"];
                    var lng = data["results"][0]["geometry"]["location"]["lng"];
                    displayMap(lat, lng);
                    displayLoader();
                    setTimeout( function () {
                        $(".dialog img:last").remove();
                        var research = data["results"][0]["formatted_address"].split(",")[0].split(" ");
                        delete research[0];
                        research = research.join("_");
                        $.get("https://fr.wikipedia.org/w/api.php?origin=*&action=query&titles=" + research + "&prop=revisions&rvprop=content&format=json", function (responseWiki) {
                            if (responseWiki === undefined || responseWiki["query"] === undefined || responseWiki["query"]["pages"]["5653202"] === undefined) {
                                displayMessage(noStory);
                            }
                            else {
                                var anecdote = responseWiki["query"]["pages"]["5653202"]["revisions"][0]["*"];
                                anecdote = anecdote.split("==")[2].split("File")[0];
                                anecdote = anecdote.substring(0, 54) + anecdote.substring(56,83) + "." + anecdote.substring(122,141) + " T" + anecdote.substring(158,277);
                                anecdote = anecdote.split("[[").join("").split("]]").join("");
                                var index = Math.floor(Math.random()*stories.length);
                                story = stories[index];
                                displayMessage(story + anecdote);
                            }
                            $(".dialog p:last").addClass("story");
                        });
                    },1000);
                },1000);
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
        responseGrandPyBot(content);
    }
});
