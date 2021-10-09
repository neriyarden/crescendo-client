import { Link } from 'react-router-dom'
import { currentServer } from '../../../../DAL/axios'

const FeaturedEvent = ({ featuredEvent }) => {
	return (
		<>
			{featuredEvent ? (
				<section className='featured-events'>
					<div
						className='featured-events-bg'
						style={{
							backgroundImage: `url(${
								currentServer + featuredEvent.img_url
							})`,
						}}
					></div>
					<div className='featured-event-content'>
						<div className='featured-event-extra-details'>
							<h6 className='featured'>FEATURED</h6>
							<h4 className='description'>
								{featuredEvent.artist}
							</h4>
							<h5 className='time'>
								{featuredEvent.time.slice(0, 5)}
							</h5>
							<h5 className='duration'>
								{featuredEvent.duration}m
							</h5>
							<h5 className='city'>{featuredEvent.city}</h5>
						</div>
						<Link
							to={`/Events/${featuredEvent.id}`}
							className='featured-event'
							style={{
								backgroundImage: `url(${
									currentServer + featuredEvent.img_url
								})`,
							}}
						>
							<div className='featured-event-details'>
								<h3>{featuredEvent.tour}</h3>
								<div className='triangle l-triangle'></div>
								<div className='triangle r-triangle'></div>
								<div className='dets'>
									<h5 className='date'>
										{featuredEvent.date}
									</h5>
									<h4 className='venue'>
										{featuredEvent.venue}
									</h4>
								</div>
							</div>
						</Link>
					</div>
				</section>
			) : (
				<></>
			)}{' '}
		</>
	)
}

export default FeaturedEvent
