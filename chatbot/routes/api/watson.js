//1 Import Dependecies
const express = require("express");
const router = express.Router();
const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const tunnel = require("tunnel");

//2.1 Create instance of Assistance

//2/2 Authenticate
const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY
});

//2.3 Connect to Assistant
const assistant = new AssistantV2({
    version: '2019-06-14',
    authenticator: process.env.WATSON_ASSISTANT_APIKEY,
    ur: process.env.WATSON_ASSISTANT_URL,
    httpsAgent: tunnel.httpsOverHttp({
        host: '1.2.3.4',
        port: 1234,
      }),
      proxy: false,
  });

//3. Route to Handle Session Token
// GET /api/watson/session
router.get("/session", async(req, res) => {
    try {
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID
        });
        res.json(session["result"]);

    } catch(err) {
        res.send('There was an error processing watson request');
        console.log(err);

    }
});


// assistant.createSession({
//     assistantId: '51adc649-330a-41cf-a722-28f238cabb5e'
// }).then(res => {
//     console.log(JSON.stringify(res.result, null, 2));
// }).catch(err => {
//     console.log(err);
// });


//4. Handle Messages

//5. Export Routes

module.exports = router;

