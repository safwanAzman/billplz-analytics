import axios  from '@/helpers/axios';

export interface CollectionItem {
    id: number;
    title: string;
    total: number;
    percentageValue: number;
    collection_name: string,
    collection_id: string,
    total_collected: number,
    status:string,
    volume: number,
    created_at: string,
}
export interface CollectionLineChart {
    [key: string]: number;
}
export interface CollectionTop5 {
    id:number,
    date:string,
    total:number
}


export const BillingService = {
    readTop5Performing: async (): Promise<CollectionTop5[]> => {
        const response = await axios.get('/collection-top5')
        return response.data
    },
    readTotalCollection: async (): Promise<CollectionItem[]> => {
        const response = await axios.get('/collection-billing')
        return response.data
    },
    readTotalPaid: async (): Promise<CollectionLineChart[]> => {
        const response = await axios.get('/total-paid')
        return response.data
    },
};
