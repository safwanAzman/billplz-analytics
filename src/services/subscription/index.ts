import axios  from '@/helpers/axios';

export interface CollectionItem {
    title:string,
    price:string,
    item:string[]
}

export const SubscribeService = {
    readSubscribe: async (): Promise<CollectionItem[]> => {
        const response = await axios.get('/subscription')
        return response.data
    },
};
