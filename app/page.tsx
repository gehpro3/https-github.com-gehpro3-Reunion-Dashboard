// File: app/page.tsx

// Define the shape of the data you expect from your AI agent
type AgentData = {
  // TODO: Customize these properties to match your AI agent's actual output
  id: string;
  status: string;
  query: string;
  result: string;
  timestamp: string;
};

// This is an async Server Component.
export default async function AgentViewPage() {
  
  try {
    // THIS IS THE LINE YOU WILL NEED TO EDIT
    // TODO: Replace 'https://reunion-assist.vercel.app/api/your-real-endpoint' 
    // with the actual URL you find in your other project's code.
    const response = await fetch('https://reunion-assist.vercel.app/api/guests/', {
      headers: {
        'Authorization': `Bearer ${process.env.AI_AGENT_API_KEY}`
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: AgentData = await response.json();

    // Render the data
    return (
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-indigo-400">AI Agent Live View</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-400">Agent ID</p>
            <p className="text-lg text-white">{data.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Status</p>
            <p className="text-lg font-mono bg-gray-700 px-2 py-1 rounded inline-block">{data.status}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Last Query</p>
            <p className="text-lg text-white">{data.query}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Result</p>
            <pre className="text-lg text-white bg-gray-900 p-4 rounded-md overflow-x-auto">{data.result}</pre>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Last Updated</p>
            <p className="text-lg text-white">{new Date(data.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    );

  } catch (error) {
    console.error("Failed to fetch AI agent data:", error);
    return (
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-red-500">Error Loading Agent Data</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p>Could not load data from the AI agent.</p>
          {error instanceof Error && <p className="text-sm text-gray-400 mt-2">Reason: {error.message}</p>}
        </div>
      </div>
    );
  }
}
