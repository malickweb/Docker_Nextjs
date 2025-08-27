export const encodeEmail = (email: string): string => {
    return Buffer.from(email).toString('base64');
};
export const decodeEmail = (encodedEmail: string): string => {
    return Buffer.from(encodedEmail, 'base64').toString('utf-8');
};
