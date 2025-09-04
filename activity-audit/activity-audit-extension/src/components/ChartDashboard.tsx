import { format } from 'date-fns';
import { useMetricsData } from 'src/hooks/useMetrics';
import { Hit, PublishInfo } from 'src/model/types';
import { getConfiguration } from '@globals';
import ChartContainer from './ChartContainer';

export const ChartDashboard = () => {
    const configurationObj = getConfiguration();
    const username = configurationObj && configurationObj['OPENSEARCH_USERNAME'] as string;
    const pwd = configurationObj && configurationObj['OPENSEARCH_PWD'] as string;
    const authUrl = configurationObj && configurationObj['OPENSEARCH_BASE_URL'] as string;
    const indexName = configurationObj && configurationObj['OPENSEARCH_INDEX_NAME'] as string;
    const { data, isLoading, isError } = useMetricsData(authUrl as string, username as string, pwd as string, indexName as string);
    
    const publishingData = data?.hits?.hits?.map((item: Hit):PublishInfo => {
        return {
            uri:item._source.Id,
            month: `${format(item._source.DateTime, "yyyy")} ${format(item._source.DateTime, "qqq")}`,
            title: item._source.Title as string,
            status: item._source.Status as string,
            publicationId: item._source.PublicationID as string,
            publicationTitle: item._source.PublicationTitle as string,
            date: item._source.DateTime as string,
            itemType:item._source.Type as string,
            user:item._source.User as string,
            userActivity:item._source.UserActivity as string
        }
    })
    return (
        <ChartContainer publishedRawData={publishingData as PublishInfo[]} />
    )
}