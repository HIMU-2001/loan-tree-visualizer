import type { FC } from "react";
import { Handle, Position } from "reactflow"; 
import type { NodeProps } from "reactflow";  
import { ShieldCheck } from "lucide-react";

const CollateralNode: FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-3 rounded-md border-2 border-purple-600 bg-purple-100 text-purple-900 shadow-md w-[180px] text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <ShieldCheck size={18} />
        <h3 className="font-bold text-sm">Collateral</h3>
      </div>
      <p className="text-xs break-words">{data?.label || "Unnamed"}</p>

      {/* Only accepts connections (no children) */}
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-purple-600" />
    </div>
  );
};

export default CollateralNode;
