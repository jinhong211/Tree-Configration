/**
 * Created by Quentin on 01/06/2015.
 */

/**
 * @author Quentin Cornevin,
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
        /* var xhr = new XMLHttpRequest();
         xhr.open("POST", "bots/1/tree", true); // 1 pour l'id du joueur
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // parce qu'on est en post
         //var variable = encodeURIComponent("name=shout"); //conserver les caractères spéciaux et les espaces.
         var data = encodeURIComponent("{"name": "shout"}");
         xhr.send("name=shout"); // variable1=truc&variable2=bidule*/

        // envoyer shout en format json et afficher le résultat de la requete
        $.post("bots/1/tree", {name: "shout"}).done(function (data) {
            alert("Data Loaded: " + data);
        });
    }
}