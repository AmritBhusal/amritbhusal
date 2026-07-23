import { MetadataRoute } from 'next';
import portfolioData from '@/components/Portfolio/portfolio.json';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = 'https://amritbhusal1.com.np';
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ];

    // Dynamic project detail pages
    const projectPages: MetadataRoute.Sitemap = portfolioData.map((project) => ({
        url: `${siteUrl}/detail/${project.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Blog: index + one entry per markdown post
    const blogPages: MetadataRoute.Sitemap = [
        { url: `${siteUrl}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
        ...getAllPosts().map((post) => ({
            url: `${siteUrl}/blog/${post.slug}`,
            lastModified: post.publishedAt || currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];

    return [...staticPages, ...projectPages, ...blogPages];
}
