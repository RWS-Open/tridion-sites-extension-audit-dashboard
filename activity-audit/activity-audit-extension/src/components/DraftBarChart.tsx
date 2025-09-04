import { useEffect, useState } from "react";
import { CheckboxProps, Flex } from "antd";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from "recharts";
import { FilterBy, IFilters, PublishInfo } from "src/model/types";
import { BarTooltip } from "./BarTooltip";
import { reduceData } from "src/utils/reduceData";
import FilterByType from "./FilterByType";

interface IChartData {
    publishedData: PublishInfo[],
    filters: IFilters
}

const DraftBarChart = ({ publishedData, filters }: IChartData) => {
    const [chartData, setChartData] = useState([]);
    const [filterBy, setFilterBy] = useState<FilterBy[]>([]);
    useEffect(() => {
        if (publishedData) {
            const filtertypes = Object.values(publishedData.reduce((acc:any, curr:PublishInfo, idx:number) => {
                if(!acc[curr.itemType]){
                    acc[curr.itemType] = {
                        id:idx,
                        label:curr.itemType,
                        value:curr.itemType,
                        checked:false
                    }
                }
                return acc;
            },{}))
            setFilterBy(filtertypes as FilterBy[])
            const data = reduceData(publishedData, filters);
            setChartData(data)
        }
    }, [publishedData, filters])

    const handleFilter: CheckboxProps['onChange'] = async (e) => {
        const updateFilterBy = filterBy.map((item) => {
            if (e.target.checked) {
                if (item.value === e.target.value) {
                    item.checked = true;
                    const filteredData = publishedData?.filter((component: PublishInfo) => {
                        return component.itemType === e.target.value || filterBy.some(item => item.checked && item.value === component.itemType)
                    });
                    const data = reduceData(filteredData, filters);
                    setChartData(data)
                }
            } else {
                if (item.value === e.target.value) {
                    item.checked = false
                    const filteredData = publishedData?.filter((component: PublishInfo) => {
                        return component.itemType !== e.target.value || filterBy.some(item => item.checked === false && item.value !== component.itemType)
                    });
                    const data = reduceData(filteredData, filters);
                    setChartData(data)
                }
            }
            return item
        })
        setFilterBy(updateFilterBy)
    }
    const resetFilterBy = () => {        
        const data = reduceData(publishedData, filters);
        const updateFilters = filterBy.map(item => {
            item.checked=false
            return item
        })
        setChartData(data)
        setFilterBy(updateFilters)
    }
    return (
        <Flex vertical style={{ width: "100%", margin: 10 }}>
            <FilterByType resetFilterBy={resetFilterBy} filterBy={filterBy} handleFilter={handleFilter}/>
            <ResponsiveContainer width={"100%"} height={450} style={{ margin: 10, background: "#fff" }}>
                <BarChart
                    width={850}
                    height={500}
                    data={chartData}
                    barSize={30}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 5,
                        bottom: 15,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickMargin={10}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tickCount={10}
                        label={
                            <Text x={-40} y={0} dx={50} dy={275} offset={0} angle={-90}>
                                Number of draft actions
                            </Text>
                        }

                        tickLine={false}
                        axisLine={false}
                        style={{ textAnchor: 'middle' }}
                    />
                    <Tooltip
                        cursor={{ fill: "#f1f1f1" }}
                        content={<BarTooltip />}
                    />
                    <Legend wrapperStyle={{ bottom: 0, left: 0 }} layout='horizontal' align='center' />
                    {/* <Bar
                            dataKey="Published"
                            stackId="a"
                            fill="rgb(250, 192, 146)"
                            radius={[0, 0, 4, 4]}
                        /> 
                    */}
                    <Bar
                        dataKey="Draft"
                        stackId="a"
                        fill="rgb(0,120,171)"
                        radius={[4, 4, 0, 0]}
                        label={{ position: 'top' }}

                    />
                </BarChart>
            </ResponsiveContainer>
        </Flex>
    )
}

export default DraftBarChart;