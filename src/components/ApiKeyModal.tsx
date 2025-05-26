import React, { useState } from 'react';
import { Key } from 'lucide-react';

interface ApiKeyModalProps {
  onSubmit: (apiKey: string) => void;
  isOpen: boolean;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSubmit, isOpen }) => {
  const [apiKey, setApiKey] = useState('');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-4">
          <Key className="text-blue-600 dark:text-blue-300" size={24} />
        </div>
        
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-100">
          Enter Your Groq API Key
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Your API key is stored locally in your browser and never sent to our servers.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Groq API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!apiKey.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              apiKey.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            Continue
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Don't have a Groq API key?{' '}
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Get one here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;