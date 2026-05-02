import { useRef, useState } from "react";

// render a single shelf as a 3D block, highlighted if it's the target shelf
function RenderShelf3D({ id, x, y, width, height, highlightedShelf, onClick }) {
  const isHighlighted = highlightedShelf === id; 
  const depth = 8;

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      {/* draw poly */}
      <polygon 
        points={`
          ${x},${y}
          ${x + depth},${y - depth}
          ${x + width + depth},${y - depth}
          ${x + width},${y}
        `}
        fill={isHighlighted ? "#fb923c" : "#e2e8f0"}
        stroke="#334155"
      />

      <polygon
        points={`
          ${x + width},${y}
          ${x + width + depth},${y - depth}
          ${x + width + depth},${y + height - depth}
          ${x + width},${y + height}
        `}
        fill={isHighlighted ? "#ea580c" : "#cbd5e1"}
        stroke="#334155"
      />
        {/* // front face */}
      <rect
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        rx="3"
        fill={isHighlighted ? "#f97316" : "#ffffff"}
        stroke={isHighlighted ? "#c2410c" : "#334155"}
        strokeWidth={isHighlighted ? "3" : "1.5"}
      />
    </g>
  );
}

// helper functions for path simplification and gesture handling
function simplifyPath(nodes) {
  if (nodes.length <= 2) return nodes; //no needed if 2 or fewer nodes

  const simplified = [nodes[0]];

  // only keep nodes where the direction changes (not in a straight line)
  for (let i = 1; i < nodes.length - 1; i++) {


    const prev = nodes[i - 1];
    const current = nodes[i];
    const next = nodes[i + 1];


    const sameVertical = prev.x === current.x && current.x === next.x;
    const sameHorizontal = prev.y === current.y && current.y === next.y;

    if (!sameVertical && !sameHorizontal) {
      simplified.push(current);
    }
  }

  simplified.push(nodes[nodes.length - 1]);
  return simplified;

}

function getDistance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getAngle(p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
}

