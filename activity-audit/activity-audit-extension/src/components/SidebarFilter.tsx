
import { useEffect, useState } from 'react';
import { ConfigProvider, Flex, Select } from 'antd';
import { ListsService } from '@tridion-sites/open-api-client';
import { CaretDownOutlined } from '@ant-design/icons';
import { useUsersQuery } from '@tridion-sites/extensions';

interface IPublications {
    value: string;
    label: string;
}

interface IChartData {
    filterByPublication: (publicationId: string[]) => void;
    filterByPeriod: (period: string) => void;
    filterByUser:(user: string[]) => void;
}

const period = [
    {
        value: '1',
        label: '1 Years',
    },
    {
        value: '3',
        label: '3 Years',
    },
    {
        value: '5',
        label: '5 Years',
    },
    {
        value: "all",
        label: "All Time"
    }
]

const SidebarFilter = ({ filterByPublication, filterByPeriod,filterByUser }: IChartData) => {
    const {data} = useUsersQuery()
    const userData = data?.map(user => {
        return{
            value:user.title,
            label:user.title as string,
            description:user.description as string,
            isEnabled:user.isEnabled as boolean,
        }
    })
    const [publications, setPublications] = useState<IPublications[]>([])
    useEffect(() => {
        getPublications()
    }, [])

    const getPublications = () => {
        ListsService.getPublications().then(response => {        
            const publist = response.reduce((acc: IPublications[], curr) => {
                curr.PublicationType === "Web" &&
                    acc.push({
                        label: curr.Title as string,
                        value: curr.Id,
                    });
                return acc;
            }, []);
            setPublications(publist as IPublications[])
        }).catch(err => {
            console.log(err)
        })
    }
    const handlePeriodCahnge = (value: string) => {
       // console.log(`selected ${value}`);
        filterByPeriod(value)
    };

    const handleChange = (value: string[]) => {
       // console.log(`selected ${value}`);
        filterByPublication(value)
    };

    const handleUserChange = (value: string[]) => {
        filterByUser(value)
    }
    return (
        <ConfigProvider theme={{
            components: {
                Select: {
                    colorBorder: "#9199ad",
                    activeBorderColor: "rgb(0,115, 115)",
                    hoverBorderColor: "rgb(0,115, 115)",
                    optionActiveBg: "#e5f2f2",
                    optionSelectedBg: "#e5f2f2",
                    borderRadius: 4
                },

            }
        }}>
            <div style={{ margin: 5 }}>
                <h4 style={{ fontWeight: "normal" }}>General</h4>
                <Flex vertical gap={15}>
                    <Flex vertical gap={10}>
                        <label style={{ color: "#171a1f", fontWeight: 600 }}>Period</label>
                        <Select
                            defaultValue="5"
                            optionFilterProp="label"
                            options={period}
                            suffixIcon={<CaretDownOutlined style={{ fontSize: 12, color: "#758099" }} />}
                            onChange={handlePeriodCahnge}
                            dropdownStyle={{ border: "1px solid rgb(0,115, 115)" }}
                        />
                    </Flex>
                    <Flex vertical gap={10}>
                        <label style={{ color: "#171a1f", fontWeight: 600 }}>Publication</label>
                        <Select
                            mode="multiple"
                            allowClear
                            suffixIcon={false}
                            style={{ width: '100%' }}
                            placeholder="No values selected. Please select values from the list"
                            onChange={handleChange}
                            options={publications}
                            dropdownStyle={{ border: "1px solid rgb(0,115, 115)" }}
                        />
                    </Flex>  
                    <Flex vertical gap={10}>
                        <label style={{ color: "#171a1f", fontWeight: 600 }}>User</label>
                        <Select
                            mode="multiple"
                            allowClear
                            suffixIcon={false}
                            style={{ width: '100%' }}
                            placeholder="No values selected. Please select values from the list"
                            onChange={handleUserChange}
                            options={userData}
                            dropdownStyle={{ border: "1px solid rgb(0,115, 115)" }}
                        />
                    </Flex>                  
                </Flex>
            </div>
        </ConfigProvider>
    )
}

export default SidebarFilter;