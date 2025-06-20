
"use client";

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase-config';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import type { ChatMessage } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessageItem } from '@/components/chat-message-item';
import { Send, MessageSquare } from 'lucide-react';
import { PageLoader } from '@/components/layout/page-loader'; // Assuming you have this for loading state

const MESSAGES_LIMIT = 50;

export default function GlobalChatPage() {
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      // If user is not logged in yet (or logs out), don't attempt to fetch chat
      // authLoading will handle showing a loader until auth state is clear
      if (!authLoading) setChatLoading(false); // If auth is resolved and no user, stop chat loading
      return;
    }

    setChatLoading(true);
    const messagesCollectionRef = collection(db, 'global_chat_messages');
    const q = query(
      messagesCollectionRef,
      orderBy('timestamp', 'asc'), // Fetch oldest first to maintain order, then we can limit if needed
      limit(MESSAGES_LIMIT) // Fetch only the last N messages
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedMessages: ChatMessage[] = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ id: doc.id, ...doc.data() } as ChatMessage);
        });
        setMessages(fetchedMessages);
        setChatLoading(false);
      },
      (error) => {
        console.error('Error fetching chat messages:', error);
        setChatLoading(false);
        // Optionally, show an error toast or message to the user
      }
    );

    return () => unsubscribe();
  }, [user, authLoading]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || newMessage.trim() === '') {
      return;
    }

    try {
      await addDoc(collection(db, 'global_chat_messages'), {
        text: newMessage.trim(),
        userId: user.uid,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || null,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally, show an error toast
    }
  };

  if (authLoading || chatLoading) {
    return <PageLoader />;
  }

  if (!user && !authLoading) {
    // This case should ideally be handled by global redirection logic in ClientProviders or Layout
    // but as a fallback:
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
        <p className="text-xl font-semibold">Please log in to join the chat.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] flex-grow"> {/* Adjust height based on your navbar/footer */}
      <header className="text-center py-4 border-b">
        <h1 className="text-3xl font-headline font-bold text-primary-foreground dark:text-foreground">
          Global Chat Room
        </h1>
      </header>

      <ScrollArea ref={scrollAreaRef} className="flex-grow p-4 space-y-4 bg-muted/20">
        {messages.map((msg) => (
          <ChatMessageItem key={msg.id} message={msg} isCurrentUser={msg.userId === user?.uid} />
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t bg-background flex items-center gap-3"
      >
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow"
          aria-label="Chat message input"
        />
        <Button type="submit" disabled={!newMessage.trim()} className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white">
          <Send className="mr-2 h-4 w-4" /> Send
        </Button>
      </form>
    </div>
  );
}