function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}
// data for shelves and aisle labels, based on the actual floor map of the library
const horizontalShelves = [
  ["STACKS_01_A", 120, 120, 240, 20],
  ["STACKS_01_B", 120, 140, 240, 20],
  ["STACKS_02_A", 440, 120, 240, 20],
  ["STACKS_02_B", 440, 140, 240, 20],
  ["STACKS_03_A", 760, 120, 240, 20],
  ["STACKS_03_B", 760, 140, 240, 20],
  ["STACKS_04_A", 1080, 120, 240, 20],
  ["STACKS_04_B", 1080, 140, 240, 20],
  ["STACKS_05_A", 120, 200, 240, 20],
  ["STACKS_05_B", 120, 220, 240, 20],
  ["STACKS_06_A", 440, 200, 240, 20],
  ["STACKS_06_B", 440, 220, 240, 20],
  ["STACKS_07_A", 760, 200, 240, 20],
  ["STACKS_07_B", 760, 220, 240, 20],
  ["STACKS_08_A", 1080, 200, 240, 20],
  ["STACKS_08_B", 1080, 220, 240, 20],
  ["STACKS_09_A", 120, 280, 240, 20],
  ["STACKS_09_B", 120, 300, 240, 20],
  ["STACKS_10_A", 440, 270, 240, 20],
  ["STACKS_10_B", 440, 290, 240, 20],
  
  ["STACKS_11_A", 760, 280, 240, 20],
  ["STACKS_11_B", 760, 300, 240, 20],
  ["STACKS_12_A", 1080, 280, 240, 20],
  ["STACKS_12_B", 1080, 300, 240, 20],
  ["STACKS_13_A", 120, 360, 240, 20],
  ["STACKS_13_B", 120, 380, 240, 20],
  //["STACKS_10_A", 440, 360, 240, 20],
  //["STACKS_10_B", 440, 380, 240, 20],
  //["STACKS_15_A", 760, 360, 240, 20],
  //["STACKS_15_B", 760, 380, 240, 20],
  ["STACKS_16_A", 1080, 360, 240, 20],
  ["STACKS_16_B", 1080, 380, 240, 20],
  ["STACKS_17_A", 120, 440, 240, 20],
  ["STACKS_17_B", 120, 460, 240, 20],
  ["STACKS_14_A", 440, 350, 240, 20],
  ["STACKS_14_B", 440, 370, 240, 20],
  ["STACKS_19_A", 760, 440, 240, 20],
  ["STACKS_19_B", 760, 460, 240, 20],
  ["STACKS_20_A", 1080, 440, 240, 20],
  ["STACKS_20_B", 1080, 460, 240, 20],
  ["STACKS_21_A", 120, 520, 240, 20],
  ["STACKS_21_B", 120, 540, 240, 20],
  ["STACKS_18_A", 440, 440, 240, 20],
  ["STACKS_18_B", 440, 460, 240, 20],
  ["STACKS_23_A", 760, 520, 240, 20],
  ["STACKS_23_B", 760, 540, 240, 20],
  ["STACKS_24_A", 1080, 520, 240, 20],
  ["STACKS_24_B", 1080, 540, 240, 20],
  ["STACKS_25_A", 120, 600, 240, 20],
  ["STACKS_25_B", 120, 620, 240, 20],
  ["STACKS_22_A", 440, 520, 240, 20],
  ["STACKS_22_B", 440, 540, 240, 20],
  ["STACKS_27_A", 760, 600, 240, 20],
  ["STACKS_27_B", 760, 620, 240, 20],

  ["STACKS_29_A", 120, 680, 240, 20],
  ["STACKS_29_B", 120, 700, 240, 20],
  ["STACKS_26_A", 440, 600, 240, 20],
  ["STACKS_26_B", 440, 620, 240, 20],
  ["STACKS_30_A", 440, 680, 240, 20],
  ["STACKS_30_B", 440, 700, 240, 20],
  ["STACKS_31_A", 760, 680, 240, 20],
  ["STACKS_31_B", 760, 700, 240, 20],
  ["STACKS_32_A", 1080, 680, 240, 20],
  ["STACKS_32_B", 1080, 700, 240, 20],

["STACKS_03_A", 760, 120, 240, 20],
["STACKS_03_B", 760, 140, 240, 20],
["STACKS_07_A", 760, 200, 240, 20],
["STACKS_07_B", 760, 220, 240, 20],
["STACKS_11_A", 760, 280, 240, 20],
["STACKS_11_B", 760, 300, 240, 20],
["STACKS_15_A", 760, 360, 240, 20],
["STACKS_15_B", 760, 380, 240, 20],
["STACKS_19_A", 760, 440, 240, 20],
["STACKS_19_B", 760, 460, 240, 20],
["STACKS_23_A", 760, 520, 240, 20],
["STACKS_23_B", 760, 540, 240, 20],
["STACKS_27_A", 760, 600, 240, 20],
["STACKS_27_B", 760, 620, 240, 20],
["STACKS_31_A", 760, 680, 240, 20],
["STACKS_31_B", 760, 700, 240, 20],



["STACKS_04_A", 1080, 120, 240, 20],
["STACKS_04_B", 1080, 140, 240, 20],
["STACKS_08_A", 1080, 200, 240, 20],
["STACKS_08_B", 1080, 220, 240, 20],
["STACKS_12_A", 1080, 280, 240, 20],
["STACKS_12_B", 1080, 300, 240, 20],
["STACKS_16_A", 1080, 360, 240, 20],
["STACKS_16_B", 1080, 380, 240, 20],
["STACKS_20_A", 1080, 440, 240, 20],
["STACKS_20_B", 1080, 460, 240, 20],
["STACKS_24_A", 1080, 520, 240, 20],
["STACKS_24_B", 1080, 540, 240, 20],
["STACKS_28_A", 1080, 600, 240, 20],
["STACKS_28_B", 1080, 620, 240, 20],
["STACKS_32_A", 1080, 680, 240, 20],
["STACKS_32_B", 1080, 700, 240, 20],

 

];

