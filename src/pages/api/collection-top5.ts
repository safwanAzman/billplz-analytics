// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {data} from '@/data/collection-top5'

type Data = {
    id: number;
    title: string;
    total: number;
    percentageValue: number;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data[]>
) {
    res.status(200).json(data)
}
