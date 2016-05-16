/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 return {
    cols: [{id: 'task', label: 'Employee Name', type: 'string'},
            {id: 'startDate', label: 'Start Date', type: 'date'}],
    rows: [{c:[{v: 'Mike'}, {v: new Date(2008, 1, 28), f:'February 28, 2008'}]},
            {c:[{v: 'Bob'}, {v:  "Date(2007, 5, 1)"}]},
            {c:[{v: 'Alice'}, {v: "Date(2006, 7, 16)"}]},
            {c:[{v: 'Frank'}, {v: "Date(2007, 11, 28)"}]},
            {c:[{v: 'Floyd'}, {v:  "Date(2005, 3, 13)"}]},
            {c:[{v: 'Fritz'}, {v:  "Date(2011, 6, 1)"}]}
    ]
};			