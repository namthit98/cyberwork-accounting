export interface ICreateUpdateOrganizationDto {
  code: string
  name: string
  shortName?: string
  underOrganizationId: string
  organizationLevel: string | null
  address?: string
}

export interface ICreateOrganizationDto extends ICreateUpdateOrganizationDto {}

export interface IUpdateOrganizationDto extends ICreateUpdateOrganizationDto {}

export interface IOrganizationDto {
  id: string
  code: string
  name: string
  shortName?: string
  underOrganizationId: string
  organizationLevel: string
  address?: string
  status: number
}

export interface IOrganizationTreeNode extends IOrganizationDto {
  key: string
  label: string
}
