import ReactFlow, { Background, Controls} from "reactflow";
import "reactflow/dist/style.css";
import { ReactFlowProvider } from "reactflow";
import AccountNode from "./components/nodes/AccountNode";
import LoanNode from "./components/nodes/LoanNode";
import CollateralNode from "./components/nodes/CollateralNode";
import { NodeSidebar } from "./components/NodeSidebar";
import { useTreeStore } from "./hooks/useTreeStore";

const nodeTypes = {
  account: AccountNode,
  loan: LoanNode,
  collateral: CollateralNode,
};

function FlowApp() {
  const {
    nodes,
    edges,
    selectedNode,
    addRootNode,
    addChildNode,
    deleteNodeAndDescendants,
    selectNode,
  } = useTreeStore();

  const isSidebarOpen = !!selectedNode;

  return (
    <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      <div className="w-full h-full relative">
        {/* Add buttons */}
        <div className="p-4 mt-4 ml-4 bg-transparent flex gap-2 z-10 absolute">
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => addRootNode("account")}
          >
            + Add Account
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => addRootNode("loan")}
          >
            + Add Loan
          </button>
        </div>

        {/* React Flow */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_, node) => selectNode(node)}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
        >
          <Background />
         <Controls
          position="bottom-right"
          style={{
            right: isSidebarOpen ? 320 : 16, // sidebar is 80 = 320px
            bottom: 16,
            zIndex: 50,
          }}
        />
        </ReactFlow>
      </div>

      {/* Sidebar (slide-in) */}
      <div
        className={`absolute right-0 top-0 h-full w-80 border-l shadow-lg transition-transform duration-300 z-40
          bg-white dark:bg-gray-800
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {selectedNode && (
          <NodeSidebar
            node={selectedNode}
            onAdd={addChildNode}
            onDelete={deleteNodeAndDescendants}
            onClose={() => selectNode(null)} // 👈 deselects the node
          />
        )}
      </div>
    </div>
  );
}


export default function App() {
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}
