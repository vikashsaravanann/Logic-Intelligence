import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import WelcomeScreen from './components/WelcomeScreen';
import MessageList from './components/MessageList';
import ChatComposer from './components/ChatComposer';
import Toast from './components/Toast';
import ConfirmDialog from './components/ConfirmDialog';

import { useChats } from './hooks/useChats';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import { useChatRequest } from './hooks/useChatRequest';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, chatId: null });
  const [backendOffline, setBackendOffline] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { toasts, addToast, removeToast } = useToast();
  const { isStreaming, sendMessage, cancelRequest } = useChatRequest();
  
  const { 
    chats, 
    activeChat, 
    activeChatId, 
    createNewChat, 
    selectChat, 
    deleteChat, 
    renameChat,
    exportChat,
    addMessage,
    updateLastMessage
  } = useChats();

  // Close sidebar on mobile when a chat is selected
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [activeChatId]);

  const handleSendMessage = async (text) => {
    let currentChatId = activeChatId;
    if (!currentChatId) {
      currentChatId = createNewChat();
    }
    
    // Add user message
    addMessage(currentChatId, { role: 'user', text });
    
    // Optimistically add empty assistant message to stream into
    addMessage(currentChatId, { role: 'assistant', text: '' });
    
    try {
      await sendMessage(text, {
        onToken: (partialText) => {
          updateLastMessage(currentChatId, (msg) => ({ ...msg, text: partialText }));
        },
        onComplete: (fullText) => {
          updateLastMessage(currentChatId, (msg) => ({ ...msg, text: fullText }));
        },
        onError: (errMsg) => {
          updateLastMessage(currentChatId, (msg) => ({ ...msg, text: errMsg }));
          addToast(errMsg, 'error');
        }
      });
    } catch (error) {
      // General failure (e.g. backend offline)
      setBackendOffline(true);
      updateLastMessage(currentChatId, (msg) => ({ ...msg, text: 'Connection failed. Please ensure the backend is running.' }));
      addToast('Connection failed. Backend may be offline.', 'error');
    }
  };

  const handleRetryLast = () => {
    if (!activeChat || activeChat.messages.length < 2) return;
    
    // Find the last user message
    const messages = activeChat.messages;
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.text);
    }
  };

  const handleDeleteRequest = (chatId) => {
    setConfirmDialog({ isOpen: true, chatId });
  };

  const confirmDelete = () => {
    if (confirmDialog.chatId) {
      deleteChat(confirmDialog.chatId);
      addToast('Conversation deleted', 'success');
    }
    setConfirmDialog({ isOpen: false, chatId: null });
  };

  const cancelDelete = () => {
    setConfirmDialog({ isOpen: false, chatId: null });
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Toast toasts={toasts} removeToast={removeToast} />
      
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSelectChat={selectChat}
        onDeleteChat={handleDeleteRequest}
        onRenameChat={renameChat}
        onExportChat={exportChat}
      />
      
      <main className="main-content">
        <ChatHeader 
          title={activeChat?.title} 
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenMenu={() => setSidebarOpen(true)} 
        />
        
        <div className="chat-scroll-area">
          {!activeChatId || activeChat?.messages.length === 0 ? (
            <WelcomeScreen onSelectSuggestion={handleSendMessage} />
          ) : (
            <div className="chat-container">
              <MessageList 
                messages={activeChat.messages}
                loading={isStreaming}
                onCopy={() => addToast('Copied to clipboard!', 'success')}
                onRetryLast={handleRetryLast}
              />
            </div>
          )}
        </div>
        
        <ChatComposer 
          onSend={handleSendMessage}
          onStop={cancelRequest}
          loading={isStreaming}
          disabled={backendOffline && false} // Optional: block input entirely if offline
        />
      </main>

      <ConfirmDialog 
        isOpen={confirmDialog.isOpen}
        title="Delete conversation?"
        message="This will permanently delete this conversation and it cannot be recovered."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}