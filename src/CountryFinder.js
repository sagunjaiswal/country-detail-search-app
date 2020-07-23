import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import axios from "axios";
import CountryContentsCard from "./CountryContentsCard";
export default class CountryFlagFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      countryDetails: {},
      currencyDetails: "",
      languageDetails: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    axios
      .get("http://restcountries.eu/rest/v2/all")
      .then((res) => {
        let countryDataArray = res.data;

        countryDataArray.forEach((element) => {
          /*so that whatever may be the case of input "India" or "INDia" we will still get the result*/
          if (
            element.name.toUpperCase() == this.state.searchInput.toUpperCase()
          ) {
            this.setState({ countryDetails: element });

            this.state.countryDetails.currencies.forEach((currency) => {
              var x = Object.entries(currency)[1];
              this.setState({ currencyDetails: x[1] });
            });
            var languageArray = this.state.countryDetails.languages.map(
              (lang) => {
                var x = Object.entries(lang)[2];
                return x[1];
              }
            );

            this.setState({ languageDetails: languageArray.join(", ") });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { countryDetails, currencyDetails, languageDetails } = this.state;
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
            <CountryContentsCard
              countryDetails={countryDetails}
              currencyDetails={currencyDetails}
              languageDetails={languageDetails}
            />
          </div>
        ) : (
          <div style={{ fontSize: "15px" }}>
            *please enter the full country name in the input box
            <ul style={{ fontWeight: "lighter" }}>
              <li>Make sure your internet connection is on.</li>
              <li>The spelling of the country must be correct</li>
              <li>Write full country names</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
