/**
 * Created by Quentin on 08/06/2015.
 */

/***
 *  This function call the decorator menu
 *
 * @param node that represent the menu.
 */

function decoratorMenu(node, value) {
    var pid = node.id();

    var x = node.renderedPosition().x;
    var y = node.renderedPosition().y;

    var currentOffset = $("#cy").offset();

    //var x = event.pageX - currentOffset.left;
    //var y = event.pageY - currentOffset.top;
    //console.log(node.data().name)
    if(!node.isParent() &&  !node.isChild()) {

        node.remove();

        var nodeModel = Controller.getInstance().getBuilderTree().getBlockById(pid);
        nodeModel.addDecorator(new Decorator(value,null,value,""));

        var compoundNode = cy.add([{
            group: "nodes",
            data: {id: pid, weight: 105 ,height: 100, faveColor: 'gray'},
            renderedPosition: {x: x, y: y},
        }
        ]).addClass("menu");

        var previous = cy.add([
            {
                group: "nodes",
                data: {
                    parent: pid,
                    name: node.data().name,
                    weight: node.data().weight,
                    height: node.height(),
                    faveColor: node.data().faveColor,

                },
                renderedPosition: {x: x, y: y}
            }
        ]);

        var posY = y-(previous.renderedOuterHeight()/2 + 50/2);
        var newNode = cy.add([
            {
                group: "nodes",
                data: {name: value, parent: pid, weight: 105, height: 45, faveColor: 'blue', type: 'decorator'},
                renderedPosition: {x: x, y: posY}
            }
        ]);



        //newNode.renderedPosition({x: x, y: y-(previous.renderedOuterHeight()/2 +newNode.renderedOuterHeight()/2) });

        // Ajout des fleches qui ont �t� supprim� par la cr�ation du decorator

        // Ajout de la fleche parent
        var parent;
        if ((parent = nodeModel.getParentNode())!=null){
            var parentId = parent.getId();
            var idEdge = Controller.getInstance().getBuilderTree().findEdgesId(parentId,pid);

            cy.add([{
                group: 'edges',
                data: {
                    id: idEdge,
                    source: parentId,
                    target: pid
                }
            }
            ]);
            updateEdgeNumber(parent);
        }

        if ((Controller.getInstance().getBuilderTree().getRootTree().getId() == pid)){
            var idEdge = Controller.getInstance().getBuilderTree().findEdgesId("root",pid);
            cy.add([{
                group: 'edges',
                data: {
                    id: idEdge,
                    source: "root",
                    target: pid
                }
            }
            ]);
        }

        // Ajout des fleches vers les enfants du nouveau decorator
        if (nodeModel instanceof CompositeTreeNode ){
            var children = nodeModel.getChildrenNodes();
            for (var i = 0; i< nodeModel.getChildrenNodes().length;i++){
                var idTarget = children[i].getId();
                var idEdge = Controller.getInstance().getBuilderTree().findEdgesId(pid,idTarget);
                cy.add([{
                    group: 'edges',
                    data: {
                        id: idEdge,
                        source: pid,
                        target: idTarget
                    }
                }
                ]);
            }
        }
        updateEdgeNumber(nodeModel);
    }
    if (node.isParent()){

        for (var i = 0; i < node.children().length; i++) {
            if (node.children()[i].data().name == value) {
                return;
            }
        }

        var children = node.children();
        var posX = children[0].renderedPosition().x;
        var posY = children[0].renderedPosition().y;

        posY -= children[0].renderedOuterHeight()/2;
        for (var i=1;i<children.length;i++){
            posY -= children[i].renderedOuterHeight();
        }
        posY -= 50/2;

        cy.add([{
            group: "nodes",
            data: {name: value, parent: pid, weight: 105,height:45, faveColor: 'blue', type: 'decorator'},
            renderedPosition: {x: posX, y: posY},
        }
        ]);

    }



}

function EditDecorator(node) {
    var counter = 1;
    counter = getParamNumber(counter, node.data().title);

    if(node.data().type=="action") {
        alertWin("Edit", '', 300, 50 + counter * 50, node)
    }
}
//#endregion


//#region Remove
function performRemove() {
    var res = cy.$(':selected').id().split("");
    if (res[0]=="e") {
        Controller.getInstance().getBuilderTree().deleteSelectedEdge(cy.$(':selected').id());
        cy.$(':selected').remove();
    } else {
        if(cy.$(':selected').id() != "root") {
            Controller.getInstance().getBuilderTree().deleteSelectedNode(cy.$(':selected').id());
            cy.$(':selected').remove();
        }
    }
    var t = cy.zoom();
    cy.zoom(t);
}
//#endregion

function variableMenu() {
    addDomListeners();
}