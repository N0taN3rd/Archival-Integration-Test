import React, { Component } from 'react'
import GunArsenal from './GunArsenal'

// ''
function ChuckNorris () {
  return (
    <div className='uk-section uk-section-default'>
      <div className='uk-card uk-card-default uk-width-1-2@m uk-box-shadow-large'>
        <div className='uk-card-header'>
          <div className='uk-grid-small uk-flex-middle' data-uk-grid>
            <div className='uk-width-auto'>
              <img className='uk-border-circle' width='150' height='150'
                src='http://cdn.business2community.com/wp-content/uploads/2016/03/Vd3MJo.jpg' />
            </div>
            <div className='uk-width-expand'>
              <h3 className='uk-card-title uk-margin-remove-bottom'>Chuck Norris</h3>
            </div>
          </div>
        </div>
        <GunArsenal />
      </div>
    </div>
  )
}

export default ChuckNorris
