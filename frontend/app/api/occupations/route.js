import { occupations, catalogMeta } from "@/lib/catalog";
export function GET() {
  return Response.json({ meta: catalogMeta, occupations });
}
