import { useNavigate } from 'react-router';
import { SomaCard } from '@/app/components/soma/SomaCard';
import { SomaButton } from '@/app/components/soma/SomaButton';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SomaCard className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="mb-4">404</h1>
        <p className="text-[var(--soma-text-gray)] mb-6">
          Página não encontrada
        </p>
        <SomaButton
          variant="primary"
          icon={<Home className="w-5 h-5" />}
          onClick={() => navigate('/')}
        >
          Voltar ao Início
        </SomaButton>
      </SomaCard>
    </div>
  );
}
