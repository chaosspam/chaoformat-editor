export function saveFile(text: string, fileName: string, contentType: string) {
    const blob = new Blob([text], {type: contentType});
    const aTag = document.createElement('a');
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
};
