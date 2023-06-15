import crypto from 'crypto';

// This is your symmetric key for encryption and decryption.
// It should be a secret and stored safely.
let secretKey = process.env.PRIVATE_KEY ?? '';
secretKey = crypto
  .createHash("sha256")
  .update(String(secretKey))
  .digest("base64")
  .substr(0, 32);

export function encrypt(text: string): string {
    if (!secretKey) {
        throw new Error('No secret key found.');
    }
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);

    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
    if (!secretKey) {
        throw new Error('No secret key found.');
    }
    const textParts = text.split(':');
    if(textParts.length !== 2) {   
        throw Error('Invalid encrypted text.');
    }
    const iv = Buffer.from(textParts.shift() as string, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}