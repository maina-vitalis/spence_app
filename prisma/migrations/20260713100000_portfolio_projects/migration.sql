-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS', 'ARCHIVED');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN "slug" TEXT;
ALTER TABLE "projects" ADD COLUMN "excerpt" TEXT;
ALTER TABLE "projects" ADD COLUMN "problemStatement" TEXT NOT NULL DEFAULT '';
ALTER TABLE "projects" ADD COLUMN "solution" TEXT NOT NULL DEFAULT '';
ALTER TABLE "projects" ADD COLUMN "designProcess" TEXT NOT NULL DEFAULT '';
ALTER TABLE "projects" ADD COLUMN "techStack" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "projects" ADD COLUMN "keyFeatures" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "projects" ADD COLUMN "lessonsLearned" TEXT;
ALTER TABLE "projects" ADD COLUMN "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "projects" ADD COLUMN "status" "ProjectStatus" NOT NULL DEFAULT 'COMPLETED';
ALTER TABLE "projects" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Backfill slug and excerpt from existing data
UPDATE "projects"
SET
  "slug" = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(TRIM("title"), '[^a-zA-Z0-9 -]', '', 'g'), '\s+', '-', 'g')),
  "excerpt" = LEFT("description", 200)
WHERE "slug" IS NULL;

-- Ensure unique slugs for duplicates
WITH numbered AS (
  SELECT
    id,
    "slug",
    ROW_NUMBER() OVER (PARTITION BY "slug" ORDER BY "createdAt") AS rn
  FROM "projects"
)
UPDATE "projects" p
SET "slug" = p."slug" || '-' || (n.rn - 1)
FROM numbered n
WHERE p.id = n.id AND n.rn > 1;

ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "excerpt" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
