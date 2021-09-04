import { Link } from 'react-router-dom'
import { currentServer } from '../../../../DAL/axios'

const ArtistThumbnail = ({ thumbData }) => {
    return (
        <li>
            <Link to={`Artists/${thumbData.user_id || thumbData.id}`}
                className='artist-thumb'
            >
                <img src={currentServer + (thumbData.img_url || '/img/tmplt.svg')} alt="" />
                <div className="triangle l-triangle"></div>
                <div className="triangle r-triangle"></div>
                <div className="artist-details">
                    <h5
                        className='artist-name'
                    >
                        {thumbData.name}
                    </h5>
                </div>
            </Link>
        </li>
    )
}

export default ArtistThumbnail
