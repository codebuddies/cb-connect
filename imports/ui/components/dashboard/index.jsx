import React, {Component} from 'react'
import DashboardSidebar from './dashboard_sidebar'
import MatchesSection from './matches_section'
import DashboardCardsSection from './dashboard_cards_section'

class Dashboard extends Component {
  render () {
    const sections = [
      'Mentors', 
      'Mentees', 
      'OSS Projects', 
      'OSS Contributors',
      'Accountabili-buddies',
      'Other'
    ] 

    const DashboardSections = sections.map(section => {
      const key = section.toLowerCase().split(' ').join('-')
      return <DashboardCardsSection section={section} key={key} />
    })      

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'>
            <div className='sticky-top mb-4'>
              <DashboardSidebar sections={sections} />
            </div>
          </div>
          <div className='col'>
            <MatchesSection />          
  
            {DashboardSections}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
