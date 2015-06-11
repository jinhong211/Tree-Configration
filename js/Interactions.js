/**
 * Class for the IHM interactions in the building zone
 * @author Hong
 */
var elesJson = { nodes: [], edges: [] };
var counter = 1;
var countEdges = 0;
var noneTargetable = false;
var colorAction = '#5656E2';
var colorComposite = '#57BCD7';
var colorRoot = '#000000';

$(function test() { // on dom ready

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
        ready: function () {
            recenterOnRoot();
            cy.toolbar({
                toolbarClass: "cy-overall-toolbar",
                position: 'top',
                tools: [
                    [
                        {
                            icon: 'fa fa-location-arrow',
                            event: ['tap'],
                            selector: 'cy',
                            options: {
                                cy: {
                                    zoom: 0.1,
                                    minZoom: 0.1,
                                    maxZoom: 10,
                                    zoomDelay: 45
                                }
                            },
                            bubbleToCore: false,
                            tooltip: 'Mouse',
                            action: []
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-search-plus',
                            event: ['tap'],
                            selector: 'cy',
                            options: {
                                cy: {
                                    zoom: 0.1,
                                    minZoom: 0.1,
                                    maxZoom: 10,
                                    zoomDelay: 45
                                }
                            },
                            bubbleToCore: false,
                            tooltip: 'Zoom In',
                            action: [performZoomIn]
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-search-minus',
                            event: ['tap'],
                            selector: 'cy',
                            options: {
                                cy: {
                                    zoom: -0.1,
                                    minZoom: 0.1,
                                    maxZoom: 10,
                                    zoomDelay: 45
                                }
                            },
                            bubbleToCore: false,
                            tooltip: 'Zoom Out',
                            action: [performZoomOut]
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-arrow-right',
                            event: ['tap'],
                            selector: 'cy',
                            options: {
                                cy: {
                                    distance: -80,
                                }
                            },
                            bubbleToCore: true,
                            tooltip: 'Pan Right',
                            action: [performPanRight]
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-arrow-down',
                            event: ['tap'],
                            selector: 'cy',
                            options: {
                                cy: {
                                    distance: -80,
                                }
                            },
                            bubbleToCore: true,
                            tooltip: 'Pan Down',
                            action: [performPanDown]
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-arrow-left',
                            event: ['tap'],
                            selector: 'cy',
                            options: {
                                cy: {
                                    distance: 80,
                                }
                            },
                            bubbleToCore: true,
                            tooltip: 'Pan Left',
                            action: [performPanLeft]
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-arrow-up',
                            event: ['tap'],
                            selector: 'cy',
                            options: {
                                cy: {
                                    distance: 80,
                                }
                            },
                            bubbleToCore: true,
                            tooltip: 'Pan Up',
                            action: [performPanUp]
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-pencil-square-o',
                            event: ['tap'],
                            selector: 'node',
                            bubbleToCore: false,
                            tooltip: 'Edit Parameter',
                            action: [EditDecorator]
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-trash-o',
                            event: ['tap'],
                            selector: 'edge,node',
                            bubbleToCore: false,
                            tooltip: 'Remove Node/Edge',
                            action: [performRemove]
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-crosshairs',
                            event: ['tap'],
                            selector: 'cy',
                            bubbleToCore: false,
                            tooltip: 'Recenter On Root',
                            action: [RecenterOnRoot]
                        }
                    ]
                ],
                appendTools: false
            });
        },
        elements: elesJson,
        style: [
            {
                selector: 'node',
                css: {
                    'shape': 'rectangle',
                    'width': 'data(weight)',
                    'content': 'data(name)',
                     'height' : 'data(height)',
                    'text-valign': 'center',
                    'border-color': 'data(faveColor)',

                    'background-color': 'data(faveColor)',
                    'border-width': 5,
                    'color': '#fff'
                }
            },
            {
                selector: 'edge',
                css: {
                    'line-color': '#FFFFFF',
                    'target-arrow-color': '#FFFFFF',
                    'width': 2,
                    'target-arrow-shape': 'triangle',
                    'opacity': 0.8
                }
            },
            {
                selector: ':selected',
                css: {
                    'border-width': 4,
                    'border-color':'#727272',
                    'background-color': 'data(faveColor)',
                    'line-color': 'grey',
                    'target-arrow-color': 'grey',
                    'source-arrow-color': 'grey',
                    'opacity': 1
                }
            },
            {
                selector: '.faded',
                css: {
                    'opacity': 0.25,
                    'text-opacity': 0
                }
            },
            {
                selector: '.edgehandles-hover-ontarget-targetable',
                css: {
                    'background-color': 'green',
                    'border-color': 'green'
                }
            },
            {
                selector: '.edgehandles-hover-ontarget-untargetable',
                css: {
                    'background-color': 'red',
                    'border-color': 'red'
                }
            },
            {
                selector: '.edgehandles-targetable',
                css: {
                    'border-color': 'green'
                }
            },
            {
                selector: '.edgehandles-source',
                css: {
                    'border-width': 5,
                    'border-color': 'data(faveColor)'
                }
            },
            {
                selector: '.edgehandles-preview, .edgehandles-ghost-edge',
                css: {
                    'line-color': 'red',
                    'target-arrow-color': 'red',
                    'source-arrow-color': 'red'
                }
            },
            {
                selector: '.nodeAction',
                css: {
                    'border-color': colorAction,
                    'background-color': colorAction
                }
            },
            {
                selector: '.nodeComposite',
                css: {
                    'border-color': colorComposite,
                    'background-color': colorComposite
                }
            }
        ],
        layout: {
            name: 'circle',
            padding: 10
        }
    });


    cy.elements().qtip({
        content: '123',
        position: {
            my: 'top center',
            at: 'bottom center'
        },
        style: {
            classes: 'qtip-bootstrap',
            tip: {
                width: 16,
                height: 8
            }
        }
    });

    /**
     * This function handle all the draw of the edge
     */
    cy.edgehandles({
        // options go here
    });
    var r;
    $('#jstree')
        .on('changed.jstree', function(e , data) {
        var i, j = [];
        for(i = 0, j = data.selected.length; i < j; i++) {
            r = data.instance.get_node(data.selected[i]).type;
        }
    })
    $('.drag')
        .on('mousedown', function (e) {
            return $.vakata.dnd.start(e, {
                'jstree': true,
                'obj': $(this),
                'nodes': [{id: true, text: $(this).text()}]
            }, '<div id="jstree-dnd" class="jstree-default"><i class="jstree-icon jstree-er"></i>' + $(this).text() + '</div>');
        });
    $(document)
        .on('dnd_move.vakata', function (e, data) {
            var t = $(data.event.target);
            if (!t.closest('.jstree').length) {
                if (t.closest('.drop').length) {
                    data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
                }
                else {
                    data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
                }
            }
        })
        .on('dnd_stop.vakata', function (e, data) {
            var t = $(data.event.target);
            var x, y;
            var text = $("#jstree").jstree(true).get_node(data.data.nodes[0]).text;
            r = $("#jstree").jstree(true).get_node(data.data.nodes[0]).type;
            if(!document.all) {
                x = event.x;
                y = event.y;
            }
            if(!t.closest('.jstree').length) {
                if(t.closest('.drop').length) {
                    if(r=="action") {
                        var paramList = getNodeParamList(text);
                        var treeNode = new ActionTreeNode(text,"" ,"", paramList);
                        treeNode.setId(counter);
                        Controller.getInstance().getBuilderTree().getSelectedBlocks().push(treeNode);
                        addAction(x,y, text, counter);
                    } else if (r == "composite") {
                        var treeNode = new CompositeTreeNode(text);
                        treeNode.setId(counter);
                        Controller.getInstance().getBuilderTree().getSelectedBlocks().push(treeNode);
                        var selectedPos = Controller.getInstance().getBuilderTree().getSelectedBlocks().length;
                        addComposite(x,y,text,counter);
                    }

                    if (Controller.getInstance().getBuilderTree().getSelectedBlocks().length == 1){
                        targetId = counter;
                        cy.add({
                            group: 'edges',
                            data: {
                                id: "ed" +  countEdges,
                                source: "root",
                                target: targetId
                            }
                        });

                        var targetNode = Controller.getInstance().getBuilderTree().getTreeNodeById(targetId);
                        Controller.getInstance().getBuilderTree().addEdge(new Edge("ed"+countEdges,null,targetNode));
                        Controller.getInstance().getBuilderTree().setRoot(targetNode);
                        countEdges++;
                    }
                    counter++;

                }
            }
        });

    $('#delete').on('click', function() {
        cy.$(':selected').remove();
    });

    $('html').keyup(function(e){

        switch (e.keyCode){
            // key suppr
            case 46 :
                // delete
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
                break;
            // key a
            case 65 :
                displayTreeConsole();
                break;
            // key space
            case 32:
                recenterOnRoot()
                break;
            // key +
            case 107:
                cy.zoom(cy.zoom()*1.25);
                break;
            // key -
            case 109:
                cy.zoom(cy.zoom()*0.8);
                break;
            case 66 :
                break;
        }

    })
    addRoots();
    cy.maxZoom(2);

});

