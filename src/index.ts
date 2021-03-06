import * as Alexa from "alexa-sdk"
import * as request from "request"

let handlers: Alexa.Handlers = {
  "AboutIntent": function() {
    let self: Alexa.Handler = this;
    let speechOutput = "This skill was written by Chris Dieter";
    let url = 'https://gcsp-vc-dosage-sched-sim.herokuapp.com/patient/product/dosage?pcpPatientId=1006221&vcProductId=olumiant';
    request.get(url, function(error, resp, body){
      speechOutput += body;
      speechOutput += "asdf";
      self.emit(":tellWithCard", speechOutput, "Chris' Skill", speechOutput);
    });

  },
  "HelloIntent": function() {
    let self: Alexa.Handler = this;
    let intentRequest = <Alexa.IntentRequest> self.event.request;
    let value = intentRequest.intent.slots.value;
    let speechOutput = "";
    if(value.toLowerCase() == "hello") {
      speechOutput = "The translation is hola";
    } else {
      speechOutput = "I did not understand this request";
    }
    self.emit(":tellWithCard", speechOutput, "Chris' Skill", speechOutput);
  }
}

export class Handler {
  constructor(event: Alexa.RequestBody, context: Alexa.context, callback: Function) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = "my_alexa_id";
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
}
