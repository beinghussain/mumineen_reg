import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <div>
          <div className="sub_container">
            <PureGridProvider>
              <Container>
                <Row>
                  <Col xs={6} md={4} lg={3}>
                    Hello, world!
                  </Col>
                </Row>
                <Row>
                  <Col xsOffset={5} xs={7}>
                    Welcome!
                  </Col>
                </Row>
              </Container>
            </PureGridProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
