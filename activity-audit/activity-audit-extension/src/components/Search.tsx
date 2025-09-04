import { SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, Flex, Input } from "antd"
import { ChangeEvent } from "react";

interface ISearch{
    handleSearch:(e:ChangeEvent<HTMLInputElement>) => void;
}
const Search = ({handleSearch}:ISearch) => {
    return(
        <ConfigProvider theme={{
            components: {
                Input: {
                    colorBorder: "#9199ad",
                    activeBorderColor: "rgb(0,115, 115)",
                    hoverBorderColor: "rgb(0,115, 115)",
                    borderRadius: 4
                },

            }
        }}>
        <Flex align="center" justify="center">
            <Input 
                onChange={handleSearch}
                type="search" 
                style={{width:"300px"}} 
                placeholder="Search by Title"
                suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
        </Flex>
        </ConfigProvider>
    )
}

export default Search