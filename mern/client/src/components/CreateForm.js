import notesStore from "../stores/notesStore";

export default function CreateForm() {
	const store = notesStore();
	if (store.updateForm._id) return <></>;
	return (
		<div>
			<h2>Create note</h2>
			<form onSubmit={store.createNote}>
				<label htmlFor="title">Note title:</label>
				<input
					id="title"
					type="text"
					onChange={store.updateCreateFormField}
					value={store.createForm.title}
				></input>
				<label htmlFor="body">Note body:</label>
				<textarea
					id="body"
					type="text"
					onChange={store.updateCreateFormField}
					value={store.createForm.body}
				></textarea>
				<button type="submit">Add note</button>
			</form>
		</div>
	);
}