const verticalShelves = [
  ["STACKS_VERTICAL_01_A", 120, 760, 10, 200],
  ["STACKS_VERTICAL_01_B", 130, 760, 10, 200],
  ["STACKS_VERTICAL_02_A", 160, 760, 10, 200],
  ["STACKS_VERTICAL_02_B", 170, 760, 10, 200],
  ["STACKS_VERTICAL_03_A", 200, 760, 10, 200],
  ["STACKS_VERTICAL_03_B", 210, 760, 10, 200],
  ["STACKS_VERTICAL_04_A", 240, 760, 10, 160],
  ["STACKS_VERTICAL_04_B", 250, 760, 10, 160],
  ["STACKS_VERTICAL_05_A", 280, 760, 10, 160],
  ["STACKS_VERTICAL_05_B", 290, 760, 10, 160],
  ["STACKS_VERTICAL_06_A", 320, 760, 10, 160],
  ["STACKS_VERTICAL_06_B", 330, 760, 10, 160],
  ["STACKS_VERTICAL_07_A", 460, 760, 10, 200],
  ["STACKS_VERTICAL_07_B", 470, 760, 10, 200],
  ["STACKS_VERTICAL_08_A", 510, 760, 10, 200],
  ["STACKS_VERTICAL_08_B", 520, 760, 10, 200],
  ["STACKS_VERTICAL_09_A", 560, 760, 10, 200],
  ["STACKS_VERTICAL_09_B", 570, 760, 10, 200],
  ["STACKS_VERTICAL_10_A", 610, 760, 10, 200],
  ["STACKS_VERTICAL_10_B", 620, 760, 10, 200],
  ["STACKS_VERTICAL_11_A", 660, 760, 10, 200],
  ["STACKS_VERTICAL_11_B", 670, 760, 10, 200],
  ["STACKS_VERTICAL_12_A", 880, 760, 10, 200],
  ["STACKS_VERTICAL_12_B", 890, 760, 10, 200],
  ["STACKS_VERTICAL_13_A", 930, 760, 10, 200],
  ["STACKS_VERTICAL_13_B", 940, 760, 10, 200],
  ["STACKS_VERTICAL_14_A", 980, 760, 10, 200],
  ["STACKS_VERTICAL_14_B", 990, 760, 10, 200],
];

const aisleLabels = [
  { id: "AISLE_1", label: "AISLE 1", x: 400, midY: 420 },
  { id: "AISLE_2", label: "AISLE 2", x: 720, midY: 420 },
  { id: "AISLE_3", label: "AISLE 3", x: 1040, midY: 420 },
];

