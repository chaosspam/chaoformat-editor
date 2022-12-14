import React from 'react';
import { Table } from 'reactstrap';
import { LangFile } from '../types/langFile';
import LangTableRow from './LangTableRow';

interface LangTableProps {
    langFile: LangFile,
    editedFile: LangFile,
    updateEditedItems: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

function LangTable({langFile, editedFile, updateEditedItems} : LangTableProps) {
    // Sort keys
    const rows = Object.keys(editedFile).sort().map(
        (itemKey, index) => <LangTableRow key={index} itemKey={itemKey}
                                originalValue={langFile[itemKey]}
                                editedValue={editedFile[itemKey]}
                                onChangeValue={event => updateEditedItems(itemKey, event)} />
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
