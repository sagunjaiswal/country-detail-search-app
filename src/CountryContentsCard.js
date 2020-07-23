import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/Card";
export default class CountryContentsCard extends React.Component {
  render() {
    return (
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.countryDetails.flag} />
        <Card.Body>
          <Card.Title>{this.props.countryDetails.name}</Card.Title>
          <Card.Text>{`CAPITAL : ${this.props.countryDetails.capital}`}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{`REGION : ${this.props.countryDetails.region}`}</ListGroupItem>
          <ListGroupItem>{`SUB-REGION : ${this.props.countryDetails.subregion}`}</ListGroupItem>
          <ListGroupItem>CURRENCY :{this.props.currencyDetails}</ListGroupItem>
          <ListGroupItem>
            LANGUAGE(s) :{this.props.languageDetails}
          </ListGroupItem>
        </ListGroup>
        <Card.Body></Card.Body>
      </Card>
    );
  }
}
