import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const password = 'admin123';

console.log('ID:', uuid());
console.log('Password:', bcrypt.hashSync(password, 10));

