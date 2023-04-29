import { idGenerator } from "./idGenerator";

export function listItemFunction(todo){
    return {id:idGenerator(),todo : todo}
}