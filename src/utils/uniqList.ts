import _ from 'lodash'
import { IUser } from '../types/user'

export function uniqList(list: IUser[]) {
  return _.uniqWith(list, _.isEqual)
}
