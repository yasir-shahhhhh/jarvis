import { Message } from '../types';

// Base URL for Groq API
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Default model to use
const DEFAULT_MODEL = 'llama3-8b-8192';

interface GroqRequestBody {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  stream: boolean;
  max_tokens?: number;
  temperature?: number;
}

// Function to convert our Message type to Groq's expected format
const formatMessagesForGroq = (messages: Message[]) => {
  return messages.map(message => ({
    role: message.role,
    content: message.content
  }));
};

// Function to send a message to Groq API and handle streaming response
export const sendMessageToGroq = async (
  messages: Message[],
  apiKey: string,
  onChunk: (chunk: string) => void,
  onError: (error: Error) => void,
  onComplete: () => void
): Promise<void> => {
  try {
    // Validate API key
    if (!apiKey) {
      throw new Error('API key is required');
    }

    const requestBody: GroqRequestBody = {
      model: DEFAULT_MODEL,
      messages: formatMessagesForGroq(messages),
      stream: true,
      temperature: 0.7,
      max_tokens: 4096
    };

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API error: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    // Process the stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      
      // Process buffer line by line
      while (buffer.includes('\n')) {
        const lineEndIndex = buffer.indexOf('\n');
        const line = buffer.slice(0, lineEndIndex).trim();
        buffer = buffer.slice(lineEndIndex + 1);

        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          // End of stream
          if (data === '[DONE]') continue;
          
          try {
            const json = JSON.parse(data);
            const content = json.choices[0]?.delta?.content || '';
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            console.error('Error parsing stream data:', e);
          }
        }
      }
    }
    
    onComplete();
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Unknown error occurred'));
  }
};