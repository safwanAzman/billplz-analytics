import { fetchData } from "@/helpers/fetchData";

export interface CollectionItem {
    title:string,
    price:string,
    item:string[]
}

export const SubscribeService = {
    readSubscribe: async (): Promise<CollectionItem[]> => {
        return fetchData(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/subscription`);
    },
};
