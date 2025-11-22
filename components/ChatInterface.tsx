
import React, { useEffect, useRef, useState } from 'react';
import { Message, User } from '../types';
import { Send, Bot, User as UserIcon, Volume2, Mic, MicOff, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  messages: Message[];
  user: User;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  language: 'en' | 'ta' | 'hi';
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, user, onSendMessage, isLoading, language }) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    // Small delay to allow animation to start/layout to adjust
    setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        // Set language based on prop
        recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

        recognitionRef.current.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              }
            }
            if (finalTranscript) {
                setInputText((prev) => {
                    return prev ? `${prev} ${finalTranscript}` : finalTranscript;
                });
                setIsListening(false);
            }
        };

        recognitionRef.current.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        // Attempt to set voice based on language, though browser support varies
        utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9; // Slightly slower for teaching
        window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }

    if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
    } else {
        try {
            recognitionRef.current.start();
            setIsListening(true);
        } catch (e) {
            console.error(e);
        }
    }
  };

  const getCartoonImageUrl = (keyword: string) => {
    // Use a placeholder service that generates images with text, styled to look friendly
    // In a production app, this would call an image generation API
    const colors = ['FFD93D', '6BCB77', '4D96FF', 'FF6B6B'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `https://placehold.co/400x300/${color}/FFFFFF?text=${encodeURIComponent(keyword)}&font=fredoka`;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl border-4 border-brand-blue/10 overflow-hidden relative">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 scroll-smooth">
        <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-col'} items-start gap-2`}>
              
              {/* Header with Avatar for Bot */}
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-1">
                     <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm bg-brand-blue">
                        <Bot size={16} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">AI Tutor</span>
                </div>
              )}

              {/* User Avatar - Inline */}
              {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm bg-brand-purple self-end mb-1">
                     <UserIcon size={16} className="text-white" />
                  </div>
              )}

              {/* Message Content Wrapper */}
              <div className={`relative group ${msg.role === 'model' ? 'ml-2' : ''}`}>
                 
                 {/* Text Bubble */}
                 <div className={`
                    p-4 rounded-2xl text-lg leading-relaxed font-medium shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-brand-purple text-white rounded-br-none shadow-[0_2px_0_0_#7C3AED]' 
                      : 'bg-white border-2 border-slate-200 text-slate-800 rounded-tl-none'}
                  `}>
                    {msg.text}
                 </div>
                 
                 {/* Visual Attachment (Cartoon Image) */}
                 {msg.imageKeyword && msg.role === 'model' && (
                     <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 rounded-xl overflow-hidden border-4 border-white shadow-md max-w-xs"
                     >
                         <div className="bg-slate-100 p-1 relative">
                             <img 
                                src={getCartoonImageUrl(msg.imageKeyword)} 
                                alt={msg.imageKeyword}
                                className="w-full h-auto rounded-lg object-cover hover:scale-105 transition-transform duration-500" 
                             />
                             <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-slate-600 flex items-center gap-1">
                                <ImageIcon size={12} />
                                {msg.imageKeyword}
                             </div>
                         </div>
                     </motion.div>
                 )}

                 {/* Audio Action for Bot */}
                 {msg.role === 'model' && (
                     <button 
                        onClick={() => speakText(msg.text)}
                        className="absolute -right-10 top-2 p-2 bg-white rounded-full shadow-sm border border-slate-100 text-slate-400 hover:text-brand-blue hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                        title="Read Aloud"
                     >
                        <Volume2 size={18} />
                     </button>
                 )}
              </div>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Thinking...</span>
              </div>
              <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm ml-2">
                <div className="flex space-x-2">
                  <motion.div 
                    animate={{ y: [0, -6, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="w-2 h-2 bg-brand-blue rounded-full"
                  />
                  <motion.div 
                    animate={{ y: [0, -6, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                    className="w-2 h-2 bg-brand-yellow rounded-full"
                  />
                  <motion.div 
                    animate={{ y: [0, -6, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-brand-red rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t-2 border-slate-100">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <button 
            type="button" 
            className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center ${
                isListening 
                ? 'bg-red-100 text-red-500 ring-4 ring-red-50 animate-pulse' 
                : 'text-slate-400 hover:bg-slate-100'
            }`}
            onClick={toggleListening}
            title={isListening ? "Stop Recording" : "Start Recording"}
          >
             {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening..." : "Type or say your answer..."}
            className={`flex-1 bg-slate-100 border-2 rounded-2xl px-4 py-3 text-lg focus:outline-none transition-colors placeholder-slate-400 ${
                isListening ? 'border-red-200 bg-red-50' : 'border-slate-200 focus:border-brand-blue focus:bg-white'
            }`}
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-14 h-14 flex items-center justify-center bg-brand-blue text-white rounded-2xl shadow-[0_4px_0_0_#2563EB] active:scale-95 active:shadow-none transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </form>
      </div>
    </div>
  );
};
