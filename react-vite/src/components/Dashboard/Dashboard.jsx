import { useNavigate } from "react-router-dom";
import Header from "../LandingPage/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Footer from "../Footer";


export default function Dashboard() {
    const sessionUser = useSelector((store) => store.session.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
        }
    })
    return (
        <div className='flex column'>
            <Header main={true} />
            <main className="flex column minh100">
                <h1>Dashboard</h1>
            </main>
            <Footer />
        </div>
    )
}
