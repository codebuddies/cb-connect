import React, {Component} from 'react'
import DashboardSidebar from './dashboard_sidebar'
import MatchesSection from './matches_section'
import DashboardCardsSection from './dashboard_cards_section'

const sectionTargets = { //see: categories.js for numbers
  'all': 'all',
  'mentors' : 3,
  'mentees' : 4, 
  'oss-projects': 5,
  'oss-contributors': 6,
  'accountabili-buddies': 1,
  'other': 0
}


class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // Define all sections to be visible on initialize
      visibleSections: 'all'
    }
  }

  getEntries = (entry) => {
    const { entries = [] } = this.props;
    const newId = this.state.visibleSections;
    this.props.handleCategoryChange(newId);
    return entries;
  }

  getTargetSections = (section) => {
    const newId = this.state.visibleSections;
    return sectionTargets[section]
  }

  // Set which section to be visible;
  // Binded handler to `DashboardSidebar` as a property for state hoisting
  handleVisibilityChange = (section) => {
    const targetSection = this.getTargetSections(section)
    this.setState({visibleSections: targetSection}, function() {
    })
  }

  checkSectionVisibility = (sectionKey) => {
    const allSectionsVisible = this.state.visibleSections === 'all'
    const sectionIsVisible = this.state.visibleSections === sectionTargets[sectionKey]
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
          entries={this.getEntries()}
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
          <div className='col-sm-9'>
            <MatchesSection ownEntries={this.props.ownEntries} />          
            {DashboardSections}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
