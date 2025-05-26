import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ChatInterface from './components/ChatInterface';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ChatProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 flex p-4">
            <ChatInterface />
          </div>
        </ChatProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;