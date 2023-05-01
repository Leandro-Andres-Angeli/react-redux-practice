// import { Typography } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './components/pages/Admin';
import Error404 from './components/pages/Error404';
import Home from './components/pages/Home';
import Users from './components/pages/Users';
import { useSelector } from 'react-redux';
// import { contentQuotesLinter } from '@ant-design/cssinjs/lib/linters';
import Login from './components/pages/Login';

export default function App() {
  // const { Title } = Typography;
  const {
    user: { role },
  } = useSelector((state) => state);
  console.log(role);
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          {/* <Route path="/about">
            <About />
          </Route>*/}
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/admin'>
            {role && role === 'admin' ? (
              <Admin />
            ) : (
              <Redirect to='/'></Redirect>
            )}
          </Route>
          <Route path='/*'>
            <Error404></Error404>
          </Route>
        </Switch>
      </Router>
    </>
  );
}
