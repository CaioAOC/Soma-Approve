# 🎨 SOMA Design System

## Paleta de Cores

### Primárias (Roxos)
```css
--soma-purple-primary: #8c52ff;    /* Roxo vibrante principal */
--soma-purple-secondary: #a77bff;  /* Roxo médio para hover/secondary */
--soma-purple-light: #b27dff;      /* Roxo claro para gradientes */
--soma-purple-soft: #c58aff;       /* Roxo suave para backgrounds */
```

### Neutras
```css
--soma-bg-dark: #0b0612;                /* Background principal */
--soma-bg-card: rgba(11, 6, 18, 0.8);  /* Background de cards glass */
--soma-white: #FFFFFF;                  /* Texto principal */
--soma-text-gray: rgba(255, 255, 255, 0.6);    /* Texto secundário */
--soma-border-gray: rgba(255, 255, 255, 0.1);  /* Bordas sutis */
```

### Status
```css
--soma-success: #10B981;   /* Verde - Aprovação */
--soma-error: #EF4444;     /* Vermelho - Rejeição */
--soma-warning: #F59E0B;   /* Âmbar - Pendente/Alerta */
--soma-info: #3B82F6;      /* Azul - Informação */
```

## Tipografia

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
```

### Hierarquia

#### H1 (Hero/Títulos Principais)
```css
font-size: 2.75rem;      /* 44px */
font-weight: 600;        /* Semibold */
line-height: 1.2;
background: linear-gradient(135deg, #8c52ff 0%, #b27dff 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

#### H2 (Títulos de Seção)
```css
font-size: 2rem;         /* 32px */
font-weight: 600;        /* Semibold */
line-height: 1.3;
color: #FFFFFF;
```

#### H3 (Títulos de Card)
```css
font-size: 1.5rem;       /* 24px */
font-weight: 500;        /* Medium */
line-height: 1.4;
color: #FFFFFF;
```

#### H4 (Subtítulos)
```css
font-size: 1.125rem;     /* 18px */
font-weight: 500;        /* Medium */
line-height: 1.5;
color: #FFFFFF;
```

#### Body Large
```css
font-size: 1rem;         /* 16px */
font-weight: 400;        /* Regular */
line-height: 1.6;
color: rgba(255, 255, 255, 0.8);
```

#### Body
```css
font-size: 0.875rem;     /* 14px */
font-weight: 400;        /* Regular */
line-height: 1.5;
color: rgba(255, 255, 255, 0.6);
```

#### Small
```css
font-size: 0.75rem;      /* 12px */
font-weight: 400;        /* Regular */
line-height: 1.4;
color: rgba(255, 255, 255, 0.5);
```

#### Kicker (Labels)
```css
font-size: 0.6875rem;    /* 11px */
font-weight: 700;        /* Bold */
text-transform: uppercase;
letter-spacing: 1px;
color: #a77bff;
```

## Espaçamento

Sistema baseado em 8px:

```css
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-3: 0.75rem;    /* 12px */
--spacing-4: 1rem;       /* 16px */
--spacing-5: 1.25rem;    /* 20px */
--spacing-6: 1.5rem;     /* 24px */
--spacing-8: 2rem;       /* 32px */
--spacing-10: 2.5rem;    /* 40px */
--spacing-12: 3rem;      /* 48px */
--spacing-16: 4rem;      /* 64px */
```

## Border Radius

```css
--radius-sm: 0.5rem;     /* 8px - Inputs, tags */
--radius-md: 0.75rem;    /* 12px - Cards pequenos */
--radius-lg: 1rem;       /* 16px - Cards principais */
--radius-xl: 1.25rem;    /* 20px - Modals */
--radius-2xl: 1.5rem;    /* 24px - Hero cards */
--radius-full: 9999px;   /* Círculos, pills */
```

## Sombras

### Card Normal
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
```

### Card Hover
```css
box-shadow: 
  0 16px 48px rgba(0, 0, 0, 0.6),
  0 0 24px rgba(140, 82, 255, 0.2);
```

### Botão
```css
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
```

### Botão Hover (Primary)
```css
box-shadow: 0 4px 20px rgba(140, 82, 255, 0.6);
```

### Botão Hover (Success)
```css
box-shadow: 0 4px 20px rgba(16, 185, 129, 0.5);
```

### Botão Hover (Danger)
```css
box-shadow: 0 4px 20px rgba(239, 68, 68, 0.5);
```

## Glassmorphism

### Base Glass
```css
.glass {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Glass Hover
```css
.glass-hover:hover {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.6), 
    0 0 24px rgba(140, 82, 255, 0.2);
}
```

## Gradientes

### Gradiente Roxo Principal
```css
background: linear-gradient(135deg, #8c52ff 0%, #a77bff 100%);
```

### Gradiente Roxo com Glow
```css
background: linear-gradient(135deg, #8c52ff 0%, #a77bff 100%);
box-shadow: 0 4px 16px rgba(140, 82, 255, 0.4);
```

### Gradiente Verde (Success)
```css
background: linear-gradient(to right, #10B981 0%, #059669 100%);
```

### Gradiente Vermelho (Danger)
```css
background: linear-gradient(to right, #EF4444 0%, #DC2626 100%);
```

## Animações

### Durations
```css
--duration-fast: 0.15s;      /* Hover rápido */
--duration-normal: 0.3s;     /* Transições padrão */
--duration-slow: 0.5s;       /* Modals, grandes mudanças */
```

### Easing
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Entrada de Elementos
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3, ease: 'easeOut' }}
```

### Hover em Cards
```tsx
whileHover={{ y: -6, scale: 1.02 }}
transition={{ duration: 0.3, ease: 'easeOut' }}
```

### Hover em Botões
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.98 }}
```

