import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { SomaCard } from '@/app/components/soma/SomaCard';
import { SomaButton } from '@/app/components/soma/SomaButton';
import { KPICard } from '@/app/components/soma/KPICard';
import { mockVideos, mockClients, adminUser } from '@/app/data/mockData';
import { 
  Users, Video, CheckCircle, Clock, Upload, Settings, LogOut, 
  TrendingUp, AlertCircle, Activity 
} from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'videos' | 'clients' | 'upload'>('dashboard');

  const totalClients = mockClients.length;
  const pendingVideos = mockVideos.filter(v => v.status === 'pending').length;
  const approvalRate = Math.round((mockVideos.filter(v => v.status === 'approved').length / mockVideos.length) * 100);
  const avgTime = '2.5h';

  const recentActivity = [
    { id: 1, client: 'Maria Silva', action: 'aprovou', video: 'Reels Campanha Setembro #1', time: '5 min atrás', type: 'approved' },
    { id: 2, client: 'João Santos', action: 'rejeitou', video: 'Stories Promoção', time: '15 min atrás', type: 'rejected' },
    { id: 3, admin: 'Admin', action: 'enviou novo vídeo para', client: 'Ana Costa', time: '1h atrás', type: 'upload' },
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-gradient-to-br from-black/90 to-gray-900/80 backdrop-blur-sm border-r border-white/10 p-6 hidden md:block"
      >
        <div className="mb-8">
          <h2 className="mb-1 text-white">SOMA Approve</h2>
          <p className="text-sm text-gray-400">Painel Admin</p>
        </div>

        <nav className="space-y-2 mb-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'videos', label: 'Vídeos', icon: Video },
            { id: 'clients', label: 'Clientes', icon: Users },
            { id: 'upload', label: 'Upload', icon: Upload },
          ].map(({ id, label, icon: Icon }) => (
            <motion.div
              key={id}
              className="relative"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: activeTab === id ? 1.02 : 1,
              }}
              transition={{ 
                duration: 0.3,
                delay: parseInt(id === 'dashboard' ? '0' : id === 'videos' ? '0.05' : id === 'clients' ? '0.1' : '0.15') 
              }}
              style={{
                cursor: 'pointer',
                borderRadius: '12px',
                background: activeTab === id 
                  ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.15), rgba(178, 125, 255, 0.08))'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: activeTab === id 
                  ? '1px solid rgba(140, 82, 255, 0.5)'
                  : '1px solid rgba(255,255,255,0.1)',
                boxShadow: activeTab === id 
                  ? '0 8px 20px rgba(140, 82, 255, 0.3)'
                  : '0 8px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.1s',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ 
                y: -4,
                scale: 1.05,
                transition: { 
                  duration: 0.1
                }
              }}
              onMouseEnter={() => setHoveredTab(id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {/* Efeito de brilho no hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/0 via-[#8c52ff]/0 to-[#b27dff]/0 rounded-xl"
                animate={{
                  background: hoveredTab === id 
                    ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.2), rgba(178, 125, 255, 0.1))'
                    : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                }}
                transition={{ duration: 0.1 }}
              />

              <button
                onClick={() => setActiveTab(id as any)}
                className={`
                  relative w-full h-full px-4 py-3 rounded-xl text-sm font-medium
                  flex items-center gap-3
                  transition-all duration-100
                  ${activeTab === id
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
                <Icon className="w-5 h-5" />
                <span className="relative z-10 whitespace-nowrap font-semibold text-center">
                  {label}
                </span>
              </button>
            </motion.div>
          ))}
        </nav>

        {/* Removida a linha divisória e ajustado o espaçamento */}
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={adminUser.avatarUrl}
              alt={adminUser.name}
              className="w-10 h-10 rounded-full border-2 border-[#8c52ff]/30"
            />
            <div>
              <p className="text-sm font-medium text-white">{adminUser.name}</p>
              <p className="text-xs text-gray-400">{adminUser.email}</p>
            </div>
          </div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            transition={{ 
              duration: 0.3,
              delay: 0.2
            }}
            style={{
              cursor: 'pointer',
              borderRadius: '12px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              transition: 'all 0.1s',
              transformStyle: 'preserve-3d',
              position: 'relative',
              overflow: 'hidden',
            }}
            whileHover={{ 
              y: -4,
              scale: 1.05,
              transition: { 
                duration: 0.1
              }
            }}
          >
            <button
              onClick={() => navigate('/')}
              className="w-full px-4 py-3 text-sm font-medium text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-colors duration-100 relative z-10"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto bg-gradient-to-br from-gray-950 via-black to-gray-950">
        {activeTab === 'dashboard' && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-white"
            >
              Dashboard
            </motion.h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total de Clientes', value: totalClients, icon: <Users className="w-6 h-6" />, color: 'text-[#8c52ff]', bg: 'bg-[#8c52ff]/20' },
                { label: 'Vídeos Pendentes', value: pendingVideos, icon: <Clock className="w-6 h-6" />, color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/20' },
                { label: 'Taxa de Aprovação', value: `${approvalRate}%`, icon: <CheckCircle className="w-6 h-6" />, color: 'text-[#10b981]', bg: 'bg-[#10b981]/20' },
                { label: 'Tempo Médio', value: avgTime, icon: <TrendingUp className="w-6 h-6" />, color: 'text-[#3b82f6]', bg: 'bg-[#3b82f6]/20' },
              ].map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: hoveredCard === index ? 1.02 : 1,
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.1 
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ 
                    y: -4,
                    scale: 1.05,
                    transition: { 
                      duration: 0.1
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.1s',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Efeito de brilho no hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/0 via-[#8c52ff]/0 to-[#b27dff]/0"
                    animate={{
                      background: hoveredCard === index 
                        ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                        : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                    }}
                    transition={{ duration: 0.1 }}
                  />

                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${kpi.bg}`}>
                        <div className={kpi.color}>
                          {kpi.icon}
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">{kpi.value}</p>
                    <p className="text-sm text-gray-400">{kpi.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              transition={{ 
                duration: 0.3,
                delay: 0.4
              }}
              style={{
                borderRadius: '12px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.1s',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ 
                y: -4,
                scale: 1.02,
                transition: { 
                  duration: 0.1
                }
              }}
            >
              <div className="relative z-10 p-6">
                <h3 className="mb-6 text-white">Atividades Recentes</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'approved' ? 'bg-[#10b981]/20' :
                        activity.type === 'rejected' ? 'bg-[#f43f5e]/20' :
                        'bg-[#3b82f6]/20'
                      }`}>
                        {activity.type === 'approved' && <CheckCircle className="w-5 h-5 text-[#10b981]" />}
                        {activity.type === 'rejected' && <AlertCircle className="w-5 h-5 text-[#f43f5e]" />}
                        {activity.type === 'upload' && <Upload className="w-5 h-5 text-[#3b82f6]" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <strong>{activity.client || activity.admin}</strong> {activity.action}{' '}
                          {activity.video && <strong>{activity.video}</strong>}
                          {activity.client && !activity.video && <strong>{activity.client}</strong>}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'clients' && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-white"
            >
              Gestão de Clientes
            </motion.h1>

            <div className="grid grid-cols-1 gap-6">
              {mockClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: hoveredCard === index ? 1.02 : 1,
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.1 
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ 
                    y: -4,
                    scale: 1.05,
                    transition: { 
                      duration: 0.1
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.1s',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Efeito de brilho no hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/0 via-[#8c52ff]/0 to-[#b27dff]/0"
                    animate={{
                      background: hoveredCard === index 
                        ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                        : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                    }}
                    transition={{ duration: 0.1 }}
                  />

                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-6">
                      <img
                        src={client.avatarUrl}
                        alt={client.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#8c52ff]/30"
                      />
                      <div className="flex-1">
                        <h3 className="mb-1 text-white">{client.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{client.email}</p>
                        {client.company && (
                          <p className="text-sm text-[#8c52ff]">{client.company}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex gap-6 mb-2">
                          <div>
                            <p className="text-sm text-gray-400">Pendentes</p>
                            <p className="text-xl font-bold text-[#f59e0b]">{client.videosPending}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Aprovados</p>
                            <p className="text-xl font-bold text-[#10b981]">{client.videosApproved}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Total</p>
                            <p className="text-xl font-bold text-white">{client.videosTotal}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">
                          Última atividade: {client.lastActivity.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'upload' && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-white"
            >
              Upload de Vídeo
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              transition={{ 
                duration: 0.3,
                delay: 0.1
              }}
              style={{
                borderRadius: '12px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.1s',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden',
                maxWidth: '48rem',
              }}
              whileHover={{ 
                y: -4,
                scale: 1.02,
                transition: { 
                  duration: 0.1
                }
              }}
            >
              <div className="relative z-10 p-6">
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-[#8c52ff] transition-colors cursor-pointer group">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-[#8c52ff] group-hover:scale-110 transition-transform" />
                  <h3 className="mb-2 text-white">Arraste vídeos aqui ou clique para selecionar</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Formatos suportados: MP4, MOV, AVI (max 500MB)
                  </p>
                  <motion.div
                    className="inline-block"
                    style={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                      transition: 'all 0.1s',
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    whileHover={{ 
                      y: -4,
                      scale: 1.05,
                      transition: { 
                        duration: 0.1
                      }
                    }}
                  >
                    <button className="px-6 py-3 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#8c52ff]/40 transition-all duration-100 relative z-10">
                      Selecionar Arquivo
                    </button>
                  </motion.div>
                </div>

                <div className="mt-8 space-y-4">
                  <div>
                    <label className="block mb-2 text-white">Título do vídeo</label>
                    <input
                      type="text"
                      placeholder="Ex: Reels Campanha Outubro"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-white">Cliente</label>
                    <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8c52ff] transition-colors">
                      <option>Selecione um cliente</option>
                      {mockClients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-white">Descrição (opcional)</label>
                    <textarea
                      placeholder="Descrição do vídeo..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-white">Prazo de aprovação</label>
                      <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8c52ff] transition-colors">
                        <option>24 horas</option>
                        <option>48 horas</option>
                        <option>72 horas</option>
                        <option>Personalizado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-white">Prioridade</label>
                      <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8c52ff] transition-colors">
                        <option>Baixa</option>
                        <option>Média</option>
                        <option>Alta</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-4">
                    <motion.div
                      style={{
                        cursor: 'pointer',
                        borderRadius: '12px',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        transition: 'all 0.1s',
                        transformStyle: 'preserve-3d',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      whileHover={{ 
                        y: -4,
                        scale: 1.05,
                        transition: { 
                          duration: 0.1
                        }
                      }}
                    >
                      <button className="px-6 py-3 bg-black/50 border border-white/5 text-gray-300 hover:text-white hover:border-white/10 rounded-xl font-medium text-sm transition-all duration-100 relative z-10">
                        Cancelar
                      </button>
                    </motion.div>

                    <motion.div
                      style={{
                        cursor: 'pointer',
                        borderRadius: '12px',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        transition: 'all 0.1s',
                        transformStyle: 'preserve-3d',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      whileHover={{ 
                        y: -4,
                        scale: 1.05,
                        transition: { 
                          duration: 0.1
                        }
                      }}
                    >
                      <button className="px-6 py-3 bg-gradient-to-br from-[#8c52ff]/20 to-[#b27dff]/10 border border-[#8c52ff]/30 text-[#8c52ff] hover:text-white hover:border-[#8c52ff]/50 rounded-xl font-medium text-sm transition-all duration-100 relative z-10">
                        Salvar Rascunho
                      </button>
                    </motion.div>

                    <motion.div
                      style={{
                        cursor: 'pointer',
                        borderRadius: '12px',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        transition: 'all 0.1s',
                        transformStyle: 'preserve-3d',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      whileHover={{ 
                        y: -4,
                        scale: 1.05,
                        transition: { 
                          duration: 0.1
                        }
                      }}
                    >
                      <button className="px-6 py-3 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#8c52ff]/40 transition-all duration-100 relative z-10">
                        Enviar para Aprovação
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
