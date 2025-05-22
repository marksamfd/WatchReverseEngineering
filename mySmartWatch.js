class SmartWatch extends EventTarget {
    constructor(deviceName) {
        super()
        this.name = deviceName
        this.services = {
            mainService: 0xfff0
        }
        this.chars = {
            data: 0xfff1,
            heartRateData: 0xfff3,
            init: 0xfff4
        }
        this.options = {
            filters: [
                // { optionalServices: [0x180f] },
                // { services: [0x1802, 0x1803] },
                // { services: ['c48e6067-5295-48d3-8d5c-0395f61792b1'] },
                { name: deviceName },
                // { namePrefix: 'Prefix' }
            ],
            optionalServices: ['battery_service', this.services.mainService],
            // acceptAllDevices: true
        }
    }

    /**
     * @private
     * @param {String} hex 
     * @returns {Uint8Array}
     */
    stringToHex(hex) {
        return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
            return parseInt(h, 16)
        }))
    }
    async search() {
        this.FoundDevice = await navigator.bluetooth.requestDevice(this.options)
        this.dispatchEvent(new CustomEvent("found"))
    }
    async connect(device = this.FoundDevice) {
        /**
         * @returns {BluetoothRemoteGATTServer} 
         */
        this.DeviceServer = await device.gatt.connect()
        this.dispatchEvent(new CustomEvent("connected"))
    }
    async startHeartRateMesure() {
        await this.connect()
        this.mainService = await this.DeviceServer.getPrimaryService(this.services.mainService)
        this.heartRateChar = await this.mainService.getCharacteristic(this.chars.heartRateData)
        await this.heartRateChar.startNotifications();
        this.heartRateChar.addEventListener("characteristicvaluechanged", (e) => {
            let heartValue = new Uint8Array(e.target.value.buffer)[8]
            this.dispatchEvent(new CustomEvent("heartRateChanged",{detail:{heartValue}}))
            // console.log(e.target.value.getInt8(7))
            //log(heartValue)

        })
        this.initChar = await this.mainService.getCharacteristic(this.chars.init)
        this.initChar.writeValue(this.stringToHex("9311800000000101000000000000000000000080"))
    }
}