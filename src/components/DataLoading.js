import { useState, useEffect } from 'react';
import { csv } from 'd3';

const dataUrl = 'https://gist.githubusercontent.com/ChappieShin/f4a34a34e058d1dc0ce4108cfb42d4a4/raw/globalInflationDataset.csv';

export const DataLoading = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(dataUrl).then(setData);
    }, []);

    return data;
};
