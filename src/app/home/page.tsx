
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/layout/page-loader';

/**
 * This page now serves as a redirect to the root page ('/').
 * It resolves a routing conflict caused by having a duplicate landing page.
 */
export default function RedirectToRoot() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  // Display a loader while the redirect is in progress.
  return <PageLoader />;
}
