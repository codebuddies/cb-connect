import React, {Component} from 'react'
import DashboardSidebar from './dashboard_sidebar'
import MatchesSection from './matches_section'
import DashboardCardsSection from './dashboard_cards_section'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // Define all sections to be visible on initialize
      visibleSections: 'all'
    }
  }

  // Set which section to be visible;
  // Binded handler to `DashboardSidebar` as a property for state hoisting
  handleVisibilityChange = (section) => {
    this.setState({visibleSections: section})
  }

  checkSectionVisibility = (sectionKey) => {
    const allSectionsVisible = this.state.visibleSections === 'all'
    const sectionIsVisible = this.state.visibleSections === sectionKey
    if (allSectionsVisible || sectionIsVisible) { return true }
    return false
  }

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
      const visible = this.checkSectionVisibility(key)

      return (
        <DashboardCardsSection 
          section={section} 
          key={key} 
          visibility={visible} />
      )
    })      

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'>
            <div className='sticky-top mb-4'>
              <DashboardSidebar 
                sections={sections} 
                onVisibilityChange={this.handleVisibilityChange} />
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
