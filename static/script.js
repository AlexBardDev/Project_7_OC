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

/* Create a map */
function createMap(lat_place, lng_place) {
    $("<div id='map'></div>").appendTo(".dialog");
    var screenSize = $(".dialog").outerWidth(true) - 230;
    $(".dialog div:last").css({
        "height" : "200px",
        "width" : "200px",
        "margin-bottom" : "10px",
        "margin-left" : screenSize,
    });
    $("<script>function initMap() {var place = {lat: " + lat_place + ", lng: " + lng_place + "}; var map = new google.maps.Map(document.getElementById('map'), {zoom: 10,center: place});var marker = new google.maps.Marker({position: place,map: map});}</script>").appendTo("body");
    $("<script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBbwSbN7TkCEpCcAChqxfMDHbuBDwf6oao&callback=initMap'></script>").appendTo("body");
};

/* Display the Google maps map */
function displayMap(lat, lng) {
    createMap(lat, lng);
    scroll("div:last");
};

/* Search the address and display the informations */
function searchaddress(content) {
    if (myRegex.test(content)) {
        var address = String(myRegex.exec(content));
        address = address.split(" ");
        delete address[0];
        if (address.length > 2) {
            var nb = address.length -1;
            delete address[nb];
        }
        address = address.join(" ");
        displayLoader();
        setTimeout( function () {
            $(".dialog img").remove();
            $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCDUsZJNgvYtnQ1Z3ZgFY7KvsSRwr-ApLc", function (data) {
                var exact_address = data["results"][0]["formatted_address"];
                displayMessage( "Bien sûr mon poussin ! La voici : " + exact_address, user_2);
                var lat = data["results"][0]["geometry"]["location"]["lat"];
                var lng = data["results"][0]["geometry"]["location"]["lng"];
                displayMap(lat, lng);
            });
            $.get("https://en.wikipedia.org/w/api.php?action=query&titles=" + address + "&prop=revisions&rvprop=content&format=json", function (data) {
                console.log(data);
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
