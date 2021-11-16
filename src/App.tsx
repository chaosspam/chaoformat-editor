import { useState } from 'react';
import { Container } from 'reactstrap';

import FileUploader from './components/FileUploader';
import { LangFile, LangObject } from './types/langFile';

function App() {
    const [langFile, setLangFile] = useState<LangFile>({items: new Array<LangObject>()});
    const [isFileInvalid, setIsFileInvalid] = useState(false);

    const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = event => {
        setIsFileInvalid(false);
        const fileReader = new FileReader();
        fileReader.onloadend = _ => {
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
            <FileUploader onChangeFile={onChangeFile} isFileInvalid={isFileInvalid} />
        </Container>
    );
}

export default App;
