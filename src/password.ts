// Character sets
const lowercase = "abcdefghijklmnopqrstuvwxyz"
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"


export function generatePassword(length: number,
                                 includeLower: boolean,
                                 includeUpper: boolean,
                                 includeNumber: boolean,
                                 includeSymbol: boolean): string {
    let charset = ""
    let password = ""

    // Add selected character sets to charset
    if (includeLower) charset += lowercase
    if (includeUpper) charset += uppercase
    if (includeNumber) charset += numbers
    if (includeSymbol) charset += symbols

    // If no character set is selected, default to lowercase
    if (charset === "") {
        charset = lowercase
    }

    // Generate random password
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)]
    }

    // Ensure at least one character from each selected set is included
    let finalPassword = password

    if (includeLower) {
        const randomLower = lowercase[Math.floor(Math.random() * lowercase.length)]
        finalPassword = replaceCharAt(finalPassword, Math.floor(Math.random() * length), randomLower)
    }

    if (includeUpper) {
        const randomUpper = uppercase[Math.floor(Math.random() * uppercase.length)]
        finalPassword = replaceCharAt(finalPassword, Math.floor(Math.random() * length), randomUpper)
    }

    if (includeNumber) {
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]
        finalPassword = replaceCharAt(finalPassword, Math.floor(Math.random() * length), randomNumber)
    }

    if (includeSymbol) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
        finalPassword = replaceCharAt(finalPassword, Math.floor(Math.random() * length), randomSymbol)
    }

    return finalPassword
}


function replaceCharAt(str: string, index: number, char: string): string {
    return str.substring(0, index) + char + str.substring(index + 1)
}