-- Current count of animals in organization grouped by species and gender (https://github.com/pets-oss/pets-back/issues/149)

WITH const AS (
    SELECT 'lt' AS lang
)
SELECT st.translation AS species,
    gt.translation AS gender,
    COUNT(*) AS cnt
FROM animal AS a
JOIN animal_details AS ad
    ON a.id = ad.animal_id
JOIN breed AS b
    ON ad.breed_id = b.id
JOIN (SELECT * FROM species_translation WHERE language = (SELECT lang FROM const)) AS st
    ON b.species = st.species
JOIN (SELECT * FROM gender_translation WHERE language = (SELECT lang FROM const)) AS gt
    ON ad.gender_id = gt.gender
GROUP BY st.translation,
    gt.translation
ORDER BY st.translation,
    gt.translation;


-- https://github.com/pets-oss/pets-back/issues/144
-- Return statistics of sheltered animals of organization; inluding year_month, species, circumstance(found or given away), number of animals of circumstance activity
WITH const AS (
    SELECT 'lt' AS lang
),
cte_stats AS (
SELECT
	to_char(aef.date_time, 'yyyymm') AS "year_month",
	b.species,
	a.organization,
	'found' AS "circumstance",
	count(aef.animal_id) AS "cnt"
FROM animal_event_found aef
JOIN animal_details ad 
    ON ad.animal_id = aef.animal_id
JOIN animal a 
    ON a.id = ad.animal_id
JOIN breed b 
    ON b.id = ad.breed_id
GROUP BY to_char(aef.date_time, 'yyyymm'),
     b.species, 
     a.organization
UNION
SELECT
	to_char(aega.date_time, 'yyyymm') AS "year_month",
	b.species,
	a.organization,
	'given away' AS "circumstance",
	count(aega.animal_id) AS "cnt"
FROM animal_event_given_away aega
JOIN animal_details ad 
    ON ad.animal_id = aega.animal_id
JOIN animal a 
    ON a.id = ad.animal_id
JOIN breed b 
    ON b.id = ad.breed_id
GROUP BY to_char(aega.date_time, 'yyyymm'), 
    b.species, 
    a.organization
)
SELECT
	rs.year_month,
	st.translation AS "species",
	rs.circumstance,
	o.Id AS "organizationI_id",
	rs.cnt
FROM cte_stats rs
JOIN (SELECT * FROM species_translation WHERE language = (SELECT lang FROM const)) AS st 
    ON rs.species = st.species
JOIN organization o 
    ON o.id = rs.organization
ORDER BY rs.year_month
