import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {  Opensearch} from "../model/types"
import { metrics } from 'src/api/metrics';

export const useMetricsData = (authUrl:string, username:string, pwd:string, indexName:string):UseQueryResult<Opensearch> => {
    return useQuery({
        queryKey:["metrics"],
        queryFn: async () => {
           return await metrics.getData(`${authUrl}/${indexName}/_search?size=10000`, username, pwd )
        },
        enabled:true,
        retry:false,
        refetchOnMount:false,
        retryOnMount:false,
        refetchOnWindowFocus:false
    })
}