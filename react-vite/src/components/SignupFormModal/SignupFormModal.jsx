import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup, thunkSignupChild } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal({ navigate, createStudent }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [age, setAge] = useState("");
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    let serverResponse;
    if (createStudent) {
      serverResponse = await dispatch(
        thunkSignupChild({
          age,
          first_name: firstName,
          last_name: lastName,
          email,
          username,
          password,
          level,
        }));
    } else {
      serverResponse = await dispatch(
        thunkSignup({
          age,
          first_name: firstName,
          last_name: lastName,
          email,
          username,
          password,
        }));
    }

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      if (navigate) navigate();
      closeModal();
    }
  };

  return (
    <div id="signup-modal"
      className="flex column gap-15 acenter">
      <div id="signup-form-logo"></div>
      {errors.server && <p className="error">{errors.server}</p>}
      <form id="signup-modal-form"
        className="flex column gap-10" onSubmit={handleSubmit}>
        <label>
          First name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.first_name && <p className="error">{errors.first_name}</p>}
        <label>
          Last name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.last_name && <p className="error">{errors.last_name}</p>}
        <label>
          Age
        </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {errors.age && <p className="error">{errors.age}</p>}
        {createStudent && <>
          <label>
            Grade level
          </label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
          {errors.level && <p className="error">{errors.level}</p>}
        </>}
        <label>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <label>
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button className="button aselfend" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
