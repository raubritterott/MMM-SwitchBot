const NodeHelper = require("node_helper");
const crypto = require("crypto");
const https = require('https');

module.exports = NodeHelper.create(
{

  async socketNotificationReceived(notification, token, secret)
  {
    if (notification === "GET_SIGN")
    {
      const t = Date.now();
      const nonce = "MagicMirrorAO";
      const data = token + t + nonce;
      console.log("Token:", token);
      console.log("Timestamp:", t);
      console.log("Nonce:", nonce);
      console.log("Data:", data);
      //const hash = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
      this.sendSocketNotification("SIGN", { text: data });
    }
  },

})
