import { AbstractHttpService } from '@/libs/AbstractHttpService'
import type {
  ICreateOrganizationDto,
  IOrganizationDto
} from '@/types/Organization'

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

  public createOrganization(
    organization: ICreateOrganizationDto
  ): Promise<string> {
    return this.http
      .post('', organization)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this))
  }

  //   public job(id: number): Promise<JobModel> {
  //     return this.http
  //       .get(`/${id}`)
  //       .then(this.handleResponse.bind(this))
  //       .catch(this.handleError.bind(this))
  //   }

  //   public rerunJob(id: number): Promise<void> {
  //     return this.http
  //       .post(`/rerun/${id}`)
  //       .then(this.handleResponse.bind(this))
  //       .catch(this.handleError.bind(this))
  //   }
}

export const organizationApi: OrganizationApi = new OrganizationApi()
