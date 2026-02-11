# 🎯 SOMA Approve - Guia de Uso

## 🚀 Como Usar o Sistema

### Para Clientes

#### 1. Login
- Acesse a página inicial
- Digite qualquer email (ex: maria@empresa.com)
- Digite qualquer senha
- Clique em "Entrar"

#### 2. Dashboard
Após o login, você verá:
- **Resumo**: Total de vídeos pendentes
- **Filtros**: Todos, Pendentes, Aprovados, Rejeitados
- **Busca**: Procure por título ou descrição
- **Cards de Vídeo**: Cada card mostra:
  - Thumbnail do vídeo
  - Título e descrição
  - Status (pendente/aprovado/rejeitado)
  - Prazo restante
  - Prioridade
  - Botão "Revisar Agora" (apenas pendentes)

#### 3. Revisar Vídeo (Tinder Style)
Ao clicar em "Revisar Agora":
- **Player de Vídeo**: Assista o vídeo completo
- **Controles**: Play/pause, volume, fullscreen
- **Informações**: Título, descrição, tipo, prazo
- **Botões de Ação**:
  - **👎 Rejeitar** (vermelho): Abre modal de feedback
  - **💬 Notas** (roxo): Adicionar comentários sem rejeitar
  - **👍 Aprovar** (verde): Aprova e mostra confetti 🎉

#### 4. Modal de Feedback (ao rejeitar)
- **Categorias**: Selecione tags (Áudio, Edição, Cor, etc)
- **Descrição**: Escreva feedback detalhado (até 500 caracteres)
- **Enviar**: Submete feedback e vai para próximo vídeo

#### 5. Aprovação Bem-Sucedida
- Animação de confetti roxo
- Modal de confirmação
- Botão "Próximo Vídeo" ou "Voltar ao Dashboard"

### Para Administradores

#### 1. Login Admin
- Use email: **admin@soma.com**
- Qualquer senha
- Será redirecionado para painel admin

#### 2. Dashboard Admin
**Sidebar** (desktop):
- Dashboard
- Vídeos (em breve)
- Clientes
- Upload

**KPIs Principais**:
- Total de Clientes (roxo)
- Vídeos Pendentes (âmbar)
- Taxa de Aprovação (verde)
- Tempo Médio (azul)

**Atividades Recentes**:
- Timeline de aprovações/rejeições
- Novos uploads
- Ações dos clientes

#### 3. Gestão de Clientes
- Lista completa de clientes
- Estatísticas por cliente:
  - Vídeos pendentes
  - Vídeos aprovados
  - Total de vídeos
- Última atividade
- Avatar e informações de contato

#### 4. Upload de Vídeos
**Drag & Drop**:
- Arraste arquivos para área tracejada
- Ou clique para selecionar
- Formatos: MP4, MOV, AVI (max 500MB)

**Formulário**:
- **Título**: Nome do vídeo
- **Cliente**: Selecione da lista
- **Descrição**: Opcional, contexto adicional
- **Prazo**: 24h, 48h, 72h ou personalizado
- **Prioridade**: Baixa, Média, Alta

**Ações**:
- Cancelar
- Salvar Rascunho
- Enviar para Aprovação

## 📱 Navegação Mobile

### Cliente
- Header compacto com avatar e notificações
- Filtros em scroll horizontal
- Grid de vídeos em coluna única
- Botões grandes (min 44px) para touch

### Admin
- Sidebar oculta em mobile
- Menu hamburguer (futuro)
- KPIs em grid 1-2 colunas
- Formulários adaptados

## ⌨️ Atalhos de Teclado (Planejado)

- `Espaço`: Play/Pause no player
- `→`: Aprovar vídeo
- `←`: Rejeitar vídeo
- `N`: Adicionar nota
- `Esc`: Fechar modal
- `/`: Focar busca

## 🎨 Elementos Visuais

