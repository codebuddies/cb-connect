import React, {Component} from 'react'
import {ListGroup} from 'react-bootstrap'

class DashboardSidebar extends Component {
	constructor (props) {
		super(props)
	}

	logKey = event => {
		// Get `ListGroup.Item` key and hoist it back up to Dashboard state
		const sectionKey = event.target.dataset.rbEventKey
		this.props.onVisibilityChange(sectionKey)
	}

	render () {
		const {sections} = this.props

		// Add `All` as a menu item at beginning of all options
		const items = ['All'].concat(sections)

		const menuItems = items.map(item => {
			const key = item.toLowerCase().split(' ').join('-')
			return (
				<ListGroup.Item action key={key} eventKey={key} onClick={this.logKey}>
					{item}
				</ListGroup.Item>
			)
		})

		return (
			<>
				<p className='font-weight-normal'>What are you looking for?</p>
				<ListGroup as='ul' defaultActiveKey='all'>
					{menuItems}
				</ListGroup>
			</>
		)
	}
}

export default DashboardSidebar
