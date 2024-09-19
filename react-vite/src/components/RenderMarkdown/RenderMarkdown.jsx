import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


export default function RenderMarkdown({ text }) {

    const WordViewer = ({ fileUrl }) => {
        const googleViewerUrl = `https://docs.google.com/gview?url=${fileUrl}&embedded=true`;
        return (
            <iframe
                src={googleViewerUrl}
                style={{ width: '100%', height: '500px' }}
                frameBorder="0"
            />
        );
    };

    const PDFRenderer = ({ fileUrl }) => {
        return (
            <div style={{ height: '500px' }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={fileUrl} />
                </Worker>
            </div>
        );
    };

    const CustomFileRenderer = ({ href }) => {
        if (href.includes('.pdf')) {
            return <PDFRenderer fileUrl={href} />;
        } else if (href.includes('.doc') || href.includes('.docx')) {
            return <WordViewer fileUrl={href} />;
        }
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {href}
            </a>
        );
    };

    return <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
            a: CustomFileRenderer,
        }}
    >
        {text}
    </ReactMarkdown>
}
