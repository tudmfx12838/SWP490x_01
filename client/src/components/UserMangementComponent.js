import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
class UserMangement extends Component {
  state = {
    message: '',
    products: [],
    columns: [
      {
        dataField: "Id",
        text: "Id",
      },
      {
        dataField: "title",
        text: "Name",
        sort: true,
      },
      {
        dataField: "price",
        text: "Price",
        sort: true,
      },
      {
        dataField: "description",
        text: "description",
        sort: true,
      },
      {
        dataField: "mount",
        text: "Mount",
        sort: true,
      },
    ],
  };

  componentDidMount() {
    axios.get('/api/products').then(response => {
    //   console.log(response.data);
      this.setState({
            products: response.data
      });
    });
    axios.get('/api/test')
    .then(result => this.setState({ message: result.data.message }))
  }

  render() {
    const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Component as Header</h3>;
    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
      }];
    return (
      <>
        <h1>{this.state.message}</h1>
{/*         
        <div className="container">
          <div style={{ marginTop: 20 }}>
            <BootstrapTable
              bootstrap4
              striped
              hover
              keyField="title"
              data={this.state.products}
              columns={this.state.columns }
              caption={<CaptionElement />} 
              selectRow={ { mode: 'checkbox' } }
              defaultSorted={ defaultSorted }
              tabIndexCell
            />
          </div>
        </div> */}
      </>
    );
  }
}

export default UserMangement;
