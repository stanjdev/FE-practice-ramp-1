import React from 'react';
import ArrowButtons from './ArrowButtons';

// interface MiddleSectionProps {

// }

export default function MiddleSection ({buttonAction}) {
    return (
        <div className='top-row'>
            <h4>In the news</h4>
            <ArrowButtons buttonAction={buttonAction} />
        </div>
    )
};
