// @flow
import moment from 'moment';

import HTTPService from './HTTPService';
import type { IHTTPService } from './HTTPService';
import type {
  PhoneNumberId,
  Template,
  SerializedTemplate,
} from '../components/ChatterPyApp/types';

function deserializeTemplate(serializedTemplate: SerializedTemplate): Template {
  return {
    account: serializedTemplate.account,
    created: moment(serializedTemplate.created),
    contents: serializedTemplate.data,
    datasource: serializedTemplate.datasource,
    id: serializedTemplate.id,
    name: serializedTemplate.name,
    number: serializedTemplate.number,
    updated: moment(serializedTemplate.updated),
  };
}

/**
 * Service to interact with templates
 */
class TemplatesService implements IHTTPService {
  http: typeof HTTPService;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;
  }

  async getAllTemplates(): Promise<Array<Template>> {
    const data = await this.http.get('v1/templates');
    return data.results.map(deserializeTemplate);
  }

  async addTemplate(
    name: string,
    content: string,
    phoneNumberId: PhoneNumberId,
  ): Promise<Template> {
    const data = await this.http.post('v1/templates', {
      name,
      data: content,
      number: phoneNumberId,
    });

    return deserializeTemplate(data);
  }
}

export default (new TemplatesService(HTTPService): TemplatesService);
