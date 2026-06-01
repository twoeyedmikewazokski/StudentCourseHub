
// Back-end server validation in case a user bypasses front-end client-side validation.
// ---- ---- ---- ---- ----  Field validation methods ---- ---- ---- ---- ----

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


// ---- ---- ---- ---- ----  Validation Schemas ---- ---- ---- ---- ----

// Validate Schema method
export function validateSchema(formData, schema) {
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
        return [key, {value, message, error: !!message}];

    });
    const errors = Object.fromEntries(errorEntries);
    return { errors, isValid, validated };
}

// A schema lists the validation functions for each field. A schema is an object
// or structure of data describing the fields in a form.
export const newProgrammeSchema = {
    'ProgrammeName' : {
        validators: [required, minLength(6), maxLength(50)],
        displayName: "Programme Name"
    },
    'Description' : {
        validators: [required, minLength(30), maxLength(1200)],
        displayName: "Description" // displayName property allows us to show data in a nicer format than the raw key in error messaging.
    }
} 

//Validation schema for staff authentication
export const newStaffSchema = {
    'Username' : {
        validators: [required, maxLength(5), maxLength(50)],
        displayName: "Username"
    },
    'Password' : {
        validators: [required, maxLength(7), maxLength(60)],
        displayName: "Password"
    }
}