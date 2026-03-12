import z from "zod";
import { Id, ImagePath } from "./helpers";

export const CastMemberSchema = z.object({
    id: Id,
    adult: z.boolean().optional(),
    gender: z.number().nullable().optional(),
    known_for_department: z.string().nullable().optional(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number().optional(),
    profile_path: ImagePath.optional(),
    cast_id: Id.optional(),
    character: z.string().optional(),
    credit_id: z.string().optional(),
    order: z.number().optional(),
});
export type CastMember = z.infer<typeof CastMemberSchema>;

export const CrewMemberSchema = z.object({
    id: Id,
    adult: z.boolean().optional(),
    gender: z.number().nullable().optional(),
    known_for_department: z.string().nullable().optional(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number().optional(),
    profile_path: ImagePath.optional(),
    credit_id: z.string().optional(),
    department: z.string().optional(),
    job: z.string().optional(),
});
export type CrewMember = z.infer<typeof CrewMemberSchema>;

export const CreditsSchema = z.object({
    id: Id,
    cast: CastMemberSchema.array().optional(),
    crew: CrewMemberSchema.array().optional(),
});
export type Credits = z.infer<typeof CreditsSchema>;