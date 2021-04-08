-- Current count of animals in organization grouped by species and gender

SELECT st.translation AS species,
    gt.translation AS gender,
    COUNT(*) AS cnt
FROM animal AS a
    JOIN animal_details AS ad ON a.id = ad.animal_id
    JOIN breed AS b ON ad.breed_id = b.id
    JOIN species_translation AS st ON b.species = st.species
    AND st.language = 'lt'
    JOIN gender_translation AS gt ON ad.gender_id = gt.gender
    AND gt.language = 'lt'
GROUP BY st.translation,
    gt.translation
ORDER BY st.translation,
    gt.translation;