function recenterOnRoot(){
    cy.zoom(1);
    cy.pan({ x: -50, y:-200 });
}
function RecenterOnRoot(e){
    if (!e.data.canPerform(e, RecenterOnRoot)) {
        return;
    }

    recenterOnRoot();
}

function displayTreeConsole(){
    console.log("#######################  Affichage etat courant #######################")

    if(Controller.getInstance().getBuilderTree().existSourceTree()){
        console.log("La racine existe et est : " + Controller.getInstance().getBuilderTree().getRootTree().getName());
    } else {
        console.log("Il n'y a pas de bloc relie a root");
    }

    for (var i = 0; i < Controller.getInstance().getBuilderTree().getSelectedBlocks().length; i++) {
        var nodeSelect = Controller.getInstance().getBuilderTree().getSelectedBlocks()[i];
        console.log("noeud : " + nodeSelect.getName());
        if (nodeSelect instanceof CompositeTreeNode) {
            for (var l = 0; l < nodeSelect.getChildrenNodes().length; l++) {
                console.log("enfant de  " + nodeSelect.getName() + " : " + nodeSelect.getChildNode(l).getName());
            }
        }
        if (nodeSelect.getParentNode() != null) {
            console.log("parent de " + nodeSelect.getName() + " : " + nodeSelect.getParentNode().getName());
        }

        if((nodeSelect.getDecorators() == null)) {
            console.log("pas de decorators");
        } else {
            for(var k = 0; k<nodeSelect.getDecorators().length; k++) {
                console.log("decoratorName:"+nodeSelect.getDecorators()[k].getName());
                console.log("decoratorType:"+nodeSelect.getDecorators()[k].getType());
                console.log("decoratorParams:"+nodeSelect.getDecorators()[k].getParams());
            }
        }
    }

    for (var i = 0; i < Controller.getInstance().getBuilderTree().getEdges().length; i++) {
        var edge = Controller.getInstance().getBuilderTree().getEdges()[i];
        console.log("edge id : " + edge.getId());

        if (edge.getSource() == null) {
            console.log("edge de root" + " a " + edge.getTarget().getName());
        } else {
            console.log("edge de " + edge.getSource().getName() + " a " + edge.getTarget().getName());
        }
    }
}

