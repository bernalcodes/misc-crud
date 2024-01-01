import { useEffect } from "react";
import CreateForm from "../components/CreateForm";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import notesStore from "../stores/notesStore";

export default function NotesPage() {
	// store
	const store = notesStore();

	// useEffect
	useEffect(() => {
		store.fetchNotes();
	});

	return (
		<div>
			<CreateForm />
			<Notes />
			<UpdateForm />
		</div>
	);
}
