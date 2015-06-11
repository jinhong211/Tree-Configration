/**
 * Created by jinhong on 09/06/15.
 */
function alertWin(title, msg, w, h,node) {
    var titleheight = "22px";
    var bordercolor = "#666699";
    var titlecolor = "#FFFFFF";
    var titlebgcolor = "#666699";
    var bgcolor = "#FFFFFF";
    var iWidth = document.documentElement.clientWidth;
    var iHeight = document.documentElement.clientHeight;

    var bgObj = document.createElement("div");

    bgObj.style.cssText = "position:absolute;left:0px;top:0px;width:" + iWidth + "px;height:" + Math.max(document.body.clientHeight, iHeight) + "px;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000;z-index:1000;";

    document.body.appendChild(bgObj);

    var iframe2 = document.createElement("iframe");
    iframe2.style.cssText = "position:absolute; top:0px;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000; z-index:1001; border-style:none; border-width:0px; border:0px;width:" + iWidth + "px;height:" + iHeight + "px";
    bgObj.appendChild(iframe2);

    var msgObj = document.createElement("div");
    msgObj.style.cssText = "position:absolute;font:11px ;top:" + (iHeight - h) / 2 + "px;left:" + (iWidth - w) / 2 + "px;width:" + w + "px;height:" + h + "px;text-align:center;border:1px solid " + bordercolor + ";background-color:" + bgcolor + ";padding:1px;line-height:22px;z-index:1001;";
    document.body.appendChild(msgObj);
    var table = document.createElement("table");
    msgObj.appendChild(table);
    table.style.cssText = "margin:0px;border:0px;padding:0px;";
    table.cellSpacing = 0;
    var tr = table.insertRow(-1);
    var titleBar = tr.insertCell(-1);
    titleBar.style.cssText = "width:100%;height:" + titleheight + "px;text-align:left;padding:3px;margin:0px;font:bold 13px ;color:" + titlecolor + ";border:1px solid " + bordercolor + ";cursor:move;background-color:" + titlebgcolor;
    titleBar.style.paddingLeft = "10px";
    titleBar.innerHTML = title;
    var moveX = 0;
    var moveY = 0;
    var moveTop = 0;
    var moveLeft = 0;
    var moveable = false;
    var docMouseMoveEvent = document.onmousemove;
    var docMouseUpEvent = document.onmouseup;
    titleBar.onmousedown = function() {
        var evt = getEvent();
        moveable = true;
        moveX = evt.clientX;
        moveY = evt.clientY;
        moveTop = parseInt(msgObj.style.top);
        moveLeft = parseInt(msgObj.style.left);
        document.onmousemove = function() {
            if (moveable) {
                var evt = getEvent();
                var x = moveLeft + evt.clientX - moveX;
                var y = moveTop + evt.clientY - moveY;
                if (x > 0 && (x + w < iWidth) && y > 0 && (y + h < iHeight)) {
                    msgObj.style.left = x + "px";
                    msgObj.style.top = y + "px";
                }
            }
        };
        document.onmouseup = function() {
            if (moveable) {
                document.onmousemove = docMouseMoveEvent;
                document.onmouseup = docMouseUpEvent;
                moveable = false;
                moveX = 0;
                moveY = 0;
                moveTop = 0;
                moveLeft = 0;
            }
        };
    }
    var closeBtn = tr.insertCell(-1);
    closeBtn.style.cssText = "cursor:pointer; text-align:right;padding:2px;background-color:" + titlebgcolor;
    closeBtn.innerHTML = "<span style='font-size:15pt;color:" + titlecolor + ";'>x</span>";
    closeBtn.onclick = function() {
        document.body.removeChild(bgObj);
        document.body.removeChild(msgObj);
    }
    var msgBox = table.insertRow(-1).insertCell(-1);
    msgBox.style.cssText = "font:10pt;";
    msgBox.colSpan = 2;
    msgBox.innerHTML = "Change " + msg;
    var nameBox = table.insertRow(-1);
    var nameLable = nameBox.insertCell(-1);
    nameLable.style.cssText = "font:12pt;text-align:center;";
    var params = "";
    for(var i = 0; i < Controller.getInstance().getBuilderTree().getSelectedBlocks().length; i++) {
        if (Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getId() == node.id()) {
            for(var k = 0;k < Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams().length; k++) {
                params = params + "<br/>"+ Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams()[k]["name"] +":<br/>";
            }
        }
    }
    nameLable.innerHTML = params;
    var nametext = nameBox.insertCell(-1);
    nametext.style.cssText = "font:12pt;text-align:Left; margin-left:0px";
    var paramsinput = "";
    for(var i = 0; i < Controller.getInstance().getBuilderTree().getSelectedBlocks().length; i++) {
        if (Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getId() == node.id()) {
            for(var k = 0;k < Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams().length; k++) {
                if(Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams()[k]["value"]  instanceof Blackboard){
                    paramsinput = paramsinput + "<br/><select id='"+ node.data().title + node.id()+
                        "'>";
                    for(var j = 1; j<=Controller.getInstance().getBuilderTree().getBlackboard().length; j++) {
                        paramsinput = paramsinput + "<option value ='"+ j +"'>" +Controller.getInstance().getBuilderTree().getBlackboard()[j-1].getName()
                            + "</option>";
                    }
                    paramsinput = paramsinput + "</select><br/>";
                }else {
                    paramsinput = paramsinput + "<br/><input type='text' value = '"
                        + Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams()[k]["value"] + "' id='"
                        + node.data().title + node.id()
                        + "'/>   <br/>";
                }
            }
        }
    }
    nametext.innerHTML = paramsinput;
    var submitBox = table.insertRow(-1);
    var submitBtn = submitBox.insertCell(-1);
    submitBtn.style.cssText = "text-align:center;";
    submitBtn.colSpan = 2;
    submitBtn.innerHTML = "<br/><input type='Button' value='Enter' id='saveHeader' /><br/>";
    submitBtn.onclick = function(){
        if(node.data().type=='action'){
            var setparams = "";
            var currentNode = Controller.getInstance().getBuilderTree().getBlockById(node.id());

            for(var i = 0; i < Controller.getInstance().getBuilderTree().getSelectedBlocks().length; i++) {
                if (Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getId() == node.id()) {
                    for (var k = 0; k < Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams().length; k++) {
                        if(Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams()[k]["value"] instanceof Blackboard){
                            var sel = document.getElementById(node.data().title + node.id());
                            Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].setParams(k,Controller.getInstance().getBuilderTree().getBlackboard()[sel.selectedIndex]);

                        }else {
                            Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].setParams(k,
                                document.getElementById(node.data().title + node.id()).value);
                        }
                    }
                    for (var k = 0; k < Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams().length; k++) {
                        setparams = setparams + Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams()[k]["name"] + " : "
                            + Controller.getInstance().getBuilderTree().getSelectedBlocks()[i].getParams()[k]["value"] + "\n";
                    }
                }
            }
            node.data().name = node.data().title + "\n" + setparams;
        }else {
            node.data().name = change;
        }
        node.unselect();
        document.body.removeChild(bgObj);
        document.body.removeChild(msgObj);
    }
    function getEvent() {
        return window.event || arguments.callee.caller.arguments[0];
    }
}
