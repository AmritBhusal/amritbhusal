import { MetadataRoute } from 'next';
import portfolioData from '@/components/Portfolio/portfolio.json';

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

    return [...staticPages, ...projectPages];
}
