import axios from "axios";
import { useEffect, useState } from "react";
import notesStore from "../stores/notesStore.js";
import Notes from "./Notes.js";
import UpdateForm from "./UpdateForm.js";
import CreateForm from "./CreateForm.js";

function App() {
	// store
	const store = notesStore();

	// useEffect
	useEffect(() => {
		store.fetchNotes();
	}, []);

	return (
		<div className="App">
			<CreateForm />
			<Notes />
			<UpdateForm />
		</div>
	);
}

export default App;
