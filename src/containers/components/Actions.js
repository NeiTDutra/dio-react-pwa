import React, { memo } from 'react';
import ShareIcon from '../../images/share.png';
import CopyIcon from '../../images/copy.png';

const navigatorHasShare = navigator.share;

const URL = 'http://localhost:3001';

function Actions({ post, subject }) {
    const { id, title } = post;

    const shareInfo = () => {
        navigator.share({
            title: `New News - ${subject}`,
            text: title,
            url: URL
        })
    }

    const copyInfo = () => {
        navigator.clipboard.writeText(`${title} - Leia mais em* ${URL}/${subject}/${id}`);
    }

    const renderActions = () => {
        const action = navigatorHasShare ? shareInfo : copyInfo;
        const icon = navigatorHasShare ? ShareIcon : CopyIcon;

        return <img alt="icon" src={icon} className="share-icon" onClick={action}/>
    }

    return (
        <div className="share">
            {renderActions()}
        </div>
    );
}

export default memo(Actions);
