Module.register("MMM-SwitchBot",
{
  defaults:
  {
    token: "",
    secret: "",
    updateInterval: 3000, //300000, // default update interval is 5 minutes
    sign: ""
  },

  /**
   * Apply the default styles.
   */
  getStyles()
  {
    return ["SwitchBot.css"]
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() 
  {
    this.token = this.config.token
    this.secret = this.config.secret

    // set timeout for next random text
    setInterval(() => this.addSign(), this.updateInterval)
  },

  /**
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} data - The payload data`returned by the node helper.
   */
  socketNotificationReceived: function (notification, data)
  {
    console.log("Empfangene Nachricht:", notification);
    console.log("Empfangene Daten:", data);
    if (notification === "SIGN")
      {
        this.sign = `${data.text}`
        this.updateDom()
      }
  },

  /**
   * Render the page we're on.
   */
  getDom()
  {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = `<b>SwitchBot Data</b><br />data: ${this.sign}`

    return wrapper
  },

  addSign()
  {
    this.sendSocketNotification("GET_SIGN", { token: this.token, secret: this.secret })
  },

  /**
   * This is the place to receive notifications from other modules or the system.
   *
   * @param {string} notification The notification ID, it is preferred that it prefixes your module name
   * @param {any} data the payload type.
   */
  notificationReceived(notification, data)
  {
    if (notification === "SIGN") {
      this.sign = `${data.text}`
      this.updateDom()
    }
  }
})
