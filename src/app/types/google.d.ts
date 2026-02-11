/**
 * Tipagens globais para Google Identity Services (GSI)
 * https://developers.google.com/identity/gsi/web/reference/js-reference
 */

interface CredentialResponse {
  credential: string;
  select_by: string;
}

interface IdConfiguration {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  context?: 'signin' | 'signup' | 'use';
  itp_support?: boolean;
}

interface PromptMomentNotification {
  getMomentType: () => string;
  getDismissedReason: () => string;
  getNotDisplayedReason: () => string;
  getSkippedReason: () => string;
  isDismissedMoment: () => boolean;
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
}

interface GsiButtonConfiguration {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: string;
  locale?: string;
}

interface GoogleAccounts {
  id: {
    initialize: (config: IdConfiguration) => void;
    prompt: (momentListener?: (notification: PromptMomentNotification) => void) => void;
    renderButton: (parent: HTMLElement, options: GsiButtonConfiguration) => void;
    disableAutoSelect: () => void;
    storeCredential: (credential: { id: string; password: string }, callback: () => void) => void;
    cancel: () => void;
    onGoogleLibraryLoad: () => void;
    revoke: (hint: string, callback: (response: { successful: boolean; error?: string }) => void) => void;
  };
}

interface Window {
  google?: {
    accounts: GoogleAccounts;
  };
}

declare global {
  interface Window {
    google?: {
      accounts: GoogleAccounts;
    };
  }
}

export {};
