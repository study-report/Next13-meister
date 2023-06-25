import fs from 'fs';

interface User {
  id: string;
  password: string;
}

export const getUsersDB = () => {
  const readUsers = fs.readFileSync('public/no-edit/users.json', { encoding: 'utf-8' });
  const parseUsersJSON: User[] = readUsers.length > 0 ? JSON.parse(readUsers) : [];

  return parseUsersJSON;
};

export type { User };
