import React from 'react';
import { connect } from 'react-redux';
import Plant from './Plant'

import { fetchPlants, updatePlant } from '../stages/plantStages';

class Board extends React.Component {
   
    componentDidMount() {
      this.props.fetchPlants();
    }

    
    render() {
      return (
        <div>
          {
           this.props.plants.map((plant, num) => {
            return <Plant key={num} index={num} id={plant.num} name={plant.name} status={plant.status}
            updatePlant={this.props.updatePlant} fetchPlants={this.props.fetchPlants} imageSource={plant.imageSource}>
            </Plant>
           })
         }
        </div>
      )
    }
  }

  

  const mapStateToProps = state =>({
    plants: state.plants.items,
    plant: state.plants.item
  })

export default connect(mapStateToProps, {fetchPlants, updatePlant})(Board);