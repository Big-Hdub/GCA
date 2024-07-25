import Section1 from "./Section1"
import Section2 from "./Section2"
import Section3 from "./Section3"
import Section4 from "./Section4"
import Section5 from "./Section5"
import Header from "./Header"
import Footer from "../Footer"
import './Landing.css'


export default function LandingPage() {

    return (
        <div className='flex column landing'>
            <Header />
            <main className="flex column">
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Footer />
            </main>
        </div>
    )
}
