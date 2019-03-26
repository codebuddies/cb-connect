import React, {Component} from 'react'
import DashboardContainer from '/imports/ui/containers/dashboard.jsx';

class Profile extends Component {
  constructor (props) {
    super(props)
  }  
  render() {
    console.log(this.props)
    return (
      <div className='container'>
        <div className='row'>
          <DashboardContainer />
        </div>
      </div>
    )
  }
}

export default Profile;
