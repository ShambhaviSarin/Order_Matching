import React, {useState, useEffect} from "react";
import axios from "axios";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar,  faChartPie, faUsers, faPercent, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

const AdminHeader =() => {

    const [traffic, setTraffic] = useState(0);
    const [users, setUsers] = useState(0);
    const [trades, setTrades] = useState(0);
    //const [perf, setPerf] = useState(0);

    useEffect(() => {
      axios.get(`http://localhost:1337/login`).then(res => {
        const data = res.data.rows;
        console.log(data);
        setUsers(data.length);
      }).catch(err => {
          console.log(err);
      });

      axios.get(`http://localhost:1337/tradeData`).then(res => {
        const data = res.data.rows;
        console.log(data);
        setTrades(data.length);
      }).catch(err => {
          console.log(err);
      });

      axios.get(`http://localhost:1337/totalOrders`).then(res => {
        const data = res.data.rows;
        console.log(data);
        setTraffic(data.length);
      }).catch(err => {
          console.log(err);
      });
    }, []);

    return (
      <>
        <div style={{marginTop:'-5%', marginBottom:'10%'}}>
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{background:'#e0e0f8'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Traffic
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{traffic}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faChartBar}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <FontAwesomeIcon icon={faArrowUp}/> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{background:'#e0e0f8'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{users}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faChartPie}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <FontAwesomeIcon icon={faArrowDown}/> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{background:'#e0e0f8'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Trades
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{trades}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faUsers}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <FontAwesomeIcon icon={faArrowDown}/> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{background:'#e0e0f8'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Performance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{((trades/traffic)*100).toFixed(2)}%</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faPercent}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <FontAwesomeIcon icon={faArrowUp}/> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
}

export default AdminHeader;
