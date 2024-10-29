import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import React, { useEffect, useState } from "react";

export default function UseApiRequest(url, method, data) {

    let fetch = useAuthenticatedFetch();
    let [responseData, setResponseData] = useState(null);
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState("");
    let apiData = null;
    if (method === "GET") {
        apiData = {
            method: `${method}`,
            headers: { "Content-Type": "application/json" },
        };
    } else {
        apiData = {
            method: `${method}`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
    }
    useEffect(() => {
        let abortController = new AbortController();
        apiData.signal = abortController.signal;
        fetch(url, apiData)
            .then((response) => {
                if (!response.ok) {
                    setError(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {               
                setResponseData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                } else {
                    console.log(error.name, " => ", error.message); 
                }
            });
        return () => abortController.abort();
    }, [url]);

    return { responseData, isLoading, error };
}