import { Permissions, User } from '../types'

export default class PermissionsUtil {
  /**
   * Checks if a user has a permissions
   */
  static hasPermission (user: User, permission: Permissions): boolean {
    // Check if the permission portion of the user permissions number is selected
    // ex. if permission is 1 and user permission is 6 (110), it does not have permisions
    // ex. if permission is 2 and user permission is 6 (110), it does have permissions
    return (user.permissions & permission) === permission
  }

  /**
   * Create a permissions bit given different permisisons
   */
  static createPermission (...permissions: Permissions[]): number {
    // add all permissions and return number
    return permissions.reduce((a, b) => a + b, 0)
  }
}
