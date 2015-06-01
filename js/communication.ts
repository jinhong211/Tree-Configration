///<reference path="..\typings\jquery\jquery.d.ts"/>
/**
 * Created by Quentin on 01/06/2015.
 */

class Communication {

    /**
     *
     * @returns {string}
     */
    httpGet()
    {
        $.get( "http://httpbin.org/ip", function( data ) {
            $( ".result" ).html( data );
            alert( "Load was performed." );
        });
    }
}