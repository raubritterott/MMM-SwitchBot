const NodeHelper = require("node_helper");
const crypto = require("crypto");
const https = require('https');

module.exports = NodeHelper.create(
{

  async socketNotificationReceived(notification, payload)
  {
    if (notification === "GET_SIGN")
    {
      const { token, secret } = payload; // Extrahiere token und secret aus dem Payload-Objekt
      console.log("GET_SIGN wurde aufgerufen");
      console.log("Token:", token);
      console.log("Secret:", secret);
      const t = Date.now();
      const nonce = "MagicMirrorAO";
      const data = token + t + nonce;
      const sign = crypto
        .createHmac('sha256', secret)
        .update(data)
        .digest('base64');
      const deviceId = "B0E9FE577821";
      const options = {
          hostname: 'api.switch-bot.com',
          port: 443,
          path: `/v1.1/devices/${deviceId}/status`, ///${deviceId}/commands`,
          method: 'GET',
          headers: {
              "Authorization": token,
              "sign": sign,
              "nonce": nonce,
              "t": t,
              'Content-Type': 'application/json',
              //'Content-Length': body.length,
          },
      };
      
      const req = https.request(options, res => {
          console.log(`statusCode: ${res.statusCode}`);
          res.on('data', d => {
              process.stdout.write(d);
          });
      });
      
      req.on('error', error => {
          console.error(error);
      });
      
      //req.write(body);
      req.end();
      this.sendSocketNotification("SIGN", { text: d.version || "No data" });
    }
  },

})
