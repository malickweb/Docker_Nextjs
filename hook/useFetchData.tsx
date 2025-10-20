import { useEffect, useState } from 'react';

interface UsefetchData {
    url: string;
    jsonFile?: boolean;
}

interface RequestOptions {
    method: string;
    redirect: 'follow' | 'error' | 'manual';
}

interface ResponseData {
    [key: string]: { [key: string | number]: number | string }[];
}

export function usefetchData({ url, jsonFile = false }: UsefetchData) {
    const [datas, setDatas] = useState<Awaited<ReturnType<typeof fetchDataType>> | null>(null);
    const [error, setError] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function fetchDataType(): Promise<ResponseData | null> {
        const requestOptions: RequestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        const res: Response = await fetch(url, requestOptions);
        if (res.status === 200) return res.json();
        else return null;
    }

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const data = await fetchDataType();

                setDatas(data);
                setError(false);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { datas, error, isLoading };
}
