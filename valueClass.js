const ValueDataType = {
    HEXADECIMAL: 'Hexadecimal',
    UTF8: 'UTF-8',
    DECIMAL: 'Decimal',
};
class ValueConv {
    /** @param {!Array<number>} initialValue */
    constructor(initialValue) {
        /** @private {!Array<number>} */
        this.value_ = initialValue;
    }

    /**
     * Gets the backing array value.
     * @return {!Array<number>}
     */
    getArray() {
        return this.value_;
    }

    /**
     * Sets the backing array value.
     * @param {!Array<number>} newValue
     */
    setArray(newValue) {
        this.value_ = newValue;
    }

    /**
     * Sets the value by converting the |newValue| string using the formatting
     * specified by |valueDataType|.
     * @param {!ValueDataType} valueDataType
     * @param {string} newValue
     */
    setAs(valueDataType, newValue) {
        switch (valueDataType) {
            case ValueDataType.HEXADECIMAL:
                this.setValueFromHex_(newValue);
                break;

            case ValueDataType.UTF8:
                this.setValueFromUTF8_(newValue);
                break;

            case ValueDataType.DECIMAL:
                this.setValueFromDecimal_(newValue);
                break;
        }
    }

    /**
     * Gets the value as a string representing the given |valueDataType|.
     * @param {!ValueDataType} valueDataType
     * @return {string}
     */
    getAs(valueDataType) {
        switch (valueDataType) {
            case ValueDataType.HEXADECIMAL:
                return this.toHex_();

            case ValueDataType.UTF8:
                return this.toUTF8_();

            case ValueDataType.DECIMAL:
                return this.toDecimal_();
        }
        assertNotReached();
        return '';
    }

    /**
     * Converts the value to a hex string.
     * @return {string}
     * @private
     */
    toHex_() {
        if (this.value_.length == 0) {
            return '';
        }

        return this.value_.reduce(function (result, value, index) {
            return result + ('0' + value.toString(16)).substr(-2);
        }, '0x');
    }

    /**
     * Sets the value from a hex string.
     * @param {string} newValue
     * @private
     */
    setValueFromHex_(newValue) {
        if (!newValue) {
            this.value_ = [];
            return;
        }

        if (!newValue.startsWith('0x')) {
            throw new Error('Expected new value to start with "0x".');
        }

        const result = [];
        for (let i = 2; i < newValue.length; i += 2) {
            result.push(parseInt(newValue.substr(i, 2), 16));
        }

        this.value_ = result;
    }

    /**
     * Converts the value to a UTF-8 encoded text string.
     * @return {string}
     * @private
     */
    toUTF8_() {
        return this.value_.reduce(function (result, value) {
            return result + String.fromCharCode(value);
        }, '');
    }

    /**
     * Sets the value from a UTF-8 encoded text string.
     * @param {string} newValue
     * @private
     */
    setValueFromUTF8_(newValue) {
        if (!newValue) {
            this.value_ = [];
            return;
        }

        this.value_ = Array.from(newValue).map(function (char) {
            return char.charCodeAt(0);
        });
    }

    /**
     * Converts the value to a decimal string with numbers delimited by '-'.
     * @return {string}
     * @private
     */
    toDecimal_() {
        return this.value_.join('-');
    }

    /**
     * Sets the value from a decimal string delimited by '-'.
     * @param {string} newValue
     * @private
     */
    setValueFromDecimal_(newValue) {
        if (!newValue) {
            this.value_ = [];
            return;
        }

        if (!/^[0-9\-]*$/.test(newValue)) {
            throw new Error('New value can only contain numbers and hyphens.');
        }

        this.value_ = newValue.split('-').map(function (val) {
            return parseInt(val, 10);
        });
    }
}