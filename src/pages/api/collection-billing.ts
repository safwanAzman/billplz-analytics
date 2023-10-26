// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {data} from '@/data/collection-billing'

type Data = {
    id: number;
    collection_name: string;
    collection_id: string;
    total_collected: number;
    status: string;
    created_at: string;
    volume: number;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data[]>
) {
    res.status(200).json(data)
}
