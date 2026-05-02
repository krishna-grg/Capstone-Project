
import { useState } from "react";
import QRScanner from "../QRScanner";

function SearchCard({
  query,
  setQuery,
  startNode,
  setStartNode,
  searchBooks,
  message,
}) {
  const [showScanner, setShowScanner] = useState(false);

  function handleQRSuccess(decodedText) {
    let scannedNode = null;

    try {
      const url = new URL(decodedText);
      scannedNode = url.searchParams.get("node");
    } catch {
      scannedNode = decodedText;
    }

    if (scannedNode) {
      setStartNode(scannedNode);
      setShowScanner(false);
    }
  }

  return (
    <section className="search-card-wrapper">
      <div className="search-card">
        <p className="search-help-text">
          Search for a book by title, choose where you're starting from, then
          click the call number.
        </p>

        <div className="search-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchBooks()}
            placeholder="Search by title…"
            className="search-input"
          />

          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="start-select"
          >
            <option value="NODE_ENTRANCE_MAIN">Main Door</option>
            <option value="NODE_STAIRCASE_01">Staircase</option>
            <option value="NODE_ELEVATOR_01">Elevator</option>
            <option value="NODE_BACK_DOOR_01">Back Door</option>
          </select>

          <button
            type="button"
            onClick={() => setShowScanner(true)}
            className="scan-location-button"
          >
            Scan QR
          </button>

          <button onClick={searchBooks} className="search-button">
            Search
          </button>
        </div>

        {message && <p className="search-message">{message}</p>}
      </div>

      {showScanner && (
        <div className="qr-modal">
          <div className="qr-box">
            <div className="qr-box-header">
              <p>Scan the nearest QR code to set your starting location.</p>
            </div>

            <QRScanner
              onScanSuccess={handleQRSuccess}
              onClose={() => setShowScanner(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchCard;