///<reference path="..\typings\jquery\jquery.d.ts"/>
/**
 * @author Quentin Cornevin,Ana�s Marongiu
 *
 * This class handle the communication.
 */

class Communication {
    /**
     *
     * @returns {string}
     */
    httpGet() {
        $.get("http://httpbin.org/ip", function (data) {
            $(".result").html(data);
            alert("Load was performed.");
        });
    }

    httpPost() {
        alert("httppost");
        /* var xhr = new XMLHttpRequest();
         xhr.open("POST", "bots/1/tree", true); // 1 pour l'id du joueur
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // parce qu'on est en post
         //var variable = encodeURIComponent("name=shout"); //conserver les caract�res sp�ciaux et les espaces.
         var data = encodeURIComponent("{"name": "shout"}");
         xhr.send("name=shout"); // variable1=truc&variable2=bidule*/

        // envoyer shout en format json et afficher le r�sultat de la requete
        $.post("bots/1/tree", {name: "shout"}).done(function (data) {
            alert("Result: " + data);
        });
    }
}