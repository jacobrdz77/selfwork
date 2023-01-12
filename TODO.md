# Projects

## List view

- create a table view of tasks in Tasks component.
  - Task needs to show by default:
    - Task Name
    - Due Date
    - Priority
    - Status

## User Stories

- allow users to navigate to different pages of a single project
  - overview
  - list
  - board
  - sketch

## Inputs for project:

- Name
- Lump Sum
  - if 0 then null
- Description
  - if description.length === 0 then null
- Start Date
  - if length === 0 then null
  - else if it is a string then transform it into a Date object
- Due Date
  - No Due Date
  - Due Date
  - if length === 0 then null
  - else if it is a string then transform it into a Date object
- Priority
  - NONE
  - LOW
  - MEDIUM
  - HIGH
