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
    httpGet()
    {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "", false );
    xmlHttp.send( null );
    Console.log(xmlHttp.responseText);
    }
}