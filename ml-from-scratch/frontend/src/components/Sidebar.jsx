import React, { useMemo, useState } from 'react';
import { Plus, MessageSquare, Trash2, X, Download, Edit2, Check } from 'lucide-react';

export default function Sidebar({ 
  isOpen, 
  onClose, 
  chats, 
  activeChatId, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat,
  onRenameChat,
  onExportChat
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Group chats logic directly inside Sidebar for simplicity since it's removed from utils possibly
  const groupedChats = useMemo(() => {
    const groups = { Today: [], Yesterday: [], 'Previous 7 Days': [], Older: [] };
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;
    const weekAgo = today - 7 * 86400000;

    [...chats]
      .sort((a, b) => b.createdAt - a.createdAt)
      .forEach((chat) => {
        if (chat.createdAt >= today) groups['Today'].push(chat);
        else if (chat.createdAt >= yesterday) groups['Yesterday'].push(chat);
        else if (chat.createdAt >= weekAgo) groups['Previous 7 Days'].push(chat);
        else groups['Older'].push(chat);
      });

    return groups;
  }, [chats]);

  const handleEditStart = (chat) => {
    setEditingId(chat.id);
    setEditTitle(chat.title);
  };

  const handleEditSave = () => {
    if (editingId && editTitle.trim()) {
      onRenameChat(editingId, editTitle);
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') setEditingId(null);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div className="company-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/logo-nobg.png" 
            alt="Logic Intelligence Logo" 
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} 
            onError={(e) => { e.target.src = '/logo-nobg.png'; e.target.style.display = 'none'; }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}>Logic Intelligence</span>
            <span style={{ fontSize: '10px', color: '#888' }}>Technologies version 1</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <button 
            className="new-chat-btn" 
            onClick={onNewChat}
            aria-label="Create new chat"
            style={{ flex: 1, marginRight: '10px' }}
          >
            <Plus size={16} />
            <span>New chat</span>
          </button>
          
          <button 
            className="close-sidebar-btn" 
            onClick={onClose}
            aria-label="Close sidebar"
            aria-expanded={isOpen}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="sidebar-content">
        <nav aria-label="Chat history">
          {Object.entries(groupedChats).map(([groupName, groupChats]) => {
            if (groupChats.length === 0) return null;
            
            return (
              <div key={groupName} className="chat-group">
                <h3 className="group-title">{groupName}</h3>
                <ul className="chat-list">
                  {groupChats.map(chat => (
                    <li key={chat.id}>
                      <div className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}>
                        
                        {editingId === chat.id ? (
                          <div className="chat-item-edit-mode" style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '0 8px' }}>
                            <input 
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onKeyDown={handleEditKeyDown}
                              onBlur={handleEditSave}
                              autoFocus
                              style={{ flex: 1, background: 'transparent', border: '1px solid #ccc', color: 'inherit', borderRadius: '4px', padding: '2px 4px' }}
                            />
                            <button onClick={handleEditSave} style={{ marginLeft: '4px', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                              <Check size={14} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="chat-item-btn" 
                            onClick={() => onSelectChat(chat.id)}
                            onDoubleClick={() => handleEditStart(chat)}
                            aria-current={chat.id === activeChatId ? "page" : undefined}
                          >
                            <MessageSquare size={16} className="chat-icon" />
                            <span className="chat-item-title">{chat.title}</span>
                          </button>
                        )}
                        
                        {editingId !== chat.id && (
                          <div className="chat-item-actions" style={{ display: 'flex', gap: '4px' }}>
                            <button 
                              className="edit-btn" 
                              onClick={() => handleEditStart(chat)}
                              aria-label={`Rename chat: ${chat.title}`}
                              title="Rename chat"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              className="export-btn" 
                              onClick={() => onExportChat(chat.id)}
                              aria-label={`Export chat: ${chat.title}`}
                              title="Export chat as Markdown"
                            >
                              <Download size={14} />
                            </button>
                            <button 
                              className="delete-btn" 
                              onClick={() => onDeleteChat(chat.id)}
                              aria-label={`Delete chat: ${chat.title}`}
                              title="Delete chat"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
