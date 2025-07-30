import type { FC } from "react";
import { useState } from "react";
import type { Node } from "reactflow";
import { Plus, Trash2 } from "lucide-react";
import type { NodeType } from "../types/types";
import { ALLOWED_CHILDREN} from "../types/types";

interface NodeSidebarProps {
  node: Node<NodeType>;
  onAdd: (parent: Node<NodeType>, childType: NodeType) => void;
  onDelete: (nodeId: string) => void;
  onClose: () => void;
}

export const NodeSidebar: FC<NodeSidebarProps> = ({
  node,
  onAdd,
  onDelete,
  onClose,
}) => {
  const [selectedChildType, setSelectedChildType] = useState<NodeType | "">("");

  const handleAddChild = () => {
    if (selectedChildType) {
      onAdd(node, selectedChildType as NodeType);
      setSelectedChildType("");
    }
  };

  if(!node.type){
    return null;
  } 
  const allowedChildren =
    node.type in ALLOWED_CHILDREN
      ? ALLOWED_CHILDREN[node.type as NodeType]
      : [];
  return (
    <div className="relative h-full p-5 pt-10 space-y-6 text-sm">
      <button
        onClick={onClose}
        className="absolute top-3 right-6 text-lg font-bold text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition"
        aria-label="Close sidebar"
      >
        ✕
      </button>

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 border-b pb-1">Node Details</h2>
        <p>
          <span className="font-medium">Type:</span>{" "}
          <span className="capitalize">{node.type}</span>
        </p>
        <p>
          <span className="font-medium">ID:</span> {node.id}
        </p>
      </div>

      {allowedChildren.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="text-md font-semibold mb-3 border-b pb-1">Add Child Node</h3>
          <select
            value={selectedChildType}
            onChange={(e) =>
              setSelectedChildType(e.target.value as NodeType | "")
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            {allowedChildren.map((child: NodeType) => (
              <option key={child} value={child}>
                {child.charAt(0).toUpperCase() + child.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddChild}
            disabled={!selectedChildType}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Child
          </button>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={() => onDelete(node.id)}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-lg"
        >
          <Trash2 className="w-4 h-4" /> Delete Node
        </button>
      </div>
    </div>
  );
};

export default NodeSidebar;
