import axios from "axios";
import { useEffect, useState } from "react";

function App() {
	// state
	const [notes, setNotes] = useState(null);
	const [createForm, setCreateFrom] = useState({
		title: "",
		body: "",
	});
	const [updateForm, setUpdateForm] = useState({
		_id: null,
		title: "",
		body: "",
	});

	// useEffect
	useEffect(() => {
		fetchNotes();
	}, []);

	// functions
	const fetchNotes = async () => {
		// fetch notes
		const res = await axios.get("http://localhost:3000/notes");

		// set to state
		setNotes(res.data.notes);
		console.log(res);
	};

	const updateCreateFormField = (e) => {
		const { id, value } = e.target;
		setCreateFrom({ ...createForm, [id]: value });
	};

	const createNote = async (e) => {
		// avoid reload
		e.preventDefault();

		// create note
		const res = await axios.post("http://localhost:3000/notes", createForm);

		// update state
		setNotes([...notes, res.data.note]);

		// clear form state
		setCreateFrom({
			title: "",
			body: "",
		});
	};

	const handleUpdateFieldChange = (e) => {
		const { value, id } = e.target;

		setUpdateForm({
			...updateForm,
			[id]: value,
		});
	};

	const toggleUpdate = async (note) => {
		// set state on update form
		setUpdateForm({ _id: note._id, title: note.title, body: note.body });
	};

	const updateNote = async (e) => {
		// avoid reload
		e.preventDefault();

		const { title, body } = updateForm;

		// send the updated note
		const res = await axios.put(
			`http://localhost:3000/notes/${updateForm._id}`,
			{ title, body }
		);

		// update state
		const newNotes = [...notes];

		const idx = notes.findIndex((note) => {
			return note._id === updateForm._id;
		});

		newNotes[idx] = res.data.note;

		setNotes(newNotes);

		// clear update form state
		setUpdateForm({
			_id: null,
			title: "",
			body: "",
		});
	};

	const deleteNote = async (_id) => {
		// delte note
		const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
		console.log(res);

		// update state
		const newNotes = [...notes].filter((note) => {
			return note._id !== _id;
		});
		setNotes(newNotes);
	};

	return (
		<div className="App">
			{!updateForm._id && (
				<div>
					<h2>Create note</h2>
					<form onSubmit={createNote}>
						<label htmlFor="title">Note title:</label>
						<input
							id="title"
							type="text"
							onChange={updateCreateFormField}
							value={createForm.title}
						></input>
						<label htmlFor="body">Note body:</label>
						<textarea
							id="body"
							type="text"
							onChange={updateCreateFormField}
							value={createForm.body}
						></textarea>
						<button type="submit">Add note</button>
					</form>
				</div>
			)}

			<div>
				<h2>Notes:</h2>
				{notes &&
					notes.map((note) => {
						return (
							<div key={note._id}>
								<h3>{note.title}</h3>
								<p>{note.body}</p>
								<button onClick={() => toggleUpdate(note)}>
									Update note
								</button>
								<button onClick={() => deleteNote(note._id)}>
									Delete note
								</button>
							</div>
						);
					})}
			</div>

			{updateForm._id && (
				<div>
					<h2>Update note</h2>
					<form onSubmit={updateNote}>
						<label htmlFor="title">Note title:</label>
						<input
							id="title"
							type="text"
							onChange={handleUpdateFieldChange}
							value={updateForm.title}
						></input>
						<label htmlFor="body">Note body:</label>
						<textarea
							id="body"
							type="text"
							onChange={handleUpdateFieldChange}
							value={updateForm.body}
						></textarea>
						<button type="submit">Update note</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default App;
