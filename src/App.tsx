import { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

import FileUploader from './components/FileUploader';
import LangTable from './components/LangTable';
import { LangFile, LangObject } from './types/langFile';

function App() {
    const [langFile, setLangFile] = useState<LangFile>({items: []});
    const [isFileInvalid, setIsFileInvalid] = useState(false);

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

    return (
        <Container fluid className="mt-2">
            <h1 className="mb-4">ChaoFormat Language File Editor</h1>
            <Row>
                <Col sm="10">
                    <FileUploader onChangeFile={onChangeFile} isFileInvalid={isFileInvalid} />
                </Col>
                <Col>
                    <Button color="success" block>Save Changes</Button>
                </Col>
            </Row>
            <LangTable langFile={langFile} />
        </Container>
    );
}

export default App;
