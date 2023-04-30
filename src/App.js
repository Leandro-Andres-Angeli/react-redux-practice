
import { Typography  } from 'antd';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
 
} from "react-router-dom";
import Navbar from './components/Navbar';
import Error404 from './components/pages/Error404';
import Home from './components/pages/Home';
import Users from './components/pages/Users';

export default function App() {
  const {Title} =Typography
  return(
    <>
    <Router>
    <Navbar></Navbar> 
    <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route path="/about">
            <About />
          </Route>*/}
          <Route path="/users">
            <Users />
          </Route> 
          <Route path="/*">
            <Error404></Error404>
          </Route>
        </Switch>
        </Router>
    </>);
}
