import React, { memo, useEffect, useCallback, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import Api from '../api';
import { createMarkup } from '../utils';
import './style.css';

function Post() {
    const { subject, id } = useParams();
    const [post, setPost] = useState({});
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleNews = useCallback((data) => {
        setNews(data[0]?.value);
        setPost(data[1]?.value);
        setLoading(false);
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

    const renderDescription = (description) => 
        <p dangerouslySetInnerHTML={createMarkup(description)}/>;

    const openPost = (id) => {
        history.push(`/${subject}/${id}`);
    }

    const renderPost = (post, index) => {
        const { title, image, description, id } = post;
        return (
            <Col span={12} key={`post-${index}`}>
                <article onClick={() => openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}/>
                        {image?.url ? renderImg({ image, description }) : renderDescription(description)}
                    </p>
                </article>
            </Col>
        )
    }

    if(loading) return <div>Carregando...</div>

    if(!post?.id) return null;

    const { title, image, description, body, datePublished } = post;
    
    return (
        <div>
            <row gutter={[16, 16]}>
                <Col span={24} md={16}>
                    <p>{datePublished}</p>
                    <h1 dangerouslySetInnerHTML={createMarkup(title)}/>
                    {image && renderImg({ image, description })}
                    <p className="text" dangerouslySetInnerHTML={createMarkup(description)}/>
                    <hr/>
                    <p className="text" dangerouslySetInnerHTML={createMarkup(description)}/>
                </Col>
                <Col span={24} md={8}>
                    
                </Col>
            </row>
        </div>
    );
}

export default memo(Post);
