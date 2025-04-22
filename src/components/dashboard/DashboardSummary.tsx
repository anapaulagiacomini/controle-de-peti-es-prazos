import React, { useMemo } from 'react';
import { useClients } from '../../contexts/ClientContext';
import Card from '../ui/Card';
import { Users, FileText, CheckCircle, Clock, Calendar } from 'lucide-react';

const DashboardSummary: React.FC = () => {
  const { clients } = useClients();

  const stats = useMemo(() => {
    const totalClients = clients.length;
    const pendingContracts = clients.filter(client => !client.contractClosed).length;
    const pendingDocuments = clients.filter(client => 
      client.contractClosed && (!client.documentsSent || !client.documentsReceived)
    ).length;
    const completedCases = clients.filter(client => 
      client.contractClosed && client.documentsSent && client.documentsReceived
    ).length;

    // Get counts by lawyer
    const lawyerCounts: Record<string, number> = {};
    clients.forEach(client => {
      if (client.assignedLawyer) {
        lawyerCounts[client.assignedLawyer] = (lawyerCounts[client.assignedLawyer] || 0) + 1;
      }
    });

    // Sort by count descending
    const topLawyers = Object.entries(lawyerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));

    return {
      totalClients,
      pendingContracts,
      pendingDocuments,
      completedCases,
      topLawyers,
    };
  }, [clients]);

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card className="flex items-center p-6">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Visão Geral</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Clientes"
          value={stats.totalClients}
          icon={<Users className="h-6 w-6" />}
          color="bg-indigo-600"
        />
        <StatCard
          title="Contratos Pendentes"
          value={stats.pendingContracts}
          icon={<FileText className="h-6 w-6" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Documentos Pendentes"
          value={stats.pendingDocuments}
          icon={<Clock className="h-6 w-6" />}
          color="bg-orange-500"
        />
        <StatCard
          title="Casos Completos"
          value={stats.completedCases}
          icon={<CheckCircle className="h-6 w-6" />}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Advogados com Mais Casos" className="h-full">
          {stats.topLawyers.length > 0 ? (
            <div className="space-y-4">
              {stats.topLawyers.map((lawyer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="text-gray-800">{lawyer.name}</span>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm font-medium">
                    {lawyer.count} caso{lawyer.count !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum advogado com casos atribuídos.</p>
          )}
        </Card>

        <Card title="Status dos Contratos" className="h-full">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Concluídos</span>
              </div>
              <span className="font-semibold">{stats.completedCases}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${stats.totalClients ? (stats.completedCases / stats.totalClients * 100) : 0}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span>Contratos Pendentes</span>
              </div>
              <span className="font-semibold">{stats.pendingContracts}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-yellow-500 h-2.5 rounded-full" 
                style={{ width: `${stats.totalClients ? (stats.pendingContracts / stats.totalClients * 100) : 0}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                <span>Documentos Pendentes</span>
              </div>
              <span className="font-semibold">{stats.pendingDocuments}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-orange-500 h-2.5 rounded-full" 
                style={{ width: `${stats.totalClients ? (stats.pendingDocuments / stats.totalClients * 100) : 0}%` }}
              ></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSummary;