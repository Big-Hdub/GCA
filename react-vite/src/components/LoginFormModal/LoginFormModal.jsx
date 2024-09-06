import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal({ navigate }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password)
  };

  const login = async (email, password) => {
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      if (navigate) navigate();
      closeModal();
    }
  }

  return (
    <div id="login-modal"
      className="flex column gap-15 acenter">
      <div id="login-form-logo"></div>
      <form id="login-modal-form"
        className="flex column gap-10"
        onSubmit={handleSubmit}>
        <label>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button className="button aselfend" type="submit">Log In</button>
        <div id="demo-logins" className="flex wrap gap-15">
          <div className="flex gap-15">Log in as:<p className="link" onClick={() => login('demoAdmin@aa.io', 'password')}>demoAdmin</p></div>
          <div className="flex gap-15">Log in as:<p className="link" onClick={() => login('demoTeacher@aa.io', 'password')}>demoTeacher</p></div>
          <div className="flex gap-15">Log in as:<p className="link" onClick={() => login('demoParent@aa.io', 'password')}>demoParent</p></div>
          <div className="flex gap-15">Log in as:<p className="link" onClick={() => login('demoStudent@aa.io', 'password')}>demoStudent</p></div>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
