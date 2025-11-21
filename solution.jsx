import React, { useState } from "react";

// ============ AVL Tree Logic ============

let nextId = 1;

function createNode(value, left = null, right = null) {
  return {
    value,
    left,
    right,
    height: 1 + Math.max(getHeight(left), getHeight(right)),
    id: nextId++,
  };
}

function getHeight(node) {
  return node ? node.height : 0;
}

function getBalance(node) {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function updateHeight(node) {
  if (!node) return null;
  return {
    ...node,
    height: 1 + Math.max(getHeight(node.left), getHeight(node.right)),
  };
}

function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;
  const newX = { ...x, right: { ...y, left: T2 } };
  return updateHeight({ ...newX, right: updateHeight(newX.right) });
}

function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;
  const newY = { ...y, left: { ...x, right: T2 } };
  return updateHeight({ ...newY, left: updateHeight(newY.left) });
}

function insert(node, value) {
  if (!node) return createNode(value);

  if (value < node.value) {
    node = { ...node, left: insert(node.left, value) };
  } else if (value > node.value) {
    node = { ...node, right: insert(node.right, value) };
  } else {
    return node;
  }

  node = updateHeight(node);
  const balance = getBalance(node);

  if (balance > 1 && value < node.left.value) {
    return rotateRight(node);
  }

  if (balance < -1 && value > node.right.value) {
    return rotateLeft(node);
  }

  if (balance > 1 && value > node.left.value) {
    node = { ...node, left: rotateLeft(node.left) };
    return rotateRight(node);
  }

  if (balance < -1 && value < node.right.value) {
    node = { ...node, right: rotateRight(node.right) };
    return rotateLeft(node);
  }

  return node;
}

function findMin(node) {
  while (node.left) node = node.left;
  return node;
}

function deleteNode(node, value) {
  if (!node) return null;

  if (value < node.value) {
    node = { ...node, left: deleteNode(node.left, value) };
  } else if (value > node.value) {
    node = { ...node, right: deleteNode(node.right, value) };
  } else {
    if (!node.left || !node.right) {
      return node.left || node.right;
    }

    const minNode = findMin(node.right);
    node = {
      ...node,
      value: minNode.value,
      right: deleteNode(node.right, minNode.value),
    };
  }

  node = updateHeight(node);
  const balance = getBalance(node);

  if (balance > 1 && getBalance(node.left) >= 0) {
    return rotateRight(node);
  }

  if (balance > 1 && getBalance(node.left) < 0) {
    node = { ...node, left: rotateLeft(node.left) };
    return rotateRight(node);
  }

  if (balance < -1 && getBalance(node.right) <= 0) {
    return rotateLeft(node);
  }

  if (balance < -1 && getBalance(node.right) > 0) {
    node = { ...node, right: rotateRight(node.right) };
    return rotateLeft(node);
  }

  return node;
}

// ============ Layout Algorithm ============

function layoutTree(root) {
  if (!root) return { nodes: [], edges: [] };

  const nodes = [];
  const edges = [];
  let xCounter = 0;

  function inorder(node, depth) {
    if (!node) return null;

    const leftPos = inorder(node.left, depth + 1);

    const x = xCounter++;
    const y = depth;
    const pos = { x, y };

    nodes.push({ ...node, x, y });

    if (leftPos) edges.push({ from: pos, to: leftPos });

    const rightPos = inorder(node.right, depth + 1);
    if (rightPos) edges.push({ from: pos, to: rightPos });

    return pos;
  }

  inorder(root, 0);
  return { nodes, edges };
}

// ============ Content Component ============

function Content() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleInsert = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      setRoot((r) => insert(r, num));
      setInputValue("");
    }
  };

  const handleDelete = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      setRoot((r) => deleteNode(r, num));
      setInputValue("");
    }
  };

  const handleClear = () => {
    setRoot(null);
    nextId = 1;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInsert();
    }
  };

  // Get tree layout
  const { nodes, edges } = layoutTree(root);

  // Calculate SVG dimensions
  let svgContent = null;
  if (nodes.length > 0) {
    const xCoords = nodes.map((n) => n.x);
    const yCoords = nodes.map((n) => n.y);
    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);

    const xSpacing = 60;
    const ySpacing = 80;
    const radius = 24;
    const padding = 40;

    const width = (maxX - minX) * xSpacing + padding * 2 + radius * 2;
    const height = (maxY - minY) * ySpacing + padding * 2 + radius * 2;

    function toSvgX(x) {
      return (x - minX) * xSpacing + padding + radius;
    }

    function toSvgY(y) {
      return (y - minY) * ySpacing + padding + radius;
    }

    svgContent = (
      <svg width={width} height={height} className="block">
        {edges.map((edge, i) => (
          <line
            key={i}
            x1={toSvgX(edge.from.x)}
            y1={toSvgY(edge.from.y)}
            x2={toSvgX(edge.to.x)}
            y2={toSvgY(edge.to.y)}
            stroke="#94a3b8"
            strokeWidth="2"
          />
        ))}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={toSvgX(node.x)}
              cy={toSvgY(node.y)}
              r={radius}
              fill="#3b82f6"
              stroke="#1e40af"
              strokeWidth="2"
            />
            <text
              x={toSvgX(node.x)}
              y={toSvgY(node.y)}
              textAnchor="middle"
              dy="0.35em"
              fill="white"
              fontSize="16"
              fontWeight="600"
            >
              {node.value}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          AVL Tree Visualizer
        </h1>
        <div className="flex gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a number"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleInsert}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Insert
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Delete
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 flex items-center justify-center overflow-auto bg-gray-50">
        {svgContent || (
          <div className="text-gray-400">
            Tree is empty. Insert a value to begin.
          </div>
        )}
      </div>
    </div>
  );
}

// ============ App Component ============

export default function App() {
  return <Content />;
}
