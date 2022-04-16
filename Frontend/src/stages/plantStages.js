import { FETCH_PLANTS, UPDATE_PLANT } from "./kinds";

// deal with plants
export const fetchPlants = () => dispatch => {
    const path = 'http://localhost:54026/api/plants';
    fetch(path)
    .then(res => res.json())
    .then(plants => dispatch({
        type: FETCH_PLANTS,
        amount: plants
    }));
    
}

export const updatePlant = (id) => dispatch => {
    const path = 'http://localhost:54026/api/plant/';
     fetch(path + id, {
         method: 'POST'
     })
     .then(res => res.json())
     .then(plant => dispatch({
        type: UPDATE_PLANT,
        amount: plant 
     }))
}


