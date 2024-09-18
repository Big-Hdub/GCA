import { setUser } from '../../redux/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function FileUpload({ theme, session }) {
    const [fileName, setFileName] = useState("No file chosen");
    const [dragging, setDragging] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

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
            const imagedata = await response.json();
            if (response.ok) {
                return dispatch(setUser(imagedata))
            } else {
                console.error(imagedata);
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
                {fileUrl && <p>File uploaded successfully</p>}
            </form>
        </div>
    );
}

export default FileUpload;
