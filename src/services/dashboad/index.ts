import { fetchData } from "@/helpers/fetchData";

interface CollectionItem {
    id: number;
    title: string;
    total: number;
    percentageValue: number;
}

export const DashboardService = {
    readTotalCollection: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-collection`);
    },
    readTotalTransaction: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-transaction`);
    },
    readUpcomingFpx: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/upcoming-fpx`);
    },
    readTotalPayout: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-payout`);
    },
    readTop5Performing: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/collection-top5`);
    },
    readActiveInactive: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/active-inactive-collection`);
    },
    readPaymentMethod: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/payment-collection`);
    },
};