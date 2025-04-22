import React from 'react';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import RecentClients from '../components/dashboard/RecentClients';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <DashboardSummary />
      <RecentClients />
    </div>
  );
};

export default DashboardPage;