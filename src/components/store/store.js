
import { combineReducers, compose, createStore } from "redux";

const types = {
    showList:'[List] show list'
}
const actions ={
    allItems:()=>({type:types.showList})
}
const todoReducer =(state=[1,2,3],action )=>{
    switch (action.type) {
        case actions.showList:
            console.log("showList")
            return state
          
    
        default:
            console.log("default")
            return state
            
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const reducers =combineReducers({todo:todoReducer})
 
export const store = createStore(reducers,composeEnhancers())