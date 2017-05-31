"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alexa = require("alexa-sdk");
var request = require("request");
var https = require("https");
var handlers = {
    "AboutIntent": function () {
        var self = this;
        var speechOutput;
        var url = 'https://gcsp-vc-dosage-sched-sim.herokuapp.com/patient/product/dosage?pcpPatientId=1006221&vcProductId=olumiant';
        const req = https.get(url, (res) => {
          console.log('statusCode:', res.statusCode);
          console.log('body:', res.body);
          self.emit(":tellWithCard", speechOutput, "Chris' Skill", speechOutput);
        })
        .on('error', (err) => {
          console.log(err);
        });
        req.end();
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
