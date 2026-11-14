-- ============================================
-- SERVELINK DATABASE SETUP
-- ============================================

-- 1. ORGANIZATION TABLE

CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- 2. CATEGORIES TABLE

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image_filename VARCHAR(255) NOT NULL
);


-- 3. PROJECTS TABLE

CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    image_filename VARCHAR(255) NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_project_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE RESTRICT,

    CONSTRAINT unique_organization_project
        UNIQUE (organization_id, title)
);


-- ============================================
-- 4. INSERT ORGANIZATIONS
-- ============================================

INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'kogsa.jpg'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'environment.jpg'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'community_outreach.jfif'
)
ON CONFLICT (name) DO NOTHING;


-- ============================================
-- 5. INSERT CATEGORIES
-- ============================================

INSERT INTO categories
(name, description, image_filename)
VALUES
(
    'Environmental',
    'Protect nature, plant trees, promote conservation and support cleaner communities.',
    'environment.jpg'
),
(
    'Educational',
    'Support education through tutoring, mentoring and learning activities.',
    'education.jpg'
),
(
    'Community Service',
    'Help families, support local initiatives and strengthen communities.',
    'community_outreach.jfif'
),
(
    'Health and Wellness',
    'Promote healthy living and support community wellness activities.',
    'health.jfif'
)
ON CONFLICT (name) DO NOTHING;


-- ============================================
-- 6. INSERT PROJECTS
-- ============================================

INSERT INTO projects (
    organization_id,
    category_id,
    title,
    description,
    location,
    date,
    image_filename
)

SELECT
    o.organization_id,
    c.category_id,
    p.title,
    p.description,
    p.location,
    p.date::DATE,
    p.image_filename

FROM (
    VALUES

    (
        'GreenHarvest Growers',
        'Environmental',
        'Environmental Projects',
        'Participate in environmental activities, conservation campaigns and community clean-up initiatives.',
        'Kampala, Uganda',
        '2026-12-05',
        'environment.jpg'
    ),

    (
        'UnityServe Volunteers',
        'Educational',
        'Academic Mentorship',
        'Support fellow students through tutoring, knowledge sharing and academic mentorship.',
        'Kampala, Uganda',
        '2026-12-12',
        'education.jpg'
    ),

    (
        'UnityServe Volunteers',
        'Community Service',
        'Community Outreach',
        'Participate in outreach programmes that support communities and encourage positive change.',
        'Kampala, Uganda',
        '2026-12-19',
        'community_outreach.jfif'
    ),

    (
        'UnityServe Volunteers',
        'Health and Wellness',
        'Health and Wellness Campaigns',
        'Promote healthy lifestyles, student wellbeing and awareness through organised activities.',
        'Kampala, Uganda',
        '2026-12-26',
        'health.jfif'
    )

) AS p(
    organization_name,
    category_name,
    title,
    description,
    location,
    date,
    image_filename
)

INNER JOIN organization o
    ON o.name = p.organization_name

INNER JOIN categories c
    ON c.name = p.category_name

ON CONFLICT (organization_id, title) DO NOTHING;


-- ============================================
-- 7. VERIFY DATABASE RECORDS
-- ============================================

SELECT * FROM organization;

SELECT * FROM categories;

SELECT
    p.project_id,
    p.title,
    o.name AS organization,
    c.name AS category,
    p.image_filename
FROM projects p
INNER JOIN organization o
    ON p.organization_id = o.organization_id
INNER JOIN categories c
    ON p.category_id = c.category_id;