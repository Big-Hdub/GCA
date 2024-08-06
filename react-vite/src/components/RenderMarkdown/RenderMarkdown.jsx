import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

export default function RenderMarkdown({ text }) {
    return <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{text}</ReactMarkdown>
}
