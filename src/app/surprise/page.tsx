"use client";

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase-config';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import type { ChatMessage } from '@/lib/types';
import { ChatMessageItem } from '@/components/chat-message-item';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function GlobalChatPage() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: ChatMessage[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        timestamp: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    // The main container will grow to fill the available space from the layout.
    <div className="flex flex-col flex-grow">
      {/* The Card will act as the chat window, also a flex column that grows. */}
      {/* overflow-hidden on the card is important to contain the children */}
      <Card className="flex-grow flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle className="text-center font-headline text-3xl text-primary-foreground dark:text-foreground">Global Chat Room</CardTitle>
        </CardHeader>
        {/* This CardContent will be the scrollable message area.
            - flex-1 makes it take up all available space between header and footer.
            - min-h-0 is crucial for flex items to allow them to shrink and not overflow their parent.
            - overflow-y-auto enables scrolling when content is too tall.
        */}
        <CardContent className="flex-1 p-4 overflow-y-auto min-h-0">
          <div className="space-y-4">
            {messages.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                message={msg}
                isCurrentUser={user?.uid === msg.uid}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        {/* The footer is a static part of the flex layout. */}
        <CardFooter className="pt-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={loading || !user}
              autoComplete="off"
            />
            <Button type="submit" disabled={loading || !user || newMessage.trim() === ''}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
