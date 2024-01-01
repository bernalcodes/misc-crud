import axios from "axios";
import { create } from "zustand";

const authStore = create((set) => ({
	loggedIn: null,
	loginForm: {
		email: "",
		password: "",
	},
	signupForm: {
		email: "",
		password: "",
	},
	updateLoginForm: (e) => {
		const { id, value } = e.target;

		set((state) => {
			return {
				loginForm: {
					...state.loginForm,
					[id]: value,
				},
			};
		});
	},
	updateSignupForm: (e) => {
		const { id, value } = e.target;

		set((state) => {
			return {
				signupForm: {
					...state.signupForm,
					[id]: value,
				},
			};
		});
	},
	login: async () => {
		try {
			const { loginForm } = authStore.getState();

			const res = await axios.post("/login", loginForm);

			set({ loggedIn: true, loginForm: { email: "", password: "" } });

			console.log(res);
		} catch (error) {
			console.log(error.response);
		}
	},
	checkAuth: async () => {
		try {
			await axios.get("/check-auth");
			set({ loggedIn: true });
		} catch (error) {
			set({ loggedIn: false });
		}
	},
	signup: () => {
		try {
			const { signupForm } = authStore.getState();

			const res = axios.post("/signup", signupForm);

			set({ signupForm: { email: "", password: "" } });

			console.log(res);
		} catch (error) {
			console.log(error.response);
		}
	},
	logout: async () => {
		await axios.get("/logout");
		set({ loggedIn: false });
	},
}));

export default authStore;
