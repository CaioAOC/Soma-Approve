# 🎬 SOMA Approve - Sistema de Aprovação de Vídeos

Sistema premium de aprovação de vídeos com interface tipo Tinder, desenvolvido com React, TypeScript, estética glassmorphism e integração com Google OAuth e Google Drive.

## ✨ Funcionalidades Principais

### 🔐 Autenticação
- **Login com Google** - OAuth 2.0 via Google Identity Services
- **Login tradicional** - Email/senha como fallback demo
- **Sistema de sessão** - JWT tokens e localStorage
- **Controle de acesso** - Guards de rota por role (admin/client)

### 👤 Dashboard do Cliente
- Visualização de vídeos pendentes, aprovados e rejeitados
- Filtros e busca avançada
- Cards de vídeo com thumbnails e metadados
- **Badge "Google Drive"** para vídeos sincronizados
- Notificações em tempo real
- Interface responsiva mobile-first

### 🎯 Sistema de Aprovação "Tinder Style"
- Interface minimalista focada no vídeo
- **Player Google Drive** - Embed de vídeos do Google Drive
- Player customizado HTML5 para uploads diretos
- Botões de ação grandes e intuitivos:
  - 👍 **Aprovar** (com animação de confetti)
  - 👎 **Rejeitar** (com modal de feedback)
  - 💬 **Notas** (feedback adicional)
- **Indicador de origem** - Google Drive ou Upload direto
- Navegação entre vídeos pendentes
- Timer de prazo em tempo real

### 🔧 Painel Administrativo
- **Dashboard** com KPIs principais
- **Gestão de Clientes** com estatísticas
- **Google Drive Integration**:
  - Mapeamento de pastas por cliente
  - Visualização de folder IDs
  - Sincronização de vídeos (em desenvolvimento)
- **Upload de Vídeos** com drag & drop
- **Atividades Recentes** em timeline

## 🚀 Setup e Instalação

### Frontend

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto baseado em `.env.example`:

```env
# API Backend
VITE_API_BASE_URL=http://localhost:3000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com

# Endpoints
VITE_AUTH_GOOGLE_ENDPOINT=/api/auth/google
VITE_DRIVE_SYNC_ENDPOINT=/api/drive/sync
VITE_DRIVE_CLIENT_FOLDER_ENDPOINT=/api/drive/client-folders
```

3. **Executar em desenvolvimento:**
```bash
npm run dev
```

4. **Build para produção:**
```bash
npm run build
```

### Backend (Node.js + Express)

1. **Navegar para a pasta do servidor:**
```bash
cd server
```

2. **Instalar dependências:**
```bash
npm install
```

3. **Configurar variáveis de ambiente:**

Crie um arquivo `.env` em `/server` baseado em `.env.example`:

```env
PORT=3000

# Google OAuth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Admin emails (separados por vírgula)
ADMIN_EMAILS=admin@soma.com,admin@example.com

# CORS Origins
ALLOWED_ORIGINS=http://localhost:5173,https://your-domain.com
```

4. **Executar servidor:**
```bash
npm start
```

ou em modo de desenvolvimento com watch:
```bash
npm run dev
```

### Configurar Google OAuth

1. **Criar projeto no Google Cloud Console:**
   - Acesse: https://console.cloud.google.com
   - Crie um novo projeto ou selecione um existente

2. **Ativar Google Identity Services:**
   - Navegue até "APIs & Services" > "Library"
   - Busque por "Google Identity Services" e ative

3. **Criar credenciais OAuth 2.0:**
   - Vá em "APIs & Services" > "Credentials"
   - Clique em "Create Credentials" > "OAuth client ID"
   - Tipo: "Web application"
   - **Authorized JavaScript origins:**
     - `http://localhost:5173` (dev)
     - `https://your-domain.com` (produção)
   - **Authorized redirect URIs:**
     - `http://localhost:5173` (dev)
     - `https://your-domain.com` (produção)

4. **Copiar Client ID:**
   - Copie o Client ID gerado
   - Cole em `VITE_GOOGLE_CLIENT_ID` no frontend
   - Cole em `GOOGLE_CLIENT_ID` no backend

## 📦 Deploy

### Deploy Frontend no GitHub Pages

1. **Configurar secrets no GitHub:**
   - Vá em Settings > Secrets and variables > Actions
   - Adicione os secrets:
     ```
     VITE_API_BASE_URL=https://your-backend-api.com
     VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
     VITE_AUTH_GOOGLE_ENDPOINT=/api/auth/google
     VITE_DRIVE_SYNC_ENDPOINT=/api/drive/sync
     VITE_DRIVE_CLIENT_FOLDER_ENDPOINT=/api/drive/client-folders
     ```

2. **Ativar GitHub Pages:**
   - Settings > Pages
   - Source: "GitHub Actions"

3. **Push para main:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

O workflow `.github/workflows/deploy-pages.yml` será executado automaticamente.

### Deploy Backend no Render

1. **Criar conta no Render:** https://render.com

2. **Criar novo Web Service:**
   - Conectar repositório GitHub
   - Root Directory: `/server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Configurar Environment Variables:**
   ```
   PORT=3000
   GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
   JWT_SECRET=your-production-secret-key
   ADMIN_EMAILS=admin@soma.com,admin@example.com
   ALLOWED_ORIGINS=https://your-github-pages-url.github.io
   NODE_ENV=production
   ```

4. **Deploy automático:**
   - Render detectará pushs no repositório e fará deploy automático

Alternativamente, você pode usar o arquivo `render.yaml` na raiz:

```yaml
services:
  - type: web
    name: soma-approve-backend
    env: node
    region: oregon
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: PORT
        value: 3000
      - key: GOOGLE_CLIENT_ID
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: ADMIN_EMAILS
        value: admin@soma.com
      - key: ALLOWED_ORIGINS
        value: https://your-github-pages-url.github.io
      - key: NODE_ENV
        value: production
