import ProfileButton from "../ProfileButton"

export default function Header() {
    return (<>
        <header className='flex w100 between acenter'>
            <div><img src="/logo.png" /></div>
            <h1 id="landing-header">Welcome to Garden City Academy</h1>
            <ProfileButton />
        </header>
    </>
    )
}
