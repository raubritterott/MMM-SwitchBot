Module.register("MMM-SwitchBot",
{
  defaults:
  {
    token: "",
    secret: "",
    updateInterval: 60000, // default update interval is 1 minute
    version: null,
    temperature: null,
    humidity: null,
    battery: null,
    deviceType: null,
    status: "waiting for data"
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
    this.updateInterval = this.config.updateInterval
    this.addSign()

    console.log("Update-Intervall (ms):", this.updateInterval)

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
    if (notification === "SIGN")
      {
        this.temperature = `${data.temperature} °C`
        this.humidity = `${data.humidity} %`
        this.battery = `${data.battery} %`
        this.deviceType = `${data.deviceType}`
        this.status = `${data.status}`
        console.log("Daten aktualisiert:", this.temperature, this.humidity, this.battery, this.deviceType)
        this.updateDom()
      }
  },

  /**
   * Render the page we're on.
   */
  getDom()
  {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = `<b>SwitchBot Data</b><br />Temperature: ${this.temperature}<br />Humidity: ${this.humidity}<br />Battery: ${this.battery}<br />Device Type: ${this.deviceType}<br />Status: ${this.status}`

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
