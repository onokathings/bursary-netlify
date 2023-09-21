import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { FormControl, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import LocalizationProvider, { StaticDatePicker, deDE } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers';
import { bioDataStyles } from './bio-data.styles';
import InfiniteScroll from 'react-infinite-scroll-component';
interface IFormData {
    full_name: string;
    gender: string;
    dob: string;
    disabled: boolean;
    which_disability: null | string;
    phone: string;
    school: string;
    adm_no: string;
    year_of_study: number;
    completion_date: number | null;
    benefitting_other_fund: boolean;
    other_fund_name: string;
    other_fund_year: number;
    other_fund_amount: string;
    parent_state: 'no' | 'both' | 'one';
    orphan_state: 'yes' | 'no';
    grand_parent_care_state: 'yes' | 'no';
    father_guardian_name: string;
    father_guardian_occupation: string;
    father_guardian_phone: string;
    mother_guardian_name: string;
    mother_guardian_occupation: string;
    mother_guardian_phone: string;
    parent_guardian_disabled: 'Yes' | 'No';
    school_bank_name: string;
    school_bank_account_no: string;
    school_bank_code: string;
    school_bank_branch: string;
    fee_balance: string;
  }

const initialValues: IFormData = {
  full_name: '',
  gender: 'M',
  dob: '1990-05-15T00:00:00.000Z',
  disabled: false,
  which_disability: null,
  phone: '',
  school: '',
  adm_no: '',
  year_of_study: 0,
  completion_date: null,
  benefitting_other_fund: false,
  other_fund_name: '',
  other_fund_year: 2000,
  other_fund_amount: '',
  parent_state: 'no', // New dropdown field
  orphan_state: 'no', // New dropdown field
  grand_parent_care_state: 'no', // New dropdown field
  father_guardian_name: '',
  father_guardian_occupation: '',
  father_guardian_phone: '',
  mother_guardian_name: '',
  mother_guardian_occupation: '',
  mother_guardian_phone: '',
  parent_guardian_disabled: 'Yes',
  school_bank_name: '',
  school_bank_account_no: '',
  school_bank_code: '',
  school_bank_branch: '',
  fee_balance: ''
  // ... other initial values ...
};

export function StudentBioData() {
  const [formData, setFormData] = useState(initialValues);
  const [hasMore, setHasMore] = useState(true);
  const { formStyles } = bioDataStyles;
  const [selectedDate, setSelectedDate] = useState(formData.completion_date || null); // Initialize the DatePicker value

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDateChange = (date: any) => {
    setFormData({
      ...formData,
      dob: date,
    });
  };

  const handleOtherFundAmountInput = (e: any) => {
    // Allow only numbers, commas, and dots
    const sanitizedValue = e.target.value.replace(/[^\d.,]/g, '');
    setFormData({
      ...formData,
      other_fund_amount: sanitizedValue,
    });
  };

  const fetchMoreData = () => {
    // Simulate loading more data (e.g., after reaching the end of the page)
    // You can add more form fields or content here as needed
    setTimeout(() => {
      // Update formData or load additional form fields
      // For example, you can add more fields to `formData`

      // Here, we'll just toggle `hasMore` to stop loading more data
      setHasMore(false);
    }, 1000); // Simulated loading delay
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Create the final data object by shallow copying formData
    const finalData = { ...formData };

    // Check disabled fields and set them to empty strings if they match initialValues
    for (const key in finalData) {
      if (finalData.hasOwnProperty(key)) {
        if (initialValues.hasOwnProperty(key) && finalData[key as keyof typeof finalData] === initialValues[key as keyof typeof finalData]) {
          //finalData[key as keyof finalData] = '';
        }
      }
    }

    // Access the final data object with empty strings for matching disabled items
    console.log(finalData);

    // Perform your onSubmit logic here with finalData
  };

  useEffect(() => {
    // Perform any initial data loading here if needed
  }, []);

  return (
    <InfiniteScroll
      dataLength={Object.entries(formData).length} // Set the current data length
      next={fetchMoreData} // Function to load more data
      hasMore={hasMore} // Whether there is more data to load
      loader={<h4>Loading...</h4>} // Loader displayed while loading more data
      endMessage={<p>No more items to load</p>} // Message when all data is loaded
    >
    <form onSubmit={handleSubmit} style={formStyles}>
      <Typography variant="h4" gutterBottom>
        Enter your data
      </Typography>
      <TextField
        name="full_name"
        label="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        fullWidth
        placeholder='John Doe'
      />
      {/* Add more TextField components for other fields */}
      <Typography variant="h6" gutterBottom>
        Select your gender
      </Typography>
      <RadioGroup
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="M"
          control={<Radio />}
          label="Male"
        />
        <FormControlLabel
          value="F"
          control={<Radio />}
          label="Female"
        />
      </RadioGroup>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date of Birth"
          value={formData.dob}
          onChange={handleDateChange}
        />
      </LocalizationProvider> */}

      <FormControlLabel
        control={
          <Checkbox
            name="disabled"
            checked={formData.disabled}
            onChange={handleChange}
          />
        }
        label="Disabled"
      />
      <TextField
        name="which_disability"
        label="Which disability"
        value={formData.which_disability}
        onChange={handleChange}
        fullWidth
        disabled={!formData.disabled} // Enable only if 'Disabled' is selected
      />

      <TextField
        name="phone"
        label="Phone Number"
        value={formData.phone}
        onChange={(e) => {
          // Allow only numeric input
          const numericValue = e.target.value.replace(/\D/g, '');
          setFormData({
            ...formData,
            phone: numericValue,
          });
        }}
        fullWidth
        inputMode="numeric"
        placeholder='710897635'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              +254
            </InputAdornment>
          ),
        }}
      />

        <TextField
        name="school"
        label="School"
        value={formData.school}
        onChange={handleChange}
        fullWidth
        placeholder='Kasongo High School'
      />

      {/* New TextField for adm_no */}
      <TextField
        name="adm_no"
        label="Admission Number"
        value={formData.adm_no}
        onChange={handleChange}
        fullWidth
        placeholder='10559'
      />

    <TextField
        name="year_of_study"
        label="Year of Study"
        type="number"
        inputProps={{
            min: 1,
            max: 20,
        }}
        value={formData.year_of_study}
        onChange={handleChange}
        fullWidth
    />
    {/* <StaticDatePicker
        defaultValue={2022}
        value={selectedDate} // Use the selectedDate state as the value
        onChange={handleDateChange} // Handle date changes
    /> */}
    <FormControlLabel
        control={
            <Checkbox
            name="benefitting_other_fund"
            checked={formData.benefitting_other_fund}
            onChange={(e) => {
                setFormData({
                ...formData,
                benefitting_other_fund: e.target.checked,
                });
            }}
            />
        }
        label="Benefitting from Other Fund"
    />
    <TextField
        name="other_fund_name"
        label="Other Fund Name"
        value={formData.other_fund_name}
        onChange={handleChange}
        fullWidth
        disabled={!formData.benefitting_other_fund}
        placeholder='Jack Doe Scholarship Fund'
      />

      {/* New TextField for other_fund_year */}
      <TextField
        name="other_fund_year"
        label="Other Fund Year"
        type="number"
        inputProps={{
          min: 2000,
          max: 2050,
        }}
        value={formData.other_fund_year}
        onChange={handleChange}
        fullWidth
        disabled={!formData.benefitting_other_fund}
      />

      {/* New TextField for other_fund_amount */}
      <TextField
        name="other_fund_amount"
        label="Other Fund Amount"
        value={formData.other_fund_amount}
        onChange={handleOtherFundAmountInput}
        fullWidth
        disabled={!formData.benefitting_other_fund}
        placeholder='1,000.50'
      />

      {/* New dropdown field for parent_state */}
      {/* New dropdown field for parent_state */}
      <div>
      <InputLabel htmlFor="parent-state">Parent State</InputLabel>
      <Select
        id="parent-state"
        name="parent_state"
        value={formData.parent_state}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="no">No</MenuItem>
        <MenuItem value="both">Both</MenuItem>
        <MenuItem value="one">One</MenuItem>
      </Select>

      {/* New dropdown field for orphan_state */}
      <InputLabel htmlFor="orphan-state">Orphan State</InputLabel>
      <Select
        id="orphan-state"
        name="orphan_state"
        value={formData.orphan_state}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="no">No</MenuItem>
        <MenuItem value="yes">Yes</MenuItem>
      </Select>

      {/* New dropdown field for grand_parent_care_state */}
      <InputLabel htmlFor="grand-parent-care-state">Grandparent Care State</InputLabel>
      <Select
        id="grand-parent-care-state"
        name="grand_parent_care_state"
        value={formData.grand_parent_care_state}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="no">No</MenuItem>
        <MenuItem value="yes">Yes</MenuItem>
      </Select>
      </div>
      {/* New TextField for father_guardian_name */}
    <TextField
        name="father_guardian_name"
        label="Father/Guardian Name"
        value={formData.father_guardian_name}
        onChange={handleChange}
        fullWidth
        placeholder='John Doe'
    />
    {/* New TextField for father_guardian_occupation */}
    <TextField
        name="father_guardian_occupation"
        label="Father/Guardian Occupation"
        value={formData.father_guardian_occupation}
        onChange={handleChange}
        fullWidth
    />

    {/* New TextField for father_guardian_phone */}
    <TextField
        name="father_guardian_phone"
        label="Father/Guardian Phone Number"
        value={formData.father_guardian_phone}
        onChange={(e) => {
            // Allow only '+' and numbers
            const sanitizedValue = e.target.value.replace(/[^\d+]/g, '');
            setFormData({
            ...formData,
            father_guardian_phone: sanitizedValue,
            });
        }}
        fullWidth
    />
    {/* New TextField for mother_guardian_name */}
    <TextField
        name="mother_guardian_name"
        label="Mother/Guardian Name"
        value={formData.mother_guardian_name}
        onChange={handleChange}
        fullWidth
        placeholder='Jane Doe'
        />

        {/* New TextField for mother_guardian_occupation */}
        <TextField
        name="mother_guardian_occupation"
        label="Mother/Guardian Occupation"
        value={formData.mother_guardian_occupation}
        onChange={handleChange}
        fullWidth
    />

    {/* New TextField for mother_guardian_phone */}
    <TextField
        name="mother_guardian_phone"
        label="Mother/Guardian Phone Number"
        value={formData.mother_guardian_phone}
        onChange={(e) => {
            // Allow only '+' and numbers
            const sanitizedValue = e.target.value.replace(/[^\d+]/g, '');
            setFormData({
            ...formData,
            mother_guardian_phone: sanitizedValue,
            });
        }}
        fullWidth
    />
    {/* New dropdown field for parent_guardian_disabled */}
    <FormControl fullWidth>
        <InputLabel htmlFor="parent-guardian-disabled">Parent/Guardian Disabled</InputLabel>
        <Select
            id="parent-guardian-disabled"
            name="parent_guardian_disabled"
            value={formData.parent_guardian_disabled}
            onChange={handleChange}
        >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
        </Select>
    </FormControl>

    {/* New TextField for school_bank_name */}
    <TextField
        name="school_bank_name"
        label="School Bank Name"
        value={formData.school_bank_name}
        onChange={handleChange}
        fullWidth
        placeholder='Sample Bank'
    />

    {/* New TextField for school_bank_account_no */}
    <TextField
        name="school_bank_account_no"
        label="School Bank Account Number"
        value={formData.school_bank_account_no}
        onChange={(e) => {
            // Allow only numeric characters
            const sanitizedValue = e.target.value.replace(/[^\d]/g, '');
            setFormData({
            ...formData,
            school_bank_account_no: sanitizedValue,
            });
        }}
        fullWidth
        placeholder='123456'
    />

    {/* New TextField for school_bank_code */}
    <TextField
        name="school_bank_code"
        label="School Bank Code"
        value={formData.school_bank_code}
        onChange={handleChange}
        fullWidth
        placeholder='789568'
    />

    {/* New TextField for school_bank_branch */}
    <TextField
        name="school_bank_branch"
        label="School Bank Branch"
        value={formData.school_bank_branch}
        onChange={handleChange}
        fullWidth
        placeholder='Sample Branch'
    />

    {/* New TextField for fee_balance */}
    <TextField
        name="fee_balance"
        label="Fee Balance"
        value={formData.fee_balance}
        onChange={(e) => {
            // Allow only numbers, commas, and dots
            const sanitizedValue = e.target.value.replace(/[^\d.,]/g, '');
            setFormData({
            ...formData,
            fee_balance: sanitizedValue,
            });
        }}
        fullWidth
        placeholder='1,098.78'
    />



      {/* Add more Checkbox components for other boolean fields */}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </InfiniteScroll>
  );
}

export default StudentBioData;
