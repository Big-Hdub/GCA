import { useState } from 'react';

function FileUpload({ theme, session }) {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");

    const handleFileChange = (e) => {
        setFileUrl("")
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFileUrl("")
        setDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setFileName(droppedFile.name.split(' ').join('_'));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setFile(null)
        if (data.file_url) {
            setFileUrl(data.file_url);
            const response = await fetch(`/api/users/${session.id}/settings`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 'profile-image': data.file_url })
            });
            const imagedata = response.json();
            if (imagedata.ok) {
                return
            } else {
                console.error(imagedata.errors);
            }
        } else {
            console.error(data.error);
        }
    };

    return (
        <div className="file-upload-wrapper">
            <form onSubmit={handleSubmit} className="file-upload-form flex column gap-10">
                <div
                    className={`drop-zone ${theme} ${theme}1 ${dragging ? 'dragover' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    Drag & drop or click here to select image for profile.
                    <input
                        id="file-input"
                        type="file"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    {!fileUrl && <>
                        {fileName && <p>{fileName} selected</p>}
                    </>
                    }
                </div>
                {!fileUrl && <>
                    <button className="button aselfend"
                        disabled={!file ? true : false}
                        type="submit">Upload</button>
                </>
                }
                {fileUrl && <p>Uploaded File: {fileName}</p>}
            </form>
        </div>
        // <div className='flex gap-15'>
        //     <form onSubmit={handleSubmit} className='flex gap-15 acenter'>
        //         <input type="file" onChange={handleFileChange} className={`${theme}1 custom-button`} />
        //         {!fileUrl && <button className='button' type="submit">Upload</button>}
        //         {fileUrl && <p>Uploaded File</p>}
        //     </form>
        // </div>
    );
}

export default FileUpload;
