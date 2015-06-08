/**
 * Created by Quentin on 08/06/2015.
 */

/***
 *  This function call the decorator menu
 *
 * @param node gthat represent the menu.
 */
function decoratorMenu(node) {
    var pid = "p" + Math.floor((Math.random() * 1000) + 1);
    var currentOffset = $("#cy").offset();
    var x = event.pageX - currentOffset.left;
    var y = event.pageY - currentOffset.top;
    if(!node.isParent() &&  !node.isChild()) {
        cy.add([{
            group: "nodes",
            data: {id: pid, weight: 100, faveColor: 'gray'},
            renderedPosition: {x: x, y: y}
        },
            {
                group: "nodes",
                data: {name: 'decorator', parent: pid, weight: 100, faveColor: 'blue'},
                renderedPosition: {x: x, y: y}
            }
            ,
            {
                group: "nodes",
                data: {
                    name: node.data().name,
                    parent: pid,
                    weight: node.data().weight,
                    faveColor: node.data().faveColor
                },
                renderedPosition: {x: x, y: y + 40}
            }
        ]);
        node.remove();
    }
}

function variableMenu() {
    console.log("derp");
    cy.cxtmenu({
        selector: 'node',

        commands: [
            {
                content: 'decorator',
                select: function() {
                    decoratorMenu(this);
                }
            },
            {
                content: 'delete',
                select: function(){
                    this.remove();
                }
            },
            {
                content: 'variable'

            }
        ]
    });
}