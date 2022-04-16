import React from 'react';
import moment from 'moment';
import '../index.css';

class Plant extends React.Component {
    constructor(props) {
      super(props);
      this.state = {status: "ready", remainingTime: null, time: null}
      this.getDatatimer = () => {};
    }
    
    componentDidMount() {
      this.checkHour();
    }
  
    // Check how many hour the plant has't been watered
    checkHour() {
      var currentTime = moment(new Date());
      var lastwateredTime = moment(this.props.status);
      var hour = currentTime.diff(lastwateredTime, 'hours');
      this.setState({time: hour});
    }
  
    countdownTimer(time){
      this.setState({remainingTime: time });
      clearInterval(this.timer);
      this.timer = setInterval(() =>{
           if(!this.state.remainingTime){
             clearInterval(this.timer);
             return false;
           }
           this.setState(prevState =>{
           return {remainingTime: prevState.remainingTime - 1}});
           },1000);
      }
  

    // Plant is ready for watering session
    ready = () =>  {
      clearTimeout(this.myTimeout);
      this.setState({status: "ready"})
    }
  
    // Watering plant session
    watering = () => {
      this.props.updatePlant(this.props.id);
      this.setState({time: 0});
      this.setState({status: "watering"});
      this.countdownTimer(10);
      setTimeout(this.watered, 10000);
    }
    
    // Waiting for 30s for the next watering session
    watered = () =>  {
      clearTimeout(this.myTimeout);
      this.props.fetchPlants();
      this.setState({status: "watered"});
      this.countdownTimer(30);
      setTimeout(this.ready, 30000);
    }
  
    render() {
      let plantStatus;
      let lastWatered;

      //check status of the plant to display correct component
      switch(this.state.status) {
        case "ready":
          plantStatus = <div>
          <button className='btn btn-success btn-lg' onClick={this.watering}>Water This Plant</button>
          </div>
          break;
        case "watering":
          plantStatus = <div>
          <div className="alert alert-success alert-dismissible fade show">
          <strong>Watering <i className="fas fa-spinner fa-spin"/></strong> --- Remaining time: {this.state.remainingTime}s
            </div>
        </div>
        break;

        case "watered":
          plantStatus = <div>
          <div className="alert alert-info alert-dismissible fade show">
             Plant has been watered. Please wait <strong>{this.state.remainingTime}s</strong> for the next watering session...
          </div>
        </div>
        break;

        default:
          plantStatus = <div/>
          break;
      }
  
      // Add a Reminder if plant has't been watered for more than 6 hours
      if (this.state.time > 6)
      {
        lastWatered = <div>
          <div className="alert alert-danger alert-dismissible fade show">
            <strong>Reminder: </strong> This plant hasn't been watered for more than <strong>{this.state.time}</strong> hours. 
          </div>
        </div>
      } else {
        lastWatered = <div>
        </div>
      }
  
      return (
        <div className='card mb-3 w-50' style={{maxwidth: 500}}>
        <div className="row g-0">
          <div className="col-md-4 imgContainer" >
            <img src={this.props.imageSource} className="img-fluid rounded-start" alt="..."></img>
          </div>
          <div className=" ps-5 col-md-8">
              <div className="card-body">
                  <h3 className="card-title">{this.props.name}</h3>
                  <p className="card-text"><small className="text-muted">Last watered: {this.props.status}</small></p>
                  {plantStatus}
                  <br></br>
                  {lastWatered}
                </div>
            </div>
          </div>
        </div>
      )      
    }
  }

  export default Plant;