```

## 🎨 Design System SOMA

### Paleta de Cores
```css
Roxo Principal: #8c52ff
Roxo Secundário: #a77bff
Roxo Claro: #b27dff
Roxo Suave: #c58aff

Fundo Escuro: #0b0612
Fundo Card: rgba(11, 6, 18, 0.8)

Sucesso: #10B981 (verde)
Erro: #EF4444 (vermelho)
Aviso: #F59E0B (âmbar)
Info: #3B82F6 (azul)
```

### Tipografia
- **Font Family**: 'Inter' (Google Fonts)
- **Hierarquia**:
  - H1: 44px, Semibold, Gradiente roxo
  - H2: 32px, Semibold
  - H3: 24px, Medium
  - H4: 18px, Medium
  - Body: 16px/14px, Regular

### Efeitos Visuais
- **Glassmorphism**: `backdrop-filter: blur(12px)` com backgrounds transparentes
- **Sombras**: Múltiplas camadas para profundidade
- **Gradientes**: Roxos suaves em botões e elementos principais
- **Animações**: Motion (Framer Motion) para transições fluidas

## 🧩 Componentes Reutilizáveis

### VideoPlayer
Player de vídeo com suporte a Google Drive e HTML5:

```tsx
<VideoPlayer 
  videoUrl={url} 
  googleDriveFileId={fileId}
  storageProvider="google-drive"
  autoPlay 
/>
```

### SomaCard
```tsx
<SomaCard elevation="high" hover padding="md">
  Conteúdo
</SomaCard>
```

### SomaButton
```tsx
<SomaButton 
  variant="primary" 
  size="lg" 
  icon={<Icon />}
  loading={isLoading}
>
  Texto
</SomaButton>
```

## 🗂️ Estrutura de Páginas

```
/                   → Login (Google OAuth + Email/Senha)
/register          → Registro (3 etapas)
/dashboard         → Dashboard do Cliente
/review/:id        → Review de Vídeo (Tinder Style)
/admin             → Painel Admin
```

## 🔒 Autenticação e Segurança

### Fluxo de Autenticação

1. **Login com Google:**
   - Frontend: Google Identity Services retorna credential (JWT)
   - Envia credential para backend `/api/auth/google`
   - Backend valida com `google-auth-library`
   - Backend retorna JWT próprio + dados do usuário
   - Frontend armazena sessão no localStorage

2. **Guards de Rota:**
   - VideoReview: Requer sessão client (redireciona admin para `/admin`)
   - AdminDashboard: Requer sessão admin (redireciona client para `/dashboard`)
   - Logout: Limpa localStorage e redireciona para `/`

### Segurança Backend

- **CORS** configurável por environment
- **JWT tokens** com expiração de 7 dias
- **Validação Google OAuth** via `google-auth-library`
- **Role-based access** (admin definido por lista de emails)

## 🎬 Integrações Google

### Google Drive

O sistema suporta integração com Google Drive para sincronização automática de vídeos:

1. **Mapeamento de Pastas:**
   - Cada cliente pode ter uma pasta do Google Drive associada
   - Visualização no painel admin
   - Endpoint: `GET /api/drive/client-folders`

2. **Player de Vídeos:**
   - Vídeos com `storageProvider: 'google-drive'` são renderizados via iframe
   - URL: `https://drive.google.com/file/d/{fileId}/preview`
   - Suporte a autoplay

3. **Sincronização (Em desenvolvimento):**
   - Endpoint: `POST /api/drive/sync`
   - Busca novos vídeos nas pastas mapeadas
   - Cria registros de vídeos pendentes automaticamente

## 🚀 Demo

### Usuários de Teste
```
Cliente: qualquer@email.com (ou login com Google)
Admin: admin@soma.com (configurável via ADMIN_EMAILS)
Senha: qualquer (apenas para demo, não em produção)
```

### Fluxo Demo
1. Faça login via Google ou email demo
2. Veja os vídeos pendentes no dashboard
3. Clique em "Revisar Agora" em um vídeo
4. Aprove ou rejeite com feedback
5. Veja animação de confetti na aprovação
6. Observe badge "Google Drive" em vídeos sincronizados

Para área admin:
1. Login com email configurado em ADMIN_EMAILS
2. Veja KPIs e atividades
3. Acesse mapeamentos de Google Drive
4. Teste upload de vídeos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animações
- **React Router v7** - Navegação
- **Lucide React** - Ícones
- **Canvas Confetti** - Efeito de confetti
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **google-auth-library** - OAuth validation
- **jsonwebtoken** - JWT tokens
- **cors** - CORS middleware
- **dotenv** - Environment variables

## 📝 Próximas Melhorias Sugeridas

- [x] Integração com Google OAuth
- [x] Suporte a Google Drive para vídeos
- [x] Sistema de sessão com guards
- [ ] Google Drive API completa (sync automático)
- [ ] Upload real de vídeos com progresso
- [ ] Notificações push
- [ ] Sistema de comentários em timestamps
- [ ] Histórico detalhado de mudanças
- [ ] Exportação de relatórios
- [ ] Temas customizáveis
- [ ] Atalhos de teclado
- [ ] Swipe gestures em mobile

## 📄 Licença

MIT

---

**Desenvolvido com** 💜 **pela equipe SOMA**
