
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
    // The main container fills the available vertical space.
    <div className="flex-grow flex flex-col relative">
        {/* The Card is positioned absolutely to fill its parent, preventing the page from growing. */}
        <Card className="absolute inset-0 flex flex-col">
            {/* The header has a fixed height. */}
            <CardHeader className="flex-shrink-0">
                <CardTitle className="text-center font-headline text-3xl text-primary-foreground dark:text-foreground">Global Chat Room</CardTitle>
            </CardHeader>
            {/* The content area grows and scrolls internally. */}
            <CardContent className="flex-grow overflow-y-auto p-4">
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
            {/* The footer has a fixed height. */}
            <CardFooter className="pt-4 border-t flex-shrink-0">
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
