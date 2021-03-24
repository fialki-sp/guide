import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import './Home.css';

const Home = ({ id, go, fetchedUser, base }) => (
	<Panel className="main_panel" id={id}>
		<PanelHeader>Азбука фиалковода</PanelHeader>
		{false && fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		{base.map((rub)=>

			<div key={rub.topic.id}>
				<div className="link_h" >{rub.topic.text}</div><ul>

				{rub.items && rub.items.map((master) => <div className="link_m" key={rub.topic.id+master.id}><li><a target="_blank" href={'https://vk.com/fialki_sp?w=wall-140940_'+master.post_id}>{master.post_text}</a></li></div>)}

			</ul></div>



		)
		}

	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
