
// Back-end server validation in case a user bypasses front-end client-side validation.
// ---- ---- ---- ---- ----  Field validation methods ---- ---- ---- ---- ----

import { getProgrammeByName } from "../models/programmes.js";

// Required validation method
export function required(name, value) {
    if (!value) return `'${name}' is a required field.`;
}

// Method that checks whether the string has the mininum inputted number of characters
export function minLength(min) {
    return (name, value) => {
        if (value && value.length < min) {
            return `'${name}' must be at least ${min} characters. `;
        }
    }
}

// Method that checks for the maximum limit for a string's length
export function maxLength(max) {
    return (name, value) => {
        if (value && value.length > max) {
            return `'${name}' cannot exceed ${max} characters. `;
        }
    }
}

// File validation methods

// File validation method that dictates the maximum size of a file that can be uploaded to the database
export function maxFileSize(maxBytes) {
    return (name, file) => {
        if ((file instanceof File) && file.size > maxBytes) {
            return `'${name}' must be smaller than ${maxBytes / 1024}KB.`;
        }
    }
}

// A function that runs series of validation methods in one 
// and returns the first error it finds.
export function validateField(name, value, validators) {
    for (const validator of validators) {
        const error = validator(name, value);
        if (error) return error;
    }
}

// ---- ---- ---- ---- ----  PROGRAMME VALIDATION METHODS ---- ---- ---- ---- ---- //

// Checks if the programmeName has either a Bachelor of Science or Master of Science abbreivation
// at the start of the programme name, this is used to also automatically assign a LevelID of 1 (BSc) or 2 (MSc) to a new programme
// without user inputting it in the view.
export function validProgrammeName(name, value) {
    if (name) {
        if (value.startsWith("BSc ")) {
            return;
        } if (value.startsWith("MSc")) {
            return;
        }
        return "Programme name must begin with either BSc or MSc with one whitespace.";
    }
}

export function getProgrammeLevelID(value) {
    if (value.startsWith("BSc ")) {
        return 1;
    } if (value.startsWith("MSc")) {
        return 2;
    }
    return null;
}

export function uniqueProgramme(name, ProgrammeName) {
    // Split the programmeName string on the form into multiple strings and capitalise the first letter of every word only
    // using the map function so that the user cannot bypass this validator by making capital letters lowercase or uppercase.
    const validateName = ProgrammeName.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
    const existingProgramme = getProgrammeByName(validateName)
    if (existingProgramme) {
        console.log(existingProgramme)
        return `Programme '${name}' already exists`
    }
}




// ---- ---- ---- ---- ----  Validation Schemas ---- ---- ---- ---- ---- //

// Validate Schema method
export function validateSchema(formData, schema) {
    try {
        let isValid = true;
        const validated = {};
        const schemaEntries = Object.entries(schema);
        const errorEntries = schemaEntries.map(([key, {validators, displayName}]) => {
            const value = formData.get(key);
            const message = validateField(displayName || key, value, validators) || "";

            if (message) {
                isValid = false;
            } else {
                validated[key] = value;
            }
            return [key, {value, message, error: !!message}]

        });
        const errors = Object.fromEntries(errorEntries)
        return { errors, isValid, validated}
    } catch (error) {
        console.error(error)
    }
}


// A schema lists the validation functions for each field. A schema is an object
// or structure of data describing the fields in a form.
export const newProgrammeSchema = {
    'ProgrammeName' : {
        validators: [required, minLength(6), maxLength(50), validProgrammeName, uniqueProgramme],
        displayName: "Programme Name"
    },
    'Description' : {
        validators: [required, minLength(30), maxLength(1200)],
        displayName: "Description" // displayName property allows us to show data in a nicer format than the raw key in error messaging.
    },
    'ProgrammeLeaderID' : {
        validators: [required],
        displayName: "Programme Leader ID"
    },
} 

//Validation schema for authenticating new staff details
export const newStaffSchema = {
    'Name' : {
        validators: [required, minLength(2), maxLength(50)],
        displayName: "Name"
    },
    'Username' : {
        validators: [required, minLength(5), maxLength(50)],
        displayName: "Username"
    },
    'Password' : {
        validators: [required, minLength(8), maxLength(60)],
        displayName: "Password"
    }
}

//Validation schema for authenticating current staff details
export const currentStaffSchema = {
    'Username' : {
        validators: [required, minLength(5), maxLength(50)],
        displayName: "Username"
    },
    'Password' : {
        validators: [required, minLength(8), maxLength(60)],
        displayName: "Password"
    }
}