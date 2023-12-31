import notesStore from "../stores/notesStore";

export default function UpdateForm() {
	const store = notesStore();
	if (!store.updateForm._id) return <></>;
	return (
		<div>
			<h2>Update note</h2>
			<form onSubmit={store.updateNote}>
				<label htmlFor="title">Note title:</label>
				<input
					id="title"
					type="text"
					onChange={store.handleUpdateFieldChange}
					value={store.updateForm.title}
				></input>
				<label htmlFor="body">Note body:</label>
				<textarea
					id="body"
					type="text"
					onChange={store.handleUpdateFieldChange}
					value={store.updateForm.body}
				></textarea>
				<button type="submit">Update note</button>
			</form>
		</div>
	);
}
