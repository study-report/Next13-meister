import { NextApiRequest, NextApiResponse } from 'next';
type NoticeType = 'nonFaceTreatment' | 'psychologicalCounseling' | 'community';
import fs from 'fs';

type NoticeItem = {
  content: string;
  createDetailNoticeDate: string;
};

type NoticeContents = {
  [key in NoticeType]: {
    noticeDetailItems: NoticeItem[];
    noticeTitle: string;
    noticeDate: string;
  }[];
};

const readJSONFile = (dir: string) => {
  const readFile = fs.readFileSync(dir, {
    encoding: 'utf-8',
  });
  return JSON.parse(readFile);
};

const noticeHandler = (
  req: {
    query: { type: NoticeType };
  } & NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const noticeType = req.query.type;

  const noticeTabContent: NoticeContents = {
    nonFaceTreatment: readJSONFile('public/no-edit/nonFaceTreatment.json'),
    psychologicalCounseling: readJSONFile('public/no-edit/psychologicalCounseling.json'),
    community: readJSONFile('public/no-edit/community.json'),
  };

  if (!noticeTabContent[noticeType]) {
    return res
      .status(400)
      .json(
        "Wrong type required in query 'nonFaceTreatment' | 'psychologicalCounseling' | 'community'",
      );
  }

  return res.status(200).json({
    type: noticeType,
    content: noticeTabContent[noticeType],
  });
};

export default noticeHandler;