function FloorMap({ highlightedShelf, pathNodes = [] }) {
  const smoothPathNodes = simplifyPath(pathNodes);
  const pathPoints = smoothPathNodes.map((node) => `${node.x},${node.y}`).join(" ");
  const startNode = smoothPathNodes[0];
  const endNode = smoothPathNodes[smoothPathNodes.length - 1];

  const [selectedShelf, setSelectedShelf] = useState(null);
  const [showLabels, setShowLabels] = useState(false);
  const [mapTransform, setMapTransform] = useState({
    panX: 0,
    panY: 0,
    zoom: 1,
    rotation: 0,
  });

  const transformRef = useRef(mapTransform);
  const pointersRef = useRef(new Map());
  const gestureStartRef = useRef(null);

  function updateTransform(nextTransform) {
    transformRef.current = nextTransform;
    setMapTransform(nextTransform);
  }

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    const pointers = Array.from(pointersRef.current.values());

    if (pointers.length === 1) {
      gestureStartRef.current = {
        type: "pan",
        startPoint: pointers[0],
        startTransform: transformRef.current,
      };
    }

    if (pointers.length === 2) {
      const [p1, p2] = pointers;

      gestureStartRef.current = {
        type: "pinchRotate",
        startDistance: getDistance(p1, p2),
        startAngle: getAngle(p1, p2),
        startCenter: getCenter(p1, p2),
        startTransform: transformRef.current,
      };
    }
  }

  function handlePointerMove(event) {
    if (!pointersRef.current.has(event.pointerId)) return;

    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    const gestureStart = gestureStartRef.current;
    if (!gestureStart) return;

    const pointers = Array.from(pointersRef.current.values());

    if (pointers.length === 1 && gestureStart.type === "pan") {
      const dx = pointers[0].x - gestureStart.startPoint.x;
      const dy = pointers[0].y - gestureStart.startPoint.y;

      updateTransform({
        ...gestureStart.startTransform,
        panX: gestureStart.startTransform.panX + dx,
        panY: gestureStart.startTransform.panY + dy,
      });
    }

    if (pointers.length === 2 && gestureStart.type === "pinchRotate") {
      const [p1, p2] = pointers;

      const scaleChange = getDistance(p1, p2) / gestureStart.startDistance;
      const angleChange = getAngle(p1, p2) - gestureStart.startAngle;
      const newCenter = getCenter(p1, p2);

      updateTransform({
        panX:
          gestureStart.startTransform.panX +
          (newCenter.x - gestureStart.startCenter.x),
        panY:
          gestureStart.startTransform.panY +
          (newCenter.y - gestureStart.startCenter.y),
        zoom: Math.min(
          3,
          Math.max(0.4, gestureStart.startTransform.zoom * scaleChange)
        ),
        rotation: gestureStart.startTransform.rotation + angleChange,
      });
    }
  }

  function handlePointerUp(event) {
    pointersRef.current.delete(event.pointerId);

    const pointers = Array.from(pointersRef.current.values());

    if (pointers.length === 0) {
      gestureStartRef.current = null;
    }

    if (pointers.length === 1) {
      gestureStartRef.current = {
        type: "pan",
        startPoint: pointers[0],
        startTransform: transformRef.current,
      };
    }
  }

  function resetMap() {
    updateTransform({
      panX: 0,
      panY: 0,
      zoom: 1,
      rotation: 0,
    });
    setSelectedShelf(null);
  }

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "12px",
          padding: "10px 14px",
          background: "#eef4fc",
          border: "1px solid #c5d4ec",
          borderRadius: "12px",
        }}
      >
        {[
          {
            label: showLabels ? "Hide Labels" : "Show Labels",
            action: () => setShowLabels((v) => !v),
          },
          {
            label: "＋ Zoom In",
            action: () =>
              updateTransform({
                ...transformRef.current,
                zoom: Math.min(3, transformRef.current.zoom + 0.15),
              }),
          },
          {
            label: "－ Zoom Out",
            action: () =>
              updateTransform({
                ...transformRef.current,
                zoom: Math.max(0.4, transformRef.current.zoom - 0.15),
              }),
          },
          {
            label: "↺ Rotate Left",
            action: () =>
              updateTransform({
                ...transformRef.current,
                rotation: transformRef.current.rotation - 15,
              }),
          },
          {
            label: "↻ Rotate Right",
            action: () =>
              updateTransform({
                ...transformRef.current,
                rotation: transformRef.current.rotation + 15,
              }),
          },
          {
            label: "⊙ Reset",
            action: resetMap,
            gold: true,
          },
        ].map(({ label, action, gold }) => (
          <button
            key={label}
            onClick={action}
            style={{
              padding: "7px 14px",
              background: gold ? "#FFD700" : "#003087",
              color: gold ? "#002060" : "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.82rem",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}

        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.8rem",
            color: "#5b6f9a",
            fontWeight: 600,
          }}
        >
          {Math.round(mapTransform.zoom * 100)}% ·{" "}
          {Math.round(mapTransform.rotation)}°
        </span>
      </div>

      <svg
        viewBox="0 0 1600 1200"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          width: "100%",
          maxWidth: "1200px",
          background: "#e8ded0",
          border: "1px solid #c5d4ec",
          borderRadius: "18px",
          boxShadow: "0 12px 30px rgba(0,48,135,0.12)",
          touchAction: "none",
          userSelect: "none",
          cursor: "grab",
          display: "block",
        }}
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003087" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1600" height="1200" fill="#e8ded0" />

        <rect
          x="3"
          y="3"
          width="1594"
          height="1194"
          fill="none"
          stroke="#003087"
          strokeWidth="5"
          rx="4"
        />

        <rect
          x="16"
          y="16"
          width="1568"
          height="1168"
          fill="none"
          stroke="#c5b8a8"
          strokeWidth="1"
          rx="2"
        />

        {[
          { x: 365, w: 70 },
          { x: 685, w: 70 },
          { x: 1005, w: 70 },
        ].map(({ x, w }, i) => (
          <rect
            key={i}
            x={x}
            y="60"
            width={w}
            height="700"
            fill="#003087"
            opacity="0.03"
            rx="4"
          />
        ))}

        <g
          transform={`translate(${mapTransform.panX} ${mapTransform.panY}) rotate(${mapTransform.rotation} 800 600) scale(${mapTransform.zoom})`}
        >
          {/* Main entrance / door */}
          <g transform="translate(10, 12)">
            <rect
              x="0"
              y="0"
              width="80"
              height="58"
              rx="8"
              fill="#ffffff"
              stroke="#111827"
              strokeWidth="2"
            />

            <path
              d="M26 48 L26 14 L58 14 L58 48"
              fill="none"
              stroke="#111827"
              strokeWidth="3"
            />

            <circle cx="50" cy="32" r="3" fill="#111827" />

            <text
              x="40"
              y="82"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#111827"
            >
              Entrance
            </text>
          </g>


          {/* Staircase */}
          <g transform="translate(400, 12)">
            <rect
              x="0"
              y="0"
              width="80"
              height="58"
              rx="8"
              fill="#ffffff"
              stroke="#111827"
              strokeWidth="2"
            />

            <path
              d="M18 44 H32 V34 H46 V24 H62"
              fill="none"
              stroke="#111827"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text
              x="40"
              y="82"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#111827"
            >
              Stairs
            </text>
          </g>



          {/* Elevator */}
