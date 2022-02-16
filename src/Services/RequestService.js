import axios from "axios";
import { getToken, setTokenInvalidRequest } from "./TokenService";

export default class RequestService {
    static request(type, url, data, action, exception) {
        let promisse;
        
        let config = {
            method: type
        };
        if (getToken()) config.headers = { Authorization: `Bearer ${getToken()}` }

        if (Array.isArray(url)) {
            var requests = [];
            let urls = [...url];
            let datas = [...data]

            for (let i = 0; i < url.length; i++) {
                let requestConfig = { ...config }
                requestConfig.url = urls[i]
                requestConfig.data = datas[i]
                requests.push(axios.request(config))
            }

            promisse = Promise.all(requests);
        } else {
            config.url = url;
            config.data = data;
            promisse = axios.request(config);
        }

        promisse.then((r) => {
            setTokenInvalidRequest()
            action(r)
        }).catch((e) => {
            if(typeof exception === "function") {
                exception(e)
            }
            else if (!e.response) {
                setTimeout(() => {
                    setTokenInvalidRequest("connection_refused")
                    RequestService.request(type, url, data, action, exception)
                }, 10000)
            } else {
                setTokenInvalidRequest("invalid_token")
            }
        })
    }


    static get(url, data = {}, action = () => { }, exception) {
        RequestService.request("get", url, data, action, exception)
    }

    static multiple(method, url = [], data = [], action = () => { }, exception) {
        RequestService.request(method, url, data, action, exception)
    }

    static post(url, data = {}, action = () => { }, exception) {
        RequestService.request("post", url, data, action, exception)
    }


    static put(url, data = {}, action = () => { }, exception) {
        RequestService.request("put", url, data, action, exception)
    }



    static delete(url, action = () => { }, exception) {
        RequestService.request("delete", url, null, action, exception)
    }
}