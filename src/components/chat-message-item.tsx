
"use client";

import type { ChatMessage } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';

interface ChatMessageItemProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export function ChatMessageItem({ message, isCurrentUser }: ChatMessageItemProps) {
  const getInitials = (name: string | null) => {
    if (!name) return <UserCircle className="h-6 w-6" />;
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formattedTimestamp = message.timestamp?.toDate
    ? formatDistanceToNowStrict(message.timestamp.toDate(), { addSuffix: true })
    : 'sending...';

  return (
    <div className={`flex items-start gap-3 my-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className="h-10 w-10 border-2 border-border">
        <AvatarImage src={message.photoURL || undefined} alt={message.displayName || 'User'} />
        <AvatarFallback>{getInitials(message.displayName)}</AvatarFallback>
      </Avatar>
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`p-3 rounded-lg shadow-md max-w-xs sm:max-w-md md:max-w-lg break-words
            ${isCurrentUser
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'bg-card text-card-foreground rounded-bl-none border border-border'
            }`}
        >
          <p className="text-xs font-semibold mb-1 opacity-80">
            {isCurrentUser ? 'You' : (message.displayName || 'Anonymous User')}
          </p>
          <p className="text-sm">{message.text}</p>
        </div>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'mr-1' : 'ml-1'} text-muted-foreground`}>
          {formattedTimestamp}
        </p>
      </div>
    </div>
  );
}
