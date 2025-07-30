import type { FC } from "react";
import { Handle, Position } from "reactflow"; 
import type { NodeProps } from "reactflow";   
import { FileText } from "lucide-react";

const LoanNode: FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-3 rounded-md border-2 border-green-600 bg-green-100 text-green-900 shadow-md w-[180px] text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <FileText size={18} />
        <h3 className="font-bold text-sm">Loan</h3>
      </div>
      <p className="text-xs break-words">{data?.label || "Unnamed"}</p>

      {/* Handles for edges */}
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-green-600" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-green-600" />
    </div>
  );
};

export default LoanNode;
