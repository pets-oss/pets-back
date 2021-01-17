export const translationFields = `
    {
        id
        value
    }
`;

export const breedFields = `
    {
        id
        code
        value
        species
    }
`;

export const animalDetailsFields = `
    {
        animal_id
        breed
        species
        gender
        color
        birth_date
        weight
        allergy
        food
    }
`;

export const animalRegistrationFields = `
    {
        animal_id
        registration_no
        registration_date
        status
    }
`;

export const animalMicrochipFields = `
    {
        animal_id
        microchip_id
        chip_install_date
        status
    }
`;

export const animalFields = `
    {
        id
        organization
        name
        details ${animalDetailsFields}
        registration ${animalRegistrationFields}
        microchip ${animalMicrochipFields}
        status
        image_url
        comments
        mod_time
    }
`;
