import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/Card";
export default class CountryFlagFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      countryDetails: {},
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    console.log(this.state.searchInput);
    axios
      .get("http://restcountries.eu/rest/v2/all")
      .then((res) => {
        // console.log(res.data);
        let countryDataArray = res.data;

        countryDataArray.forEach((element) => {
          if (
            element.name.toUpperCase() == this.state.searchInput.toUpperCase()
          ) {
            console.log(element);
            this.setState({ countryDetails: element });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { countryDetails } = this.state;
    return (
      <div>
        <h1 className="heading">COUNTRY DETAIL SEARCH APP</h1>
        <form onSubmit={this.submitHandler}>
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={(e) => this.setState({ searchInput: e.target.value })}
            required
          />
          <button onClick={this.submitHandler} className="search-btn">
            🧡
          </button>
        </form>
        {Object.keys(countryDetails).length > 0 ? (
          <div className="card">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={countryDetails.flag} />
              <Card.Body>
                <Card.Title>{countryDetails.name}</Card.Title>
                <Card.Text>{`CAPITAL : ${countryDetails.capital}`}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{`SUB-REGION : ${countryDetails.subregion}`}</ListGroupItem>
                <ListGroupItem>
                  CURRENCY :
                  {countryDetails.currencies.forEach((currency) => {
                    return <div>{currency.name}</div>;
                  })}
                </ListGroupItem>
                <ListGroupItem>
                  MAIN LANGUAGES :
                  {countryDetails.languages.forEach((currency) => {
                    return <div>{currency.name}</div>;
                  })}
                </ListGroupItem>
              </ListGroup>
              <Card.Body></Card.Body>
            </Card>
          </div>
        ) : (
          <p style={{ fontSize: "15px" }}>
            *please enter the full country name with correct spelling in the
            input box
          </p>
        )}
      </div>
    );
  }
}
