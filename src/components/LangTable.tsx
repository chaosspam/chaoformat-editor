import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { LangFile, LangObject } from '../types/langFile';
import LangTableRow from './LangTableRow';

interface LangTableProps {
    langFile: LangFile
}

function LangTable({langFile} : LangTableProps) {
    const [editedFile, setEditedFile] = useState<Array<LangObject>>([]);
    useEffect(() => {
        setEditedFile(Array.from(langFile.items));
    }, [langFile]);
    const updateEditedItems = (index : number, event : React.ChangeEvent<HTMLInputElement>) => {
        // really silly way to do a deep clone of array of objects
        const copy = JSON.parse(JSON.stringify(editedFile));
        copy[index].value = event.target.value;
        setEditedFile(copy);
    };

    const rows = editedFile.map(
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
