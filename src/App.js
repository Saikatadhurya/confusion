import React, {Component} from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; //it helps to avilable the redux store to all component
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component{
  
  render(){
  return (  
    <Provider store={store}>
    <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>
    </Provider>
  );
}
}

export default App;
