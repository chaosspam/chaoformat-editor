import React from 'react';
import { Input } from 'reactstrap';

interface FileUploaderProps {
    onChangeFile: React.ChangeEventHandler<HTMLInputElement>,
    isFileInvalid: boolean
}

function FileUploader({onChangeFile, isFileInvalid} : FileUploaderProps) {
    return (
        <Input type="file"
            accept="application/json"
            invalid={isFileInvalid}
            onChange={onChangeFile} />
    );
}

export default FileUploader;
