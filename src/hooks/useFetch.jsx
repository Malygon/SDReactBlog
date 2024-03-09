import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(url, { signal: abortController.signal })
            .then(res => {
                if (res.ok === false) {
                    throw Error("Could not fetch the data for that resource");
                }
                return res.json()
            })
            .then((data) => {
                setData(data);
                setError(null);
                setIsPending(false);
            })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log("Fetch Aborted");
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
            });

        return () => abortController.abort();
    }, [url]);

    return { data, error, isPending }
}

export default useFetch;