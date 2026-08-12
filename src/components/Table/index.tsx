import {Table} from "@components/Table/style.tsx";
import {renderField} from "@components/Table/controller";

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
                          }) => {
    return(
        <Table $type={"list"}>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.key} style={{width: col.width, textAlign: col.align || "center"}}>
                        {col.header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows && rows.length ? (
                rows.map((row, rowIndex) => (
                    <tr key={rowIndex} onClick={() => onRowClick?.(row)} className={`${onRowClick ? "hover" : null}`}>
                        {columns.map((col) => (
                            <td key={col.key} style={{textAlign: col.align || "center"}}>
                                {renderCell ? renderCell(row, rowIndex, col) : row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length} style={{textAlign: "center"}}>
                        데이터가 없습니다
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    )
}



