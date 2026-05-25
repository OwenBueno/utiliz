import tools from '../data/tools.json';

export interface Tool {
  slug: string;
  name: string;
  category: string;
  icon: string;
  phase: number;
}

const CATEGORY_ORDER = ['text', 'media', 'dev', 'pdf', 'ai'] as const;

export function getTools(): Tool[] {
  return tools as Tool[];
}

export function getToolsByCategory(): Map<string, Tool[]> {
  const grouped = new Map<string, Tool[]>();

  for (const category of CATEGORY_ORDER) {
    const categoryTools = getTools().filter((tool) => tool.category === category);
    if (categoryTools.length > 0) {
      grouped.set(category, categoryTools);
    }
  }

  return grouped;
}

export function resolveToolPath(slug: string, baseUrl: string): string {
  return `${baseUrl}tools/${slug}/`;
}

export function getToolPath(slug: string): string {
  return resolveToolPath(slug, import.meta.env.BASE_URL);
}
