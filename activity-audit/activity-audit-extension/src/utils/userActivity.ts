import { format } from "date-fns";
import { IFilters, PublishInfo } from "src/model/types";

export const userActivity = (sortedData: PublishInfo[], filters:IFilters) => {
    const chartData = sortedData.reduce((acc: any, current: PublishInfo) => {
        const existingMonth = acc.find((month: PublishInfo) => month.month === current.month);
        if (existingMonth) {
            if (current.userActivity === 'Published') {
                existingMonth.Published++;
            } else if (current.userActivity === 'Created') {
                existingMonth.Created++;
            } else if (current.userActivity === 'Updated') {
                existingMonth.Updated++;
            }  else if (current.userActivity === 'UnPublished') {
                existingMonth.UnPublished++;
            }
            else if (current.userActivity === 'Deleted') {
                existingMonth.Deleted++;
            }
            
        } else {
            const newMonth = {
                month: filters?.period === "1" ? format(current.date, "MMM yyyy") : current.month,
                Published: current.status === 'Published' ? 1 : 0,
                Created: current.userActivity === 'Created' ? 1 : 0,
                Updated: current.userActivity === 'Updated' ? 1 : 0,
                UnPublished:current.userActivity === 'UnPublished' ? 1 : 0,
                Deleted:current.userActivity === 'Deleted' ? 1 : 0,
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
                } else if (current['Created']) {
                    existingMonth.Created++;
                } else if (current['Updated']) {
                    existingMonth.Updated++;
                } else if (current['UnPublished']) {
                    existingMonth.UnPublished++;
                } else if (current['Deleted']) {
                    existingMonth.Deleted++;
                }
            } else {
                const newMonth = {
                    month: current.month,
                    Published: current['Published'] ? 1 : 0,
                    Created: current['Created'] ? 1 : 0,
                    Updated: current['Updated'] ? 1 : 0,
                    UnPublished: current['UnPublished'] ? 1 : 0,
                    Deleted:current['Deleted'] ? 1 : 0,
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
