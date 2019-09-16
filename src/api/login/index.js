import { loginOut } from './index.graphql'
import client from '../../utils/graphql-client'

export const LoginOut = () =>
  client.mutate({ mutation: loginOut }).then(({ data }) => data.loginOut)
