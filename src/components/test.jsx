import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const Test = () => {
    const [product, setProduct] = useState({});

    const params = useParams();

    const getData = async () => {
        fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then(res => res.json())
            .then(json => setProduct(json));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Test</title>
                <meta property="og:title" content={product?.title} />
                <meta property="og:description" content={product?.description} />
                <meta property="og:image" content={product?.image} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product?.title} />
                <meta name="twitter:description" content={product?.description} />
                <meta name="twitter:image" content={product?.image} />
            </Helmet>
            <div>
                <h1>Test</h1>
            </div>
        </>
    );
};

export default Test;