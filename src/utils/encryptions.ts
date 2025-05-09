/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
// sha1.ts
import {createHash} from 'crypto';

//basic sha1 hashing
export const sha1 = (data: string): string => {
    return createHash('sha1').update(data).digest('hex');
}