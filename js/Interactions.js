/**
 * Class for the IHM interactions in the building zone
 * @author Hong
 */
var elesJson = { nodes: [], edges: [] };

$(function test() { // on dom ready

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
        ready: function () {
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
                    'border-color': 'red'
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
            var text = $('.jstree-clicked').text();
            var popo = $('.jstree-clicked');
            console.log(popo);
         //   console.log($('.jstree-clicked').parent())
            if(!document.all) {
                x = event.x;
                y = event.y;
            }
            console.log(r);
            if(!t.closest('.jstree').length) {
                if(t.closest('.drop').length) {
                    if(r=="action") {
                        var treeNode = new ActionTreeNode(text);
                        Controller.getInstance().getBuilderTree().getSelectedBlocks().push(treeNode);
                        var selectedPos = Controller.getInstance().getBuilderTree().getSelectedBlocks().length;
                        cy.add({
                            group: "nodes",
                            data: {
                                name: text,
                                weight: 100,
                                faveColor: '#F5A45D',
                                faveShape: 'rectangle',
                                height: 100,
                                id: selectedPos + ""
                            },
                            position: {x: x - 190, y: y}

                        });
                    } else if (r == "composite") {
                        var treeNode = new CompositeTreeNode(text);
                        Controller.getInstance().getBuilderTree().getSelectedBlocks().push(treeNode);
                        var selectedPos = Controller.getInstance().getBuilderTree().getSelectedBlocks().length;
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
                            position: {x: x - 190, y: y}
                    })
                    }
                }
            }
        });
});


