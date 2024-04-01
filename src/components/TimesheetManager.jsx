import React, { useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import '../style/TimesheetManager.css';

import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function TimesheetManager({}) {
  const [employeeInfo, setEmployeeInfo] = useState({
    name: '',
    role: '',
    time: '',
    date: '',
    schedule: ''
  });    
  

  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

     // Check if all required fields are filled out
     if (!employeeInfo.name || !employeeInfo.role || !employeeInfo.time || !employeeInfo.date || !employeeInfo.schedule) {
      alert('Please fill out all fields before adding entry');
      return;
    }

    setTimesheetEntries(prevEntries => [...prevEntries, { ...employeeInfo }]);
    setEmployeeInfo({
      name: '',
      role: '',
      time: '',
      date: '',
      schedule: ''
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEmployeeInfo(timesheetEntries[index]);
  };

  const handleUpdate = () => {
    setTimesheetEntries(prevEntries => {
      const updatedEntries = [...prevEntries];
      updatedEntries[editIndex] = { ...employeeInfo };
      return updatedEntries;
    });
    setEditIndex(-1);
    setEmployeeInfo({
      name: '',
      role: '',
      time: '',
      date: '',
      schedule: ''
    });
  };

  const handleDelete = (index) => {
    setTimesheetEntries(prevEntries => prevEntries.filter((entry, i) => i !== index));
  };

  //xlsx
  const exportToExcel = (timesheetEntries) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
  
    // Convert timesheet entries to a worksheet
    const ws = XLSX.utils.json_to_sheet(timesheetEntries);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Timesheet');
  
    // Generate a data URL representing the Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const excelDataUrl = URL.createObjectURL(excelBlob);
  
    // Trigger a download of the Excel file
    const link = document.createElement('a');
    link.href = excelDataUrl;
    link.download = 'timesheet.xlsx';
    link.click();
  };
  
  return (
    <Container  className="ts-container" maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Timesheet Manager
      </Typography>
      <form onSubmit={handleSubmit}>


        <FormControl fullWidth>
          <InputLabel>Name</InputLabel>
          <Select
            sx={{ marginBottom: '10px' }}
            value={employeeInfo.name}
            onChange={handleChange}
            required
            name="name"
          >

            <MenuItem value="Person 1">Person 1</MenuItem>
            <MenuItem value="Person 2">Person  2</MenuItem>
            {/* Add more names as needed */}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            sx={{ marginBottom: '10px' }}
            value={employeeInfo.role}
            onChange={handleChange}
            required
            name="role"
          >

            <MenuItem value="Student Assistant">Student Assistant</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
            {/* Add more names as needed */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Time"
          name="time"
          type="time"
          sx={{ marginBottom: '10px' }}
          value={employeeInfo.time}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          sx={{ marginBottom: '15px' }}
          value={employeeInfo.date}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
          <FormControl fullWidth>
          <InputLabel>Schedule</InputLabel>
          <Select
            sx={{ marginBottom: '10px' }}
            value={employeeInfo.schedule}
            onChange={handleChange}
            required
            name="schedule"
          >

            <MenuItem value="Time In">Time In</MenuItem>
            <MenuItem value="Lunchbreak">Lunchbreak</MenuItem>
            <MenuItem value="Time Out">Time Out</MenuItem>
          </Select>
        </FormControl>
        
        {editIndex === -1 ? (
          <Button variant="contained" color="primary" type="submit">
            Add Entry
          </Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleUpdate}>
            Update
          </Button>
        )}

      </form>
      <br />
      <Typography variant="h5" align="center" gutterBottom>
        Timesheet Entries
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Schedule</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timesheetEntries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.role}</TableCell>
              <TableCell>{entry.time}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.schedule}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" size="small" style={{ marginTop: '15px' }} startIcon={<EditIcon />} onClick={() => handleEdit(index)}>
                  Edit
                </Button>
                <Button className="form-button" variant="outlined" color="error" size="small" style={{ marginTop: '15px' }} startIcon={<DeleteIcon />} onClick={() => handleDelete(index)}>
                  Delete
                </Button>

              </TableCell>
            </TableRow>
          ))}
        <Button onClick={() => exportToExcel(timesheetEntries)}>Export to Excel</Button>
        </TableBody>
      </Table>

    </Container>

  );
}

export default TimesheetManager;

