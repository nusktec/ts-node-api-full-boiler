/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
// src/handlers/index.ts
import emailHandlers from './emailHandler';

// Combine all exports into one handler map
const allHandlers = {
    ...emailHandlers,
};

export default allHandlers;
