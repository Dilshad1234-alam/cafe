export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Sales</p>
          <p className="text-3xl font-bold text-gray-900">₹0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Active Orders</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Menu Items</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Customers</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Admin Portal</h2>
        <p className="text-gray-500">This is a placeholder for the full CRUD admin dashboard.</p>
      </div>
    </div>
  );
}
