import React, { Component } from 'react'
import DashboardSidebar from './dashboard_sidebar'
import DashboardCardsSection from './dashboard_cards_section'
import './dashboard.scss'

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
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <DashboardSidebar sections={this.state.sections} />
          </div>
          <div className="col">
            {/* Your current matches */}
            <section className="dashboard-current-matches-section">
              <h1 className="h5 text-capitalize font-weight-normal">
                Your current matches
              </h1>

              <p>You don't have any current matches</p>
            </section>
  
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
