"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alexa = require("alexa-sdk");
var handlers = {
    "AboutIntent": function () {
        var self = this;
        var speechOutput = "This skill was written by Chris Dieter";
        self.emit(":tellWithCard", speechOutput, "Chris' Skill", speechOutput);
    },
    "HelloIntent": function () {
        var self = this;
        var intentRequest = self.event.request;
        var value = intentRequest.intent.slots.value;
        var speechOutput = "";
        if (value.toLowerCase() == "hello") {
            speechOutput = "The translation is hola";
        }
        else {
            speechOutput = "I did not understand this request";
        }
        self.emit(":tellWithCard", speechOutput, "Chris' Skill", speechOutput);
    }
};
var Handler = (function () {
    function Handler(event, context, callback) {
        var alexa = Alexa.handler(event, context);
        alexa.appId = "my_alexa_id";
        alexa.registerHandlers(handlers);
        alexa.execute();
    }
    return Handler;
}());
exports.Handler = Handler;
