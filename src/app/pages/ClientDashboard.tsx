import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { SomaCard } from '@/app/components/soma/SomaCard';
import { SomaButton } from '@/app/components/soma/SomaButton';
import { EmptyState } from '@/app/components/soma/EmptyState';
import { mockVideos, currentUser, getTimeRemaining, Video } from '@/app/data/mockData';
import { 
  Play, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  LogOut, 
  Bell, 
  Filter, 
  Search, 
  Sparkles,
  Zap,
  Video as VideoIcon,
  Cloud
} from 'lucide-react';
import { getSessionUser, clearSessionUser } from '@/app/lib/auth';

export function ClientDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [clickedFilter, setClickedFilter] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Estado para controlar o redimensionamento
  const [isResizing, setIsResizing] = useState(false);

  // Sessão do usuário
  const user = getSessionUser() || currentUser;

  // Guard de sessão
  useEffect(() => {
    const sessionUser = getSessionUser();
    if (!sessionUser) {
      navigate('/');
      return;
    }
    if (sessionUser.role === 'admin') {
      navigate('/admin');
      return;
    }
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    clearSessionUser();
    navigate('/');
  };

  const filteredVideos = mockVideos.filter(video => {
    const matchesFilter = filter === 'all' || video.status === filter;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = mockVideos.filter(v => v.status === 'pending').length;
  const approvedCount = mockVideos.filter(v => v.status === 'approved').length;
  const rejectedCount = mockVideos.filter(v => v.status === 'rejected').length;

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { 
        bg: 'bg-black/90 border border-yellow-500/50', 
        text: 'text-yellow-400', 
        label: 'Pendente',
        icon: Clock,
        color: '#f59e0b'
      },
      approved: { 
        bg: 'bg-black/90 border border-emerald-500/50', 
        text: 'text-emerald-400', 
        label: 'Aprovado',
        icon: CheckCircle,
        color: '#10b981'
      },
      rejected: { 
        bg: 'bg-black/90 border border-rose-500/50', 
        text: 'text-rose-400', 
        label: 'Rejeitado',
        icon: AlertCircle,
        color: '#f43f5e'
      }
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    
    return (
      <motion.span 
        initial={false}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.03 }}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${badge.bg} ${badge.text} flex items-center justify-center gap-1.5 shadow-lg`}
      >
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </motion.span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      low: { 
        color: 'text-blue-400', 
        bg: 'bg-blue-900/50',
        label: 'Baixa',
        colorHex: '#3b82f6'
      },
      medium: { 
        color: 'text-yellow-400', 
        bg: 'bg-yellow-900/50',
        label: 'Média',
        colorHex: '#f59e0b'
      },
      high: { 
        color: 'text-rose-400', 
        bg: 'bg-rose-900/50',
        label: 'Alta',
        colorHex: '#f43f5e'
      }
    };
    const badge = badges[priority as keyof typeof badges];
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.color} flex items-center justify-center`}>
        {badge.label}
      </span>
    );
  };

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'pending', label: 'Pendentes' },
    { key: 'approved', label: 'Aprovados' },
    { key: 'rejected', label: 'Rejeitados' }
  ];

  const handleFilterClick = (filterKey: any, index: number) => {
    setFilter(filterKey);
    setClickedFilter(index);
    setTimeout(() => setClickedFilter(null), 100);
  };

  // Gerar posições fixas para as partículas
  const [particlePositions] = useState(() => 
    Array.from({ length: 40 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
    }))
  );

  // Gerar posições fixas para a neblina
  const [fogPositions] = useState(() => 
    Array.from({ length: 8 }, () => ({
      width: Math.random() * 300 + 100,
      height: Math.random() * 300 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      xRange: Math.random() * 50 - 25,
      yRange: Math.random() * 50 - 25,
    }))
  );

  // Gerar posições fixas para os anéis
  const [ringPositions] = useState(() => 
    Array.from({ length: 5 }, () => ({
      size: Math.random() * 200 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }))
  );

  // Adicionar debounce para redimensionamento
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsResizing(false);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 p-4 md:p-8 relative overflow-hidden">
      {/* Efeito de fundo da página Register - PARTÍCULAS BRILHANTES */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Grade de fundo sutil */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #8c52ff 1px, transparent 1px),
                             linear-gradient(to bottom, #8c52ff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Partículas brilhantes animadas - POSIÇÕES FIXAS */}
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#8c52ff] rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
              repeatType: "loop"
            }}
          />
        ))}
        
        {/* Neblina roxa sutil - POSIÇÕES FIXAS */}
        <div className="absolute inset-0">
          {fogPositions.map((fog, i) => (
            <motion.div
              key={`fog-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${fog.width}px`,
                height: `${fog.height}px`,
                left: `${fog.left}%`,
                top: `${fog.top}%`,
                background: `radial-gradient(circle, rgba(140, 82, 255, 0.08), rgba(178, 125, 255, 0.04), transparent 70%)`,
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, fog.xRange, 0],
                y: [0, fog.yRange, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: fog.duration,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop"
              }}
            />
          ))}
        </div>

        {/* Anéis de energia sutil - POSIÇÕES FIXAS */}
        {ringPositions.map((ring, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-[#8c52ff]/10"
            style={{
              width: `${ring.size}px`,
              height: `${ring.size}px`,
              left: `${ring.left}%`,
              top: `${ring.top}%`,
              borderWidth: '1px',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: ring.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ring.delay,
              repeatType: "loop"
            }}
          />
        ))}
      </div>

      {/* Header - Estilo SOMA */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 relative z-10"
      >
        {/* User Info Card - Estilo SOMA */}
        <div className="bg-gradient-to-br from-black/80 to-gray-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 mb-6 shadow-2xl shadow-purple-900/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.03 }}
                className="relative"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8c52ff] to-[#b27dff] p-0.5">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover border-2 border-black"
                  />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear', repeatType: "loop" }}
                  className="absolute -inset-1 rounded-full border border-[#8c52ff]/20 border-t-transparent"
                />
              </motion.div>

              <div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    Olá, {user.name}! 
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-[#8c52ff]" />
                    </motion.span>
                  </h1>
                  <p className="text-sm text-gray-400">
                    Gerente de conteúdo na {user.company}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Stats - Estilo SOMA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { 
                  count: pendingCount, 
                  label: 'Pendentes', 
                  color: 'text-yellow-400',
                  bg: 'from-yellow-900/30 to-yellow-900/10',
                  icon: Clock,
                  hoverColor: '#f59e0b'
                },
                { 
                  count: approvedCount, 
                  label: 'Aprovados', 
                  color: 'text-emerald-400',
                  bg: 'from-emerald-900/30 to-emerald-900/10',
                  icon: CheckCircle,
                  hoverColor: '#10b981'
                },
                { 
                  count: rejectedCount, 
                  label: 'Rejeitados', 
                  color: 'text-rose-400',
                  bg: 'from-rose-900/30 to-rose-900/10',
                  icon: AlertCircle,
                  hoverColor: '#f43f5e'
                }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.03 }}
                    className="text-center"
                  >
                    <div className={`bg-gradient-to-br ${stat.bg} border border-white/5 rounded-xl p-3`}>
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.count}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                        <Icon className="w-3.5 h-3.5" />
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Actions - BOTÕES COM ANIMAÇÃO RÁPIDA */}
            <div className="flex items-center gap-3">
              {/* Botão de Notificação - CORRIGIDO */}
              <motion.div
                onMouseEnter={() => setHoveredButton('notification')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '12px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  transition: 'all 0.03s',
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                  overflow: 'visible',
                }}
                whileHover={{ 
                  y: -1,
                  scale: 1.02,
                  transition: { 
                    duration: 0.03,
                    ease: "easeInOut"
                  }
                }}
                whileTap={{ 
                  scale: 0.99,
                  transition: { 
                    duration: 0.02
                  }
                }}
              >
                <button className="relative p-2.5 rounded-xl bg-black/50 border border-white/5 hover:border-[#8c52ff]/40 transition-all duration-50 flex items-center justify-center group relative z-10">
                  <Bell className="w-5 h-5 text-gray-300 group-hover:text-[#8c52ff] transition-colors duration-50" />
                  {pendingCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.1 }}
                      className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] rounded-full text-xs flex items-center justify-center font-medium text-white shadow-lg px-1.5 z-50"
                      style={{
                        transform: 'translateZ(50px)',
                      }}
                    >
                      <span className="whitespace-nowrap text-[10px] font-bold leading-none">
                        {pendingCount}
                      </span>
                    </motion.div>
                  )}
                </button>
              </motion.div>

              {/* Botão Sair */}
              <motion.div
                onMouseEnter={() => setHoveredButton('logout')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '12px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  transition: 'all 0.03s',
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ 
                  y: -1,
                  scale: 1.02,
                  transition: { 
                    duration: 0.03,
                    ease: "easeInOut"
                  }
                }}
                whileTap={{ 
                  scale: 0.99,
                  transition: { 
                    duration: 0.02
                  }
                }}
              >
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-black/50 border border-white/5 text-gray-300 hover:text-rose-400 hover:border-rose-500/40 rounded-xl font-medium text-sm transition-all duration-50 flex items-center justify-center gap-2 relative z-10"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Search and Filters - Estilo SOMA */}
        <div className="bg-gradient-to-br from-black/80 to-gray-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl shadow-purple-900/10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search - CORRIGIDO: Centralização do ícone de busca */}
            <div className="relative flex-1 w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar vídeos por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-black/30 border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8c52ff] focus:shadow-lg focus:shadow-[#8c52ff]/20 transition-all duration-50"
                  style={{ paddingRight: '3.5rem' }}
                />
                {/* Botão de busca CORRIGIDO - Centralizado verticalmente */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8">
                  <motion.div
                    onMouseEnter={() => setIsSearchHovered(true)}
                    onMouseLeave={() => setIsSearchHovered(false)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '8px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.03s',
                      transformStyle: 'preserve-3d',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { 
                        duration: 0.03,
                        ease: "easeInOut"
                      }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { 
                        duration: 0.02
                      }
                    }}
                  >
                    <button 
                      className="p-2 h-full flex items-center justify-center rounded-lg bg-gradient-to-br from-[#8c52ff]/20 to-[#b27dff]/10 border border-white/5 hover:border-[#8c52ff]/40 transition-all duration-50 relative z-10"
                      style={{ minWidth: '36px' }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: isSearchHovered ? [0, 10, -10, 0] : 0,
                          scale: isSearchHovered ? 1.05 : 1
                        }}
                        transition={{ 
                          rotate: { 
                            duration: 0.2, 
                            repeat: isSearchHovered ? Infinity : 0,
                          },
                          scale: { duration: 0.03 }
                        }}
                        className="flex items-center justify-center"
                      >
                        <Search className="w-4 h-4 text-[#8c52ff]" />
                      </motion.div>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Filters - CORRIGIDO: Estilo original sem barra de rolagem */}
            <div className="flex gap-3 flex-wrap md:flex-nowrap">
              {filters.map((f, index) => (
                <motion.div
                  key={f.key}
                  className="relative"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: filter === f.key ? 1.01 : 1,
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05 
                  }}
                  onMouseEnter={() => setHoveredCard(f.key)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    background: filter === f.key 
                      ? 'linear-gradient(135deg, rgba(140, 82, 255, 0.15), rgba(178, 125, 255, 0.08))'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                    border: filter === f.key 
                      ? '1px solid rgba(140, 82, 255, 0.5)'
                      : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: filter === f.key 
                      ? '0 8px 20px rgba(140, 82, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.03s',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={{ 
                    y: -2,
                    scale: 1.02,
                    transition: { 
                      duration: 0.03,
                      ease: "easeInOut"
                    }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { 
                      duration: 0.02
                    }
                  }}
                >
                  {/* Efeito de brilho no fundo quando ativo */}
                  {filter === f.key && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/20 to-[#b27dff]/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                    />
                  )}
                  
                  {/* Efeito de brilho no hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/0 via-[#8c52ff]/0 to-[#b27dff]/0"
                    animate={{
                      background: hoveredCard === f.key 
                        ? 'linear-gradient(135deg, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                        : 'linear-gradient(135deg, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                    }}
                    transition={{ duration: 0.03 }}
                  />
                  
                  <button
                    onClick={() => handleFilterClick(f.key, index)}
                    className={`
                      relative w-full h-full px-6 py-3 rounded-xl text-sm font-medium
                      flex items-center justify-center
                      min-w-[120px]
                      transition-all duration-50
                      ${filter === f.key
                        ? 'text-white' 
                        : 'text-gray-300 hover:text-white'
                      }
                      backdrop-blur-sm
                      z-10
                    `}
                    style={{
                      transformOrigin: 'center',
                    }}
                  >
                    {/* Texto centralizado */}
                    <span className="relative z-10 whitespace-nowrap font-semibold text-center">
                      {f.label}
                    </span>

                    {/* Indicador ativo - apenas para o botão selecionado */}
                    {filter === f.key && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          duration: 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#ff5252] to-[#ff8c52] shadow-lg z-50"
                      />
                    )}
                  </button>
                  
                  {/* Efeito de borda brilhante quando ativo */}
                  {filter === f.key && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-[#8c52ff]/30 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Videos Grid - Estilo SOMA */}
      {filteredVideos.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: hoveredVideo === index ? 1.01 : 1,
              }}
              transition={{ 
                duration: 0.3
              }}
              onHoverStart={() => setHoveredVideo(index)}
              onHoverEnd={() => setHoveredVideo(null)}
              whileHover={{ 
                y: -1,
                scale: 1.02,
                transition: { 
                  duration: 0.03,
                  ease: "easeInOut"
                }
              }}
              whileTap={{ 
                scale: 0.99,
                transition: { 
                  duration: 0.02
                }
              }}
              style={{
                cursor: 'pointer',
                borderRadius: '12px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.03s',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/0 via-[#8c52ff]/0 to-[#b27dff]/0"
                animate={{
                  background: hoveredVideo === index 
                    ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                    : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                }}
                transition={{ duration: 0.03 }}
              />

              <div
                className="p-4 h-full relative z-10"
                onClick={() => video.status === 'pending' && navigate(`/review/${video.id}`)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transform transition-transform duration-50 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Time badge */}
                  {video.status === 'pending' && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.03 }}
                      className="absolute top-3 right-3"
                    >
                      <span className="px-2.5 py-1 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-full text-xs font-bold flex items-center justify-center shadow-lg">
                        ⏰ {getTimeRemaining(video.deadline)}
                      </span>
                    </motion.div>
                  )}

                  {/* Play icon overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.03 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8c52ff] to-[#b27dff] flex items-center justify-center shadow-2xl"
                    >
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </motion.div>
                  </motion.div>

                  {/* Duration */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/80 backdrop-blur-sm rounded-full text-xs border border-white/10 flex items-center justify-center">
                      {video.duration}s
                    </span>
                  </div>

                  {/* Priority */}
                  <div className="absolute bottom-3 right-3">
                    {getPriorityBadge(video.priority)}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="line-clamp-1 mb-2 font-semibold text-white">
                        {video.title}
                      </h4>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      {getStatusBadge(video.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <VideoIcon className="w-4 h-4" />
                      <span>{video.type}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{video.uploadedAt.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  {video.status === 'pending' && (
                    <motion.div
                      initial={false}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.03 }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/review/${video.id}`);
                        }}
                        className="w-full mt-2 px-4 py-2.5 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#8c52ff]/40 transition-all duration-50 flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Revisar Agora
                      </button>
                    </motion.div>
                  )}

                  {video.status === 'approved' && (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.03 }}
                      className="flex items-center justify-center gap-3 p-3 rounded-xl bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border border-emerald-500/30"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-sm font-medium text-emerald-400">Aprovado</p>
                      </div>
                    </motion.div>
                  )}

                  {video.status === 'rejected' && (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.03 }}
                      className="flex items-center justify-center gap-3 p-3 rounded-xl bg-gradient-to-br from-rose-900/30 to-rose-900/10 border border-rose-500/30"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                      <div>
                        <p className="text-sm font-medium text-rose-400">Rejeitado</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 mt-12"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
            >
              <VideoIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">Nenhum vídeo encontrado</h3>
            <p className="text-gray-500 mb-6">Tente ajustar os filtros ou os termos de busca</p>
            
            {/* Botão Limpar Filtros com animação rápida */}
            <motion.div
              onMouseEnter={() => setHoveredButton('clear')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                cursor: 'pointer',
                borderRadius: '12px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.03s',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-block',
              }}
              whileHover={{ 
                y: -1,
                scale: 1.02,
                transition: { 
                  duration: 0.03,
                  ease: "easeInOut"
                }
              }}
              whileTap={{ 
                scale: 0.99,
                transition: { 
                  duration: 0.02
                }
              }}
            >
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchTerm('');
                }}
                className="px-6 py-2.5 bg-black/50 border border-white/5 text-white hover:text-[#8c52ff] hover:border-[#8c52ff] rounded-xl font-medium text-sm transition-all duration-50 flex items-center justify-center mx-auto group relative z-10"
              >
                <motion.span
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.1 }}
                >
                  <Filter className="inline w-4 h-4 mr-2 group-hover:text-[#8c52ff] transition-colors duration-50" />
                </motion.span>
                Limpar Filtros
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}