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
      const hash = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
      this.sendSocketNotification("SIGN", { text: data });
    }
  },

})
