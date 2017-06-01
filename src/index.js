"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alexa = require("alexa-sdk");
var request = require("request");
var https = require("https");
var handlers = {
    "NextDosageIntent": function () {
        var self = this;
        var speechOutput;

        // Main API Call to the PCP service
        request('https://gcsp-vc-dosage-sched-sim.herokuapp.com/patient/product/dosage?pcpPatientId=1006221&vcProductId=olumiant', (error, res, body) => {
          var data = JSON.parse(res.body);
          var next_dosage_date = data.payload.dosageSetupDate;

          // Convert the date to a human format
          var d = new Date(0);
          d.setUTCSeconds(next_dosage_date);
          speechOutput = "Your next dosage is scheduled for " + d;

          self.emit(":tellWithCard", speechOutput, "Chris' Skill", speechOutput);
        });

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
