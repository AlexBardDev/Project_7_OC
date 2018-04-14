/* Enable tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

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
};

/* Send a new message */
$("textarea").on("keypress", function (e) {
    if (e.keyCode === 13) {
        var content = e.target.value;
        $(this).val("");
        $(".dialog p[class='text-center'").hide();
        displayMessage(content);
        var nb = $(".dialog").height();
        $(".dialog").scrollTop(nb);
        console.log(nb);
    }
});

/* Faire un insertBefore pour que les messages s'affichent vers le haut 
prolbème de scroll après les putains de 348 px

*/
