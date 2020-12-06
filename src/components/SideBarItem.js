import React from 'react';
import '../scss/sidebar-item.scss'

function SideBarItem({className, title, Icon}) {
    return (
        <li className={`${className} sidebar-item`}>
                <Icon />
                {title}
        </li>
    );
}

export default SideBarItem;