/**
 * Created by Quentin on 08/06/2015.
 */

/***
 *  This function call the decorator menu
 *
 * @param node that represent the menu.
 */

function decoratorMenu(node, value) {
    //console.log("decoratormenu",value);
    var pid = node.id();



    var currentOffset = $("#cy").offset();

    var x = event.pageX - currentOffset.left;
    var y = event.pageY - currentOffset.top;
    //console.log(node.data().name)
    if(!node.isParent() &&  !node.isChild()) {

        node.remove();

        var nodeModel = Controller.getInstance().getBuilderTree().getBlockById(pid);
        nodeModel.addDecorator(new Decorator(value,null,value,""));

        cy.add([{
            group: "nodes",
            data: {id: pid, weight: 100,height:100, faveColor: 'gray'},
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
        /*
        console.log("node height " + node.height());
        console.log("node outerheight " + node.outerHeight());
        console.log("node renderedheight " + node.renderedHeight());
        console.log("node renderedOuterheight " + node.renderedOuterHeight());*/

        var newNode = cy.add([
            {
                group: "nodes",
                data: {name: value, parent: pid, weight: 105, height: 45, faveColor: 'blue', type: 'decorator'},
                renderedPosition: {x: x, y: y}
            }
        ]);

        newNode.renderedPosition({x: x, y: y-(previous.renderedOuterHeight()/2 +newNode.renderedOuterHeight()/2) });


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
    }
    if (node.isParent()){

        for (var i = 0; i < node.children().length; i++) {
            if (node.children()[i].data().name == value) {
                return;
            }
        }

        var nodeModel = Controller.getInstance().getBuilderTree().getBlockById(pid);
        nodeModel.addDecorator(new Decorator(value,null,value,""));

        cy.add([{
            group: "nodes",
            data: {name: value, parent: pid, weight: 105,height:45, faveColor: 'blue', type: 'decorator'},
            renderedPosition: {x: x, y: y},
        }
        ]);

        var children = node.children();
        var posy = 0;
        var maxWidth =0;
        for (var i = 0; i < children.length; i++){
            if (children[i].width() > maxWidth){
                maxWidth = children[i].width();
            }
        }
        for (var i = 0; i < children.length; i++){
            if (i!=0){
                posy += (children[i-1].renderedOuterHeight()/2+children[i].renderedOuterHeight()/2);
            }
            children[i].width(maxWidth);
            children[i].renderedPosition({x: x, y: y-posy});
        }
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
        alertWin("Edit", '', 300, 150, e.cyTarget)
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
}
//#endregion

function variableMenu() {
    addDomListeners();
}