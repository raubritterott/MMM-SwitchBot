const NodeHelper = require("node_helper")
const crypto = require("crypto") // Importiere das crypto-Modul

module.exports = NodeHelper.create(
{

  async socketNotificationReceived(notification, payload)
  {
    if (notification === "GET_SIGN")
    {
      // Erstelle einen SHA-256-Hash aus dem Payload
      const hash = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex")
      this.sendSocketNotification("SIGN", { text: hash }) // Sende den Hash zurück
    }
  },

})
