'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { 
  ChatMessage, 
  welcomeMessage, 
  findBestMatch, 
  defaultResponse,
  quickSuggestions 
} from '@/lib/chatbot-knowledge';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll para última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Foco no input quando abre o chat
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Processar mensagem do usuário
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simula delay de digitação do bot
    setTimeout(() => {
      const match = findBestMatch(text);
      const response = match || defaultResponse;

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date(),
        buttons: response.buttons,
        feedback: null
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  // Lidar com clique em botão
  const handleButtonClick = (action: string, value: string) => {
    if (action === 'message') {
      handleSendMessage(value);
    } else if (action === 'link') {
      window.location.href = value;
    } else if (action === 'contact') {
      // Simula redirecionamento para atendimento
      const contactMessage: ChatMessage = {
        id: Date.now().toString(),
        text: 'Redirecionando você para nosso atendimento ao cliente...',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, contactMessage]);
      
      // Aqui você pode integrar com sistema de tickets, chat ao vivo, etc.
      setTimeout(() => {
        alert('Em breve você será conectado a um atendente. Por enquanto, envie um e-mail para suporte@exemplo.com');
      }, 1000);
    }
  };

  // Feedback da resposta
  const handleFeedback = (messageId: string, feedback: 'useful' | 'not-useful') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));

    // Aqui você pode enviar o feedback para analytics
    console.log(`Feedback para mensagem ${messageId}: ${feedback}`);
  };

  // Resetar conversa
  const handleReset = () => {
    setMessages([welcomeMessage]);
    setInputValue('');
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 group"
        aria-label="Abrir assistente virtual"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              1
            </span>
          </>
        )}
      </button>

      {/* Janela do chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Assistente Virtual</h3>
                <p className="text-xs text-blue-100">Online • Responde em segundos</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-white/80 hover:text-white text-sm underline"
            >
              Reiniciar
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>

                  {/* Botões de ação */}
                  {message.buttons && message.buttons.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.buttons.map((button, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonClick(button.action, button.value)}
                          className="w-full text-left px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                        >
                          {button.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Feedback */}
                  {message.sender === 'bot' && message.id !== 'welcome' && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Esta resposta foi útil?</span>
                      <button
                        onClick={() => handleFeedback(message.id, 'useful')}
                        className={`p-1 rounded ${
                          message.feedback === 'useful'
                            ? 'bg-green-100 text-green-600'
                            : 'text-gray-400 hover:text-green-600'
                        }`}
                        disabled={message.feedback !== null}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'not-useful')}
                        className={`p-1 rounded ${
                          message.feedback === 'not-useful'
                            ? 'bg-red-100 text-red-600'
                            : 'text-gray-400 hover:text-red-600'
                        }`}
                        disabled={message.feedback !== null}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Indicador de digitação */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sugestões rápidas (apenas se for a primeira mensagem) */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Sugestões rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.slice(0, 3).map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
