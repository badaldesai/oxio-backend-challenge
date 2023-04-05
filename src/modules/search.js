// eslint-disable-next-line import/no-extraneous-dependencies
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const HttpException = require('../utils/exceptions');

module.exports = {
  search: (phoneNumber) => {
    const isValid = /^\+?\d+(?:[ ]?\d+)*$/.test(phoneNumber);
    if (!isValid) {
      throw new HttpException(400, {
        phoneNumber,
        error: {
          phoneNumber: 'required in E.164 format',
        },
      });
    }
    let phone = phoneNumber;
    if (phoneNumber[0] !== '+') {
      phone = `+${phoneNumber}`;
    }
    const parseNumber = phoneUtil.parse(phone);
    if (!phoneUtil.isValidNumber(parseNumber)) {
      throw new HttpException(400, {
        phoneNumber,
        error: {
          countryCode: 'required value is missing',
        },
      });
    }
    const areaCodeLength = phoneUtil.getLengthOfGeographicalAreaCode(parseNumber);
    const countryCodeNum = parseNumber.getCountryCode().toString();
    const countryCodeLength = countryCodeNum.length;
    const validFormatRegex = new RegExp(`^\\+?([0-9]{${countryCodeLength}})?[ ]?([0-9]{${areaCodeLength}})?[ ]?[0-9]+$`);
    const isValidInputFormat = validFormatRegex.test(phoneNumber);
    if (!isValidInputFormat) {
      throw new HttpException(400, {
        phoneNumber,
        error: {
          phoneNumber: 'required in E.164 format: [+][country code][area code][local phone number]',
        },
      });
    }
    const countryCode = phoneUtil.getRegionCodeForNumber(parseNumber);
    let localPhoneNumber = parseNumber.getNationalNumber().toString();
    let areaCode = '';
    if (areaCodeLength) {
      areaCode = localPhoneNumber.slice(0, areaCodeLength);
      localPhoneNumber = localPhoneNumber.slice(areaCodeLength);
    }
    return {
      phoneNumber, countryCode, areaCode, localPhoneNumber,
    };
  },
};
