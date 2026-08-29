export function groupChatsByDate(chats) {
  const groups = {
    Today: [],
    Yesterday: [],
    'Previous 7 Days': [],
    Older: []
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 86400000;
  const lastWeek = today - 7 * 86400000;

  chats.forEach(chat => {
    // Fallback if created at is missing
    const ts = chat.createdAt || 0;
    
    if (ts >= today) {
      groups.Today.push(chat);
    } else if (ts >= yesterday) {
      groups.Yesterday.push(chat);
    } else if (ts >= lastWeek) {
      groups['Previous 7 Days'].push(chat);
    } else {
      groups.Older.push(chat);
    }
  });

  return groups;
}