### Rotação de Ícones
```tsx
animate={{ rotate: 360 }}
transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
```

### Partículas Flutuantes
```tsx
animate={{
  y: [0, -30, 0],
  opacity: [0.2, 0.8, 0.2],
  scale: [1, 1.5, 1],
}}
transition={{
  duration: 3,
  repeat: Infinity,
  delay: Math.random() * 2,
}}
```

## Componentes

### Botões

#### Primary
```tsx
className="gradient-purple-glow text-white hover:shadow-[0_4px_20px_rgba(140,82,255,0.6)]"
```

#### Secondary
```tsx
className="border-2 border-[var(--soma-purple-primary)] text-[var(--soma-purple-primary)] hover:bg-[var(--soma-purple-primary)] hover:text-white"
```

#### Ghost
```tsx
className="bg-transparent text-white hover:bg-white/10"
```

#### Success
```tsx
className="bg-gradient-to-r from-[var(--soma-success)] to-emerald-600 text-white"
```

#### Danger
```tsx
className="bg-gradient-to-r from-[var(--soma-error)] to-red-600 text-white"
```

### Badges

#### Status Pendente
```tsx
className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--soma-warning)]/20 text-[var(--soma-warning)]"
```

#### Status Aprovado
```tsx
className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--soma-success)]/20 text-[var(--soma-success)]"
```

#### Status Rejeitado
```tsx
className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--soma-error)]/20 text-[var(--soma-error)]"
```

### Inputs

#### Input Text
```tsx
className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--soma-purple-primary)] transition-colors"
```

#### Textarea
```tsx
className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--soma-purple-primary)] transition-colors resize-none"
```

#### Select
```tsx
className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--soma-purple-primary)] transition-colors"
```

## Breakpoints

```css
/* Mobile */
@media (min-width: 320px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }

/* XL Desktop */
@media (min-width: 1536px) { }
```

## Acessibilidade

### Contraste Mínimo
- Texto normal: 4.5:1
- Texto grande: 3:1
- Elementos interativos: 3:1

### Touch Targets
- Mínimo: 44x44px
- Recomendado: 48x48px
- Espaçamento entre targets: 8px

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--soma-purple-primary);
  outline-offset: 2px;
}
```

## Grid System

### Container
```css
max-width: 1280px;
margin: 0 auto;
padding: 0 1rem;

@media (min-width: 768px) {
  padding: 0 2rem;
}
```

### Grid Colunas
```css
/* Mobile */
grid-template-columns: repeat(1, 1fr);

/* Tablet */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Desktop */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}
```

## Ícones

### Biblioteca
Lucide React - https://lucide.dev/

### Tamanhos
```tsx
<Icon className="w-4 h-4" />   /* 16px - Texto */
<Icon className="w-5 h-5" />   /* 20px - Botões */
<Icon className="w-6 h-6" />   /* 24px - Cards */
<Icon className="w-8 h-8" />   /* 32px - Features */
<Icon className="w-12 h-12" /> /* 48px - Hero */
```

## Background Particles

```tsx
{[...Array(20)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-1 h-1 bg-[var(--soma-purple-primary)] rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
  />
))}
```

## Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

::-webkit-scrollbar-thumb {
  background: rgba(140, 82, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(140, 82, 255, 0.5);
}
```

---

**✨ Design System SOMA - v1.0**
