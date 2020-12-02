import React from 'react';
import '../scss/sidebar-item.scss'

function SideBarItem({title, Icon}) {
    return (
        <li className="sidebar__item">
            <Icon />
            {title}
        </li>
    );
}

export default SideBarItem;