import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import base from './base.json';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	/*const base =[
		{
			title: {
				text: "тема 1",
				id: 1
			},
			items: [
				{id: 1, title: 'Hello World', content: 'Welcome to learning React!', link: "https://vk.com/fialki_sp?w=wall-140940_663998"},
				{id: 2, title: 'Installation', content: 'You can install React from npm.', link: "https://vk.com/fialki_sp?w=wall-140940_663998"}
			]
		},
		{
			title: {
				text: "тема 2",
				id: 1
			},
			items: [
				{id: 1, title: 'Hello World', content: 'Welcome to learning React!', link: "https://vk.com/fialki_sp?w=wall-140940_663998"},
				{id: 4, title: 'Installation 4', content: 'You can install React from npm.444', link: "https://vk.com/fialki_sp?w=wall-140940_663998"}
			]
		},
	];
*/

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel}>
			<Home id='home' fetchedUser={fetchedUser} go={go} base={base}/>
			<Persik id='persik' go={go} />
		</View>
	);
}

export default App;

