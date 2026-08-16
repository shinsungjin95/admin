import {CustomListWrap, Table} from "@components/Table/style.tsx";
import {renderField} from "@components/Table/controller";
import Input from "../Input";

export const FormTable = (
    {
        fields,
        formData,
        handleFormChange,
    }
) => {
    return (
        <Table $type={"form"} className={"custom-table"}>
            <tbody>
            {fields.map((field: any, index: number) => (
                <tr key={index}>
                    <th>{field.name}</th>
                    <td>
                        {renderField({
                            field,
                            formData,
                            handleChange: handleFormChange,
                        })}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}




export const ListTable = ({
    columns,
    rows,
    renderCell,
    onRowClick = undefined,
    checkedList = [],
    onCheckedAll = undefined,
}) => {
    const hasCheckedColumn = columns.some(
        (col) => col.key === "checked"
    );

    const isAllChecked =
        rows?.length > 0 &&
        checkedList.length === rows.length;

    return (
        <Table $type={"list"}>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key} style={{width: col.width, textAlign: col.align || "center"}}>
                            {col.key === "checked" && hasCheckedColumn ? (
                                <Input
                                    inputType="checkbox"
                                    checked={isAllChecked}
                                    onChange={(e) => {
                                        onCheckedAll?.(e.target.checked);
                                    }}
                                />
                            ) : (
                                col.header
                            )}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows && rows.length > 0 ? (
                    rows.map((row, rowIndex) => (
                        <tr key={rowIndex}  onClick={() => onRowClick?.(row)} className={`${onRowClick ? "hover" : ""}`}>
                            {columns.map((col) => (
                                <td key={col.key} style={{textAlign: col.align || "center"}}
                                >
                                    {renderCell ? renderCell(row, rowIndex, col) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length}
                            style={{ textAlign: "center" }}
                        >
                            데이터가 없습니다
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};
export const CustomList = (({
        className,
        columns,
        rows,
        renderCell,
        onRowClick = undefined,
    }) => {
        return(
        <CustomListWrap className={className}>
            {rows && rows.length > 0 ? (
                <div className={"list-inner"}>
                    {
                    rows.map((row, rowIndex) => (
                        <div key={rowIndex} onClick={() => onRowClick?.(row)} className={`items ${onRowClick ? "hover" : null}`}>
                            {columns.map((col) => (
                                <div key={col.key} className={`${col.className ? col.className : ""}`}>
                                    {
                                        col.header && <>{col.header}: </>
                                    }
                                    {renderCell ? renderCell(row, rowIndex, col) : row[col.key]}
                                </div>
                            ))}
                        </div>
                    ))
                    }
                </div>
            ) : (
                <div>
                    데이터가 없습니다
                </div>
            )}
        </CustomListWrap>
    )
});



