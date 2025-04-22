import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../../contexts/ClientContext';
import { formatDate, sortClients } from '../../utils/helpers';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ArrowRight } from 'lucide-react';

const RecentClients: React.FC = () => {
  const { clients } = useClients();
  const navigate = useNavigate();
  
  // Sort by creation date and get the 5 most recent
  const recentClients = sortClients(clients, 'createdAt', 'desc').slice(0, 5);

  return (
    <Card title="Clientes Recentes" className="mt-6">
      {recentClients.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {recentClients.map((client) => (
            <div 
              key={client.id} 
              className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors px-2 -mx-2 rounded"
              onClick={() => navigate(`/clients/${client.id}/edit`)}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">{client.name}</p>
                  {client.isPartnership && (
                    <Badge variant="info" className="text-xs">Parceria</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Advogado: {client.assignedLawyer} | Atendimento: {formatDate(client.serviceDate)}
                </p>
                <div className="flex space-x-2">
                  {client.contractClosed ? (
                    <Badge variant="success" className="text-xs">Contrato Fechado</Badge>
                  ) : (
                    <Badge variant="warning" className="text-xs">Contrato Pendente</Badge>
                  )}
                  
                  {client.documentsSent && (
                    <Badge variant="info" className="text-xs">Docs Enviados</Badge>
                  )}
                  
                  {client.documentsReceived && (
                    <Badge variant="success" className="text-xs">Docs Recebidos</Badge>
                  )}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 py-4">Nenhum cliente cadastrado ainda.</p>
      )}
      
      {clients.length > 5 && (
        <div className="mt-4 text-right">
          <button 
            onClick={() => navigate('/clients')}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium inline-flex items-center"
          >
            Ver todos os clientes
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      )}
    </Card>
  );
};

export default RecentClients;