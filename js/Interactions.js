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
var disableEvent = false;

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
                            tooltip: 'Zoom In (+)',
                            action: []
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
                            tooltip: 'Zoom Out (-)',
                            action: []
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
                            tooltip: 'Pan Right (key-right)',
                            action: []
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
                            tooltip: 'Pan Down (key-down)',
                            action: []
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
                            tooltip: 'Pan Left (key-left)',
                            action: []
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
                            tooltip: 'Pan Up (key-up)',
                            action: []
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-pencil-square-o',
                            event: ['tap'],
                            selector: 'node',
                            bubbleToCore: false,
                            tooltip: 'Edit Parameter',
                            action: []
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-trash-o',
                            event: ['tap'],
                            selector: 'cy',
                            bubbleToCore: false,
                            tooltip: 'Remove Node/Edge (suprr)',
                            action: []
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-crosshairs',
                            event: ['tap'],
                            selector: 'cy',
                            bubbleToCore: false,
                            tooltip: 'Recenter On Root (space)',
                            action: []
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-code-fork',
                            event: ['tap'],
                            selector: 'cy',
                            bubbleToCore: false,
                            tooltip: 'Sort the tree from selected node (s)',
                            action: []
                        }
                    ],
                    [
                        {
                            icon: 'fa fa-upload',
                            event: ['tap'],
                            selector: 'cy',
                            bubbleToCore: false,
                            tooltip: 'Send to the arena',
                            action: []
                        }
                    ]
                ],
                appendTools: false
            });
            $("#tool-1-0").on('click',function(){
                myzoomin();
            });
            $("#tool-2-0").on('click',function(){
                myzoomout();
            });
            $("#tool-3-0").on('click',function(){
                mypanright();
            });
            $("#tool-4-0").on('click',function(){
                mypandown();
            });
            $("#tool-5-0").on('click',function(){
                mypanleft();
            });
            $("#tool-6-0").on('click',function(){
                mypanup();
            });
            $("#tool-7-0").on('click',function(){
                EditDecorator(cy.$(":selected"));
            });
            $("#tool-8-0").on('click',function(){
                performRemove();
            });
            $("#tool-9-0").on('click',function(){
               recenterOnRoot();
            });
            $("#tool-10-0").on('click',function(){
                sortTree();
            });
            $("#tool-11-0").on('click',function(){
                Controller.getInstance().send();
            });

            cy.navigator({

            });

            cy.elements().qtip({
                content: function(){ return 'Description of ' + this.data().name },
                position: {
                    my: 'bottom center',
                    at: 'top center'
                },
                show: {
                    cyBgOnly: false
                },
                style: {
                    classes: 'qtip-bootstrap',
                    tip: {
                        width: 16,
                        height: 8
                    }
                }
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
                    'font-size':26,
                    'font-weight': 'bold',
                    'text-opacity':1,
                    'color':'black',
                    'content':'data(name)',
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
                    'border-color':'black',
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

    var r;

    cy.on('.mouseup','node',function(){

        if (this.data().id == 'root'){
            return;
        }
        var node = Controller.getInstance().getBuilderTree().getBlockById(this.data().id);

        if (node == null){
            return;
        }
        if (node.getParentNode() == null){
            return;
        }

        changePositionInArrayChildren(this);

        updateEdgeNumber(node.getParentNode());

    })

    /*
    cy.on('.mousedown','node',function(){
        cy.$(":selected").unselect();
        this.select();
    })*/

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
                        var desc = getNodeDesc(text);
                        var treeNode = new ActionTreeNode(text,"" ,desc , paramList);
                        treeNode.setId(counter);
                        Controller.getInstance().getBuilderTree().getSelectedBlocks().push(treeNode);
                        addAction(x,y, text, counter);
                    } else if (r == "composite") {
                        var desc = getNodeDesc(text);
                        var treeNode = new CompositeTreeNode(text, text, desc);
                        treeNode.setId(counter);
                        Controller.getInstance().getBuilderTree().getSelectedBlocks().push(treeNode);
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

    $('html').keydown(function(e){
        if (disableEvent){
            return;
        }
        switch (e.keyCode) {
            case 32:
                e.preventDefault();
                break;
        }
    });

    $('html').bind('mousewheel', function(e){

        e.preventDefault();

        var x = event.x;
        var y = event.y;

        var currentOffset = $("#cy").offset();

        if(e.originalEvent.wheelDelta /120 > 0) {
            cy.zoom({
                level : cy.zoom()*1.1,
                renderedPosition : { x: x-currentOffset.left, y: y-currentOffset.top }
            });
        }
        else{
            cy.zoom({
                level : cy.zoom()*0.9,
                renderedPosition : { x: x-currentOffset.left, y: y-currentOffset.top }
            });
        }
    });

    $('html').keyup(function(e){

        if (disableEvent){
            return;
        }
        switch (e.keyCode){
            // key suppr
            case 46 :
                // delete
                performRemove();
                break;
            // key a
            case 65 :
                displayTreeConsole();
                break;
            // key space
            case 32:
                recenterOnRoot();
                break;
            // key +
            case 107:
                cy.zoom(cy.zoom()*1.1);
                break;
            // key -
            case 109:
                cy.zoom(cy.zoom()*0.9 );
                break;

            // key up
            case 38:
                mypanup();
                break;

            // key down
            case 40:
                mypandown();
                break;

            // key left
            case 37:
                mypanleft();
                break;

            // key right
            case 39:
                mypanright();
                break;
            case 83:
                sortTree();
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
    cy.pan({ x: -100, y:-200 });
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
function addAction(x,y,text, id)  {
    var title = text;
    var currentOffset = $("#cy").offset();
    var localCounter = 1;
    localCounter = getParamNumber(localCounter, text);
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
            height: 35 * localCounter,
            description : Controller.getInstance().getBuilderTree().getBlockById(id).getDescription(),
            id: id + ""
        },
        renderedPosition: {x: x - currentOffset.left, y: y - currentOffset.top}
    }).addClass('menu');
    cy.elements('node').qtip({
        content: function () {
            return this.data().description
        },
        position: {
            my: 'bottom center',
            at: 'top center'
        },
        show: {
            cyBgOnly: false
        },
        style: {
            classes: 'qtip-bootstrap',
            tip: {
                width: 16,
                height: 8
            }
        }
    });
}

/**
 * This method add a composite block to the system.
 *
 * @param x : abscissa of the block
 * @param y : ordinate of the block
 * @param text : text of the block
 * @param selectedPos : position in the selected block of the builderTree.
 */
function addComposite(x, y, text, id) {
    var currentOffset = $("#cy").offset();
    var localCounter = 1;
    localCounter = getParamNumber(localCounter, text);

    cy.add({
        group: "nodes",
        data: {
            name: text,
            weight: 105,
            faveColor: colorComposite,
            faveShape: 'rectangle',
            height: 35 * localCounter,
            description : Controller.getInstance().getBuilderTree().getBlockById(id).getDescription(),
            id: id + ""
        },
        renderedPosition: {x: x - currentOffset.left, y: y - currentOffset.top}
    }).addClass('menu');
    cy.elements('node').qtip({
        content: function () {
            return this.data().description
        },
        position: {
            my: 'bottom center',
            at: 'top center'
        },
        show: {
            cyBgOnly: false
        },
        style: {
            classes: 'qtip-bootstrap',
            tip: {
                width: 16,
                height: 8
            }
        }
    });
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
                if(Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["value"] instanceof Blackboard) {
                    params = params + Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["name"] + " : ("
                        + Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["value"].name + ") \n";
                }else{
                    params = params + Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["name"] + " : ("
                        + Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["value"] + ") \n";
                }
            }
        }
    }
    return params;
}

