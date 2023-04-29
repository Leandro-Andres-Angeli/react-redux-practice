
import { combineReducers, compose, createStore } from "redux";
import { listItemFunction } from "../../helpers/listItemGenerator";

export const types = {
    showList:'[List] show list',
    addTodo:'addTodo'

}
//ACTIONS
export const addTodo = (payload)=>({type:types.addTodo,payload})
export const showList = ()=>({type:types.showList})

//ACTIONS
//REDUCERS
export const userReducer =(state={user:"none"},action)=>{
    switch(action.type){
    default:
        return state
    }
}
export  const todoReducer =(state=[listItemFunction("tarea 1"),listItemFunction("tarea-2"),listItemFunction("tarea-3")],action )=>{
    switch (action.type) {
        case types.showList:
            
            return state
          
        case types.addTodo:
            return [...state,action.payload]
        default:
        
            return state
            
    }
}
//REDUCERS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const reducers =combineReducers({todo:todoReducer,user:userReducer})
 
export const store = createStore(reducers,composeEnhancers())