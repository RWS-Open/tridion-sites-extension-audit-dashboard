import { useEffect, useState } from "react"
import { Flex } from "antd"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from "recharts"
import { IFilters, PublishInfo } from "src/model/types"
import { BarTooltip } from "./BarTooltip"
import { userActivity } from "src/utils/userActivity"
import ActivityDetails from "./ActivityDetails"

interface IChartData {
    rawData: PublishInfo[],
    selctedUser:string;
    filters: IFilters
}

const UserActivityBarChart = ({rawData,selctedUser,filters}:IChartData) => {
    const [userData, setUserData] = useState<PublishInfo[]>([]);
    const [activityDetails, setActivityDetails]= useState<string>()
    
    useEffect(() => {
        if (rawData.length!==0 && selctedUser) {
            const userDetails = rawData.filter(user => user.user===selctedUser);
            const data = userActivity(userDetails, filters)
            setUserData(data)
        }
    },[rawData,filters, selctedUser])

    const handleBarChart = (...args:any) => {
        setActivityDetails(args[1])
    }
    return(
        <Flex vertical style={{width:"100%", marginTop:30}}>
            {/* <FilterByStatus filterBy={filterBy} handleFilter={handleFilter} resetFilterBy={resetFilterBy} /> */}
            <h4 style={{ marginLeft: "50px", color: "#171a1f", fontWeight: 400, fontSize: 16 }}>{selctedUser} Activities</h4>
            <ResponsiveContainer width={"100%"} height={450} style={{ background: "#fff" }}>
                <BarChart
                    width={850}
                    height={500}
                    data={userData}
                    barSize={20}
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
                                Number of User actions
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
                    <Legend type="sqaure" wrapperStyle={{ bottom: 0, left: 0 }} layout='horizontal' align='center' />
                    <Bar
                        dataKey="Created"
                        stackId="a"                       
                        fill="rgb(0,168,159)"
                        radius={[4, 4, 0, 0]}
                        label={{ position: 'top' }}
                        onClick={(value) =>handleBarChart(value,"Created")}
                    />
                    <Bar
                        dataKey="Published"
                        stackId="b"
                        fill="rgb(250, 192, 146)"
                        radius={[4, 4, 0, 0]}
                        label={{ position: 'top' }}
                        onClick={(value) =>handleBarChart(value,"Published")}
                    />
                     <Bar
                        dataKey="Updated"
                        stackId="c"
                        fill="rgb(0,120,171)"
                        radius={[4, 4, 0, 0]}
                        label={{ position: 'top' }}
                        onClick={(value) =>handleBarChart(value,"Updated")}
                    />                    
                    <Bar
                        dataKey="UnPublished"
                        stackId="d"
                        fill="rgb(200, 204, 214)"
                        radius={[4, 4, 0, 0]}
                        label={{ position: 'top' }}
                        onClick={(value) =>handleBarChart(value,"UnPublished")}
                    />
                   <Bar
                        dataKey="Deleted"
                        stackId="e"
                        fill="rgb(195 118 118)"
                        radius={[4, 4, 0, 0]}
                        label={{ position: 'top' }}
                        onClick={(value) =>handleBarChart(value,"Deleted")}
                    />
                </BarChart>
            </ResponsiveContainer>
            { 
                activityDetails && 
                    <ActivityDetails rawData={rawData} selctedUser={selctedUser} activityDetails={activityDetails}/>
            }
        </Flex>
    )
}

export default UserActivityBarChart