### Cores de Status
- **Pendente**: Âmbar (#F59E0B)
- **Aprovado**: Verde (#10B981)
- **Rejeitado**: Vermelho (#EF4444)

### Cores de Prioridade
- **Baixa**: Azul (#3B82F6)
- **Média**: Amarelo (#F59E0B)
- **Alta**: Vermelho (#EF4444)

### Animações
- **Entrada de cards**: Fade + slide up
- **Hover em cards**: Levitação + glow
- **Botões**: Scale 1.05 no hover
- **Aprovação**: Confetti burst
- **Partículas**: Movimento constante no fundo

## 🔧 Componentes Reutilizáveis

### SomaCard
```tsx
<SomaCard 
  elevation="high"    // none, low, high
  hover={true}        // enable hover effect
  padding="md"        // sm, md, lg
>
  Conteúdo
</SomaCard>
```

### SomaButton
```tsx
<SomaButton
  variant="primary"   // primary, secondary, success, danger, ghost
  size="lg"          // sm, md, lg
  icon={<Icon />}    // optional icon
  loading={false}    // show spinner
>
  Texto
</SomaButton>
```

### VideoPlayer
```tsx
<VideoPlayer 
  videoUrl="url"
  autoPlay={true}
/>
```

### Tag
```tsx
<Tag
  selected={true}
  onToggle={() => {}}
  variant="default"   // default, success, warning, error, info
>
  Label
</Tag>
```

### KPICard
```tsx
<KPICard
  label="Métrica"
  value={100}
  icon={<Icon className="w-6 h-6" />}
  color="text-purple"
  bg="bg-purple/20"
/>
```

### EmptyState
```tsx
<EmptyState
  icon={AlertCircle}
  title="Sem dados"
  description="Nada encontrado"
  actionLabel="Criar Novo"
  onAction={() => {}}
/>
```

### LoadingSpinner
```tsx
<LoadingSpinner size="md" />  // sm, md, lg
```

## 🎯 Fluxo Completo

```
1. LOGIN
   └─→ Cliente → DASHBOARD CLIENTE
   └─→ Admin → DASHBOARD ADMIN

2. DASHBOARD CLIENTE
   └─→ Clica "Revisar Agora"
       └─→ VIDEO REVIEW
           └─→ Aprovar → Confetti → Próximo
           └─→ Rejeitar → Modal Feedback → Próximo
           └─→ Notas → Modal Feedback (sem status)

3. DASHBOARD ADMIN
   ├─→ Ver KPIs
   ├─→ Atividades Recentes
   ├─→ GESTÃO CLIENTES
   │   └─→ Ver estatísticas
   └─→ UPLOAD
       └─→ Selecionar arquivo
       └─→ Preencher formulário
       └─→ Enviar para cliente
```

## 🐛 Troubleshooting

### Vídeo não carrega
- Verifique a URL do vídeo
- Teste com os vídeos demo (Google Storage)
- Aguarde buffer do player

### Confetti não aparece
- Verifique se canvas-confetti está instalado
- Teste em outro navegador

### Animações lentas
- Reduza número de partículas
- Desabilite blur effects em dispositivos antigos

### Layout quebrado no mobile
- Limpe cache do navegador
- Verifique breakpoints do Tailwind

## 💡 Dicas de UX

1. **Sempre forneça feedback visual** após ações
2. **Use loading states** durante operações assíncronas
3. **Confetti é viciante** - use com moderação 😄
4. **Mobile-first** - teste sempre em telas pequenas primeiro
5. **Acessibilidade** - mantenha contraste e tamanhos adequados

## 📊 Métricas Sugeridas

- Tempo médio de aprovação
- Taxa de rejeição por categoria
- Clientes mais ativos
- Horários de pico de atividade
- Vídeos com mais feedback

## 🔜 Próximos Passos

1. Integrar com backend (Supabase)
2. Upload real de vídeos
3. Notificações push
4. Sistema de comentários em timestamps
5. Histórico detalhado
6. Exportação de relatórios
7. Temas customizáveis
8. Atalhos de teclado
9. Swipe gestures em mobile
10. Preview de vídeo no hover

---

**🎉 Aproveite o SOMA Approve!**
