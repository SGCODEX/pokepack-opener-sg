
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/layout/page-loader';

export default function RemovedChatPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect users away from this page to the homepage
    router.replace('/');
  }, [router]);

  // Display a loading/redirecting message while the redirect happens
  return <PageLoader />;
}
