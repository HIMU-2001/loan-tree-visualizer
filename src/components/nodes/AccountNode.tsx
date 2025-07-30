import type { FC } from "react";
import { Handle, Position } from "reactflow"; 
import type { NodeProps } from "reactflow";  
import { Banknote } from "lucide-react";

const AccountNode: FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-3 rounded-md border-2 border-blue-500 bg-blue-100 text-blue-900 shadow-md w-[180px] text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Banknote size={18} />
        <h3 className="font-bold text-sm">Account</h3>
      </div>
      <p className="text-xs break-words">{data?.label || "Unnamed"}</p>

      {/* Handles for connecting edges */}
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-blue-500" />
    </div>
  );
};

export default AccountNode;
