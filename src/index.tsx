import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import { App } from './Components/App';
// import { IData } from './Models/Interfaces/Interfaces';
import data from './Models/data.json';

// const jsonData: IData = JSON.parse(JSON.stringify(data));

ReactDOM.render(
	<React.StrictMode>
		<App {...data} />
	</React.StrictMode>,
	document.getElementById('root')
);
