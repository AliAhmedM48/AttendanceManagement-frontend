import React from "react";

function Dashboard() {
  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h1>
      <p className="text-gray-700">
        Select a section from the sidebar to manage employees or attendance
        records.
      </p>
    </main>
  );
}

export default Dashboard;
