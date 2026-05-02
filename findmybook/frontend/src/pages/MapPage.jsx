import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import FloorMap from "../components/FloorMap";
import QRScanner from "../components/QRScanner";
import "../styles/map.css";
import { API_BASE_URL } from "../api/config";

function MapPage() {
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const startNode = searchParams.get("start") || "NODE_ENTRANCE_MAIN";

  const startLabel = {
    NODE_ENTRANCE_MAIN: "Main Door",
    NODE_STAIRCASE_01:  "Staircase",
    NODE_ELEVATOR_01:   "Elevator",
  }[startNode] || startNode;

  const [location,    setLocation]    = useState(null);
  const [pathNodes,   setPathNodes]   = useState([]);
  const [message,     setMessage]     = useState("");
  const [showScanner, setShowScanner] = useState(false);
  // scannerKey forces a full unmount+remount of QRScanner each time it opens,
  // so no stale Html5Qrcode instance ever survives between openings.
  const [scannerKey,  setScannerKey]  = useState(0);

  useEffect(() => {
    async function loadMap() {
      try {
        setMessage("");
        localStorage.setItem("activeBookId", bookId);

        const locationRes = await fetch(
          `${API_BASE_URL}/books/${bookId}/location`
        );
        if (!locationRes.ok) { setMessage("Could not load book location."); return; }
        const data = await locationRes.json();
        setLocation(data);

        const pathRes = await fetch(
          `${API_BASE_URL}/path?start=${startNode}&target=${data.accessNodeId}`
        );
        if (!pathRes.ok) { setMessage("Could not load route."); return; }
        setPathNodes(await pathRes.json());
      } catch (err) {
        console.error(err);
        setMessage("Could not load map.");
      }
    }
    loadMap();
  }, [bookId, startNode]);

  // Open scanner: bump key so a fresh instance is always created
  function openScanner() {
    if (showScanner) return;          // already open — ignore extra clicks
    setScannerKey((k) => k + 1);
    setShowScanner(true);
  }

  function closeScanner() {
    setShowScanner(false);
  }

  // useCallback so QRScanner's useEffect dep array stays stable
  const handleQRSuccess = useCallback((decodedText) => {
    let scannedNode = null;
    try {
      const url = new URL(decodedText);
      scannedNode = url.searchParams.get("node");
    } catch {
      scannedNode = decodedText;
    }

    if (!scannedNode) {
      setMessage("Invalid QR code.");
      return;
    }

    setShowScanner(false);
    navigate(`/map/${bookId}?start=${scannedNode}`);
  }, [bookId, navigate]);

  return (
    <div className="map-page">
      <nav className="map-navbar">
        <Link to="/" className="map-back-btn">← Back</Link>
        <span className="map-navbar-brand">📚 UNK Library</span>
        <span className="map-navbar-badge">Map View</span>
      </nav>

      <div className="map-body">
        {/* ── Left panel ── */}
        <div className="map-left">
          <div className="map-info-card">
            <div className="map-card-label">Book Details</div>

          {location ? (
  <>
    <h2 className="map-book-title">{location.title}</h2>

    <div className="map-detail-row">
      <div className="map-detail-key">Author</div>
      <div className="map-detail-val">
        {location.author || "Not available"}
      </div>
    </div>

    <div className="map-detail-row">
      <div className="map-detail-key">Location</div>
      <div className="map-detail-val">
        {location.location}
      </div>
    </div>

    <div className="map-detail-row">
      <div className="map-detail-key">Call Number</div>
      <div className="map-detail-val map-detail-val--accent">
        {location.callNumber}
      </div>
    </div>
  </>
) : (
  <p className="map-loading">Loading book details…</p>
)}
          </div>

          {/* Disable button while scanner is already open */}
          <button
            className="scan-qr-button"
            onClick={openScanner}
            disabled={showScanner}
            style={{ opacity: showScanner ? 0.5 : 1, cursor: showScanner ? "default" : "pointer" }}
          >
            <span className="scan-qr-icon">⬛</span>
            Scan Nearest QR Code
          </button>

          {message && <p className="map-message">{message}</p>}

          
        </div>

        {/* ── Map ── */}
        <div className="map-card">
          <div className="map-card-header">
            <span className="map-card-title">Floor Map 1</span>
            {location && <span className="map-floor-badge">{location.floorName}</span>}
          </div>
          <FloorMap highlightedShelf={location?.shelfId} pathNodes={pathNodes} />
        </div>
      </div>

      <footer className="map-footer">
        University of Nebraska at Kearney — Calvin T. Ryan Library
      </footer>

      {/* ── QR Modal — only renders when showScanner is true ── */}
      {showScanner && (
        <div className="qr-modal">
          <div className="qr-box">
            <div className="qr-box-header">
              <h2>Scan QR Code</h2>
              <p>Point your camera at the nearest QR code to update your location.</p>
            </div>
            {/* key prop guarantees a fresh QRScanner instance every open */}
            <QRScanner
              key={scannerKey}
              onScanSuccess={handleQRSuccess}
              onClose={closeScanner}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MapPage;