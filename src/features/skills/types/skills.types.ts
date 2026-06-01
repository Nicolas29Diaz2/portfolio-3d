export type SkillType = "web" | "tool" | "design" | "other";

export interface SkillApiResponse {
  readonly id: number;
  readonly name: string;
  readonly type?: string;
  readonly skillPoints?: number;
  readonly yPosition?: number;
  readonly icon?: {
    readonly id: number;
    readonly documentId: string;
    readonly url: string;
  };
}

export interface SkillContent {
  readonly id: number;
  readonly name: string;
  readonly type: SkillType;
  readonly imageUrl: string;
  readonly points: number; // Value representing skill level (filled points)
  readonly y: number;      // Customized vertical offset for labels
}

export interface SkillCategory {
  readonly text: string;
  readonly x: number;
  readonly y: number;
}

export interface SkillGroup {
  readonly id: number;
  readonly category: SkillCategory;
  readonly skills: readonly SkillContent[];
}
