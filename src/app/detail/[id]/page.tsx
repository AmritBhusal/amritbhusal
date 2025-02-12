
import Detail from "@/components/Portfolio/Detail";
import portfolioData from '@/components/Portfolio/portfolio.json';

// Generate static params for all project IDs
export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    id: project.id,
  }));
}

const DetailPage = () => {
  return <Detail />;
};

export default DetailPage;