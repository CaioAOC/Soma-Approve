import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { SomaCard } from '@/app/components/soma/SomaCard';
import { SomaButton } from '@/app/components/soma/SomaButton';
import { VideoPlayer } from '@/app/components/soma/VideoPlayer';
import { Tag } from '@/app/components/soma/Tag';
import { mockVideos, feedbackCategories, getTimeRemaining } from '@/app/data/mockData';
import { ThumbsUp, ThumbsDown, MessageSquare, X, ArrowLeft, Clock, Calendar, AlertTriangle, HardDrive, Cloud } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Textarea } from '@/app/components/ui/textarea';
import { getSessionUser } from '@/app/lib/auth';

export function VideoReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState('');
  
  // Guard de sessão
  useEffect(() => {
    const user = getSessionUser();
    if (!user) {
      navigate('/');
      return;
    }
    if (user.role === 'admin') {
      navigate('/admin');
      return;
    }
  }, [navigate]);
  
  const video = mockVideos.find(v => v.id === id);
  const allVideos = mockVideos.filter(v => v.status === 'pending');
  const currentIndex = allVideos.findIndex(v => v.id === id);
  const totalVideos = allVideos.length;

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SomaCard className="text-center">
          <h2 className="mb-4">Vídeo não encontrado</h2>
          <SomaButton onClick={() => navigate('/dashboard')}>
            Voltar ao Dashboard
          </SomaButton>
        </SomaCard>
      </div>
    );
  }

  const handleApprove = () => {
    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8c52ff', '#a77bff', '#b27dff']
    });
    
    setShowSuccessModal(true);
  };

  const handleReject = () => {
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    setShowFeedbackModal(false);
    // Go to next video or dashboard
    goToNextVideo();
  };

  const goToNextVideo = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < totalVideos) {
      navigate(`/review/${allVideos[nextIndex].id}`);
    } else {
      navigate('/dashboard');
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <SomaButton
          variant="ghost"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/dashboard')}
        >
          Voltar
        </SomaButton>

        <div className="glass px-4 py-2 rounded-full">
          <span className="text-sm">
            Vídeo <strong>{currentIndex + 1}</strong> de {totalVideos}
          </span>
        </div>

        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--soma-warning)]" />
          <span className="text-sm">{getTimeRemaining(video.deadline)}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <SomaCard elevation="high" className="mb-6">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <VideoPlayer 
              videoUrl={video.videoUrl} 
              autoPlay 
              googleDriveFileId={video.googleDriveFileId}
              storageProvider={video.storageProvider}
            />
          </motion.div>

          {/* Video Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 space-y-4"
          >
            <div>
              <h2 className="mb-2">{video.title}</h2>
              <p className="text-[var(--soma-text-gray)]">{video.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[var(--soma-text-gray)]">Tipo:</span>
                <span className="font-medium">{video.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--soma-text-gray)]">Duração:</span>
                <span className="font-medium">{video.duration} segundos</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--soma-text-gray)]" />
                <span className="text-[var(--soma-text-gray)]">Enviado:</span>
                <span className="font-medium">{video.uploadedAt.toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--soma-warning)]" />
                <span className="text-[var(--soma-text-gray)]">Prazo:</span>
                <span className="font-medium">{video.deadline.toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                {video.storageProvider === 'google-drive' ? (
                  <Cloud className="w-4 h-4 text-[#8c52ff]" />
                ) : (
                  <HardDrive className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-[var(--soma-text-gray)]">Origem:</span>
                <span className="font-medium">
                  {video.storageProvider === 'google-drive' ? 'Google Drive' : 'Upload direto'}
                </span>
              </div>
            </div>
          </motion.div>
        </SomaCard>

        {/* Action Buttons - Tinder Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 md:gap-12"
        >
          {/* Reject Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReject}
            className="group relative"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[var(--soma-error)] to-red-600 flex items-center justify-center shadow-[0_8px_32px_rgba(239,68,68,0.5)] group-hover:shadow-[0_12px_48px_rgba(239,68,68,0.7)] transition-all">
              <ThumbsDown className="w-10 h-10 text-white" />
            </div>
            <span className="block text-center mt-2 text-sm font-medium text-[var(--soma-error)]">
              Rejeitar
            </span>
          </motion.button>

          {/* Notes Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFeedbackModal(true)}
            className="group relative"
          >
            <div className="w-16 h-16 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all">
              <MessageSquare className="w-8 h-8 text-[var(--soma-purple-primary)]" />
            </div>
            <span className="block text-center mt-2 text-sm font-medium text-[var(--soma-purple-primary)]">
              Notas
            </span>
          </motion.button>

          {/* Approve Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleApprove}
            className="group relative"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[var(--soma-success)] to-emerald-600 flex items-center justify-center shadow-[0_8px_32px_rgba(16,185,129,0.5)] group-hover:shadow-[0_12px_48px_rgba(16,185,129,0.7)] transition-all">
              <ThumbsUp className="w-10 h-10 text-white" />
            </div>
            <span className="block text-center mt-2 text-sm font-medium text-[var(--soma-success)]">
              Aprovar
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Feedback Modal */}
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="glass border-[var(--soma-border-gray)] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">O que precisa ser ajustado?</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Categories */}
            <div>
              <label className="block mb-3">Categorias</label>
              <div className="flex flex-wrap gap-2">
                {feedbackCategories.map(category => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCategories.includes(category)
                        ? 'gradient-purple text-white'
                        : 'glass text-[var(--soma-text-gray)] hover:text-white'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block mb-3">Descrição detalhada</label>
              <Textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Descreva detalhadamente o que precisa ser corrigido..."
                className="min-h-[150px] bg-white/5 border-white/10 text-white resize-none focus:border-[var(--soma-purple-primary)]"
                maxLength={500}
              />
              <div className="text-right mt-2 text-sm text-[var(--soma-text-gray)]">
                {feedbackText.length}/500
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <SomaButton
                variant="ghost"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancelar
              </SomaButton>
              <SomaButton
                variant="primary"
                onClick={submitFeedback}
                disabled={selectedCategories.length === 0 && !feedbackText}
              >
                Enviar Feedback
              </SomaButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => {
              setShowSuccessModal(false);
              goToNextVideo();
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <SomaCard elevation="high" className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full gradient-purple flex items-center justify-center"
                >
                  <ThumbsUp className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="mb-3">Vídeo aprovado! ✅</h2>
                <p className="text-[var(--soma-text-gray)] mb-6">
                  Ótimo! O vídeo foi marcado como aprovado.
                </p>

                <SomaButton
                  variant="primary"
                  size="lg"
                  onClick={goToNextVideo}
                  className="w-full"
                >
                  {currentIndex + 1 < totalVideos ? 'Próximo Vídeo' : 'Voltar ao Dashboard'}
                </SomaButton>
              </SomaCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}