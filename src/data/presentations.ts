export type PresentationType = 'handcrafted-carbon' | 'carbon-sleeve-luminous';

export interface PresentationInfo {
  type: PresentationType;
  name: string;
  badge: string;
  shortBadge: string;
  tagline: string;
  description: string;
  luminousFeature?: string;
}

export const PRESENTATION_DETAILS: Record<PresentationType, PresentationInfo> = {
  'handcrafted-carbon': {
    type: 'handcrafted-carbon',
    name: 'Handcrafted Carbon Fibre Bottle',
    badge: 'Artisanal Genuine Carbon Fibre',
    shortBadge: 'Genuine Carbon Fibre',
    tagline: '37 Artisanal Production Stages',
    description:
      'The bottle is individually covered with genuine carbon fibre using an artisanal process involving 37 production stages. This exclusive finish makes every bottle a luxury presentation piece designed for collectors, celebrations and prestigious gifts.',
  },
  'carbon-sleeve-luminous': {
    type: 'carbon-sleeve-luminous',
    name: 'Carbon-Look Sleeve Bottle',
    badge: 'Luminous Carbon-Look Sleeve',
    shortBadge: 'Luminous Sleeve',
    tagline: 'Touch-Activated Integrated Illumination',
    description:
      'The bottle is dressed in a specially designed sleeve that recreates Champagne Carbon’s signature carbon-fibre appearance. It offers the same premium Champagne quality in a more accessible presentation. Luminous editions feature an illuminated design for an impressive effect when served at parties, clubs and special events.',
    luminousFeature:
      'The Luminous edition features an integrated lighting system within the bottle’s decorative sleeve. Simply touch or press the activation point to illuminate the bottle and reveal its striking design.',
  },
};
