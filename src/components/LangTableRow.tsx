import { Input } from "reactstrap";

interface LangTableProps {
    itemKey: string,
    originalValue: string,
    editedValue: string,
    onChangeValue: React.ChangeEventHandler<HTMLInputElement>
}

function LangTableRow({itemKey, originalValue, editedValue, onChangeValue} : LangTableProps) {
    return (
        <tr>
            <td><code>{itemKey}</code></td>
            <td>{originalValue}</td>
            <td>
                <Input type="textarea" value={editedValue} onChange={onChangeValue} />
            </td>
        </tr>
    );
}

export default LangTableRow;
