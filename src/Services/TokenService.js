export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setToken(value, cname = "goldpockettoken") {
    window.localStorage.setItem(cname, value)
}

export function getToken(cname = "goldpockettoken") {
    return window.localStorage.getItem(cname);
}

export function removeToken(cname = "goldpockettoken"){ 
    window.localStorage.removeItem(cname)
}

export function setTokenInvalidRequest(e) {
    window.sessionStorage.setItem("goldpocketinvalidrequest", e)
}

export function getTokenInvalidRequest() {
    return window.sessionStorage.getItem("goldpocketinvalidrequest")
}