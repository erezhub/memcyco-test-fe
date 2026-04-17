// @ts-ignore
export default function ConfirmDialog({ open, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div className="modal">
            <p>Are you sure?</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    );
}
