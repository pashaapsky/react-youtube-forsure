import React from 'react';
import {Avatar} from "@material-ui/core";
import VerifiedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import '../scss/channel-row.scss'

function ChannelRow({image, channel, subs, noOfVideos, description, verified}) {
    console.log(verified);

    return (
        <div className="channel-row">
            <Avatar className="channel-row__logo" alt={channel} src={image}/>

            <div className="channel-row__text">
                <h4>{channel} {verified && <VerifiedIcon />}</h4>

                <p className="channel-row__paragraph">
                    {subs} subscribers * {noOfVideos} videos
                </p>

                <p className="channel-row__paragraph">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default ChannelRow;