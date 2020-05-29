import React from 'react';
import { Card, Collapse, Container, Row, Col } from 'react-bootstrap';

class Faq extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      openId: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({ openId: id });
  }

  render() {
    const { openId } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h2>FAQ</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Header onClick={() => this.handleClick(1)}>Collapsible Group Item #1</Card.Header>
              <Collapse in={openId === 1}>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                    wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                    assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                    labore sustainable VHS.
                  </Card.Text>
                </Card.Body>
              </Collapse>
            </Card>
            <Card>
              <Card.Header onClick={() => this.handleClick(2)}>Collapsible Group Item #2</Card.Header>
              <Collapse in={openId === 2}>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                    wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                    assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                    labore sustainable VHS.
                  </Card.Text>
                </Card.Body>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Faq;
