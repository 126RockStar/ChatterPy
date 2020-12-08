// @flow
import moment from 'moment';

import HTTPService from './HTTPService';
import type { IHTTPService } from './HTTPService';
import type {
  PhoneNumber,
  SerializedPhoneNumber,
} from '../components/ChatterPyApp/types';

function deserializePhoneNumber(
  serializedPhoneNumber: SerializedPhoneNumber,
): PhoneNumber {
  return {
    account: serializedPhoneNumber.account,
    id: serializedPhoneNumber.id,
    created: moment(serializedPhoneNumber.created),
    phoneNumber: serializedPhoneNumber.phone_number,
  };
}

/**
 * Service to interact with phone numbers
 */
class NumbersService implements IHTTPService {
  http: typeof HTTPService;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;
  }

  async addPhoneNumber(phoneNumber: string): Promise<PhoneNumber> {
    const data = await this.http.post('v1/numbers', {
      phone_number: phoneNumber,
    });
    return deserializePhoneNumber(data);
  }

  async getAllNumbers(): Promise<Array<PhoneNumber>> {
    const data = await this.http.get('v1/numbers');
    return data.results.map(deserializePhoneNumber);
  }
}

export default (new NumbersService(HTTPService): NumbersService);
