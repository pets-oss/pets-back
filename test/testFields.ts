export const translationFields = `
    {
        id
        value
    }
`;

export const breedFields = `
    {
        id
        abbreviation
        value
    }
`;

export const animalDetailsFields = `
    {
        animalId
        breed
        species
        gender
        color
        birthDate
        weight
        allergy
        food
    }
`;

export const animalRegistrationFields = `
    {
        registrationNo
        registrationDate
        status
    }
`;

export const animalMicrochipFields = `
    {
        animalId
        microchipId
        chipCompanyCode
        installDate
        installPlace
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
        imageUrl
        comments
        modTime
    }
`;
