// @flow
import HTTPService from './HTTPService';
import type { IHTTPService } from './HTTPService';

/**
 * Service to interact with company accounts.
 */
class AccountsService implements IHTTPService {
  http: typeof HTTPService;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;
  }

  async addAccount(
    companyName: string,
    companySize: number,
  ): Promise<{
    companyName: string,
    companySize: number,
    created: string,
    credits: number,
    enterpriseCredits: 0,
    enterprisePrice: 0,
    id: string,
  }> {
    const {
      created,
      credits,
      id,
      company_name,
      company_size,
      enterprise_credits,
      enterprise_price,
    } = await this.http.post('v1/accounts', {
      company_name: companyName,
      company_size: companySize,
    });

    return {
      created,
      credits,
      id,
      companyName: company_name,
      companySize: company_size,
      enterpriseCredits: enterprise_credits,
      enterprisePrice: enterprise_price,
    };
  }

  async getAllAccounts(): Promise<Array<{ ... }>> {
    const data = await this.http.get('v1/accounts');
    return data.results;
  }
}
export default (new AccountsService(HTTPService): AccountsService);
