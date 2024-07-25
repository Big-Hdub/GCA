import LoginFormModal from "../LoginFormModal"
import OpenModalMenuItem from "../ProfileButton/OpenModalMenuItem"
import SignupFormModal from "../SignupFormModal"

export default function Section2() {
    return (
        <div id="auth-container" className="flex column gap-15 acenter">
            <div className="flex gap-15">
                <p>Already a farmer?</p>
                <div className="flex column gap-15">
                    <OpenModalMenuItem
                        main={true}
                        itemText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                </div>
            </div>
            <div className="flex gap-15">
                <p>Want to become a farmer?</p>
                <div className="flex column gap-15">
                    <OpenModalMenuItem
                        main={true}
                        itemText="Sign up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            </div>
        </div>
    )
}
