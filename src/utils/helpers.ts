export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const sortClients = <T extends Record<string, any>>(
  items: T[],
  field: keyof T,
  direction: 'asc' | 'desc'
) => {
  const sortedItems = [...items].sort((a, b) => {
    if (a[field] === null) return 1;
    if (b[field] === null) return -1;
    
    if (field === 'serviceDate' || field === 'documentSentDate' || field === 'documentsReceivedDate' || field === 'createdAt') {
      const dateA = a[field] ? new Date(a[field]).getTime() : 0;
      const dateB = b[field] ? new Date(b[field]).getTime() : 0;
      
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    // For boolean values, true comes before false in ascending order
    if (typeof a[field] === 'boolean') {
      return direction === 'asc'
        ? a[field] === b[field] ? 0 : a[field] ? -1 : 1
        : a[field] === b[field] ? 0 : a[field] ? 1 : -1;
    }
    
    // String comparison
    const valueA = String(a[field]).toLowerCase();
    const valueB = String(b[field]).toLowerCase();
    
    return direction === 'asc'
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
  
  return sortedItems;
};

export const filterClients = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
) => {
  if (!searchTerm.trim()) return items;
  
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  
  return items.filter((item) => {
    return searchFields.some((field) => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowercasedSearchTerm);
    });
  });
};