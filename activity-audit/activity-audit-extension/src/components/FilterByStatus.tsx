import { CaretDownOutlined } from "@ant-design/icons"
import { Button, Checkbox, Divider, Dropdown, Flex, MenuProps, Space, theme } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {  cloneElement } from "react";
import { FilterBy } from "src/model/types";

interface FilterByStatusProps{
    filterBy:FilterBy[],
    handleFilter:(e:CheckboxChangeEvent) => void;
    resetFilterBy:() => void;
}

const FilterByStatus = ({filterBy, handleFilter, resetFilterBy}:FilterByStatusProps) => {
    const { token } = theme.useToken();
    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        width: 200,
        border: "1px solid rgb(145, 153, 173)"
    };
    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
    };
    const items: MenuProps['items'] = filterBy.map(filterItem => {
        return {
            key: filterItem.key,
            label: (
                <Checkbox checked={filterItem.checked} onChange={handleFilter} value={filterItem.value}>
                    {filterItem.label}
                </Checkbox>
            ),
        }
    })
    return (
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
            <h4 style={{ marginLeft: "50px", color: "#171a1f", fontWeight: 400, fontSize: 16 }}>Publishing Activity</h4>
            <Flex gap={5} align="center" style={{marginRight:20}}>
                <label>Filter: </label>
                <Space direction="vertical">
                    <Space wrap>
                        <Dropdown 
                            trigger={['click']} 
                            menu={{                                
                                items,                                                                  
                            }} 
                            placement="bottomLeft" 
                            dropdownRender={(menu) => (
                            <div style={contentStyle}>
                                {cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                <Divider style={{ margin: 0 }} />
                                <Flex style={{ width: '100%', padding:8 }}>
                                    <Button type="default" block onClick={resetFilterBy}>Clear filter</Button>
                                </Flex>
                            </div>
                        )}>
                            <Button style={{ paddingLeft: 20, paddingRight: 20, borderRadius: "1rem", border: "1px solid rgb(117, 128, 153)", }} icon={<CaretDownOutlined />} iconPosition="end">
                                Status
                            </Button>
                        </Dropdown>
                    </Space>
                </Space>
            </Flex>
        </Flex>
    )
}

export default FilterByStatus