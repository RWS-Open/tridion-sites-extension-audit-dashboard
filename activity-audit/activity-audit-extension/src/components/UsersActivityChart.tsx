import { useState,useEffect,useCallback, SetStateAction } from "react";
import { Cell, Pie, PieChart,Legend } from "recharts";
import { FilterBy, IFilters, IPieChart, PublishInfo } from "src/model/types";
import { Flex } from "antd";
import formatUser from "src/utils/formatUser";
import UserActivityBarChart from "./UserActivityBarChart";

interface IChartData {
    publishedData: PublishInfo[],
    filters: IFilters
}

const COLORS = ["#00a89f", "#0078ab", "#fac092", "#f078ab","#9ac092","#751130", "#9fb916", "#9199ad"];

const UsersActivityChart = ({ publishedData, filters }: IChartData) => {
    const [chartData, setChartData] = useState<IPieChart[]>([]);
    const [filterBy, setFilterBy] = useState<FilterBy[]>([]);
    const [actions, setActions] = useState<string[]>([])
    const [selctedUser, setSelctedUser] = useState<string>()
    let [animate, setAnimate] = useState(true)
    const onAnimationStart = useCallback(() => {
        setTimeout(() => {
            setAnimate(false)
        }, 2000)
    }, [])
    useEffect(() => {
        if (publishedData.length!==0) {
            const data = formatUser(publishedData, "user");
            setChartData(data)
        }

    }, [publishedData, filters])

    const handleSection = (value: { name: SetStateAction<string | undefined>; }) => {
        setSelctedUser(value.name)
    }
    return(
        <Flex vertical style={{ width: "100%", margin: 10 }}>
            <h4 style={{ marginLeft: "50px", color: "#171a1f", fontWeight: 400, fontSize: 16 }}>User Activity</h4>
            <Flex gap={5} vertical align="center"  style={{ width: "100%"}}>
                {
                    chartData.length!==0 && 
                    <PieChart width={900} height={500}>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent,value }) => `${name}: ${(percent * 100).toFixed(0)}%(${value})`}
                            outerRadius={200}
                            fill="#8884d8"
                            dataKey="value"  
                            isAnimationActive={animate}                
                            animationDuration={1000}
                            animationEasing="ease-in-out"
                            onAnimationStart={onAnimationStart}
                            onClick={(value) => handleSection(value)}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}                        
                        </Pie>     
                        <Legend iconType="rect" align="center" verticalAlign="bottom" layout="horizontal"/>               
                    </PieChart>
                }
                {
                    selctedUser && <UserActivityBarChart filters={filters} selctedUser = {selctedUser as string} rawData ={publishedData as PublishInfo[]}/>
                }
            </Flex>   
        </Flex>
    )
}

export default UsersActivityChart;