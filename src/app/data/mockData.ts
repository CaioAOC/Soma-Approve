export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  uploadedAt: Date;
  deadline: Date;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  type: string;
  feedback?: string;
  feedbackCategories?: string[];
  clientId: string;
  storageProvider?: 'direct-url' | 'google-drive';
  googleDriveFileId?: string;
  googleDriveFolderId?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatarUrl?: string;
  videosTotal: number;
  videosPending: number;
  videosApproved: number;
  lastActivity: Date;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  avatarUrl?: string;
}

// Mock videos
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Reels Campanha Setembro #1',
    description: 'Conteúdo para campanha de lançamento da nova coleção',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 30,
    uploadedAt: new Date('2024-01-28T10:30:00'),
    deadline: new Date('2024-01-30T23:59:00'),
    status: 'pending',
    priority: 'high',
    type: 'Instagram Reels',
    clientId: 'client-1',
    storageProvider: 'direct-url'
  },
  {
    id: '2',
    title: 'Stories Promoção Black Friday',
    description: 'Anúncio de ofertas especiais para Black Friday',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: 15,
    uploadedAt: new Date('2024-01-27T14:20:00'),
    deadline: new Date('2024-01-29T18:00:00'),
    status: 'pending',
    priority: 'medium',
    type: 'Instagram Stories',
    clientId: 'client-1',
    storageProvider: 'direct-url'
  },
  {
    id: '3',
    title: 'TikTok Tutorial Produto #5',
    description: 'Tutorial de uso do novo produto X',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 45,
    uploadedAt: new Date('2024-01-26T09:15:00'),
    deadline: new Date('2024-02-01T12:00:00'),
    status: 'approved',
    priority: 'low',
    type: 'TikTok',
    clientId: 'client-1',
    storageProvider: 'direct-url'
  },
  {
    id: '4',
    title: 'YouTube Shorts - Tendências 2024',
    description: 'Vídeo sobre as principais tendências para o próximo ano',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: 60,
    uploadedAt: new Date('2024-01-25T16:45:00'),
    deadline: new Date('2024-01-28T23:59:00'),
    status: 'rejected',
    priority: 'medium',
    type: 'YouTube Shorts',
    feedback: 'A edição precisa ser mais dinâmica e a música não combina com o conteúdo. Por favor, revisar a paleta de cores.',
    feedbackCategories: ['Edição', 'Áudio', 'Cor/Gradiente'],
    clientId: 'client-1',
    storageProvider: 'direct-url'
  },
  {
    id: '5',
    title: 'Reels Depoimento Cliente',
    description: 'Depoimento de cliente satisfeito com o produto',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: 25,
    uploadedAt: new Date('2024-01-28T11:00:00'),
    deadline: new Date('2024-01-30T15:00:00'),
    status: 'pending',
    priority: 'high',
    type: 'Instagram Reels',
    clientId: 'client-1',
    storageProvider: 'direct-url'
  }
];

// Mock clients
export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Maria Silva',
    email: 'maria@empresa.com',
    company: 'Empresa XYZ',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    videosTotal: 45,
    videosPending: 3,
    videosApproved: 40,
    lastActivity: new Date('2024-01-28T14:30:00'),
    isActive: true
  },
  {
    id: 'client-2',
    name: 'João Santos',
    email: 'joao@startup.com',
    company: 'Startup ABC',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    videosTotal: 28,
    videosPending: 1,
    videosApproved: 25,
    lastActivity: new Date('2024-01-27T09:15:00'),
    isActive: true
  },
  {
    id: 'client-3',
    name: 'Ana Costa',
    email: 'ana@boutique.com',
    company: 'Boutique Fashion',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    videosTotal: 62,
    videosPending: 5,
    videosApproved: 54,
    lastActivity: new Date('2024-01-28T16:20:00'),
    isActive: true
  }
];

// Current user (mock)
export const currentUser: User = {
  id: 'user-1',
  name: 'Maria Silva',
  email: 'maria@empresa.com',
  role: 'client',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
};

export const adminUser: User = {
  id: 'admin-1',
  name: 'Admin SOMA',
  email: 'admin@soma.com',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
};

// Feedback categories
export const feedbackCategories = [
  'Áudio',
  'Edição',
  'Cor/Gradiente',
  'Texto/Legenda',
  'Duração',
  'Outro'
];

// Priority levels
export const priorityLevels = [
  { value: 'low', label: 'Baixa', color: '#3B82F6' },
  { value: 'medium', label: 'Média', color: '#F59E0B' },
  { value: 'high', label: 'Alta', color: '#EF4444' }
];

// Time remaining helper
export function getTimeRemaining(deadline: Date): string {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  
  if (diff < 0) return 'Atrasado';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d restante${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours}h restante${hours > 1 ? 's' : ''}`;
  
  return 'Menos de 1h';
}