import React from 'react';
import { Table } from 'reactstrap';
import { LangFile } from '../types/langFile';
import LangTableRow from './LangTableRow';

interface LangTableProps {
    langFile: LangFile,
    editedFile: LangFile,
    updateEditedItems: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void
}

function LangTable({langFile, editedFile, updateEditedItems} : LangTableProps) {

    const rows = editedFile.items.map(
        (langItem, index) => <LangTableRow key={index} itemKey={langItem.key}
                                originalValue={langFile.items[index].value}
                                editedValue={langItem.value}
                                onChangeValue={event => updateEditedItems(index, event)} />
    );

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
