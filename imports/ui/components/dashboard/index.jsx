import React, { Component } from 'react'
import DashboardSidebar from './dashboard_sidebar'
import MatchesSection from './matches_section'
import DashboardCardsSection from './dashboard_cards_section'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sections: [
        'Mentors', 
				'Mentees', 
				'OSS Projects', 
				'OSS Contributors',
				'Accountabili-buddies',
				'Other'
      ] 
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'>
            <div className='sticky-top'>
              <DashboardSidebar sections={this.state.sections} />
            </div>
          </div>
          <div className='col'>
            <MatchesSection />          
  
            {/* Card Sections */}
            { this.state.sections.map(section => {
                const key = this.state.sections.indexOf(section)
                return (
                  <DashboardCardsSection section={section} key={key} />
                )
              })      
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
