const AddEditNotes = () => {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>

                <input
                    type="text"
                    placeholder="Go to Gym"
                    className="text-2xl text-slate-950 outline-none"
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    placeholder="Content"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    rows={10}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
            </div>

            <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>ADD</button>
        </div>
    )
}

export default AddEditNotes;