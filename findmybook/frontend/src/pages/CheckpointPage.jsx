import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function CheckpointPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const node = searchParams.get("node");

  useEffect(() => {
    if (!node) return;

    const activeBookId = localStorage.getItem("activeBookId");

    if (activeBookId) {
      navigate(`/map/${activeBookId}?start=${node}`);
    } else {
      navigate("/");
    }
  }, [node, navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Updating your location...</h1>

      {node ? (
        <p>Current node: {node}</p>
      ) : (
        <p>No checkpoint node found.</p>
      )}
    </div>
  );
}

export default CheckpointPage;