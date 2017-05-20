const context = require("aws-lambda-mock-context");
var expect = require("chai").expect;
var index = require("../src/index");

const ctx = context();

describe("Testing the HelloIntent", function() {
  var speechResponse = null;
  var speechError = null;

  before(function(done){
    index.Handler({
      "session": {
        "sessionId": "amzn1.echo-api.session.[unique-value-here]",
        "application": {
          "applicationId": "my_alexa_id"
        },
      "attributes": {},
      "user": {
        "userId": null
      },
      "new": true,
    },
    "version": "1.0",
    "request": {
      "locale": "en-US",
      "timestamp": "2016-10-27T21:06:28Z",
      "type": "IntentRequest",
      "requestId": "amzn1.echo-api.request.[unique-value-here]",
      "intent": {
        "slots": {
          "name": "Word",
          "value": "yello",
        },
        "name": "HelloIntent",
      }
    }
    }, ctx);
    ctx.Promise
    .then(response => { speechResponse = response; console.log(speechResponse); done(); })
    .catch(eror => { speechError = error; done(); })
  });

  describe("Is the test working", function() {
    it("Should not have error", function () {
      expect(speechError).to.be.null;
    });
  });
});
