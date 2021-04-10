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
