import './Footer.css'

export default function Footer() {
    return (
        <footer className="flex between">
            <div className="flex gap-15">
                <div className="footer-logo"></div>
                <p className="link">about</p>
                <p className="link">team</p>
                <p className="link">help</p>
                <p className="link">contact us</p>
            </div>
            <div id='social-button-container' className='flex acenter'>
                <div><button className='button footer-button'>Github</button></div>
                <div><button className='button footer-button'>Linkedin</button></div>
            </div>
        </footer>
    )
}
