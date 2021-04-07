-- https://github.com/pets-oss/pets-back/issues/144
WITH cte_stats AS (
SELECT
	to_char(aef.date_time, 'yyyymm') AS "year_month",
	ad.breed_id,
	a.organization,
	'found' AS "circumstance",
	count(aef.animal_id) AS "cnt"
FROM animal_event_found aef
INNER JOIN animal_details ad ON ad.animal_id = aef.animal_id
INNER JOIN animal a ON a.id = ad.animal_id
GROUP BY to_char(aef.date_time, 'yyyymm'), ad.breed_id, a.organization
UNION
SELECT
	to_char(aega.date_time, 'yyyymm') AS "year_month",
	ad.breed_id,
	a.organization,
	'given away' AS "circumstance",
	count(aega.animal_id) AS "cnt"
FROM animal_event_given_away aega
INNER JOIN animal_details ad ON ad.animal_id = aega.animal_id
INNER JOIN animal a ON a.id = ad.animal_id
GROUP BY to_char(aega.date_time, 'yyyymm'), ad.breed_id, a.organization
)
SELECT
	rs.year_month,
	st."translation" AS "species",
	rs.circumstance,
	o.Name AS "Organization",
	rs.cnt
FROM cte_stats rs
INNER JOIN breed b ON b.id = rs.breed_id
INNER JOIN species_translation st ON st."species" = b."species"
INNER JOIN organization o ON o.id = rs.organization
ORDER BY rs.year_month

