import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Google OAuth
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Lista de emails de administradores
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(email => email.trim())
  .filter(Boolean);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';

// CORS
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requisições sem origin (mobile apps, postman, etc)
    if (!origin) return callback(null, true);
    
    if (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'SOMA Approve Backend'
  });
});

/**
 * POST /api/auth/google
 * Autenticação com Google OAuth
 */
app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ 
        success: false, 
        message: 'Credential não fornecido' 
      });
    }

    // Verificar o token do Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Determinar role baseado no email
    const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'client';

    // Criar dados do usuário
    const user = {
      id: googleId,
      email,
      name,
      role,
      avatarUrl: picture,
    };

    // Gerar JWT token
    const token = jwt.sign(
      { 
        userId: googleId, 
        email, 
        role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error('Erro na autenticação Google:', error);
    res.status(401).json({
      success: false,
      message: 'Falha ao autenticar com Google',
      error: error.message,
    });
  }
});

/**
 * Middleware para validar JWT
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token não fornecido' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Token inválido' 
      });
    }
    req.user = user;
    next();
  });
}

/**
 * GET /api/drive/client-folders
 * Retorna mapeamentos de pastas do Google Drive por cliente
 */
app.get('/api/drive/client-folders', authenticateToken, (req, res) => {
  // Mock data - em produção viria do banco de dados
  const mappings = [
    {
      clientId: 'client-1',
      clientName: 'Maria Silva',
      googleDriveFolderId: '1A2B3C4D5E6F7G8H9I0J',
      lastSync: new Date().toISOString()
    },
    {
      clientId: 'client-2',
      clientName: 'João Santos',
      googleDriveFolderId: '2B3C4D5E6F7G8H9I0J1K',
      lastSync: new Date().toISOString()
    },
    {
      clientId: 'client-3',
      clientName: 'Ana Costa',
      googleDriveFolderId: '3C4D5E6F7G8H9I0J1K2L',
      lastSync: new Date().toISOString()
    }
  ];

  res.json({
    success: true,
    mappings
  });
});

/**
 * POST /api/drive/sync
 * Sincroniza vídeos pendentes das pastas do Google Drive
 */
app.post('/api/drive/sync', authenticateToken, async (req, res) => {
  try {
    // Em produção, aqui seria feito:
    // 1. Buscar mapeamentos de pastas por cliente
    // 2. Acessar Google Drive API
    // 3. Listar novos vídeos nas pastas
    // 4. Criar registros de vídeos pendentes
    
    res.json({
      success: true,
      message: 'Sincronização iniciada',
      videos: [] // Mock vazio
    });
  } catch (error) {
    console.error('Erro ao sincronizar Drive:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao sincronizar',
      error: error.message
    });
  }
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint não encontrado' 
  });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Erro interno do servidor',
    error: err.message 
  });
});

/**
 * Iniciar servidor
 */
app.listen(PORT, () => {
  console.log(`🚀 SOMA Approve Backend rodando na porta ${PORT}`);
  console.log(`📝 Modo: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Admins configurados: ${ADMIN_EMAILS.length}`);
  console.log(`🌐 CORS origins: ${ALLOWED_ORIGINS.join(', ')}`);
});
