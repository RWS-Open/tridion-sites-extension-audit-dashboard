import { Button, Flex } from "antd";
import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { IPieChart, PublishInfo } from "src/model/types";
import formatUser from "src/utils/formatUser";
import ActivityDetailsTabular from "./ActivityDetailsTabular";

interface IUserActivity{
    rawData:PublishInfo[];
    selctedUser:string;
    activityDetails:string
}

const COLORS = ["#00a89f", "#0078ab", "#fac092", "#f078ab","#9ac092","#751130", "#9fb916", "#9199ad"];

const ActivityDetails = ({rawData,selctedUser,activityDetails}:IUserActivity) => {
        const [chartData, setChartData] = useState<IPieChart[]>([]);
        const [selectdItemType, setSelectedItemType] = useState<string>()

        useEffect(() => {
            const details = rawData.filter(item => item.user===selctedUser && item.userActivity===activityDetails);
        console.log(activityDetails)
        const data = formatUser(details, "itemType");
        setChartData(data)
    },[rawData,selctedUser,activityDetails])

    const handleTableData = (value: { name: SetStateAction<string | undefined>; }) => {
        console.log(value)
        setSelectedItemType(value.name)
    }
    return(
        <Flex vertical style={{ width: "100%", marginTop:30}}>
            <h4 style={{ marginLeft: "50px", color: "#171a1f", fontWeight: 400, fontSize: 16 }}>{selctedUser} {activityDetails} Activities</h4>                      
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
                            onClick={(value) => handleTableData(value)}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}                        
                        </Pie>     
                        <Legend iconType="rect" align="center" verticalAlign="bottom" layout="horizontal"/>                                   
                    </PieChart>
                }               
            </Flex>
            {
                selectdItemType && 
                    <ActivityDetailsTabular 
                        rawData={rawData} 
                        selectedItemType={selectdItemType} 
                        activityDetails={activityDetails}
                        selctedUser={selctedUser}
                    /> 
            }                   
        </Flex>
    )
}   

export default ActivityDetails;