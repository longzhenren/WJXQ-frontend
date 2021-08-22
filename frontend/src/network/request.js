import axios from "axios";

export function request(config) {
    const instance = axios.create({
        // baseURL: 'http://longzhen.ren:23456/',
        baseURL: 'http://47.95.202.150:6006/mock/16',
        timeout: 3000,
    });
    return instance(config)
}