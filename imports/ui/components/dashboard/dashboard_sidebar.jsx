import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

class DashboardSidebar extends Component {
	constructor (props) {
		super(props)
		this.state = {
			listItems: [
				'Mentor', 
				'Mentee', 
				'OSS Projects', 
				'OSS Contributors',
				'Accountabilibuddies',
				'Other'
			]
		}
	}

	render () {
		return (
			<>
				<p className='font-weight-bold'>Looking For</p>
				<ListGroup as='ul'>
					{ this.state.listItems.map(item => {
							const id = this.state.listItems.indexOf(item)
							return <ListGroup.Item action key={id}>{ item }</ListGroup.Item>
						})
					}
				</ListGroup>
			</>
		)
	}
}

export default DashboardSidebar;
