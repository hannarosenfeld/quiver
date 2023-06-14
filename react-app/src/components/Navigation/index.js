import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="nav-container">
			<div className="wrapper">
				<ul style={{
					display: "flex", 
					justifyContent: "space-between",
				}}>
					<li>
						<NavLink exact to="/"><span className="title">Quiver</span></NavLink>
					</li>
					{isLoaded && (
						<li>
							<ProfileButton user={sessionUser} />
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Navigation;