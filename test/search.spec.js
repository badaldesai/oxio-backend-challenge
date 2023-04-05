const { search } = require('../src/modules/search');
const HttpException = require('../src/utils/exceptions');

describe('search', () => {
  it('should output proper formart output', () => {
    const input = '+15144459000';
    const expectedResponse = {
      phoneNumber: '+15144459000',
      countryCode: 'CA',
      areaCode: '514',
      localPhoneNumber: '4459000',
    };
    expect(search(input)).toMatchObject(expectedResponse);
  });

  it('should output proper formart output even without plus sign', () => {
    const input = '1 514 4459000';
    const expectedResponse = {
      phoneNumber: '1 514 4459000',
      countryCode: 'CA',
      areaCode: '514',
      localPhoneNumber: '4459000',
    };
    expect(search(input)).toMatchObject(expectedResponse);
  });

  it('should empty area code when there is no area code', () => {
    const input = '919824958787';
    const expectedResponse = {
      phoneNumber: input,
      countryCode: 'IN',
      areaCode: '',
      localPhoneNumber: '9824958787',
    };
    expect(search(input)).toMatchObject(expectedResponse);
  });

  it('should throw an error if there are any invalid character', () => {
    const input = '9198$4958  787';
    expect(() => search(input)).toThrow(HttpException);
  });

  it('should throw an error if any random number is passed', () => {
    const input = '91984958 8787';
    expect(() => search(input)).toThrow(HttpException);
  });
});
