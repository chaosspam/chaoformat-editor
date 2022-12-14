import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, FormGroup, Input, Label } from 'reactstrap';

import FileUploader from './FileUploader';
import LangTable from './LangTable';
import { LangFile } from '../types/langFile';
import { saveFile } from '../util/util';

function Editor() {
    const [langFile, setLangFile] = useState<LangFile>({});
    const [editedFile, setEditedFile] = useState<LangFile>(langFile);
    const [usePrettyPrint, setUsePrettyPrint] = useState(false);
    const [isFileInvalid, setIsFileInvalid] = useState(false);

    useEffect(() => {
        setEditedFile(langFile);
    }, [langFile]);

    const updateEditedItems = (id : string, event : React.ChangeEvent<HTMLInputElement>) => {
        // really silly way to do a deep clone of array of objects
        const copy = JSON.parse(JSON.stringify(editedFile));
        copy[id] = event.target.value;
        setEditedFile(copy);
    };

    const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = event => {
        setIsFileInvalid(false);
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const content = fileReader.result as string;
            try {
                const parsed = JSON.parse(content);
                // just checking if each key maps to a string
                let invalidStructure = false;
                for(const key in parsed) {
                    if(typeof parsed[key] !== "string") {
                        invalidStructure = true;
                        break;
                    }
                }
                if (!invalidStructure) {
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

    // The keys in an object is technically unsorted but I thought it would be nice to just sort it on export
    const saveEditedFile =
        () => saveFile(JSON.stringify(editedFile, Object.keys(editedFile).sort(), usePrettyPrint ? 2 : undefined), 'content-edited.json', 'application/json');

    return (
        <>
            <h1 className="mb-4">ChaoFormat Language File Editor</h1>
            <Form>
                <Row>
                    <Col sm="9">
                        <FileUploader onChangeFile={onChangeFile} isFileInvalid={isFileInvalid} />
                    </Col>
                    <Col>
                        <Button color="success" block onClick={(saveEditedFile)}>Save Changes</Button>
                    </Col>
                    <Col>
                        <FormGroup check>
                            <Input
                                id="prettyPrintCheckbox"
                                name="pretty print checkbox"
                                type="checkbox"
                                onChange={e => setUsePrettyPrint(e.currentTarget.checked)}
                            />
                            <Label
                                check
                                for="prettyPrintCheckbox"
                            >
                            Pretty Print
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <LangTable langFile={langFile} editedFile={editedFile}
                updateEditedItems={updateEditedItems} />
        </>
    );
}

export default Editor;
