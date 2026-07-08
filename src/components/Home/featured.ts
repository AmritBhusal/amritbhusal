import portfolioData from '@/components/Portfolio/portfolio.json';
import { Project } from '@/components/Intro/types';

/**
 * Hand-picked featured projects (order matters):
 * Gadgetbyte, Ultima, Community Homestay, Neboer, Rara Treks, ITeam.
 * NOTE: ids 18/17/16 currently all point at community-homestay.png — drop real
 * screenshots for Neboer (17) and ITeam (16) into public/project and update their
 * `image` fields in portfolio.json, or these three cards will look identical.
 */
export const FEATURED_IDS = ['20', '19', '18', '17', '14', '16'];

const byId = new Map((portfolioData as Project[]).map((p) => [p.id, p]));

export const featuredProjects: Project[] = FEATURED_IDS.map((id) => byId.get(id)).filter(
  (p): p is Project => Boolean(p)
);
