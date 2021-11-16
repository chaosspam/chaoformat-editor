import { Table } from 'reactstrap';
import { LangFile } from '../types/langFile';
import LangTableRow from './LangTableRow';

interface LangTableProps {
    langFile: LangFile
}

function LangTable({langFile} : LangTableProps) {
    const rows = langFile.items.map((langItem, index) => <LangTableRow key={index} item={langItem} />);

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value From File</th>
                    <th>Edit Value</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

export default LangTable;
