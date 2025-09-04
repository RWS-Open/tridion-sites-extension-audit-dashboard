import { Flex, Table } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { PublishInfo } from 'src/model/types';
import type { TableColumnsType } from 'antd';
import ExportData from './ExportData';
import Search from './Search';
interface IUserActivity {
    rawData: PublishInfo[];
    selectedItemType: string;
    activityDetails: string;
    selctedUser: string
}

const columns: TableColumnsType<PublishInfo> = [
    {
        title: 'Title',
        dataIndex: 'title',
        ellipsis: true,
        width: 220
    },
    { title: 'URI', dataIndex: 'uri' },
    { title: 'Item Type', dataIndex: 'itemType' },
    { title: 'Status', dataIndex: "status" },
    { title: 'Publication Title', dataIndex: 'publicationTitle' },
    { title: 'Publication Id', dataIndex: 'publicationId' },
    { title: 'User', dataIndex: 'user' },
    { title: 'Date', dataIndex: 'date' },
];

const ActivityDetailsTabular = ({ rawData, selectedItemType, activityDetails, selctedUser }: IUserActivity) => {
    const [tableData, setTableData] = useState<PublishInfo[]>([])
    const [clonedTableData, setClonedTableData] = useState<PublishInfo[]>([])
    useEffect(() => {
        const data = rawData.filter(item => item.userActivity === activityDetails && item.itemType === selectedItemType && item.user === selctedUser)
        setTableData(data)
        setClonedTableData(data)
    }, [rawData, selectedItemType, activityDetails, selctedUser])

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value
        if(value){
            const filteredData = clonedTableData.filter(item => item.title.toLowerCase().includes(value.toLowerCase()) || item.uri.toLowerCase().includes(value.toLowerCase()));
            setTableData(filteredData)
        }else{
            setTableData(clonedTableData)
        }
    }
    return (
        <Flex gap="middle" vertical style={{ marginTop: 50 }}>
           {/*  <Flex justify='space-between' align='center'>
                <h4 style={{ marginLeft: 2, color: "#171a1f", fontWeight: 400, fontSize: 16 }}>List of items {activityDetails}</h4>
                <ExportData data={tableData} fileName="Activity_Audit"/>                
            </Flex> */}
            <Table<PublishInfo> /* rowSelection={rowSelection} */ 
                size="middle"
                columns={columns} 
                dataSource={tableData}  
                bordered
                title={() => 
                    <Flex align='center' justify='space-between'>
                        <h4 style={{ margin:0,marginLeft: 2, color: "#171a1f", fontWeight: 400, fontSize: 16 }}>List of items {activityDetails}</h4>
                        <Search handleSearch={handleSearch}/>
                        <ExportData data={tableData} fileName="Activity_Audit"/>  
                    </Flex>
                }
            />
        </Flex>
    )
}

export default ActivityDetailsTabular;