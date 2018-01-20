import React from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button, Input, Popover, PopoverBody, PopoverHeader } from 'reactstrap'


const BrowseButtonGroup = (props) => {
  return (
    <div className="buttonheader">
      <Input className="search" placeholder="Search..." />
      <Button outline className="button">
        <span className="fa fa-search" aria-hidden="true" />
      </Button>
      <ButtonGroup className="exportgroup">
        <Button id="rename" outline className="button" onClick={() => props.renameClicked()}>
            Rename
        </Button>
        <Popover placement="bottom" target="rename" isOpen={props.renameSelected} toggle={() => props.renameCancelled()}>
          <PopoverHeader>Enter a new name for the selected CV</PopoverHeader>
          <PopoverBody>
            <Input placeholder="New name..." value={props.renameFieldContents} onChange={event => props.renameFieldEdited(event.target.value)} />
            <Button outline className="button" onClick={() => props.renameConfirmed()}>Confirm</Button>
            <Button outline className="button" onClick={() => props.renameCancelled()}>Cancel</Button>
          </PopoverBody>
        </Popover>
        <Button outline className="button">
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <Button outline className="button" onClick={() => props.copyClicked()}>
          <span className="fa fa-files-o" aria-hidden="true" />
        </Button>
        <Button id="delete" outline className="button" onClick={() => props.deleteClicked()}>
          <span className="fa fa-trash-o" aria-hidden="true" />
        </Button>
        <Popover placement="bottom" target="delete" isOpen={props.deleteSelected} toggle={() => props.deleteCancelled()}>
          <PopoverHeader>Are you sure you want to delete the selected CV?</PopoverHeader>
          <PopoverBody>
            <Button outline className="button" onClick={() => props.deleteConfirmed()}>Yes</Button>
            <Button outline className="button" onClick={() => props.deleteCancelled()}>No</Button>
          </PopoverBody>
        </Popover>
        <ButtonDropdown isOpen={props.exportDropdownOpen} toggle={() => props.exportClicked()}>
          <DropdownToggle caret outline className="button">
              Export
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Download as PDF</DropdownItem>
            <DropdownItem>Share via email</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>
    </div>
  )
}


export default BrowseButtonGroup
