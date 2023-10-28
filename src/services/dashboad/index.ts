import { fetchData } from "@/helpers/fetchData";

export interface CollectionLineChart {
    [key: string]: number;
}
export interface CollectionPieChart {
    data:string[]
}

export interface CollectionFpxUpcoming {
    id:number,
    date:string,
    total:number
}

export interface CollectionTop5 {
    id:number,
    date:string,
    total:number
}

export const DashboardService = {
    readTotalCollection: async (): Promise<CollectionLineChart[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-collection`);
    },
    readTotalTransaction: async (): Promise<CollectionLineChart[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-transaction`);
    },
    readUpcomingFpx: async (): Promise<CollectionFpxUpcoming[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/upcoming-fpx`);
    },
    readTotalPayout: async (): Promise<CollectionLineChart[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-payout`);
    },
    readTop5Performing: async (): Promise<CollectionTop5[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/collection-top5`);
    },
    readActiveInactive: async (): Promise<CollectionPieChart[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/active-inactive-collection`);
    },
    readPaymentMethod: async (): Promise<CollectionPieChart[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/payment-collection`);
    },
};