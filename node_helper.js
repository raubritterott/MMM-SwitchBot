const NodeHelper = require("node_helper")
const crypto = require("crypto") // Importiere das crypto-Modul

module.exports = NodeHelper.create({

  async socketNotificationReceived(notification, payload) {
    if (notification === "GET_RANDOM_TEXT") {
      const amountCharacters = payload.amountCharacters || 10
      const randomText = Array.from({ length: amountCharacters }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join("")
      this.sendSocketNotification("EXAMPLE_NOTIFICATION", { text: randomText })
    }

    else if (notification === "GET_SIGN") {
      // Erstelle einen SHA-256-Hash aus dem Payload
      const hash = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex")
      this.sendSocketNotification("SIGN", { text: hash }) // Sende den Hash zurück
    }
  },

})
