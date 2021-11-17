import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';

import FileUploader from './FileUploader';
import LangTable from './LangTable';
import { LangFile } from '../types/langFile';
import { saveFile } from '../util/util';

function Editor() {
    const [langFile, setLangFile] = useState<LangFile>({items: []});
    const [editedFile, setEditedFile] = useState<LangFile>(langFile);
    const [isFileInvalid, setIsFileInvalid] = useState(false);

    useEffect(() => {
        setEditedFile(langFile);
    }, [langFile]);

    const updateEditedItems = (index : number, event : React.ChangeEvent<HTMLInputElement>) => {
        // really silly way to do a deep clone of array of objects
        const copy = JSON.parse(JSON.stringify(editedFile));
        copy.items[index].value = event.target.value;
        setEditedFile(copy);
    };

    const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = event => {
        setIsFileInvalid(false);
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const content = fileReader.result as string;
            try {
                const parsed = JSON.parse(content);
                if (Object.keys(parsed).includes('items')) {
                    setLangFile(parsed);
                } else {
                    setIsFileInvalid(true);
                }
            } catch (err) {
                setIsFileInvalid(true);
                console.error(err);
            }
        }
        if (event.target.files != null) {
            fileReader.readAsText(event.target.files[0]);
        }
    };

    const saveEditedFile =
        () => saveFile(JSON.stringify(editedFile), 'content-edited.json', 'application/json');

    return (
        <>
            <h1 className="mb-4">ChaoFormat Language File Editor</h1>
            <Row>
                <Col sm="10">
                    <FileUploader onChangeFile={onChangeFile} isFileInvalid={isFileInvalid} />
                </Col>
                <Col>
                    <Button color="success" block onClick={(saveEditedFile)}>Save Changes</Button>
                </Col>
            </Row>
            <LangTable langFile={langFile} editedFile={editedFile}
                updateEditedItems={updateEditedItems} />
        </>
    );
}

export default Editor;
