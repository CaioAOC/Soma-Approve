/**
 * Mapeamento de pasta do Google Drive por cliente
 */
export interface ClientDriveFolderMapping {
  clientId: string;
  clientName: string;
  googleDriveFolderId: string;
  lastSync?: Date;
}

/**
 * Candidato a vídeo encontrado no Google Drive
 */
export interface DriveVideoCandidate {
  fileId: string;
  fileName: string;
  mimeType: string;
  createdTime: Date;
  folderId: string;
}

/**
 * Busca mapeamentos de pastas do Google Drive por cliente
 * Em produção, isso viria do backend
 */
export async function fetchClientDriveFolderMappings(): Promise<ClientDriveFolderMapping[]> {
  // Mock de dados - em produção viria da API
  const endpoint = import.meta.env.VITE_DRIVE_CLIENT_FOLDER_ENDPOINT || '/api/drive/client-folders';
  
  try {
    // Simular chamada à API
    // const response = await fetch(endpoint);
    // const data = await response.json();
    // return data.mappings;
    
    // Mock data para demonstração
    return [
      {
        clientId: 'client-1',
        clientName: 'Maria Silva',
        googleDriveFolderId: '1A2B3C4D5E6F7G8H9I0J',
        lastSync: new Date('2024-01-28T10:00:00')
      },
      {
        clientId: 'client-2',
        clientName: 'João Santos',
        googleDriveFolderId: '2B3C4D5E6F7G8H9I0J1K',
        lastSync: new Date('2024-01-27T15:30:00')
      },
      {
        clientId: 'client-3',
        clientName: 'Ana Costa',
        googleDriveFolderId: '3C4D5E6F7G8H9I0J1K2L',
        lastSync: new Date('2024-01-28T09:45:00')
      }
    ];
  } catch (error) {
    console.error('Erro ao buscar mapeamentos de pastas:', error);
    return [];
  }
}

/**
 * Sincroniza vídeos pendentes das pastas do Google Drive
 * Em produção, isso seria feito pelo backend
 */
export async function syncPendingVideosFromDrive(): Promise<DriveVideoCandidate[]> {
  const endpoint = import.meta.env.VITE_DRIVE_SYNC_ENDPOINT || '/api/drive/sync';
  
  try {
    // Simular chamada à API
    // const response = await fetch(endpoint, { method: 'POST' });
    // const data = await response.json();
    // return data.videos;
    
    // Mock data para demonstração
    return [];
  } catch (error) {
    console.error('Erro ao sincronizar vídeos do Drive:', error);
    return [];
  }
}

/**
 * Normaliza um fileId do Google Drive removendo caracteres inválidos
 */
export function normalizeDriveFileId(fileId: string): string {
  if (!fileId) return '';
  
  // Remove espaços e caracteres especiais
  return fileId.trim().replace(/[^a-zA-Z0-9_-]/g, '');
}
