import axios  from '@/helpers/axios';
import {CollectionItem,CollectionLineChart,CollectionTop5} from '@/types'


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
