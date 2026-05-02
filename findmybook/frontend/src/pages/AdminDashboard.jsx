import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminGet, adminPost, adminPut } from "../api/adminApi";
import "../styles/admin.css";



function AdminDashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    callNumberFull: "",
    classLetters: "",
    classNumber: "",
    cutter1: "",
    cutter2: "",
    publicationYear: "",
    status: "AVAILABLE",
  });

  const [shelf, setShelf] = useState({
    id: "",
    floorName: "",
    mapX: "",
    mapY: "",
    mapWidth: "",
    mapHeight: "",
    accessNodeId: "",
    rangeStart: "",
    rangeEnd: "",
  });

  const [editShelfId, setEditShelfId] = useState("");

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/");
  }

  function updateBookField(field, value) {
    setBook({ ...book, [field]: value });
  }

  function updateShelfField(field, value) {
    setShelf({ ...shelf, [field]: value });
  }

  function resetShelfForm() {
    setShelf({
      id: "",
      floorName: "",
      mapX: "",
      mapY: "",
      mapWidth: "",
      mapHeight: "",
      accessNodeId: "",
      rangeStart: "",
      rangeEnd: "",
    });
    setEditShelfId("");
  }

  async function handleCreateBook(e) {
    e.preventDefault();
    setMessage("");

    try {
      const newBook = {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        callNumberFull: book.callNumberFull,
        classLetters: book.classLetters,
        classNumber: Number(book.classNumber),
        cutter1: book.cutter1,
        cutter2: book.cutter2,
        publicationYear: book.publicationYear ? Number(book.publicationYear) : null,
        status: book.status,
      };

      await adminPost("/books", newBook);

      setMessage("Book created successfully.");

      setBook({
        title: "",
        author: "",
        isbn: "",
        callNumberFull: "",
        classLetters: "",
        classNumber: "",
        cutter1: "",
        cutter2: "",
        publicationYear: "",
        status: "AVAILABLE",
      });
    } catch (err) {
      setMessage("Failed to create book. Please check the book fields.");
    }
  }

  async function handleCreateShelf(e) {
    e.preventDefault();
    setMessage("");

    try {
      const newShelf = {
        id: shelf.id,
        floorName: shelf.floorName,
        mapX: Number(shelf.mapX),
        mapY: Number(shelf.mapY),
        mapWidth: Number(shelf.mapWidth),
        mapHeight: Number(shelf.mapHeight),
        accessNodeId: shelf.accessNodeId,
        rangeStart: shelf.rangeStart,
        rangeEnd: shelf.rangeEnd,
      };

      await adminPost("/shelves", newShelf);

      setMessage("Shelf created successfully.");
      resetShelfForm();
    } catch (err) {
      setMessage("Failed to create shelf. Check all shelf fields.");
    }
  }

  async function handleLoadShelf() {
    setMessage("");

    if (!editShelfId) {
      setMessage("Enter a shelf ID to edit.");
      return;
    }

    try {
      const data = await adminGet(`/shelves/${editShelfId}`);

      if (!data) {
        setMessage("Shelf not found.");
        return;
      }

      setShelf({
        id: data.id || "",
        floorName: data.floorName || "",
        mapX: data.mapX || "",
        mapY: data.mapY || "",
        mapWidth: data.mapWidth || "",
        mapHeight: data.mapHeight || "",
        accessNodeId: data.accessNodeId || "",
        rangeStart: data.rangeStart || "",
        rangeEnd: data.rangeEnd || "",
      });

      setMessage("Shelf loaded. You can edit and update it now.");
    } catch (err) {
      setMessage("Failed to load shelf.");
    }
  }

  async function handleUpdateShelf(e) {
    e.preventDefault();
    setMessage("");

    if (!shelf.id) {
      setMessage("Load a shelf first or enter shelf ID.");
      return;
    }

    try {
      const updatedShelf = {
        id: shelf.id,
        floorName: shelf.floorName,
        mapX: Number(shelf.mapX),
        mapY: Number(shelf.mapY),
        mapWidth: Number(shelf.mapWidth),
        mapHeight: Number(shelf.mapHeight),
        accessNodeId: shelf.accessNodeId,
        rangeStart: shelf.rangeStart,
        rangeEnd: shelf.rangeEnd,
      };

      await adminPut(`/shelves/${shelf.id}`, updatedShelf);

      setMessage("Shelf updated successfully.");
      resetShelfForm();
    } catch (err) {
      setMessage("Failed to update shelf.");
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>FindMyBook Admin</h1>
          <p>Add books and manage shelf ranges.</p>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <div className="admin-grid">
        <form className="admin-card" onSubmit={handleCreateBook}>
          <h2>Create Book</h2>

          <input
            placeholder="Title"
            value={book.title}
            onChange={(e) => updateBookField("title", e.target.value)}
            required
          />

          <input
            placeholder="Author"
            value={book.author}
            onChange={(e) => updateBookField("author", e.target.value)}
          />

          <input
            placeholder="ISBN"
            value={book.isbn}
            onChange={(e) => updateBookField("isbn", e.target.value)}
          />

          <input
            placeholder="Full Call Number, example: QA76.73 .J38 2020"
            value={book.callNumberFull}
            onChange={(e) => updateBookField("callNumberFull", e.target.value)}
            required
          />

          <input
            placeholder="Class Letters, example: QA"
            value={book.classLetters}
            onChange={(e) => updateBookField("classLetters", e.target.value)}
            required
          />

          <input
            placeholder="Class Number, example: 76.73"
            type="number"
            step="0.01"
            value={book.classNumber}
            onChange={(e) => updateBookField("classNumber", e.target.value)}
            required
          />

          <input
            placeholder="Cutter 1, example: .J38"
            value={book.cutter1}
            onChange={(e) => updateBookField("cutter1", e.target.value)}
          />

          <input
            placeholder="Cutter 2"
            value={book.cutter2}
            onChange={(e) => updateBookField("cutter2", e.target.value)}
          />

          <input
            placeholder="Publication Year"
            type="number"
            value={book.publicationYear}
            onChange={(e) => updateBookField("publicationYear", e.target.value)}
          />

          <select
            value={book.status}
            onChange={(e) => updateBookField("status", e.target.value)}
            required
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="CHECKED_OUT">CHECKED_OUT</option>
            <option value="MISSING">MISSING</option>
          </select>

          <button type="submit">Create Book</button>
        </form>

        <form className="admin-card" onSubmit={handleCreateShelf}>
          <h2>Create Shelf</h2>

          <input
            placeholder="Shelf ID, example: STACKS_04_A"
            value={shelf.id}
            onChange={(e) => updateShelfField("id", e.target.value)}
            required
          />

          <input
            placeholder="Floor Name, example: FLOOR_1"
            value={shelf.floorName}
            onChange={(e) => updateShelfField("floorName", e.target.value)}
            required
          />

          <input
            placeholder="Map X"
            type="number"
            value={shelf.mapX}
            onChange={(e) => updateShelfField("mapX", e.target.value)}
            required
          />

          <input
            placeholder="Map Y"
            type="number"
            value={shelf.mapY}
            onChange={(e) => updateShelfField("mapY", e.target.value)}
            required
          />

          <input
            placeholder="Map Width"
            type="number"
            value={shelf.mapWidth}
            onChange={(e) => updateShelfField("mapWidth", e.target.value)}
            required
          />

          <input
            placeholder="Map Height"
            type="number"
            value={shelf.mapHeight}
            onChange={(e) => updateShelfField("mapHeight", e.target.value)}
            required
          />

          <input
            placeholder="Access Node ID"
            value={shelf.accessNodeId}
            onChange={(e) => updateShelfField("accessNodeId", e.target.value)}
            required
          />

          <input
            placeholder="Range Start, example: QA1"
            value={shelf.rangeStart}
            onChange={(e) => updateShelfField("rangeStart", e.target.value)}
            required
          />

          <input
            placeholder="Range End, example: QA99"
            value={shelf.rangeEnd}
            onChange={(e) => updateShelfField("rangeEnd", e.target.value)}
            required
          />

          <button type="submit">Create Shelf</button>
        </form>

        <div className="admin-card">
          <h2>Edit Shelf</h2>

          <input
            placeholder="Enter Shelf ID to edit"
            value={editShelfId}
            onChange={(e) => setEditShelfId(e.target.value)}
          />

          <button type="button" onClick={handleLoadShelf}>
            Load Shelf
          </button>

          <form className="nested-admin-form" onSubmit={handleUpdateShelf}>
            <input
              placeholder="Shelf ID"
              value={shelf.id}
              onChange={(e) => updateShelfField("id", e.target.value)}
              required
            />

            <input
              placeholder="Floor Name"
              value={shelf.floorName}
              onChange={(e) => updateShelfField("floorName", e.target.value)}
              required
            />

            <input
              placeholder="Map X"
              type="number"
              value={shelf.mapX}
              onChange={(e) => updateShelfField("mapX", e.target.value)}
              required
            />

            <input
              placeholder="Map Y"
              type="number"
              value={shelf.mapY}
              onChange={(e) => updateShelfField("mapY", e.target.value)}
              required
            />

            <input
              placeholder="Map Width"
              type="number"
              value={shelf.mapWidth}
              onChange={(e) => updateShelfField("mapWidth", e.target.value)}
              required
            />

            <input
              placeholder="Map Height"
              type="number"
              value={shelf.mapHeight}
              onChange={(e) => updateShelfField("mapHeight", e.target.value)}
              required
            />

            <input
              placeholder="Access Node ID"
              value={shelf.accessNodeId}
              onChange={(e) => updateShelfField("accessNodeId", e.target.value)}
              required
            />

            <input
              placeholder="Range Start"
              value={shelf.rangeStart}
              onChange={(e) => updateShelfField("rangeStart", e.target.value)}
              required
            />

            <input
              placeholder="Range End"
              value={shelf.rangeEnd}
              onChange={(e) => updateShelfField("rangeEnd", e.target.value)}
              required
            />

            <button type="submit">Update Shelf</button>
          </form>

          <button type="button" onClick={resetShelfForm}>
            Clear Shelf Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;