function changeColorOnEdgeCreation(idNode) {
    var listNode = Controller.getInstance().getBuilderTree().getSelectedBlocks();


    if (Controller.getInstance().getBuilderTree().existSourceTree() && idNode == "root") {
        noneTargetable = true;
        return;
    }

    for (var i = 0; i < listNode.length; i++) {
        var node = listNode[i];

        if (node.getParentNode() == null && idNode != node.getId()) {
            if (node != Controller.getInstance().getBuilderTree().getRootTree()) {
                cy.getElementById(node.getId()).addClass('edgehandles-targetable');
            }

        }
    }
}

function resetColorOnEdgeCreation(){
    var listNode = Controller.getInstance().getBuilderTree().getSelectedBlocks();

    for (var i=0;i<listNode.length;i++){
        var node = listNode[i];
        cy.getElementById(node.getId()).removeClass('edgehandles-hover-ontarget-targetable')
            .removeClass('edgehandles-hover-ontarget-untargetable')
            .removeClass('edgehandles-targetable');
    }
    noneTargetable = false;

}
/**
 * This function add a roots if it's the first block add in the building zone
 */
function addRoots() {
    cy.add({
        group: "nodes",
        data: {
            name: "Root",
            weight: 105,
            faveColor: colorRoot,
            faveShape: 'rectangle',
            height: 45,
            id: "root"
        },
        position: {x: 190, y: 150},
        grabbable: false
    });
}

