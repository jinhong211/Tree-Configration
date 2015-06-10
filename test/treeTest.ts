///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

///<reference path="../js/Tree.ts"/>
///<reference path="../js/ActionTreeNode.ts"/>

var chai: Chai.ChaiStatic = require('chai');

import Tree = require('../js/Tree');
import ActionTreeNode = require('../js/ActionTreeNode');

var assert = chai.assert;

describe('Tree Unit tests', () => {

    it('should be root undefined', () => {
        var t = new Tree();
        assert.isUndefined(t.getRoot());
    });

    it('should be root defined', () => {
        var t = new Tree();
        //var a = new ActionTreeNode("run", "", "");
        //t.setRoot(a);
        //assert.equal(t.getRoot(), a);
    });
});
