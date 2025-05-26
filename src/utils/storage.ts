import { Message } from '../types';

const STORAGE_KEYS = {
  MESSAGES: 'jarvis-messages',
  THEME: 'jarvis-theme',
  API_KEY: 'jarvis-api-key',
};

export const saveMessages = (messages: Message[]): void => {
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
};

export const loadMessages = (): Message[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return stored ? JSON.parse(stored) : [];
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

export const loadTheme = (): 'light' | 'dark' => {
  const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  
  // Check system preference if no stored preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const saveApiKey = (key: string): void => {
  localStorage.setItem(STORAGE_KEYS.API_KEY, key);
};

export const loadApiKey = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.API_KEY);
};

export const clearStorage = (): void => {
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
};