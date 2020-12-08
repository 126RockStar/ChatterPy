// @flow
import moment from 'moment';

import HTTPService from './HTTPService';
import type { IHTTPService } from './HTTPService';
import type {
  Datasource,
  SerializedDatasource,
} from '../components/ChatterPyApp/types';

function deserializeDatasource(
  serializedDatasource: SerializedDatasource,
): Datasource {
  return {
    ...serializedDatasource,
    created: moment(serializedDatasource.created),
    updated: moment(serializedDatasource.updated),
  };
}

class DatasourcesService implements IHTTPService {
  http: typeof HTTPService;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;
  }

  async getAllDatasources(): Promise<Array<Datasource>> {
    const data = await this.http.get('v1/datasources');
    return data.results.map(deserializeDatasource);
  }

  async addDatasource(
    name: string,
    fields: $ReadOnlyArray<string>,
  ): Promise<Datasource> {
    // TODO: this API call is not working yet
    const data = await this.http.post('v1/datasources', {
      name,
      fields,
    });

    return deserializeDatasource(data);
  }
}

export default (new DatasourcesService(HTTPService): DatasourcesService);
