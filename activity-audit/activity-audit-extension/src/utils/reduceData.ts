import { format } from "date-fns";
import { IFilters, PublishInfo } from "src/model/types";

export const reduceData = (sortedData: PublishInfo[], filters:IFilters) => {
    const chartData = sortedData.reduce((acc: any, current: PublishInfo) => {
        const existingMonth = acc.find((month: PublishInfo) => month.month === current.month);
        if (existingMonth) {
            if (current.status === 'Published') {
                existingMonth.Published++;
            } else if (current.status === 'Draft') {
                existingMonth.Draft++;
            }
        } else {
            const newMonth = {
                month: filters?.period === "1" ? format(current.date, "MMM yyyy") : current.month,
                Published: current.status === 'Published' ? 1 : 0,
                Draft: current.status === 'Draft' ? 1 : 0,
                date: filters?.period === "1" ? format(current.date, "MMM yyyy") : current.date
            };
            acc.push(newMonth);
        }
        return acc;
    }, []);
    if (filters && filters.period === "1") {
        const result = chartData.reduce((acc: any, current: any) => {
            const existingMonth = acc.find((month: any) => month.month === current.month);
            if (existingMonth) {
                if (current['Published']) {
                    existingMonth.Published++;
                } else if (current['Draft']) {
                    existingMonth.Draft++;
                }
            } else {
                const newMonth = {
                    month: current.month,
                    Published: current['Published'] ? 1 : 0,
                    Draft: current['Draft'] ? 1 : 0,
                    date: current.date
                };
                acc.push(newMonth);
            }
            return acc;
        }, []);
    return result
    } else {
        return chartData
    }
}
