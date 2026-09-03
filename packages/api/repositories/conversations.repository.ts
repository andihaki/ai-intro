// implementation detail
const conversationHistories = new Map();

// interface
// export function getLastConversation(id: string) {
//   return conversationHistories.get(id) || [];
// }
const conversationRepository = {
  getLastConversation(id: string) {
    return conversationHistories.get(id) || [];
  },
  getSetUserConversation<P>(id: string, content: P) {
    const messages = [
      ...conversationRepository.getLastConversation(id),
      {
        role: 'user',
        content,
      },
    ];

    conversationHistories.set(id, messages);

    return messages;
  },
  setBotConversation<P>(id: string, content: P) {
    conversationHistories.set(id, [
      ...conversationRepository.getLastConversation(id),
      {
        role: 'assistant',
        content,
      },
    ]);
  },
};

export default conversationRepository;
