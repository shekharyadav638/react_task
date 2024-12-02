import { useState } from "react";

function AddEntry({ parentKey, onAdd, onDelete, onEdit }) {
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const handleAdd = () => {
    if (keyInput.trim() && valueInput.trim()) {
      onAdd({ key: keyInput, value: valueInput, children: [] }, parentKey);
      setKeyInput("");
      setValueInput("");
    } else {
      alert("Please fill both key and value fields.");
    }
  };

  const handleDelete = () => {
    onDelete(parentKey);
  };

  const handleEdit = ({ parentKey, newKey, newValue }) => {
    onEdit(parentKey, newKey, newValue);
  };

  return (
    <div className="add-entry flex items-center gap-2 mt-2">
      <input
        className="input-key bg-white p-1 border rounded text-black"
        type="text"
        placeholder="Key"
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
      />
      <input
        className="input-value bg-white p-1 border rounded text-black"
        type="text"
        placeholder="Value"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
      />
      <button
        className="add-button p-1 bg-blue-500 text-white rounded"
        onClick={handleAdd}
      >
        {parentKey ? "Add Child" : "Add Parent"}
      </button>
      {parentKey && (
        <div>
          <button
            className="add-button p-1 bg-red-500 text-white rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="add-button ml-2 p-1 bg-green-500 text-white rounded"
            onClick={() => {
              const newKey = prompt("Enter new key:", parentKey);
              const newValue = prompt("Enter new value:", parentKey);
              if (newKey && newValue)
                handleEdit({ parentKey, newKey, newValue });
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default AddEntry;
