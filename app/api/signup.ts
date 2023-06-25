import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersDB } from 'utils';
import type { User } from 'utils/getUsersDB';

const signUpHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { id, password }: User = req.body;

  if (!id || !password) {
    return res.status(400).json('Need More Parameters');
  }

  const parseUsersJSON = getUsersDB();

  const isAlreadyExists = parseUsersJSON.find((beforeUser) => {
    return beforeUser.id === id;
  });

  if (isAlreadyExists) {
    return res.status(500).json('That User Already Exists');
  }

  fs.writeFileSync(
    'public/no-edit/users.json',
    JSON.stringify([...parseUsersJSON, { id, password }], null, 4),
  );

  res.status(200).json('success signup');
};

export default signUpHandler;
