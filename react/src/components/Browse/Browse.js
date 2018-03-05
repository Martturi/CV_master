import React from 'react'
import SearchAndExport from './SearchAndExport'
import NameList from './NameList'
import CVList from './CVList'
import './Browse.css'
import '../Header.css'

const Browse = (props) => {
  return (
    <div>
      <SearchAndExport />
      <div id="namelist" className="browse-section">
        <NameList uid={props.uid} />
      </div>
      <div id="cvlist" className="browse-section">
        <CVList cvid={props.cvid} />
      </div>
    </div>
  )
}

export default Browse
