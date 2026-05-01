import { useState, useRef, useEffect, type FC } from 'react';
import { Send, User, Bot, Loader2, Trash2 } from 'lucide-react';
import type { Message } from '../types';
import { getGeminiResponse } from '../services/gemini';

export const ChatInterface: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your Election Assistant. I'm here to help you understand the voting process. What can I help you with today? (e.g., 'How do I register?' or 'What do I need to bring to vote?')",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      setMessages([messages[0]]);
    }
  };

  const handleSend = async () => {
    const sanitizedInput = input.trim().substring(0, 500); // Simple sanitization & length limit
    if (!sanitizedInput || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: sanitizedInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Format history for Gemini: must start with a 'user' message
    const formattedHistory = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.content }]
    }));

    const firstUserIndex = formattedHistory.findIndex(m => m.role === 'user');
    const history = firstUserIndex !== -1 ? formattedHistory.slice(firstUserIndex) : [];

    const responseText = await getGeminiResponse(sanitizedInput, history);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="chat-container card" role="region" aria-label="Election Assistant Chat">
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          <Bot size={20} aria-hidden="true" />
          <span>Election Assistant</span>
        </div>
        <button 
          onClick={clearChat} 
          className="clear-btn" 
          title="Clear Chat"
          aria-label="Clear chat history"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="chat-messages" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.role}`}>
            <div className="message-icon" aria-hidden="true">
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper assistant">
            <div className="message-icon" aria-hidden="true">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="message-content" aria-busy="true">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about the election process..."
          aria-label="Type your election question"
          maxLength={500}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </div>

      <style>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 500px;
          overflow: hidden;
        }
        .chat-header {
          padding: 1rem;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          font-weight: 600;
        }
        .clear-btn {
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          padding: 4px;
          border-radius: 4px;
        }
        .clear-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .message-wrapper {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
        }
        .message-wrapper.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .message-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .user .message-icon {
          background: var(--secondary);
          color: white;
        }
        .assistant .message-icon {
          background: var(--primary);
          color: white;
        }
        .message-content {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: 0.9375rem;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .user .message-content {
          background: var(--primary);
          color: white;
          border-bottom-right-radius: 2px;
        }
        .assistant .message-content {
          background: #f1f5f9;
          color: var(--text-main);
          border-bottom-left-radius: 2px;
        }
        .chat-input-area {
          padding: 1rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 0.5rem;
        }
        .chat-input-area input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 24px;
          outline: none;
        }
        .chat-input-area input:focus {
          border-color: var(--primary);
        }
        .chat-input-area button {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-input-area button:disabled {
          background: var(--text-muted);
          cursor: not-allowed;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
