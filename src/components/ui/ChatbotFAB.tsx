import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X, Send, Bot } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { Input } from "./input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatbotFAB() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi! I'm your assistant.",
      isBot: true,
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! I'm a demo chatbot and can't respond yet, but I received your message.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* Chat Window */
          <motion.div
            key="chatwindow"
            initial={{ scale: 0, opacity: 0, y: 20, originX: 1, originY: 1 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[360px] h-[480px] bg-background border rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-card">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Bot size={16} className="text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">Chatbot</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className="h-8 w-8 p-0 hover:bg-muted"
              >
                <X size={16} />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 h-[340px] p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[280px] px-4 py-2 rounded-2xl shadow-sm ${
                        message.isBot
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-card">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 rounded-full bg-muted border-muted focus:bg-background"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90"
                >
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* FAB Button */
          <motion.div
            key="fab"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.5 }}
          >
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "72px",
                height: "72px",
                left: "-8px",
                top: "-8px",
              }}
            />

            {/* Main FAB */}
            <motion.button
              onClick={handleToggle}
              className="relative w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-200"
              whileHover={{
                scale: 1.1,
                y: -2,
                boxShadow: "0 10px 30px hsla(var(--primary) / 0.3)",
              }}
              whileTap={{
                scale: 0.9,
              }}
              aria-label="Open chatbot"
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Icon */}
              <motion.div
                className="relative z-10 flex items-center justify-center w-full h-full"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                whileHover={{
                  rotate: [0, 10, -10, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <GraduationCap 
                  size={24} 
                  className="drop-shadow-sm" 
                  strokeWidth={2}
                />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility */}
      <span className="sr-only">
        {isExpanded ? "Chatbot window open" : "Open chatbot"}
      </span>
    </div>
  );
}