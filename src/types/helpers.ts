import z from "zod";

export const Id = z.number().int();
export const ImagePath = z.string().nullable();
export const ISO_639_1 = z.string().min(2).max(2).optional();
export const ISO_3166_1 = z.string().min(2).max(2).optional();
export const DateString = z.date().optional();