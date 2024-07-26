import { useSelector } from "react-redux"
import Section1 from "./Section1"
import Section2 from "./Section2"
import Section3 from "./Section3"
import Section4 from "./Section4"
import Section5 from "./Section5"
import Header from "./Header"
import Footer from "../Footer"
import './Landing.css'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function LandingPage() {
    const sessionUser = useSelector((store) => store.session.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionUser) {
            navigate('/dashboard');
        }
    })

    return (<>
        {!sessionUser && <div className='flex column landing'>
            <Header />
            <main className="flex column">
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Footer landing={true} />
            </main>
        </div>}
    </>
    )
}
