import React from 'react';
import { Cpu } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
          <Cpu className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Jarvis is thinking...
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" 
               style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" 
               style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" 
               style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;