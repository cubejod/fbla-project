export interface Partner {
  partnerName: string
  organizationType: string
  resourcesAvailable: string
  contactName: string
  contactEmail: string
  contactPhone: string
  addressStreet: string
  addressCity: string
  addressState: string
  addressZipCode: string
  website: string
  description: string
  partnershipStatus: string
  id: number
}

export interface User {
  username: string
  email: string
  password: string
  id: number
  permissions: number
}

export enum Permissions {
  /**
   * User can edit partners
   */
  EDIT_PARTNERS = 1 << 0, // 1
  /**
   * User can create partners
   */
  CREATE_PARTNERS = 1 << 1, // 2
  /**
   * User can delete partners
   */
  DELETE_PARTNERS = 1 << 2, // 4
  /**
   * User can edit, create, deleyte partners (must also have other permissions)
   */
  MANAGE_PARTNERS = 1 << 3, // 8
  /**
   * User can create new users
   */
  CREATE_USERS = 1 << 4, // 16
  /**
   * User can delete other users (not self)
   */
  DELETE_USERS = 1 << 5, // 32
  /**
   * Users can edit other users
   */
  EDIT_USERS = 1 << 6, // 64
  /**
   * User can create, delete, edit other users (must also have other permissions)
   */
  MANAGE_USERS = 1 << 7, // 128
  /**
   * Full access includes all other permissions
   */
  FULL_ACCESS = 1 << 8, // 256 (and must have other permissions)
}
