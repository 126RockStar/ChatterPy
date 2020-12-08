// @flow
import moment from 'moment';

import HTTPService from './HTTPService';
import type { IHTTPService } from './HTTPService';
import type {
  Contact,
  SerializedContact,
} from '../components/ChatterPyApp/types';

type ContactRegistrationParams = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
};

/**
 * Service to interact with contacts
 */
class ContactsService implements IHTTPService {
  http: typeof HTTPService;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;
  }

  async addContact({
    firstName,
    lastName,
    phone_number,
  }: ContactRegistrationParams): Promise<Contact> {
    const data = await this.http.post('v1/contacts', {
      first_name: firstName,
      last_name: lastName,
      phone_number,
    });

    return {
      account: data.account,
      collection: data.collection,
      email: data.email,
      id: data.id,
      tags: data.tags,
      updated: data.updated,
      created: moment(data.created),
      firstName: data.first_name,
      lastName: data.last_name,
      phoneNumber: data.phone_number,
    };
  }

  async deleteContact(contactId: number): Promise<void> {
    await this.http.delete(`v1/contacts/:id:`, { id: contactId });
  }

  async getAllContacts(): Promise<Array<Contact>> {
    const data = await this.http.get('v1/contacts');
    return data.results.map((contact: SerializedContact) => ({
      next: data.next,
      account: contact.account,
      collection: contact.collection,
      created: moment(contact.created),
      email: contact.email,
      id: contact.id,
      firstName: contact.first_name,
      lastName: contact.last_name,
      phoneNumber: contact.phone_number,
      tags: contact.tags,
      updated: contact.updated,
    }));
  }
}

export default (new ContactsService(HTTPService): ContactsService);
