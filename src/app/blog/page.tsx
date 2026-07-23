import { Metadata } from 'next';
import BlogListClient from '@/components/Blog/BlogListClient';
import { getAllPosts } from '@/lib/blog';

const siteUrl = 'https://amritbhusal1.com.np';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on frontend engineering, TypeScript, React and Next.js by Amrit Bhusal.',
  alternates: { canonical: `${siteUrl}/blog` },
};

export default function BlogPage() {
  // Strip rendered HTML — the list only needs metadata.
  const posts = getAllPosts().map(({ html, ...meta }) => meta);
  return <BlogListClient posts={posts} />;
}
