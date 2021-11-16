import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { LangObject } from "../types/langFile";

interface LangTableProps {
    item: LangObject
}

function LangTableRow({item} : LangTableProps) {
    const [itemValue, setItemValue] = useState(item.value);
    useEffect(() => {
        setItemValue(item.value);
    }, [item]);

    return (
        <tr>
            <td><code>{item.key}</code></td>
            <td>{item.value}</td>
            <td>
                <Input type="textarea" value={itemValue} />
            </td>
        </tr>
    );
}

export default LangTableRow;
