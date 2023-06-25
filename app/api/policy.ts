import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const policyHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  const policyJSON = fs.readFileSync('public/no-edit/policy.json', { encoding: 'utf-8' });

  return res.status(200).json(JSON.parse(policyJSON));
};

export default policyHandler;
