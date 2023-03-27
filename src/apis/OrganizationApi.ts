import { AbstractHttpService } from '@/libs/AbstractHttpService'
import type {
  ICreateOrganizationDto,
  IOrganizationDto,
  IUpdateOrganizationDto
} from '@/types/organization'

class OrganizationApi extends AbstractHttpService {
  public constructor() {
    super('/api/organizations')
  }

  public fetchAllOrganizations(): Promise<IOrganizationDto[]> {
    return this.http
      .get(
        '/all'
        //   {
        //     params: {
        //       customer,
        //       portal
        //     }
        //   }
      )
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this))
  }

  public fetchOrganization(id: string): Promise<IOrganizationDto> {
    return this.http
      .get(`/${id}`)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this))
  }

  public createOrganization(
    organization: ICreateOrganizationDto
  ): Promise<string> {
    return this.http
      .post('', organization)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this))
  }

  public updateOrganization(
    id: string,
    organization: IUpdateOrganizationDto
  ): Promise<string> {
    return this.http
      .put(`/${id}`, organization)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this))
  }

  public updateStatusOrganization(id: string, status: number): Promise<string> {
    return this.http
      .patch(`/${id}/status`, { status })
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this))
  }

  public deleteOrganization(id: string): Promise<string> {
    return this.http
      .delete(`/${id}`)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this))
  }
}

export const organizationApi: OrganizationApi = new OrganizationApi()
