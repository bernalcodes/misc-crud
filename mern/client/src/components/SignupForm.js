import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

export default function SignupForm() {
	const store = authStore();
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		await store.signup();

		// navigate
		navigate("/login");
	};

	return (
		<form onSubmit={handleSignup}>
			<label htmlFor="email">Email</label>
			<input
				onChange={store.updateSignupForm}
				value={store.signupForm.email}
				id="email"
				type="email"
			/>
			<label htmlFor="password">Password</label>
			<input
				onChange={store.updateSignupForm}
				value={store.signupForm.password}
				id="password"
				type="password"
			/>
			<button type="submit">Signup</button>
		</form>
	);
}
