import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://longzhen.ren:23456/',
        timeout: 3000,
    });
    return instance(config)
}
