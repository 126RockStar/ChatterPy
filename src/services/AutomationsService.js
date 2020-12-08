// @flow
import moment from 'moment';

import HTTPService from './HTTPService';
import type { IHTTPService } from './HTTPService';
import type {
  Automation,
  PhoneNumberId,
  SerializedAutomation,
} from '../components/ChatterPyApp/types';

function deserializeAutomation(
  serializedAutomation: SerializedAutomation,
): Automation {
  return {
    id: serializedAutomation.id,
    account: serializedAutomation.account,
    actions: serializedAutomation.actions,
    active: serializedAutomation.active,
    created: moment(serializedAutomation.created),
    creatorUserId: serializedAutomation.creator,
    name: serializedAutomation.name,
    number: serializedAutomation.number,
    trigger: serializedAutomation.trigger,
    updated: moment(serializedAutomation.updated),
  };
}

/**
 * Service to interact with contacts
 */
class AutomationsService implements IHTTPService {
  http: typeof HTTPService;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;
  }

  async getAllAutomations(): Promise<Array<Automation>> {
    const data = await this.http.get('v1/automations');
    return data.results.map(deserializeAutomation);
  }

  async addAutomation(
    name: string,
    trigger: string,
    phoneNumberId: PhoneNumberId,
  ): Promise<Automation> {
    const data = await this.http.post('v1/automations', {
      name,
      trigger,
      number: phoneNumberId,
    });

    return deserializeAutomation(data);
  }
}

export default (new AutomationsService(HTTPService): AutomationsService);
