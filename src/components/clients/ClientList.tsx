import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../../contexts/ClientContext';
import { Client, SortField } from '../../types';
import { formatDate, sortClients, filterClients } from '../../utils/helpers';
import Card from '../ui/Card';
import { Button } from '../ui/Button';
import Badge from '../ui/Badge';
import { ArrowUp, ArrowDown, Search, Plus, Edit, Trash2 } from 'lucide-react';

const ClientList: React.FC = () => {
  const { 
    clients, 
    deleteClient, 
    sortConfig, 
    setSortConfig,
    searchTerm,
    setSearchTerm
  } = useClients();
  const navigate = useNavigate();
  
  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      direction: 
        prevConfig.field === field && prevConfig.direction === 'asc' 
          ? 'desc' 
          : 'asc',
    }));
  };

  const filteredClients = useMemo(() => {
    const filtered = filterClients(
      clients,
      searchTerm,
      ['name', 'partnerName', 'assignedLawyer']
    );
    return sortClients(
      filtered,
      sortConfig.field,
      sortConfig.direction
    );
  }, [clients, searchTerm, sortConfig]);

  return (
    <Card className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar clientes..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="primary"
          onClick={() => navigate('/clients/new')}
          icon={<Plus className="h-4 w-4" />}
        >
          Novo Cliente
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader 
                title="Nome do Cliente" 
                field="name" 
                currentSort={sortConfig} 
                onSort={handleSort} 
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parceria
              </th>
              <SortableHeader 
                title="Data Atendimento" 
                field="serviceDate" 
                currentSort={sortConfig} 
                onSort={handleSort} 
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <SortableHeader 
                title="Advogado" 
                field="assignedLawyer" 
                currentSort={sortConfig} 
                onSort={handleSort} 
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.isPartnership ? (
                      <div>
                        <Badge variant="info">Parceria</Badge>
                        {client.partnerName && (
                          <div className="text-xs text-gray-500 mt-1">{client.partnerName}</div>
                        )}
                      </div>
                    ) : (
                      <Badge variant="default">Sem Parceria</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(client.serviceDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-2">
                      {client.contractClosed ? (
                        <Badge variant="success">Contrato Fechado</Badge>
                      ) : (
                        <Badge variant="warning">Contrato Pendente</Badge>
                      )}
                      {client.documentsSent && (
                        <Badge variant="info">
                          Docs Enviados: {formatDate(client.documentSentDate)}
                        </Badge>
                      )}
                      {client.documentsReceived && (
                        <Badge variant="success">
                          Docs Recebidos: {formatDate(client.documentsReceivedDate)}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.assignedLawyer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Edit className="h-4 w-4" />}
                        onClick={() => navigate(`/clients/${client.id}/edit`)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash2 className="h-4 w-4" />}
                        onClick={() => {
                          if (confirm(`Deseja excluir o cliente ${client.name}?`)) {
                            deleteClient(client.id);
                          }
                        }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'Nenhum cliente encontrado para esta busca.' : 'Nenhum cliente cadastrado.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

interface SortableHeaderProps {
  title: string;
  field: SortField;
  currentSort: { field: string; direction: string };
  onSort: (field: SortField) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  title,
  field,
  currentSort,
  onSort,
}) => {
  const isCurrentSortField = currentSort.field === field;
  
  return (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{title}</span>
        <div className="flex flex-col">
          {isCurrentSortField ? (
            currentSort.direction === 'asc' ? (
              <ArrowUp className="h-3 w-3 text-indigo-600" />
            ) : (
              <ArrowDown className="h-3 w-3 text-indigo-600" />
            )
          ) : (
            <div className="h-3 w-3 opacity-0 group-hover:opacity-30">
              <ArrowUp className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>
    </th>
  );
};

export default ClientList;