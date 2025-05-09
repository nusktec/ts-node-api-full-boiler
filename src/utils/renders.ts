/**
 Author: Revelation.AF
 Engine: [//]
 Git: nusktec
 **/
//out put format
export const outJson = (status: boolean = false, message: string = "Nothing to output", data: any = [], error: any = false) => ({
    status,
    message,
    data,
    error
})
