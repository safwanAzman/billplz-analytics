import axios  from '@/helpers/axios';
import {CollectionPieChart,CollectionLineChart,CollectionTop5,CollectionFpxUpcoming} from '@/types'

export const DashboardService = {
    readTotalCollection: async (): Promise<CollectionLineChart[]> => {
        const response = await axios.get('/total-collection')
        return response.data
    },
    readTotalTransaction: async (): Promise<CollectionLineChart[]> => {
        const response = await axios.get('/total-transaction')
        return response.data
    },
    readUpcomingFpx: async (): Promise<CollectionFpxUpcoming[]> => {
        const response = await axios.get('/upcoming-fpx')
        return response.data
    },
    readTotalPayout: async (): Promise<CollectionLineChart[]> => {
        const response = await axios.get('/total-payout')
        return response.data
    },
    readTop5Performing: async (): Promise<CollectionTop5[]> => {
        const response = await axios.get('/collection-top5')
        return response.data
    },
    readActiveInactive: async (): Promise<CollectionPieChart[]> => {
        const response = await axios.get('/active-inactive-collection')
        return response.data
    },
    readPaymentMethod: async (): Promise<CollectionPieChart[]> => {
        const response = await axios.get('/payment-collection')
        return response.data
    },
};