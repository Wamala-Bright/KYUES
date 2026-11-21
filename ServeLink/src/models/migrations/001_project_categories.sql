-- KYUES migration: allow a project to belong to multiple categories.
-- Run this once against the PostgreSQL database used by the Render service.
-- Existing project/category assignments are copied before the old column is removed.

BEGIN;

CREATE TABLE IF NOT EXISTS project_categories (
    project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE RESTRICT,
    PRIMARY KEY (project_id, category_id)
);

-- Preserve every category assignment currently stored on projects.
INSERT INTO project_categories (project_id, category_id)
SELECT project_id, category_id
FROM projects
WHERE category_id IS NOT NULL
ON CONFLICT (project_id, category_id) DO NOTHING;

-- Add relevant secondary categories to demonstrate the many-to-many relationship.
INSERT INTO project_categories (project_id, category_id)
SELECT p.project_id, c.category_id
FROM projects p
JOIN categories c ON c.name = CASE p.title
    WHEN 'Environmental Projects' THEN 'Community Service'
    WHEN 'Academic Mentorship' THEN 'Community Service'
    WHEN 'Community Outreach' THEN 'Environmental'
    WHEN 'Health and Wellness Campaigns' THEN 'Educational'
END
WHERE p.title IN (
    'Environmental Projects',
    'Academic Mentorship',
    'Community Outreach',
    'Health and Wellness Campaigns'
)
ON CONFLICT (project_id, category_id) DO NOTHING;

-- Ensure the upcoming-project list has five records for the rubric.
-- category_id is supplied here because the legacy column is still NOT NULL.
INSERT INTO projects (
    organization_id, category_id, title, description, location, date, image_filename
)
SELECT o.organization_id, c.category_id,
       'Engineering Skills Workshop',
       'Take part in a practical workshop focused on engineering skills, teamwork and community problem-solving.',
       'Kyambogo, Kampala, Uganda', DATE '2027-01-02', 'projects.jfif'
FROM organization o
JOIN categories c ON c.name = 'Educational'
WHERE o.name = 'BrightFuture Builders'
  AND NOT EXISTS (
      SELECT 1 FROM projects p WHERE p.title = 'Engineering Skills Workshop'
  );

INSERT INTO project_categories (project_id, category_id)
SELECT p.project_id, c.category_id
FROM projects p
JOIN categories c ON c.name IN ('Educational', 'Community Service')
WHERE p.title = 'Engineering Skills Workshop'
ON CONFLICT (project_id, category_id) DO NOTHING;

ALTER TABLE projects DROP CONSTRAINT IF EXISTS fk_project_category;
ALTER TABLE projects DROP COLUMN IF EXISTS category_id;

COMMIT;
