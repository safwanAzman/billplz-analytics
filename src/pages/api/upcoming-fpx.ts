// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {data} from '@/data/upcoming-fpx';

type Data = {
    id: number;
    date: string;
    total: number;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data[]>
) {
    res.status(200).json(data)
}
