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
      console.log("Data:", data);
      //const hash = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
      this.sendSocketNotification("SIGN", { text: data });
    }
  },

})
