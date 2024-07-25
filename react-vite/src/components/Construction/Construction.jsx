import Header from "../LandingPage/Header";
import Footer from "../Footer";

export default function Construction() {
    return (
        <div className='flex column landing'>
            <div>
                <Header construction={true} />
            </div>
            <main className="flex column acenter minh100">
                <div>
                    <h1>Sorry! This is still under construction.</h1>
                    <h2>Please try something else.</h2>
                </div>
            </main>
            <Footer />
        </div >
    )
}
