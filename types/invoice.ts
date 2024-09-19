import { z } from "zod";

export const SearchParamSchema = z.record(z.string());
