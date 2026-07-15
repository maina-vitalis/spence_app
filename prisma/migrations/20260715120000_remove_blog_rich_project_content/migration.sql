-- Drop blog
DROP TABLE IF EXISTS "blog_posts";
DROP TYPE IF EXISTS "PostStatus";

-- Add rich content field
ALTER TABLE "projects" ADD COLUMN "content" TEXT NOT NULL DEFAULT '';

-- Migrate existing case-study fields into rich content
UPDATE "projects" SET "content" = TRIM(BOTH FROM CONCAT(
  CASE WHEN COALESCE("description", '') != '' THEN
    '<h2>Overview</h2><p>' || REPLACE(REPLACE("description", '&', '&amp;'), E'\n', '<br>') || '</p>'
  ELSE '' END,
  CASE WHEN COALESCE("problemStatement", '') != '' THEN
    '<h2>The problem</h2><p>' || REPLACE(REPLACE("problemStatement", '&', '&amp;'), E'\n', '<br>') || '</p>'
  ELSE '' END,
  CASE WHEN COALESCE("solution", '') != '' THEN
    '<h2>The solution</h2><p>' || REPLACE(REPLACE("solution", '&', '&amp;'), E'\n', '<br>') || '</p>'
  ELSE '' END,
  CASE WHEN COALESCE("designProcess", '') != '' THEN
    CASE WHEN COALESCE("description", '') != '' OR COALESCE("problemStatement", '') != '' OR COALESCE("solution", '') != '' THEN
      '<h2>Design process</h2>' || "designProcess"
    ELSE "designProcess" END
  ELSE '' END,
  CASE WHEN COALESCE("lessonsLearned", '') != '' THEN
    '<h2>Lessons learned</h2><p>' || REPLACE(REPLACE("lessonsLearned", '&', '&amp;'), E'\n', '<br>') || '</p>'
  ELSE '' END
))
WHERE COALESCE("description", '') != ''
   OR COALESCE("problemStatement", '') != ''
   OR COALESCE("solution", '') != ''
   OR COALESCE("designProcess", '') != ''
   OR COALESCE("lessonsLearned", '') != '';

-- Drop rigid case-study columns
ALTER TABLE "projects" DROP COLUMN IF EXISTS "description";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "problemStatement";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "solution";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "designProcess";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "techStack";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "keyFeatures";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "lessonsLearned";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "gallery";
