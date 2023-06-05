import { useState, useEffect } from 'react';
import { csv } from 'd3';

export const DataLoading = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(url).then(setData);
    }, [url]);

    return data;
};
