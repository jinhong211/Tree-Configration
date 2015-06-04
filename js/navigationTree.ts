/**
 * Created by Quentin on 03/06/2015.
 */
///<reference path="..\typings\jstree\jstree.d.ts"/>


class NavigationTree {

    private navTree : any;

    public constructor(test: any) {
        this.navTree = test;
    }

      render():void {
        var json = this.navTree;
          console.log(json[0]["id"]);
        $('#jstree').jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "themes": {"stripes": true},
                'data': json
            },
            "dnd": {
                "is_draggable" : function(node) {
                    if (node[0].type == 'root'||node[0].type == 'conditions'||node[0].type == 'actions') {
                        return false;
                    }
                    return true;
                },
                "check_callback" : function(operation, node, node_parent, node_position, more) {
                    return false;
                },
                "drop_target" : false,
                "drag_target" : false
            },
            "types": {
                "#": {
                    "max_children": 1,
                    "max_depth": 4,
                    "valid_children": ["root"]
                },
                "conditions" : {
                    "icon" : "assets/images/tree_icon.png",
                    "valid_children" : ["condition"]
                },
                "actions" : {
                    "icon" : "assets/images/tree_icon.png",
                    "valid_children" : ["action"]
                },
                "condition" : {
                    "icon" : "glyphicon glyphicon-file",
                    "valid_children" : []
                },
                "action" : {
                    "icon" : "glyphicon glyphicon-file",
                    "valid_children" : []
                },
                "root": {
                    "icon": "assets/images/tree_icon.png",
                    "valid_children": ["default"]
                },
                "default": {
                    "valid_children": ["default", "file"]
                },
                "file": {
                    "icon": "glyphicon glyphicon-file",
                    "valid_children": []
                }
            },
            "plugins": [
                "themes", "html_data","dnd", "search",
                "state", "types", "wholerow"
            ]
        });
    }
}