function sortTree(){
    var numberBlockByDepth;
    var maxHeightByDepth = [];
    var sumTotalByDepth = [];

    var node = Controller.getInstance().getBuilderTree().getRootTree();
    var nodeDisplay = cy.getElementById("root");

    if (cy.$(":selected").length != 0){
        if (cy.$(":selected").id() != "root") {
            node = Controller.getInstance().getBuilderTree().getTreeNodeById(cy.$(":selected").id());
            nodeDisplay = cy.$(":selected");
        }
    }

    numberBlockByDepth = Controller.getInstance().getBuilderTree().arrayNumberBlocByDepth(node);
    var depth = Controller.getInstance().getBuilderTree().depthTree(node);
    var blocksIdByDepth = Controller.getInstance().getBuilderTree().arrayIdofBlock(node);


    // i correspond au niveau de profondeur
    for (var i = 0; i < depth; i++){
        var result = calcHeighMaxAndSumWidth(i,node);
        maxHeightByDepth.push(result[0]);
        sumTotalByDepth.push(result[1]);
    }

    var posXPrevious = nodeDisplay.position().x;
    var posYPrevious = nodeDisplay.position().y;
    var heightPrevious = nodeDisplay.renderedOuterHeight();
    var newPosY = posYPrevious;
    if (nodeDisplay.id() =="root"){
        if (Controller.getInstance().getBuilderTree().existSourceTree()){
            var heightRoot = cy.getElementById(Controller.getInstance().getBuilderTree().getRootTree().getId()).renderedOuterHeight();
            newPosY = posYPrevious + heightPrevious/2 + heightRoot/2 + 50;
        }
    }
    var center = posXPrevious;
    for (var i = 0; i < depth; i++) {
        // On place par d�faut un espace de 30 entre chaque blocka
        sumTotalByDepth[i] += (numberBlockByDepth[i]-1) * 50;
        placeInDepth(center,newPosY,numberBlockByDepth[i],sumTotalByDepth[i],blocksIdByDepth[i]);
        if (depth !=i+1){
            newPosY = newPosY + maxHeightByDepth[i]/2+maxHeightByDepth[i+1]/2 + 50;
        }
    }

}

