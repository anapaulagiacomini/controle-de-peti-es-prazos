import React, { useState } from 'react';
import { useClients } from '../../contexts/ClientContext';
import Card from '../ui/Card';
import { Button } from '../ui/Button';
import Badge from '../ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import LawyerForm from './LawyerForm';

const LawyerList: React.FC = () => {
  const { lawyers, addLawyer, updateLawyer, deleteLawyer, clients } = useClients();
  const [showForm, setShowForm] = useState(false);

  const handleAddLawyer = (name: string) => {
    addLawyer(name);
    setShowForm(false);
  };

  const handleToggleActive = (id: string, currentActive: boolean) => {
    updateLawyer(id, { active: !currentActive });
  };

  const handleDelete = (id: string, name: string) => {
    const assignedCases = clients.filter(client => client.assignedLawyer === name).length;
    
    if (assignedCases > 0) {
      alert(`Não é possível excluir este advogado pois possui ${assignedCases} caso(s) atribuído(s).`);
      return;
    }

    if (confirm(`Deseja excluir o advogado ${name}?`)) {
      deleteLawyer(id);
    }
  };

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Lista de Advogados</h2>
        {!showForm && (
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
            icon={<Plus className="h-4 w-4" />}
          >
            Novo Advogado
          </Button>
        )}
      </div>

      {showForm ? (
        <LawyerForm
          onSubmit={handleAddLawyer}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="space-y-4">
          {lawyers.length > 0 ? (
            lawyers.map((lawyer) => {
              const assignedCases = clients.filter(
                client => client.assignedLawyer === lawyer.name
              ).length;

              return (
                <div
                  key={lawyer.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{lawyer.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={lawyer.active ? 'success' : 'warning'}>
                          {lawyer.active ? 'Ativo' : 'Inativo'}
                        </Badge>
                        <Badge variant="info">
                          {assignedCases} caso{assignedCases !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={lawyer.active ? 'warning' : 'success'}
                      size="sm"
                      onClick={() => handleToggleActive(lawyer.id, lawyer.active)}
                    >
                      {lawyer.active ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<Trash2 className="h-4 w-4" />}
                      onClick={() => handleDelete(lawyer.id, lawyer.name)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-4">
              Nenhum advogado cadastrado.
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default LawyerList;