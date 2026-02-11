import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  CheckCircle, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Home,
  ArrowLeft 
} from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete registration
      navigate('/dashboard');
    }
  };

  const features = [
    {
      icon: <Play className="w-6 h-6" />,
      title: 'Aprovação Tipo Tinder',
      description: 'Interface simples e intuitiva para revisar vídeos rapidamente'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Feedback Detalhado',
      description: 'Forneça feedback específico com categorias e comentários'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Notificações em Tempo Real',
      description: 'Receba alertas instantâneos sobre novos vídeos e prazos'
    }
  ];

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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Animated background particles - MESMO ESTILO DO LOGIN */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

      {/* Botão voltar para Home no topo da página */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link to="/">
          <motion.div
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
            <button className="px-4 py-2 bg-black/50 border border-white/5 text-gray-300 hover:text-white hover:border-white/10 rounded-xl font-medium text-sm transition-all duration-50 flex items-center justify-center gap-2 relative z-10">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar ao Início</span>
            </button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Painel Central - ESTÁTICO */}
      <div
        style={{
          borderRadius: '12px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          transformStyle: 'preserve-3d',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '32rem',
        }}
        className="relative z-10"
      >
        <div className="relative z-10 p-6 sm:p-8">
          {/* Logo e Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <Sparkles className="w-12 h-12 text-[#8c52ff]" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear', repeatType: "loop" }}
              >
                <Sparkles className="w-12 h-12 text-[#b27dff] opacity-30" />
              </motion.div>
            </div>
            
            <h1 className="text-center mb-2 text-white text-2xl font-bold">Criar Conta</h1>
            <p className="text-center text-gray-400 mb-2">
              Junte-se ao SOMA Approve
            </p>
            
            {/* Pequeno botão de voltar dentro do card (mobile friendly) */}
            <div className="sm:hidden mt-2">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Login
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all ${
                  s <= step ? 'w-12 bg-gradient-to-r from-[#8c52ff] to-[#b27dff]' : 'w-8 bg-white/10'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 text-white">Nome Completo</label>
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: hoveredInput === 'name' 
                          ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                          : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                      }}
                      transition={{ duration: 0.03 }}
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onMouseEnter={() => setHoveredInput('name')}
                      onMouseLeave={() => setHoveredInput(null)}
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-all duration-50 relative z-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-white">Email</label>
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: hoveredInput === 'email' 
                          ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                          : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                      }}
                      transition={{ duration: 0.03 }}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onMouseEnter={() => setHoveredInput('email')}
                      onMouseLeave={() => setHoveredInput(null)}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-all duration-50 relative z-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-white">Empresa (opcional)</label>
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: hoveredInput === 'company' 
                          ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                          : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                      }}
                      transition={{ duration: 0.03 }}
                    />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      onMouseEnter={() => setHoveredInput('company')}
                      onMouseLeave={() => setHoveredInput(null)}
                      placeholder="Nome da empresa"
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-all duration-50 relative z-10"
                    />
                  </div>
                </div>

                {/* Botão Continuar */}
                <motion.div
                  onMouseEnter={() => setIsButtonHovered('continue')}
                  onMouseLeave={() => setIsButtonHovered(null)}
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
                    marginTop: '1.5rem',
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
                    type="submit"
                    className="w-full px-4 py-3 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#8c52ff]/40 transition-all duration-50 flex items-center justify-center gap-2 relative z-10"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Continuar
                  </button>
                </motion.div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 text-white">Senha</label>
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: hoveredInput === 'password' 
                          ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                          : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                      }}
                      transition={{ duration: 0.03 }}
                    />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      onMouseEnter={() => setHoveredInput('password')}
                      onMouseLeave={() => setHoveredInput(null)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-all duration-50 relative z-10"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-white">Confirmar Senha</label>
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: hoveredInput === 'confirmPassword' 
                          ? 'linear-gradient(to bottom right, rgba(140, 82, 255, 0.1), rgba(178, 125, 255, 0.05))'
                          : 'linear-gradient(to bottom right, rgba(140, 82, 255, 0), rgba(178, 125, 255, 0))'
                      }}
                      transition={{ duration: 0.03 }}
                    />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      onMouseEnter={() => setHoveredInput('confirmPassword')}
                      onMouseLeave={() => setHoveredInput(null)}
                      placeholder="Digite a senha novamente"
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-all duration-50 relative z-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  {/* Botão Voltar */}
                  <motion.div
                    onMouseEnter={() => setIsButtonHovered('back')}
                    onMouseLeave={() => setIsButtonHovered(null)}
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
                      flex: '0 0 33.333%',
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
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/5 text-gray-300 hover:text-white hover:border-white/10 rounded-xl font-medium text-sm transition-all duration-50 flex items-center justify-center gap-2 relative z-10"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Voltar
                    </button>
                  </motion.div>

                  {/* Botão Continuar */}
                  <motion.div
                    onMouseEnter={() => setIsButtonHovered('continue')}
                    onMouseLeave={() => setIsButtonHovered(null)}
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
                      flex: 1,
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
                      type="submit"
                      className="w-full px-4 py-3 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#8c52ff]/40 transition-all duration-50 flex items-center justify-center gap-2 relative z-10"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Continuar
                    </button>
                  </motion.div>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6"
              >
                <h3 className="text-center mb-6 text-white text-xl font-bold">Bem-vindo ao SOMA Approve! ✨</h3>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex gap-4 p-4 bg-white/5 rounded-xl"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#8c52ff] to-[#b27dff] flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="mb-1 text-white font-medium">{feature.title}</h4>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-3 mt-8">
                  {/* Botão Voltar */}
                  <motion.div
                    onMouseEnter={() => setIsButtonHovered('back')}
                    onMouseLeave={() => setIsButtonHovered(null)}
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
                      flex: '0 0 33.333%',
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
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/5 text-gray-300 hover:text-white hover:border-white/10 rounded-xl font-medium text-sm transition-all duration-50 flex items-center justify-center gap-2 relative z-10"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Voltar
                    </button>
                  </motion.div>

                  {/* Botão Começar Agora */}
                  <motion.div
                    onMouseEnter={() => setIsButtonHovered('start')}
                    onMouseLeave={() => setIsButtonHovered(null)}
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
                      flex: 1,
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
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="w-full px-4 py-3 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#8c52ff]/40 transition-all duration-50 flex items-center justify-center gap-2 relative z-10"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Começar Agora
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rodapé com links */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Já tem uma conta?{' '}
                <button
                  onClick={() => navigate('/')}
                  className="text-[#b27dff] hover:text-[#8c52ff] transition-colors duration-50 font-medium"
                >
                  Fazer login
                </button>
              </p>
            </div>
            
            {/* Link para Home principal */}
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-50 mx-auto group"
              >
                <Home className="w-4 h-4 group-hover:text-[#b27dff] transition-colors duration-50" />
                Voltar para Página Principal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
