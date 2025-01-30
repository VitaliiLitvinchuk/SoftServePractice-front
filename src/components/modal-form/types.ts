/**
 * Validation rule
 * @ {validationFor} - will replaced on name
 * @property { function(string): boolean } func - function to validate value
 * @property { string } message - error message if validation fails
 */
export interface IValidation {
    func: (value: string | File | null) => boolean
    message: string
}

export interface IModalFormError {
    [key: string]: string
}

export interface IFieldSpecifics {
    title: string
    type: "text" | "number" | "date" | "file" | "password" | "select"
    options?: IModalFormOption[]
}

export interface IModalFormOption {
    value: string
    label: string
}