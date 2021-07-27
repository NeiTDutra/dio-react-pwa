import React, { memo, useEffect, useCallback, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import Api from '../api';
import { createMarkup } from '../utils';
//import 'style.css';

function Post() {
    const { subject, id } = useParams();
    const [post, setPost] = useState({});
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleNews = useCallback((data) => {
        setNews(data[0]?.value);
        setNews(data[1]?.value);
        setNews(data[2]?.value);
    }, []);

    const renderImg = ({ image, description }) =>
        <img src={image.url} alt={description} width="70%"/>

    useEffect(() => {
        setLoading(true);
        Promise.allSettled([
            Api.getNews(subject),
            Api.getNewsById(subject, id)
        ])
        .then(handleNews);
    }, [id, subject, handleNews]);
    
    return (
        <div>
            <h1>Post</h1>
        </div>
    );
}

export default memo(Post);