function placeInDepth(center,newPosY,numberOfBlock,sumTotal,blocksById){
    var positionX = (center - sumTotal/2) ;
    for (var i = 0; i<blocksById.length;i++){
        var currentNodeDisplay = cy.getElementById(blocksById[i]);
        positionX += currentNodeDisplay.renderedOuterWidth()/2;
        currentNodeDisplay.position({x : positionX ,y : newPosY});
        if (currentNodeDisplay.isParent()){
            var children = currentNodeDisplay.children();

            var totalChild = currentNodeDisplay.children().length;
            var totalHeightChild = 0;
            for (var j=0;j<children.length;j++) {
                totalHeightChild+=children[j].renderedOuterHeight();
            }

            var relativePosY = (totalHeightChild/2);

            for (var j=0;j<children.length;j++){
                relativePosY -= children[j].renderedOuterHeight()/2;
                children[j].relativePosition({x:0,y:relativePosY});
                //console.log(children[j].renderedOuterHeight());
                relativePosY -=children[j].renderedOuterHeight()/2;

            }
        }
        positionX += currentNodeDisplay.renderedOuterWidth()/2 + 50;
    }
}


function getNodeDesc(text) {
    var available = Controller.getInstance().getBuilderTree().getAvailableBlocks();
    for(var i = 0; i < available.length; i++) {
        if(available[i].getName() == text) {
            return available[i].getDescription();
        }
    }
}

function getNodeParamList(text) {
    var paramList = [];
    for(var i = 0; i < Controller.getInstance().getBuilderTree().getAvailableBlocks().length; i++) {
        if(Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getName() == text) {
            for(var k = 0; k < Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams().length; k++) {
                var paramName = Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["name"];
                var paramValue = Controller.getInstance().getBuilderTree().getAvailableBlocks()[i].getParams()[k]["value"];
                //console.log("name",paramName,"value",paramValue);
                var param = new Parameter(paramName, paramValue);
                paramList.push(param);
            }
        }
    }
    return paramList;
}

function changePositionInArrayChildren(nodeCy){
    var node = Controller.getInstance().getBuilderTree().getBlockById(nodeCy.data().id);

    var positionNodeX = nodeCy.position().x;
    var sourceNode = node.getParentNode();

    var numb = sourceNode.getChildrenNodes().indexOf(node);
    sourceNode.getChildrenNodes().splice(numb, 1);

    var pos = 0;
    for (var i = 0; i<sourceNode.getChildrenNodes().length;i++){
        var childId = sourceNode.getChildrenNodes()[i].getId();
        if (positionNodeX > cy.getElementById(childId).position().x){
            pos++;
        }
    }
    sourceNode.getChildrenNodes().splice(pos, 0, node);
}


function updateEdgeNumber(source) {
    if (!(source instanceof CompositeTreeNode)) {
        return;
    }
    var children = source.getChildrenNodes();
    if (children.length == 1){
        var idEdge = Controller.getInstance().getBuilderTree().getEdgeIdByTarget(children[0]);
        cy.remove(cy.getElementById(idEdge));
        cy.add({
            group: 'edges',
            data: {
                id: idEdge,
                source: source.getId(),
                target: children[0].getId()
            }
        });

    } else {
        for (var i=0;i< children.length;i++){
            var idEdge = Controller.getInstance().getBuilderTree().getEdgeIdByTarget(children[i]);
            if (idEdge == -1){
                break;
            }
            cy.remove(cy.getElementById(idEdge));
            cy.add({
                group: 'edges',
                data: {
                    name:i+1,
                    id: idEdge,
                    source: source.getId(),
                    target: children[i].getId()
                }
            });
        }
    }
}

function calcHeighMaxAndSumWidth(depth, node){
    var returnMaxHeight = 0;
    var returnSumWidth = 0;
    if (depth == 0){
        return [cy.getElementById(node.getId()).renderedOuterHeight(),cy.getElementById(node.getId()).renderedOuterWidth()];
    }
    if (node instanceof CompositeTreeNode) {
        for (var i = 0; i < node.getChildrenNodes().length; i++) {
            var result = calcHeighMaxAndSumWidth(depth-1,node.getChildNode(i));
            if (result[0] > returnMaxHeight ) {
                returnMaxHeight = result[0];
            }

            returnSumWidth += result[1];
        }
    }
    return [returnMaxHeight,returnSumWidth];
}
