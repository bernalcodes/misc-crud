import axios from "axios";
import { create } from "zustand";

const notesStore = create((set) => ({
	notes: null,
	createForm: {
		title: "",
		body: "",
	},
	updateForm: {
		_id: null,
		title: "",
		body: "",
	},
	fetchNotes: async () => {
		// fetch notes
		const res = await axios.get("http://localhost:3000/notes");

		// set to state
		set({ notes: res.data.notes });
	},
	updateCreateFormField: (e) => {
		const { id, value } = e.target;
		set((state) => {
			return {
				createForm: {
					...state.createForm,
					[id]: value,
				},
			};
		});
	},
	createNote: async (e) => {
		// avoid reload
		e.preventDefault();

		// create note
		const { createForm, notes } = notesStore.getState();
		const res = await axios.post("http://localhost:3000/notes", createForm);

		set({
			notes: [...notes, res.data.note],
			createForm: {
				title: "",
				body: "",
			},
		});
	},
	handleUpdateFieldChange: (e) => {
		const { value, id } = e.target;

		set((state) => {
			return {
				updateForm: {
					...state.updateForm,
					[id]: value,
				},
				[id]: value,
			};
		});
	},
	toggleUpdate: async ({ _id, title, body }) => {
		// set state on update form
		set({
			updateForm: {
				_id,
				title,
				body,
			},
		});
	},
	updateNote: async (e) => {
		// avoid reload
		e.preventDefault();

		const {
			updateForm: { title, body, _id },
			notes,
		} = notesStore.getState();

		// send the updated note
		const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
			title,
			body,
		});

		// update state
		const newNotes = [...notes];

		const idx = notes.findIndex((note) => {
			return note._id === _id;
		});

		newNotes[idx] = res.data.note;

		set({
			notes: newNotes,
			updateForm: {
				_id: null,
				title: "",
				body: "",
			},
		});
	},
	deleteNote: async (_id) => {
		// delete note
		const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
		const { notes } = notesStore.getState();

		// update state
		const newNotes = notes.filter((note) => {
			return note._id !== _id;
		});
		set({ notes: newNotes });
	},
}));

export default notesStore;
