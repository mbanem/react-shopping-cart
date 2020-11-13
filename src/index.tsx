// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// // import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Observable, of } from 'rxjs';
import './styles.css';

const source:string[] = ['Marko', 'Mia', 'Filip', 'Matia'];
const names$ = of(source);
interface IProps{
  items:string[]
}
const useObservable = (observable:Observable<string[]>) => {
  const [state, setState] = useState<string[]>()
  useEffect(()=>{
    const subscription = observable.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [observable])

  return state
}
function App() {
  const names = useObservable(names$) as string[]
  return (
    <div className="App">
      <h3>RxJS with React</h3>
      {names && <List items={names} />}
    </div>
  );
}

const List:React.FC<IProps> = ({items}:IProps) => {
  return(
    <>
    <ul className='li-item'>
      {
        (items).map((item:string)=>(
          <li key={item}>{item}</li>
        ))
      }
    </ul>
    </>
  )
  };

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
