import { Flex } from "antd";

interface ITooltip{
    name:string;
    payload:IPayload[];
    value:number;
}

interface IPayload{
    Published:number;
    Draft:number;
    Created:number;
    Updated:number;
    Deleted:number;
    UnPublished:number;
}
export const BarTooltip = (props: any) => {
    const {active, payload, label} = props
    if (!active) {
        return null
    }

    const TotalValue = (payload:IPayload[]) => {
        const result = payload.reduce((acc, item:any) => {
            if (item.name === "Published" || item.name === "Draft" || item.name === "Created" || item.name === "Updated" || item.name === "Deleted" || item.name === "UnPublished") {
              return acc + item.value;
            }
            return acc;
          }, 0);
          return result
    }
    return (
        <Flex vertical style={{ border: "1px solid #333", background: "#fff", padding: 10, borderRadius:10 }} gap={5}>
            <h4 style={{ margin: 0 }}>{label}</h4>
            <div style={{fontWeight:"bold"}}>Total: {TotalValue(payload)}</div>
            <div>
                {
                    payload?.map((item:any) => {
                        return(
                            <Flex align="center" gap={5} key={item.name}>
                                <div style={{ width: 10, height: 10, background: item?.fill }}></div>
                                <Flex align="center" gap={5}>
                                    <span>{item?.name}</span>:<span>{item?.value}</span>
                                </Flex>
                            </Flex>
                        )
                    })
                }
            </div>
        </Flex>
    )
};