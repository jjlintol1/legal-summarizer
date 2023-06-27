import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectCompanies } from '../../store/reducers/company/company.selector';

import {
  List,
  ListItemButton,
  Box,
  useTheme,
  TextField,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import SidebarItem from '../sidebar-item/sidebar-item.component';
import SidebarBottomBar from '../sidebar-bottom-bar/sidebar-bottom-bar';
import { useNavigate } from 'react-router-dom';
import { resetActiveDocument } from '../../store/reducers/question/question.action';
import { useEffect } from 'react';

// import { dummyCompanies } from '../../utils/dummy-data/dummy-data.utils';

const Sidebar = ({ desktop }) => {
  const companies = useSelector(selectCompanies);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  
  const theme = useTheme();

  useEffect(() => {
    const companiesToShow = companies.filter(company => company.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCompanies(companiesToShow);  
  }, [searchTerm, companies]);
  

  const handleClick = () => {
    dispatch(resetActiveDocument());
    navigate('/summary');
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }


  return (
    <Box sx={{
      width: !desktop ? '100%' : '250px',
      height: !desktop ? '90%' : null,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: desktop ? '0px 10px 20px rgba(0, 0, 0, 0.5)' : null,
      // alignItems: 'space-between',
      borderRadius: '15px',
      marginTop: desktop ? '0.75rem' : '',
    }}>
      <List component="nav" aria-labelledby="nested-list-subheader" sx={{
        width: '100%',
        flex: 4,
        overflowY: 'scroll',
      }}>
        <ListItemButton
          onClick={handleClick}
          sx={{
            border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
            borderRadius: '10px',
            marginTop: desktop ? '0.5rem' : null,
            padding: '0.75rem',
            marginBottom: '1.5rem',
            width: desktop ? '80%' : '90%',
            marginX: 'auto'
          }}
        >
          <AddIcon sx={{ 
            marginRight: '1rem', 
            border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`, 
            borderRadius: '50%', 
            padding: '0.1rem' }} 
          />
          New Summary
        </ListItemButton>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <TextField 
          variant='outlined' 
          value={searchTerm} 
          placeholder="Search companies"
          size='small'
          onChange={handleChange}
          sx={{
            width: desktop ? '80%' : '90%',
            marginX: 'auto',
            borderRadius: '10px',
            marginBottom: '0.5rem'
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }}
          />
        </Box>
        {
          filteredCompanies.map((company, i) => <SidebarItem
            key={i}
            company={company}
          />)
        }
      </List>
      <SidebarBottomBar />
    </Box>
  );
}

export default Sidebar
