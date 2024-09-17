import { useState } from 'react';

function FileUpload({ theme }) {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
        if (data.file_url) {
            setFileUrl(data.file_url);
        } else {
            console.error(data.error);
        }
    };

    return (
        <div className='flex gap-15'>
            <form onSubmit={handleSubmit} className='flex gap-15 acenter'>
                <input type="file" onChange={handleFileChange} className={`${theme}1 custom-button`} />
                {!fileUrl && <button className='button' type="submit">Upload</button>}
                {fileUrl && <p>Uploaded File</p>}
            </form>
        </div>
    );
}

export default FileUpload;
