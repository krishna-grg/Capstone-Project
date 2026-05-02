
// components
function BookResults({ books, openMap }) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    //component: book results list,
    <div className="book-results">
      <div className="results-count">{books.length} result(s) found</div>

      
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <h3>{book.title}</h3>

          <p>
            <strong>Author:</strong> {book.author || "Not available"}
          </p>

          <p>
            <strong>Call Number:</strong>{" "}
            <button
              className="call-number-button"
              onClick={() => openMap(book.id)}
            >
              {book.callNumberFull}
            </button>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                book.status && book.status.toLowerCase() === "available"
                  ? "status-available"
                  : "status-unavailable"
              }
            >
              {book.status || "Unknown"}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default BookResults;