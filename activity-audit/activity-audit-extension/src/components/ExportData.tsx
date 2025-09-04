import { PublishInfo } from 'src/model/types';
import { Workbook } from 'exceljs';
import { useState } from 'react';
import { useNotifications } from '@tridion-sites/extensions';
import { ExportOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';

interface IExportData {
    data: PublishInfo[];
    fileName: string
}

const ExportData = ({ data, fileName }: IExportData) => {
    const [downloadStatus, setDownloadStatus] = useState<boolean>(false);
    const notification = useNotifications();

    const exportToXsl = () => {
        setDownloadStatus(true)
        const workbook = new Workbook();
        const sheet = workbook.addWorksheet("Activity Audit");
        sheet.getRow(1).border = {
            top: { style: "medium", color: { argb: "007373" } },
            left: { style: "medium", color: { argb: "007373" } },
            bottom: { style: "medium", color: { argb: "000000" } },
            right: { style: "medium", color: { argb: "007373" } },
        };

        sheet.getRow(1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "007373" },
            Font: { bold: true, color: { argb: "FFFFFF" } }
        };
        sheet.getRow(1).font = {
            name: "Calibri",
            family: 4,
            size: 16,
            bold: true,
        };
        const allKeys = data.slice(0, 1).map(item => Object.keys(item)).flat()
        const columnOrder = ["title", "uri", "itemType", "status", "publicationTitle", "publicationId", "user", "month", "date", "userActivity"]
        const finalColumns = columnOrder.filter((col) => allKeys.includes(col)).concat(
            allKeys.filter((col) => !columnOrder.includes(col))
        );

        sheet.columns = finalColumns.map(item => {
            return {
                header: item === "month" ? "Quarterly" : item.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase(),
                key: item,
                width: 25
            }
        });
        data?.map((item) => {
            sheet.addRow({
                title: item?.title,
                month: item.month,
                uri: item?.uri,
                itemType: item?.itemType,
                status: item?.status,
                publicationTitle: item?.publicationTitle,
                publicationId: item?.publicationId,
                user: item?.user,
                date: item?.date,
                userActivity: item.userActivity
            });
        })
        try {
            workbook.xlsx.writeBuffer().then(function (data: BlobPart) {
                const blob = new Blob([data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = `${fileName}.xlsx`;
                anchor.click();
                window.URL.revokeObjectURL(url);
                setDownloadStatus(false)
                notification.notify({
                    title: "Export",
                    type: "success",
                    showInMessageCenter: true,
                    description: `"${fileName}.xlsx" Activity Audit details has been exported successfully!`
                })
            });
        } catch (error) {
            console.log(error)
            setDownloadStatus(false)
        }
    }
    return (
        <ConfigProvider theme={{
            components:{
                Button:{
                    defaultHoverBg:"#007373",
                    defaultHoverColor:"#ffffff",
                    textTextHoverColor:"#ffffff"
                }
            }
        }}>
            <Button style={{ padding: 10, border: "1px solid #eee", cursor: "pointer", borderRadius: 5, display: "flex", gap: 10 }} onClick={exportToXsl} disabled={downloadStatus}>
                <ExportOutlined size={24} />
                <span>Export To Excel</span>
            </Button>
        </ConfigProvider>
    )
}

export default ExportData