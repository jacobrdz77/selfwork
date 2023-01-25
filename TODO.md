## User Stories

- as a user I want to be able to click on a task in the list view and it opens a popup that shows more details about the task.
- in the list view, I would like to click and drag each task to rearrange the order and to add them to the tasklist when dropped.

# Projects

## List view

- create a table view of tasks in Tasks component.
  - Task needs to show by default:
    - Task Name
    - Due Date
    - Priority
    - Status

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
