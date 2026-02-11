import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { SomaCard } from '@/app/components/soma/SomaCard';
import { SomaButton } from '@/app/components/soma/SomaButton';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import { setSessionUser } from '@/app/lib/auth';
import { loginWithGoogleCredential } from '@/app/services/authService';
import { currentUser, adminUser } from '@/app/data/mockData';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Carregar Google Identity Services
  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      if (!clientId || !window.google) {
        console.warn('Google Client ID não configurado ou script não carregado');
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCallback,
      });

      // Renderizar botão do Google
      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: 'filled_black',
            size: 'large',
            text: 'signin_with',
            width: '100%',
            shape: 'rectangular',
          }
        );
      }
    };

    loadGoogleScript();
  }, []);

  const handleGoogleCallback = async (response: { credential: string }) => {
    setLoading(true);
    
    try {
      const user = await loginWithGoogleCredential(response.credential);
      setSessionUser(user);
      
      // Redirecionar baseado no role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro no login com Google:', error);
      alert('Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login com email/senha (demo fallback)
    setTimeout(() => {
      if (email.includes('admin')) {
        setSessionUser(adminUser);
        navigate('/admin');
      } else {
        setSessionUser(currentUser);
        navigate('/dashboard');
      }
      setLoading(false);
    }, 1500);
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Animated background particles - INDEPENDENTE E FIXO */}
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
              ease: "easeInOut"
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

      {/* Painel Central - ESTÁTICO (sem animação) */}
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
          maxWidth: '28rem',
        }}
        className="relative z-10"
      >
        <div className="relative z-10 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-[#8c52ff]" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear', repeatType: "loop" }}
              >
                <Sparkles className="w-16 h-16 text-[#b27dff] opacity-30" />
              </motion.div>
            </div>
          </div>

          <h1 className="text-center mb-2 text-white text-2xl font-bold">
            SOMA Approve
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Sistema de Aprovação de Vídeos
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
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
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onMouseEnter={() => setHoveredInput('email')}
                  onMouseLeave={() => setHoveredInput(null)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-all duration-50 relative z-10"
                  required
                />
              </div>
            </div>

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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onMouseEnter={() => setHoveredInput('password')}
                  onMouseLeave={() => setHoveredInput(null)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#8c52ff] transition-all duration-50 relative z-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-[#b27dff] hover:text-[#8c52ff] transition-colors duration-50">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão Entrar - COM ANIMAÇÃO */}
            <motion.div
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
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
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#8c52ff]/40 transition-all duration-50 flex items-center justify-center gap-2 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear', repeatType: "loop" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Entrar
                  </>
                )}
              </button>
            </motion.div>

            {/* Botão Google - COM ANIMAÇÃO */}
            <motion.div
              ref={googleButtonRef}
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
              <div
                className="w-full px-4 py-3 bg-gradient-to-br from-[#8c52ff] to-[#b27dff] text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#8c52ff]/40 transition-all duration-50 flex items-center justify-center gap-2 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear', repeatType: "loop" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Entrar com Google
                  </>
                )}
              </div>
            </motion.div>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p className="text-sm text-gray-400">
              Primeiro acesso?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[#b27dff] hover:text-[#8c52ff] transition-colors duration-50 font-medium"
              >
                Criar conta
              </button>
            </p>
          </div>

          <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p className="text-xs text-gray-400 text-center">
              💡 <strong className="text-white">Demo:</strong> Use "admin@soma.com" para área admin ou qualquer outro email para cliente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}