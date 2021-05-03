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
        breed {
            id
            abbreviation
            value
        }
        species {
            id
            value
        }
        gender {
            id
            value
        }
        color {
            id
            value
        }
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
        installPlaceId
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

export const userFields = `
    {
        id
        username
        name
        surname
        email
        roles {
            organizationId
            roleType
        }
        modTime
    }
`;

export const organizationFields = `
    {
        id,
        name,
        country,
        city,
        streetAddress,
        phone,
        modTime
    }
`;

export const eventTypeFields = `
    {
        id,
        type
    }
`;

export const eventFields = `
    {
        id,
        animal,
        type ${eventTypeFields},
        expenses,
        dateTime,
        comments,
        category
    }
`;

export const organizationTaskFields = `
    {
        id,
        title,
        description,
        organization,
        isDone
    }
`;

export const formerAnimalOwnerFields = `
    {
        id,
        name,
        surname,
        phone
    }
`;
