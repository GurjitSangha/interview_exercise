import { GraphQLClient } from 'graphql-request';
import { encodeToken } from 'jwt-crypto';

interface IUBJwt {
  identity: {
    user_id: string;
    account_role: string;
    university_id?: string;
    marketplace_id?: string;
  };
}

export const createClient = async (
  tokenContent: IUBJwt = {
    identity: {
      user_id: '599ebd736a1d100004aeb744',
      account_role: 'university',
    },
  },
) => {
  const client = new GraphQLClient(`${import.meta.env.VITE_API_URL}/graphql`);

  const token = await encodeToken(
    tokenContent,
    import.meta.env.VITE_JWT_SECRET,
  );
  client.setHeader('authorization', `JWT ${token}`);

  return client;
};
