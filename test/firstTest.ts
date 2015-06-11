///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

///<reference path="../js/Parser.ts"/>
///<reference path="../js/Communication.ts"/>

/**
 * Tests class
 * @author : Anaïs
 */

var mocha: Mocha = require('mocha');
var chai: Chai.ChaiStatic = require('chai');

var parser = require("../js/Parser");
var communication = require("../js/Communication");

describe("My first unit test in TS", () => {
    it("should throw exception", () => {
        chai.expect(function() {
            throw new Error("derp")
        }).to.throw(Error);
    })

    it("should parse", () => {
        var p = new Parser();
        var c = new Communication("http://46.105.18.34:8080");

        chai.expect(function() {
            p.parseBlackboard3(c.httpGetMOCK3())
        }).to.be("blablabla");

    })
});
