import "./App.css";
import { useState } from "react";
import AddEntry from "./components/AddEntry";

function App() {
  const [data, setData] = useState([]);
  const [showJSON, setShowJSON] = useState(false);

  const addEntry = (newEntry, parentKey) => {
    if (!parentKey) {
      setData((prev) => [...prev, newEntry]);
    } else {
      const addToChildren = (items) =>
        items.map((item) =>
          item.key === parentKey
            ? { ...item, children: [...item.children, newEntry] }
            : { ...item, children: addToChildren(item.children) }
        );
      setData((prev) => addToChildren(prev));
    }
  };

  const deleteEntry = (key) => {
    const deleteRecursive = (items) =>
      items
        .filter((item) => item.key !== key)
        .map((item) => ({
          ...item,
          children: deleteRecursive(item.children),
        }));
    setData((prev) => deleteRecursive(prev));
  };

  const editEntry = (key, newKey, newValue) => {
    const editRecursive = (items) =>
      items.map((item) =>
        item.key === key
          ? { ...item, key: newKey, value: newValue }
          : { ...item, children: editRecursive(item.children) }
      );

    setData((prev) => editRecursive(prev));
  };

  const displayData = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.key} style={{ marginLeft: `${level * 15}px` }}>
        <div className="flex items-center gap-4">
          <p>
            {item.key}: {item.value}
          </p>
          <AddEntry
            parentKey={item.key}
            onAdd={addEntry}
            onDelete={deleteEntry}
            onEdit={editEntry}
          />
        </div>
        {item.children && displayData(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="container">
      {displayData(data)}
      <div className="entry">
        <AddEntry parentKey={null} onAdd={addEntry} />
      </div>
      <button className="mt-4" onClick={() => setShowJSON((prev) => !prev)}>
        {showJSON ? "Hide JSON" : "Show JSON"}
      </button>
      {showJSON && (
        <pre className="json-container">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
