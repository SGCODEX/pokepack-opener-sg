
"use client";

import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase-config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/auth-context';
import type { ChatMessage } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChatMessageItem } from '@/components/chat-message-item';
import { PageLoader } from '@/components/layout/page-loader';

export default function GlobalChatPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      const messagesCollection = collection(db, 'messages');
      const q = query(messagesCollection, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as ChatMessage));
        setMessages(msgs);
      }, (error) => {
        console.error("Error fetching messages:", error);
        toast({
          title: 'Error',
          description: 'Could not load chat messages.',
          variant: 'destructive',
        });
      });

      return () => unsubscribe();
    }
  }, [user, toast]);
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaViewportRef.current) {
        scrollAreaViewportRef.current.scrollTop = scrollAreaViewportRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user) return;

    setIsSending(true);
    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || null,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };
  
  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-full bg-card rounded-lg shadow-xl border border-border">
      <header className="p-4 border-b">
        <h1 className="text-xl font-headline font-bold text-center text-primary-foreground dark:text-foreground">Global Chat</h1>
      </header>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4" ref={scrollAreaViewportRef}>
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} message={msg} isCurrentUser={user?.uid === msg.uid} />
          ))}
        </div>
      </ScrollArea>

      <footer className="p-4 border-t bg-background rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={user ? "Type your message..." : "You must be signed in to chat."}
            disabled={isSending || !user}
            autoComplete="off"
          />
          <Button type="submit" disabled={isSending || !user || newMessage.trim() === ''} size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send Message</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
