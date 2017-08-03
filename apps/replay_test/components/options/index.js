import React, { Component } from 'react'
import axios from 'axios'

const subtitle = (
  <span>
    Normally this is an implicit preflight request made by your browser when requesting custom content-types (specified in the request headers).&nbsp;
    <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS'>More information here.</a><br />
    When replayed the response should be an error status code 405 and 405 Not Allowed should be displayed if the page was archived via a recording mechanism. The request is made to https://n0tan3rd.github.io/replay_test/
  </span>
)

export default class Opts extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      done: false,
      wasError: false,
      res: null,
      badge: (
        <div className='uk-card-badge uk-label uk-label-danger'>No!</div>
      )
    }
  }

  doOpts () {
    axios({
      method: 'Options',
      url: process.env.API_ENDPOINT
    }).then(response => {
      console.log(response)
      this.setState({
        done: true,
        wasError: false,
        res: {data: response.data, headers: response.headers},
        badge: (
          <div className='uk-card-badge uk-label uk-label-success'>HTTP {response.status} {response.statusText}</div>
        )
      })
    }).catch(error => {
      console.error(error)
      if (error.response) {
        this.setState({
          done: true,
          wasError: true,
          res: {data: error.response.data, headers: error.response.headers},
          badge: (
            <div className='uk-card-badge uk-label uk-label-danger'>HTTP ${error.response.status}
              ${error.response.statusText}</div>
          )
        })
      }
    })
  }

  render () {
    if (!this.state.done) {
      this.doOpts()
    }
    return (
      <div className='uk-card uk-card-default uk-box-shadow-xlarge'>
        <div className='uk-card-body'>
          {this.state.badge}
          <h3 className='uk-card-title'>HTTP OPTIONS</h3>
          <p>Can I Make An HTTP Options Request?</p>
        </div>
      </div>
    )
  }
}
