/**
 * Class for the IHM interactions in the building zone
 * @author Hong
 */
var elesJson = { nodes: [], edges: [] };
var counter = 1;

$(function test() { // on dom ready

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
        ready: function () {
            cy.zoom(1.5);
            cy.pan({ x: -200, y:-500 });
        },
        elements: elesJson,
        style: [
            {
                selector: 'node',
                css: {
                    'shape': 'rectangle',
                    'width': 'data(weight)',
                    'content': 'data(name)',
                    // 'height' : 'data(height)',
                    'text-valign': 'center',
                    'text-outline-width': 2,
                    'background-color': 'data(faveColor)',
                    'color': '#fff'
                }
            },
            {
                selector: 'edge',
                css: {
                    'line-color': '#F2B1BA',
                    'target-arrow-color': '#F2B1BA',
                    'width': 2,
                    'target-arrow-shape': 'triangle',
                    'opacity': 0.8
                }
            },
            {
                selector: ':selected',
                css: {
                    'background-color': 'black',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black',
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
                selector: '.edgehandles-hover',
                css: {
                    'background-color': 'red'
                }
            },
            {
                selector: '.edgehandles-source',
                css: {
                    'border-width': 2,
                    'border-color': 'green'
                }
            },
            {
                selector: '.edgehandles-target',
                css: {
                    'border-width': 2,
                    'border-color': 'red'
                }
            },
            {
                selector: '.edgehandles-preview, .edgehandles-ghost-edge',
                css: {
                    'line-color': 'red',
                    'target-arrow-color': 'red',
                    'source-arrow-color': 'red'
                }
            }
        ],
        layout: {
            name: 'circle',
            padding: 10
        }
    });

    /**
     * This method handle the right click menu
     */
    cy.cxtmenu({
        selector: 'node',
        commands: [
            {
                content: 'decorator1',
                select: function() {
                    decoratorMenu(this, "decorator1");
                }
            },
            {
                content: 'decorator2',
                select: function(){
                    decoratorMenu(this, "decorator2");
                }
            }
        ]
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
                        var treeNode = new ActionTreeNode(text);
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
    //cy.zoomingEnabled(false);
    addRoots();
    cy.maxZoom(2);

});

function recenterOnRoot(){
    cy.zoom(1.5);
    cy.pan({ x: -200, y:-500 });
}

function displayTreeConsole(){
    console.log("#######################  Affichage etat courant #######################")
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
/**
 * This function add a roots if it's the first block add in the building zone
 */
function addRoots() {
    cy.add({
        group: "nodes",
        data: {
            name: "Root",
            weight: 100,
            faveColor: '#000000',
            faveShape: 'rectangle',
            height: 100,
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
    var currentOffset = $("#cy").offset();
    cy.add({
        group: "nodes",
        data: {
            name: text,
            weight: 100,
            faveColor: '#F5A45D',
            faveShape: 'rectangle',
            height: 100,
            type:'action',
            id: selectedPos + ""
        },
        renderedPosition: {x: x - currentOffset.left, y: y - currentOffset.top}
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
function addComposite(x, y, text, selectedPos) {
    var currentOffset = $("#cy").offset();
    cy.add({
        group: "nodes",
        data: {
            name: text,
            weight: 100,
            faveColor: '#EDA1ED',
            faveShape: 'rectangle',
            height: 100,
            id: selectedPos + ""
        },
        renderedPosition: {x: x - currentOffset.left, y: y - currentOffset.top}
    });
}

