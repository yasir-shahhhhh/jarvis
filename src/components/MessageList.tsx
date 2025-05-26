import React, { useEffect, useRef } from 'react';
import { Message as MessageType } from '../types';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { Bot } from 'lucide-react';

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-6">
            <Bot className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
            Welcome to Jarvis AI
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
            I'm your advanced AI assistant, powered by state-of-the-art language models. How can I help you today?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
            {[
              {
                title: "Explain Complex Topics",
                description: "\"Explain quantum computing in simple terms\"",
              },
              {
                title: "Creative Writing",
                description: "\"Write a story about a time-traveling detective\"",
              },
              {
                title: "Problem Solving",
                description: "\"Help me optimize my daily workflow\"",
              },
              {
                title: "Code Assistance",
                description: "\"Debug this React useEffect hook\"",
              }
            ].map((suggestion, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-blue-200/20 dark:border-blue-500/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {suggestion.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="divide-y divide-blue-200/20 dark:divide-blue-500/20">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      
      {isLoading && (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TypingIndicator />
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;