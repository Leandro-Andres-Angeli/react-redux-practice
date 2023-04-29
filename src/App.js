
import { Typography  } from 'antd';
import ListContainer from "./components/list/ListContainer";
import FormComponent from "./components/FormComponent";


export default function App() {
  const {Title} =Typography
  return(
    <div >
      <FormComponent></FormComponent>
    <Title >React Redux Practice</Title>
    <div>
      <Title level={2}>To Do list with Redux</Title>
      <ListContainer></ListContainer>
    </div>
    </div>);
}
