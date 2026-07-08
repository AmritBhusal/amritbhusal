import blogsData from '@/components/Admin/blogs.json';
import EditBlogClient from './EditBlogClient';

// Required for `output: export` (GitHub Pages) — pre-render one page per blog id
export function generateStaticParams() {
    return blogsData.map((blog) => ({ id: blog.id }));
}

export default function EditBlogPage() {
    return <EditBlogClient />;
}
