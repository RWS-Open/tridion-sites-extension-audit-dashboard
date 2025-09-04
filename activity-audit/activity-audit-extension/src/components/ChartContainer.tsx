import { Flex, Layout } from "antd";
import { useEffect, useState } from 'react';
import { Button, theme } from 'antd';
import { Content, Header } from "antd/es/layout/layout";
import { IFilters, PublishInfo } from "src/model/types";
import Sider from "antd/es/layout/Sider";
import SidebarFilter from "./SidebarFilter";
import PublishBarChart from "./PublishBarchart";
import DraftBarChart from "./DraftBarChart";
import UsersActivityChart from "./UsersActivityChart";

interface ChartContainerProps {
    publishedRawData: PublishInfo[]
}

const ChartContainer = ({ publishedRawData }: ChartContainerProps) => {
   // const [filterBy, setFilterBY] = useState<FilterBy[]>(initialFilterBy);
    const [rawData, setRawData] = useState<PublishInfo[]>([])
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [filters, setFilters] = useState<IFilters>()
    const { token } = theme.useToken();
    const { colorBgContainer, borderRadiusLG } = token
    useEffect(() => {
        if (publishedRawData) {
            const sortData = publishedRawData?.sort((a: any, b: any) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            }) 
            setRawData(sortData)
        }
    }, [publishedRawData])

    const filterByPublication = (publicationIds: string[]) => {
        if (publicationIds.length !== 0) {
            const filteredData = publishedRawData?.filter((item: PublishInfo) => {
                return publicationIds.some(pub => pub === item.publicationId);
            })
            setRawData(filteredData)
            setFilters({ ...filters, publication: publicationIds })
        } else {
            setRawData(publishedRawData)
        }
    }
    const filterByPeriod = (value: string) => {
        setFilters({ ...filters, period: value })
        if (value !== "all") {
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth()+1;
            const previousDate = new Date(currentYear - (+value), currentMonth, today.getDate());

            const filteredData = publishedRawData?.filter(item => {
                const date = new Date(item.date.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2}) (AM|PM)/, '$3-$1-$2 $4:$5:$6 $7'));
                return date >= previousDate;
            });
            setRawData(filteredData)
        } else {
            setRawData(publishedRawData)
        }
    }
    const filterByUser = (users:string[]) => {
        if(users.length!==0){
            const filteredData = publishedRawData?.filter((item: PublishInfo) => {
                return users.some(user => user === item.user);
            })
            setRawData(filteredData)
            setFilters({ ...filters, users: users })
        }else{
            setRawData(publishedRawData)
        }
    }

    return (
        <Layout>
            <Sider width={"300px"} trigger={null} collapsible collapsed={collapsed} style={{ background: "#fff", borderRight: "1px solid #eee", padding: 10 }}>
                <Flex align='center' justify='space-between' style={{ borderBottom: "1px solid #eee" }}>
                    {!collapsed && <h2 style={{ padding: 5, color: "#171a1f", fontSize: 20, fontWeight: 'normal' }}>Filters</h2>}
                    <Button
                        type="text"
                        icon={collapsed ? <svg version="1.1" fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 14 14" style={{ width: 16, height: 16, cursor: "pointer" }}>
                            <path d="M7.993 7.101a.73.73 0 0 1-.215.412l-6.373 6.222a.828.828 0 0 1-.78.248.777.777 0 0 1-.597-.532.716.716 0 0 1 .224-.743L6.102 7 .252 1.292A.716.716 0 0 1 .028.549.777.777 0 0 1 .626.017c.288-.06.589.036.78.248l6.372 6.222c.167.163.247.39.215.614z"></path>
                            <path d="M13.993 7.101a.73.73 0 0 1-.215.412l-6.373 6.222a.828.828 0 0 1-.78.248.777.777 0 0 1-.597-.532.716.716 0 0 1 .224-.743L12.102 7l-5.85-5.708a.716.716 0 0 1-.224-.743.777.777 0 0 1 .598-.532c.288-.06.589.036.78.248l6.372 6.222c.167.163.247.39.215.614z"></path>
                        </svg> : <svg version="1.1" fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 14 14" style={{ width: 16, height: 16, cursor: "pointer" }}>
                            <path d="M6.007 7.101c.024.155.1.3.215.412l6.373 6.222c.19.212.49.307.78.248a.777.777 0 0 0 .597-.532.716.716 0 0 0-.224-.743L7.898 7l5.85-5.708a.716.716 0 0 0 .224-.743.777.777 0 0 0-.598-.532.828.828 0 0 0-.78.248L6.223 6.487a.718.718 0 0 0-.215.614z"></path>
                            <path d="M.007 7.101c.024.155.1.3.215.412l6.373 6.222c.19.212.49.307.78.248a.777.777 0 0 0 .597-.532.716.716 0 0 0-.224-.743L1.898 7l5.85-5.708a.716.716 0 0 0 .224-.743.777.777 0 0 0-.598-.532.828.828 0 0 0-.78.248L.223 6.487a.718.718 0 0 0-.215.614z"></path>
                        </svg>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            display: "flex",
                            alignSelf: "flex-end",
                            justifySelf: "flex-end",
                            background: "transparent"
                        }}
                    />
                    {/*  <Button onClick={filterHandler}>Apply</Button> */}
                </Flex>
                {!collapsed && <SidebarFilter filterByPublication={filterByPublication} filterByPeriod={filterByPeriod} filterByUser={filterByUser}/>}
            </Sider>

            <Layout>
                <Header style={{ padding: 17, paddingTop: 0, background: "transparent" }}>
                    <h2 style={{ marginTop: 10, marginBottom: 10, fontWeight: 400, color: "#171a1f", fontSize: 20,paddingLeft:10 }}>Activity Audit</h2>
                </Header>
                <Content style={{
                    margin: '14px 16px',
                    padding: "10px",
                    minHeight: 280,
                    //background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    overflowY: "auto"
                }}
                >
                    <Flex align="center" vertical style={{ width: "100%" }} gap={10}> 
                        <Flex style={{ background: "#fff", borderRadius: 10, width: "100%" }} >
                            <PublishBarChart 
                                publishedData={rawData} 
                                filters={filters as IFilters}                           
                            /> 
                        </Flex>                       
                        <Flex style={{ background: "#fff", borderRadius: 10, width: "100%" }}>
                            <DraftBarChart 
                                publishedData={rawData} 
                                filters={filters as IFilters}
                            />
                        </Flex>                 
                        <Flex style={{ background: "#fff", borderRadius: 10, width: "100%" }}>
                            <UsersActivityChart 
                                publishedData={rawData} 
                                filters={filters as IFilters}
                            />
                        </Flex>
                    </Flex>
                    {/*  <PostData /> */}
                </Content>
            </Layout>
        </Layout>
    )
}

export default ChartContainer;

