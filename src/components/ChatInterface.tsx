import React, { useState } from 'react';
import { Trash, Settings, Cpu } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../context/ChatContext';
import ApiKeyModal from './ApiKeyModal';
import ThemeToggle from './ThemeToggle';

const ChatInterface: React.FC = () => {
  const { state, sendMessage, clearMessages, setApiKey } = useChat();
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(!state.apiKey);
  const [showSettings, setShowSettings] = useState(false);
  
  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };
  
  const handleApiKeySubmit = (apiKey: string) => {
    setApiKey(apiKey);
    setIsApiKeyModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto shadow-2xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border border-blue-200/20 dark:border-blue-500/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/40 dark:to-purple-900/40 backdrop-blur-sm border-b border-blue-200/20 dark:border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold animate-pulse">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Jarvis AI
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {state.isLoading ? "Processing your request..." : "Ready to assist"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      {/* Settings panel */}
      {showSettings && (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 border-b border-gray-200 dark:border-gray-700 animate-slideDown">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all messages?')) {
                  clearMessages();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <Trash size={16} />
              <span>Clear chat</span>
            </button>
            
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Update API Key
            </button>
          </div>
        </div>
      )}
      
      {/* Message list */}
      <MessageList 
        messages={state.messages} 
        isLoading={state.isLoading} 
      />
      
      {/* Error message */}
      {state.error && (
        <div className="mx-4 my-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-300 text-sm">
          <strong>Error:</strong> {state.error}
        </div>
      )}
      
      {/* Input area */}
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={state.isLoading || !state.apiKey}
      />
      
      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onSubmit={handleApiKeySubmit}
      />
    </div>
  );
};

export default ChatInterface;