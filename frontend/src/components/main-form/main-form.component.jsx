import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { selectSummary, selectIsLoading, selectSummaryObj } from '../../store/reducers/summary/summary.selector';
import { 
    Box, 
    TextField,
    Button,
    Autocomplete
} from "@mui/material";
import {
LoadingButton
} from '@mui/lab';
import Instructions from '../instructions/instructions.component';
import Clauses from '../clauses/clauses.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import { getSummaryStart } from '../../store/reducers/summary/summary.action';
import { selectCompanies } from '../../store/reducers/company/company.selector';
import { addCompanyStart, addDocumentStart } from '../../store/reducers/company/company.action';



const defaultFieldValues = {
    docType: '',
    company: '',
    docUrl: ''
}

const MainForm = () => {
    const dispatch = useDispatch();

    const { companyParam } = useParams();

    const summary = useSelector(selectSummary);
    const summaryObj = useSelector(selectSummaryObj);
    const isLoading = useSelector(selectIsLoading);

    const companies = useSelector(selectCompanies);

    const autocompleteOptions = companies.map(company => company.companyName);
  
  const [inputValue, setInputValue] = useState(defaultFieldValues);

  useEffect(() => {
    if (companyParam) {
      setInputValue(prev => {
        return {
          ...prev, 
          company: companyParam
        }
      });
    }
  }, [companyParam]);
  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValue({
          ...inputValue,
          [name]: value
        });
    };

    // const clearInputs = () => setInputValue(defaultFieldValues);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const { docType, company, docUrl } = inputValue;
      if (!docType || !company || !docUrl) return;
      dispatch(getSummaryStart(docType, company, docUrl));
    }

    const handleSaveSummary = () => {
      const companiesLowered = companies.map((company) => company.companyName.toLowerCase());
      if (companiesLowered.includes(summaryObj.company.toLowerCase())) {
        const matchingCompany = companies.find(company => company.companyName.toLowerCase() === summaryObj.company.toLowerCase());
        const companyId = matchingCompany._id;
        const newDocument = {
          documentType: summaryObj.docType,
          summary,
          documentUrl: summaryObj.docUrl
        }
        dispatch(addDocumentStart(companies, companyId, newDocument));
      } else {
        const newCompany = {
          companyName: summaryObj.company,
          documentType: summaryObj.docType,
          summary,
          documentUrl: summaryObj.docUrl
        }
        dispatch(addCompanyStart(companies, newCompany));
      }
      setInputValue(defaultFieldValues);
    }

  return (
    <Box sx={{
        flex: 4,
        overflowY: 'scroll'
    }}>
        {/* <Navbar /> */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '3rem 5rem',
          width: '100%',
        }}>
          <form 
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}> 
            <Autocomplete 
            freeSolo
            options={autocompleteOptions}
            defaultValue={companyParam ? companyParam : inputValue.company}
            value={inputValue.company}
            getOptionLabel={(option) => option}
            onChange={(e, value) => setInputValue({
              ...inputValue,
              company: value
            })}
            renderInput={(params) => (
              <TextField 
              {...params}
              variant="outlined" 
              label='Company/Website' 
              required 
              name='company'
              onChange={handleChange}
              />
            )}
            />
            <br />
            <TextField 
            variant="outlined" 
            label='Document Type' 
            required 
            name='docType'
            onChange={handleChange}
            value={inputValue.docType}
            />
            <br />
            <TextField 
            variant="outlined" 
            label="Document URL" 
            required 
            name='docUrl' 
            onChange={handleChange}
            value={inputValue.docUrl}
            />
            <br />
            {
              summary.length ? (
              <Button type='button' size='large' color="primary" variant='contained' onClick={handleSaveSummary}>
                Save Summary
              </Button>
              ) : (
              <LoadingButton size='large' loading={isLoading} loadingIndicator="Summarizing..." variant="contained" color="primary" type='submit'>
                Summarize
              </LoadingButton>
              )
            }
          </form>
          {!summary.length && !isLoading ? <Instructions /> : null}
          {isLoading ? <LoadingSpinner /> : null}
          {summary.length && !isLoading ? <Clauses summary={summary} /> : null}
        </Box>
      </Box>
  )
}

export default MainForm;
