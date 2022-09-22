import React from 'react';

import '../css/style.css';


class Badge extends React.Component {
    render () {
        const {badge, onBadgeClick} = this.props
        let output;
        if(badge && badge.visited) {
            output = 
            <article className="badgeImg">
                <img id='claimedBadge' onClick={onBadgeClick} src={badge.color} data-id={badge.id} alt=" badge icon." />
            </article>

        } else if(badge){
            output =             
            <article className="badgeImg">
                <img onClick={onBadgeClick} src={badge.color} data-id={badge.id} alt=" badge icon." />
            </article>
        }

        return (
            <article className="badgeDisplay">
                {output}
            </article>
        )
    }
}

export default Badge
