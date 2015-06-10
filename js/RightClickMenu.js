/**
 * Created by Quentin on 08/06/2015.
 */

/***
 *  This function call the decorator menu
 *
 * @param node that represent the menu.
 */
function decoratorMenu(node, value) {
    var pid = "p" + Math.floor((Math.random() * 1000) + 1);
    var currentOffset = $("#cy").offset();
    var x = event.pageX - currentOffset.left;
    var y = event.pageY - currentOffset.top;
    console.log(node.data().name)
    if(!node.isParent() &&  !node.isChild()) {
        cy.add([{
            group: "nodes",
            data: {id: pid, weight: 100, faveColor: 'gray'},
            renderedPosition: {x: x, y: y}
        },
            {
                group: "nodes",
                data: {name: value, parent: pid, weight: 105, faveColor: 'blue',type:'decorator'},
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

function EditDecorator(e) {
    if (!e.data.canPerform(e, EditDecorator)) {
        return;
    }
    if(e.cyTarget.data().type=="decorator") {
        alertWin("Edit", 'parameter', 300, 150, e.cyTarget)
    }
    if(e.cyTarget.data().type=="action") {
        alertWin("Edit", 'option', 300, 150, e.cyTarget)
    }
}
//#endregion


//#region Remove
function performRemove(e) {
    if (!e.data.canPerform(e, performRemove)) {
        return;
    }

    cy.remove(e.cyTarget);
}
//#endregion

function variableMenu() {
    addDomListeners();
}