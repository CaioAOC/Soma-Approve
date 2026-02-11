/**
 * Extrai o fileId de um link ou input do Google Drive
 * Aceita:
 * - URLs completas: https://drive.google.com/file/d/FILE_ID/view
 * - URLs de preview: https://drive.google.com/open?id=FILE_ID
 * - FILE_ID direto
 */
export function extractGoogleDriveFileId(input: string): string | null {
  if (!input) return null;

  // Remove espaços em branco
  const trimmed = input.trim();

  // Padrão 1: /file/d/{fileId}/
  const pattern1 = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match1 = trimmed.match(pattern1);
  if (match1) return match1[1];

  // Padrão 2: ?id={fileId}
  const pattern2 = /[?&]id=([a-zA-Z0-9_-]+)/;
  const match2 = trimmed.match(pattern2);
  if (match2) return match2[1];

  // Padrão 3: Já é um fileId (sem slashes ou protocolos)
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed) && trimmed.length > 20) {
    return trimmed;
  }

  return null;
}

/**
 * Gera URL de preview do Google Drive para embed em iframe
 */
export function buildGoogleDrivePreviewUrl(fileId: string, autoPlay: boolean = false): string {
  if (!fileId) return '';
  
  // URL de preview do Google Drive
  const baseUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  
  // Adicionar autoplay se solicitado
  return autoPlay ? `${baseUrl}?autoplay=1` : baseUrl;
}

/**
 * Gera URL de thumbnail do Google Drive
 */
export function buildGoogleDriveThumbnailUrl(fileId: string): string {
  if (!fileId) return '';
  
  // Thumbnail padrão do Google Drive
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
}
