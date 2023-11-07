import axios  from '@/helpers/axios';
import {Subscribe} from '@/types'

export const SubscribeService = {
    readSubscribe: async (): Promise<Subscribe[]> => {
        const response = await axios.get('/subscription')
        return response.data
    },
};
