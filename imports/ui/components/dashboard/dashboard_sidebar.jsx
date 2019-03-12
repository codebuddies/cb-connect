import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';

const DashboardSidebar = () => {
    return (
        <Col sm={3}>
            <p className="font-weight-bold">
                Looking For
            </p>
            <ListGroup as='ul'>
                <ListGroup.Item action>
                    Mentor
                </ListGroup.Item>
                <ListGroup.Item action>
                    Mentee
                </ListGroup.Item>
                <ListGroup.Item action>
                    OSS Projects
                </ListGroup.Item>
                <ListGroup.Item action>
                    OSS Contributors
                </ListGroup.Item>
                <ListGroup.Item action>
                    Accountabili-buddies
                </ListGroup.Item>
                <ListGroup.Item>
                    Other
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )
}

export default DashboardSidebar;
