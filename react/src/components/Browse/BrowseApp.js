import React from 'react'
import BrowseButtonGroup from './BrowseButtonGroup'
import NavBar from '../NavBar'
import NameList from './NameList'
import Preview from '../App/Preview'
import CVList from './CVList'
import './BrowseApp.css'
import '../NavBar.css'

const BrowseApp = (props) => {
  return (
    <div>
      <header id="navbar">
        <NavBar />
      </header>
      <div id="buttons">
        <BrowseButtonGroup
          exportDropdownOpen={props.exportDropDownOpen}
          editClicked={() => props.editClicked()}
          copyClicked={() => props.copyClicked()}
          deleteClicked={() => props.deleteClicked()}
          deleteConfirmed={() => props.deleteConfirmed()}
          deleteCancelled={() => props.deleteCancelled()}
          renameClicked={() => props.renameClicked()}
          renameConfirmed={() => props.renameConfirmed()}
          renameCancelled={() => props.renameCancelled()}
          exportClicked={() => props.exportClicked()}
          downloadAsPDFClicked={() => props.downloadAsPDFClicked()}
          deleteSelected={props.deleteSelected}
          renameSelected={props.renameSelected}
          renameFieldContents={props.renameFieldContents}
          renameFieldEdited={event => props.renameFieldEdited(event)}
          cvCount={props.cvCount}
        />
      </div>
      <div id="namelist" className="browseSection">
        <NameList
          selectedUser={props.selectedUser}
          userList={props.userList}
          userClicked={index => props.userClicked(index)}
        />
      </div>
      <div className="lineContainer" id="lineContainer">
        <div className="line" />
      </div>
      <div id="cvlist" className="browseSection">
        <CVList
          selectedCV={props.selectedCV}
          cvList={props.cvList}
          cvClicked={index => props.cvClicked(index)}
        />
      </div>
      <div className="CVpreview">
        <Preview text={props.text} />
      </div>
      <div className="lineContainer">
        <div className="line" />
      </div>
    </div>
  )
}

export default BrowseApp