<g transform="translate(1360, 52)">
  <rect
    x="0"
    y="0"
    width="80"
    height="70"
    rx="10"
    fill="#ffffff"
    stroke="#111827"
    strokeWidth="2"
  />

  {/* Elevator doors */}
  <rect x="20" y="18" width="16" height="32" fill="#111827" rx="2" />
  <rect x="44" y="18" width="16" height="32" fill="#111827" rx="2" />

  {/* Up arrow */}
  <polygon points="40,6 32,16 48,16" fill="#111827" />

  {/* Down arrow */}
  <polygon points="40,64 32,54 48,54" fill="#111827" />

  <text
    x="40"
    y="92"
    textAnchor="middle"
    fontSize="16"
    fontWeight="700"
    fill="#111827"
  >
    Elevator
  </text>
</g>


{/* Back door */}
<g transform="translate(1000, 1012)">
  <rect
    x="0"
    y="0"
    width="80"
    height="58"
    rx="8"
    fill="#ffffff"
    stroke="#111827"
    strokeWidth="2"
  />

  <path
    d="M26 48 L26 14 L58 14 L58 48"
    fill="none"
    stroke="#111827"
    strokeWidth="3"
  />

  <circle cx="50" cy="32" r="3" fill="#111827" />

  <text
    x="40"
    y="82"
    textAnchor="middle"
    fontSize="16"
    fontWeight="700"
    fill="#111827"
  >
    Back Door
  </text>
</g>



          {aisleLabels.map(({ id, label, x, midY }) => (
            <text
              key={id}
              x={x}
              y={midY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="38"
              fontWeight="800"
              fill="#003087"
              opacity="0.5"
              letterSpacing="6"
              fontFamily="system-ui, sans-serif"
              style={{ pointerEvents: "none", userSelect: "none" }}
              transform={`rotate(-90, ${x}, ${midY})`}
            >
              {label}
            </text>
          ))}

          {pathPoints && (
            <>
              <polyline
                points={pathPoints}
                fill="none"
                stroke="#bfdbfe"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />

              <polyline
                points={pathPoints}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {startNode && (
            <g>
              <circle cx={startNode.x} cy={startNode.y} r="26" fill="#bbf7d0" />
              <circle
                cx={startNode.x}
                cy={startNode.y}
                r="14"
                fill="#16a34a"
                stroke="white"
                strokeWidth="2.5"
              />

              <text
                x={startNode.x + 22}
                y={startNode.y - 12}
                fontSize="20"
                fontWeight="700"
                fill="#14532d"
              >
                You are here
              </text>
            </g>
          )}

          {endNode && (
            <g>
              <circle cx={endNode.x} cy={endNode.y} r="24" fill="#fef08a" />
              <circle
                cx={endNode.x}
                cy={endNode.y}
                r="13"
                fill="#FFD700"
                stroke="#003087"
                strokeWidth="3"
              />

              <text
                x={endNode.x + 22}
                y={endNode.y - 12}
                fontSize="20"
                fontWeight="700"
                fill="#002060"
              >
                Your book
              </text>
            </g>
          )}

          {[...horizontalShelves, ...verticalShelves].map(
            ([id, x, y, width, height]) => (
              <RenderShelf3D
                key={id}
                id={id}
                x={x}
                y={y}
                width={width}
                height={height}
                highlightedShelf={
                  selectedShelf === id ? selectedShelf : highlightedShelf
                }
                onClick={() => setSelectedShelf(id)}
              />
            )
          )}

          {showLabels &&
            [...horizontalShelves, ...verticalShelves].map(([id, x, y, width]) => (
              <text
                key={`label-${id}`}
                x={x + width / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize="11"
                fill="#334155"
                style={{ pointerEvents: "none" }}
              >
                {id}
              </text>
            ))}
        </g>
      </svg>
    </div>
  );
}

export default FloorMap;