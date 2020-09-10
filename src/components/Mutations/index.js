import { useMutation } from '@apollo/react-hooks';
import {LOGIN_USER} from './graphql';

export const LoginUser = () => {
    const variables = {
      email,
      passPhrase
    }
    const [login, {data,loading,error}] = useMutation(LOGIN_USER);
    login({variables});
    if (error) return error;
    return data;
};
