import React from 'react'
import SearchAndExport from './SearchAndExport'
import NameList from './NameList'
import CVList from './CVList'
import './Browse.css'
import '../Header.css'

const Browse = () => {
  return (
    <div>
      <SearchAndExport />
      <div id="namelist" className="browse-section">
        <NameList />
      </div>
      <div id="cvlist" className="browse-section">
        <CVList />
      </div>
    </div>
  )
}

export default Browse
