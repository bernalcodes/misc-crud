import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

export default function LoginForm() {
	const store = authStore();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		await store.login();

		// navigate
		navigate("/");
	};

	return (
		<form onSubmit={handleLogin}>
			<label htmlFor="email">Email</label>
			<input
				onChange={store.updateLoginForm}
				value={store.loginForm.email}
				id="email"
				type="email"
			/>
			<label htmlFor="password">Password</label>
			<input
				onChange={store.updateLoginForm}
				value={store.loginForm.password}
				id="password"
				type="password"
			/>
			<button type="submit">Login</button>
		</form>
	);
}
