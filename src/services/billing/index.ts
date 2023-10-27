import { fetchData } from "@/helpers/fetchData";

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

export const BillingService = {
    readTop5Performing: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/collection-top5`);
    },
    readTotalCollection: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/collection-billing`);
    },
    readTotalPaid: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-paid`);
    },
};
