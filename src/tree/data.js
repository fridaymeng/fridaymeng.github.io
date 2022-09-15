export const fields = [
  { name: "ID", id: 1 },
  { name: "User", id: 2 },
  { name: "Age", id: 3 },
  { name: "Nation", id: 4 },
  { name: "Category", id: 8, type: "Category", categoryList: [{id: 100, name: 'toms'}, {id: 101, name: 'jerry'}] },
  { name: "Rate", id: 9, type: "Rate" },
  { name: "Date Picker", id: 5, type: "DatePicker" },
  { name: "Month Picker", id: 6, type: "MonthPicker" },
  { name: "Range Picker", id: 7, type: "RangePicker" }
]

export const operators = [
  { name: 'equal', id: 1, symbol: '=' },
  { name: 'not equal', id: 2, symbol: '!=' },
  { name: 'is not null', id: 3, value: 'disabled', symbol: 'is not null' },
  { name: 'is null', id: 4, value: 'disabled', symbol: 'is null' },
  { name: 'in', id: 5, symbol: 'in' },
  { name: 'not in', id: 6, symbol: 'not in' },
  { name: 'less', id: 7, symbol: 'less' },
  { name: 'less or equal', id: 8, symbol: 'less or equal' },
  { name: 'greater', id: 9, symbol: 'greater' },
  { name: 'greater or equal', id: 10, symbol: 'greater or equal' },
  { name: 'between', id: 11, symbol: 'between' },
  { name: 'not between', id: 12, symbol: 'not between' }
]