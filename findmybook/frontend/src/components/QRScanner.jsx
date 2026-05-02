import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

function QRScanner({ onScanSuccess, onClose }) {
  const scannerRef = useRef(null);
  const scannedRef = useRef(false);
  const startedRef = useRef(false);
  const readerId = "qr-reader";

  // Function to stop all camera tracks
  const stopCameraTracks = () => {
    const videoElement = document.querySelector(`#${readerId} video`);
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop();
          console.log("Stopped track:", track.kind);
        });
        videoElement.srcObject = null;
      }
    }
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const scanner = new Html5Qrcode(readerId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (scannedRef.current) return;
          scannedRef.current = true;
          await cleanup();
          onScanSuccess(decodedText);
        }
      )
      .catch((err) => {
        console.error("Camera start error:", err);
      });

    return () => {
      cleanup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function cleanup() {
    const s = scannerRef.current;
    if (!s) return;
    
    try {
      if (s.isScanning) {
        await s.stop();
      }
      await s.clear();
    } catch (err) {
      console.warn("Scanner cleanup error:", err);
    }
    
    // Force stop all camera tracks
    stopCameraTracks();
    scannerRef.current = null;
  }

  async function handleClose() {
    await cleanup();
    onClose();
  }

  return (
    <div className="qr-scanner">
      <div id={readerId} />
      <button className="qr-close-button" onClick={handleClose}>
        Stop Scanning
      </button>
    </div>
  );
}

export default QRScanner;


