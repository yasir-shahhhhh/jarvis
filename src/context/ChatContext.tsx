import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { ChatContextType, ChatState, Message } from '../types';
import { loadApiKey, loadMessages, saveApiKey, saveMessages } from '../utils/storage';
import { sendMessageToGroq } from '../utils/api';

// Initial state
const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  apiKey: null
};

// Action types
type Action =
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_LAST_ASSISTANT_MESSAGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'SET_API_KEY'; payload: string };

// Reducer function
function chatReducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'UPDATE_LAST_ASSISTANT_MESSAGE': {
      const messages = [...state.messages];
      const lastAssistantIndex = messages.findLastIndex(m => m.role === 'assistant');
      
      if (lastAssistantIndex !== -1) {
        const updatedMessage = {
          ...messages[lastAssistantIndex],
          content: messages[lastAssistantIndex].content + action.payload
        };
        messages[lastAssistantIndex] = updatedMessage;
      }
      
      return { ...state, messages };
    }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    case 'SET_API_KEY':
      return { ...state, apiKey: action.payload };
    default:
      return state;
  }
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load messages and API key from local storage on mount
  useEffect(() => {
    dispatch({ type: 'SET_MESSAGES', payload: loadMessages() });
    const apiKey = loadApiKey();
    if (apiKey) {
      dispatch({ type: 'SET_API_KEY', payload: apiKey });
    }
  }, []);

  // Save messages to local storage when they change
  useEffect(() => {
    saveMessages(state.messages);
  }, [state.messages]);

  // Function to send a message
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !state.apiKey) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    // Add user message to state
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    
    // Create empty assistant message as placeholder
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: Date.now() + 1
    };
    
    // Add empty assistant message to show typing indicator
    dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Send message to API
    try {
      await sendMessageToGroq(
        [...state.messages, userMessage], // Include the new user message
        state.apiKey,
        // On each chunk of data
        (chunk) => {
          dispatch({ type: 'UPDATE_LAST_ASSISTANT_MESSAGE', payload: chunk });
        },
        // On error
        (error) => {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        },
        // On complete
        () => {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      );
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Unknown error occurred' 
      });
    }
  }, [state.messages, state.apiKey]);

  // Function to clear chat history
  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  // Function to set API key
  const setApiKey = useCallback((key: string) => {
    saveApiKey(key);
    dispatch({ type: 'SET_API_KEY', payload: key });
  }, []);

  return (
    <ChatContext.Provider value={{ state, sendMessage, clearMessages, setApiKey }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};