///<reference path="..\typings\node\node.d.ts"/>
///<reference path="..\typings\mocha\mocha.d.ts"/>
///<reference path="..\typings\chai\chai.d.ts"/>

///<reference path="..\js\Parser.ts"/>
///<reference path="..\js\Communication.ts"/>
/**
 * Created by A on 09/06/2015.
 */

var mocha: Mocha = require('mocha');
var chai: Chai.ChaiStatic = require('chai');

describe("My first unit test in TS", () => {
    it("should throw exception", () => {
        chai.expect(function() {
            throw new Error("derp")
        }).to.throw(Error);


    })

    it("should throw exception", () => {
        chai.expect(new Parser().parseBlackboard3(new Communication("http://46.105.18.34:8080").httpGetMOCK3())).to.be.equal("ee");
    })
});
