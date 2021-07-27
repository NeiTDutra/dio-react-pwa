import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { createMarkup } from '../../utils';

function Economy({ values }) {

    const history = useHistory();

    const renderImage = ({ image, description }) => 
        <div>
            <img src={image.url} alt={description} width="100%"/>;
        </div>

    const renderDescription = (description) => 
        <p dangerouslySetInnerHTML={createMarkup(description)} />

    const openPost = (id) => {
        history.push(`/economy/${id}`);
    }

    const renderPost = (post, index) => {
        const { title, image, description, id } = post;
        const isFirst = index === 0;
        const spanValue = isFirst ? 24 : 12;
        return (
            <Col span={spanValue} key={`economy-${index}`} >
                <article onClick={() => openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}/>
                    </p>
                    <p dangerouslySetInnerHTML={createMarkup(description)}/>
                    {isFirst && renderImage({ image, description })}
                    {!isFirst && image?.url ? renderImage({ image, description }) : renderDescription(description)}
                </article>
            </Col>
        );
    }

    return (
        <Row gutter={[16, 16]}>
            {values?.map(renderPost)}
        </Row>
    )
}

Economy.defaultProps = {
    values: []
}

Economy.propTypes = {
    values: PropTypes.array.isRequired
}


export default memo(Economy);
