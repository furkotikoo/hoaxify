import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {

        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (url, inProgress) => {
            if (url.startsWith(apiPath)) {
                setPendingApiCall(inProgress);
            }
        }

        const unRegisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }

        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use(
                (request) => {
                    updateApiCallFor(request.url, true);
                    return request; // axios un bu requesti devam ettirmesi için request i return ettiriyoruz..
                });

            responseInterceptor = axios.interceptors.response.use(
                (response) => {
                    updateApiCallFor(response.config.url, false);
                    return response;
                },
                (error) => {
                    updateApiCallFor(error.config.url, false);
                    throw error;
                }
            );
        }

        registerInterceptors();

        return function unMount() {
            unRegisterInterceptors();
        }

    }, [apiPath]);

    return pendingApiCall;
}