/**
 * This function add an action block to the system
 *
 * @param x : abscissa of the block
 * @param y : ordinate of the block
 * @param text : text of the block
 * @param selectedPos : position in the selected block of the builderTree.
 */
function addAction(x,y,text, selectedPos)  {
    var title = text;
    var currentOffset = $("#cy").offset();
    var counter = 1;
    counter = getParamNumber(counter, text);
    text = text + "\n" + getParam(text);
    cy.add({
        group: "nodes",
        data: {
            class: 'menu',
            name: text,
            title: title,
            weight: 155,
            faveColor: colorAction,
            faveShape: 'rectangle',
            type:'action',
            option: 'Edit Your Option',
            height: 35 * counter,
            id: selectedPos + ""
        },
        renderedPosition: {x: x - currentOffset.left, y: y - currentOffset.top}
    }).addClass('menu');
}

/**
 * This method add a composite block to the system.
 *
 * @param x : abscissa of the block
 * @param y : ordinate of the block
 * @param text : text of the block
 * @param selectedPos : position in the selected block of the builderTree.
 */
function addComposite(x, y, text, selectedPos) {
    var currentOffset = $("#cy").offset();
    var counter = 1;
    counter = getParamNumber(counter, text);

    cy.add({
        group: "nodes",
        data: {
            name: text,
            weight: 105,
            faveColor: colorComposite,
            faveShape: 'rectangle',
            height: 35 * counter,
            id: selectedPos + ""
        },
        renderedPosition: {x: x - currentOffset.left, y: y - currentOffset.top}
    }).addClass('menu');
}


/**
 * This method handle the right click menu
 */
function initRightClick() {
    cy.cxtmenu({
        selector:'.menu',
        commands:getDecorator()
    });
}

/**
 * This function create the right click menu
 * @returns {Array}
 */
function getDecorator() {

    var decoratorArray = [];
    var nameDisplayed;
    for(var i = 0; i < Controller.getInstance().getBuilderTree().getDecorators().length; i++) {
        nameDisplayed = Controller.getInstance().getBuilderTree().getDecorators()[i].nameDisplayed;
        (function(nameDisplayed) {
            decoratorArray.push({
                content:nameDisplayed,
                select: function() {
                    decoratorMenu(this, nameDisplayed)
                }
            });
        })(nameDisplayed);
    }
    return decoratorArray;
}

/**
 *  Thisz method set the height of a block
 *
 * @param paramNumber
 */
function getParamNumber(paramNumber, text) {
    for(var i = 0; i < Controller.getInstance().getBuilderTree().getAvailableBlocks().length; i++) {
        if(Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getName() == text) {
            for(var j = 0; j < Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams().length; j++) {
                paramNumber++;
            }
        }
    }
    return paramNumber;
}

/**
 *
 * @param text
 * @returns {string}
 */
function getParam(text) {
    var params = "";
    for(var i = 0; i < Controller.getInstance().getBuilderTree().getAvailableBlocks().length; i++) {
        if (Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getName() == text) {
            for(var k = 0;k < Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams().length; k++) {
                params = params + Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["name"] + " : ("
                + Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["value"] + ") \n";
            }
        }
    }
    return params;
}


function getNodeParamList(text) {
    var paramList = [];
    for(var i = 0; i < Controller.getInstance().getBuilderTree().getAvailableBlocks().length; i++) {
        if(Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getName() == text) {
            for(var k = 0; k < Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams().length; k++) {
                var paramName = Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["name"];
                var paramValue = Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["value"];
                console.log("name",paramName,"value",paramValue);
                var param = new Parameter(paramName, paramValue);
                paramList.push(param);
            }
        }
    }
    return paramList;
}
