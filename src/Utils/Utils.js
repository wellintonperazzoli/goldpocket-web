export const toDate = (value) => {
    const d = new Date(value)
    let day = ("00" + d.getDate()).slice(-2);
    let month = ("00" + d.getMonth()).slice(-2);
    return day + "/" + month + "/" + d.getFullYear();
}

export const toCurrency = (value) => {
    let f = parseFloat(value);
    if (isNaN(f)) return toCurrency(0)
    return parseFloat(value).toFixed(2) + " €";
}

export const getCurrency = (text) => {
    return parseFloat(text.slice(0, -2))
}

export const isEmpty = (str) => (!str || str.length === 0);

export const isBlank = (str) => (!str || /^\s*$/.test(str));

export const getDate = (text) => {
    let d = text.split("/");
    return new Date(d[2], d[1] - 1, d[0]);
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36);

export const currentDate = () => new Date().toISOString().slice(0, 10);

export const getDateInput = (text) => new Date(text).toISOString().slice(0, 10)

export const removePlural = (text) => 
    text.slice(-3) === 'ies' ? text.slice(0,-3) + 'y' :
    text.slice(-1) === 's' ? text.slice(0,-1) : 
    text

