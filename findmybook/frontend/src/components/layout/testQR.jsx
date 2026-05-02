import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

function QRScanner({ onScanSuccess, onClose }) {
  const scannerRef = useRef(null);
  const scannedRef = useRef(false);
  const readerId = "qr-reader";

  useEffect(() => {
    const scanner = new Html5Qrcode(readerId);
    scannerRef.current = scanner;

    async function startScanner() {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            if (scannedRef.current) return;

            scannedRef.current = true;

            try {
              await scanner.stop();
              await scanner.clear();
            } catch (error) {
              console.error("Scanner cleanup error:", error);
            }

            onScanSuccess(decodedText);
          }
        );
      } catch (error) {
        console.error("Camera start error:", error);
      }
    }

    startScanner();

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
        }).catch(() => {});
      }
    };
  }, [onScanSuccess]);

  async function stopScanner() {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
      }

      await scannerRef.current?.clear();
    } catch (error) {
      console.error("Scanner stop error:", error);
    }

    onClose();
  }

  return (
    <div className="qr-scanner">
      <div id={readerId}></div>

      <button className="close-button" onClick={stopScanner}>
        Stop Scanning
      </button>
    </div>
  );
}

export default QRScanner;