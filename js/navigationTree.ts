/**
 * Created by Quentin on 03/06/2015.
 */
///<reference path="..\typings\jstree\jstree.d.ts"/>


class navigationTree {

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
            "crrm": {
                "move": {
                    "check_move": function (m) {
                        var p = this._get_parent(m.o);
                        if (!p) return false;
                        p = p == -1 ? this.get_container() : p;
                        if (p === m.np) return true;
                        if (p[0] && m.np[0] && p[0] === m.np[0]) return true;
                        return false;
                    }
                }
            },
            "dnd": {
                "drop_target": false,
                "drag_target": false
            },
            "types": {
                "#": {
                    "max_children": 1,
                    "max_depth": 4,
                    "valid_children": ["root"]
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
                "themes", "html_data", "crrm", "contextmenu", "dnd", "search",
                "state", "types", "wholerow"
            ]
        });
    }
}