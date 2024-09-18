import Footer from "../Footer";

export default function Construction({ error }) {
    return (
        <div className='flex column landing'>
            <div className="flex column">
                <h1 id="landing-header" className="aselfcenter mtop-80">Welcome to Garden City Academy</h1>
            </div>
            <main className="flex column mtop-229 acenter minh100">
                <div>
                    {error ? <h1>{error}</h1> : <h1>Sorry! This is still under construction.</h1>}
                    <h2>Please try something else.</h2>
                </div>
            </main>
            <Footer landing={true} />
        </div >
    )
}
