import React, { useState, useEffect } from 'react';
import {
    ListItemButton,
    Collapse,
    ListSubheader,
    List,
    useTheme,
    Box,
    IconButton,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Button,
    Tooltip,
    TextField
} from '@mui/material';

import TopicIcon from '@mui/icons-material/Topic';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDocument } from '../../store/reducers/question/question.selector';
import { setActiveDocument } from '../../store/reducers/question/question.action';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { selectCompanies } from '../../store/reducers/company/company.selector';
import { deleteCompanyStart, deleteDocumentStart, updateCompanyStart } from '../../store/reducers/company/company.action';


const SidebarSubItem = ({ document }) => {
    const [hover, setHover] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const companies = useSelector(selectCompanies);
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const theme = useTheme();


    const activeDocument = useSelector(selectActiveDocument);

    const active = document._id === activeDocument._id;

    const handleClick = () => {
        dispatch(setActiveDocument(document));
        navigate(`/ask/${document._id}`);
    }

    const showDeleteDialog = () => {
        setDialogOpen(true);
    }

    const handleDelete = () => {
        dispatch(deleteDocumentStart(companies, document.company, document._id))
    }
    
    return (
        <React.Fragment>
            <ListItemButton
                sx={{
                    marginLeft: '2rem',
                    marginRight: '2rem',
                    background: active ? theme.palette.primary.main : 'inherit',
                    borderRadius: '15px',
                    marginY: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                onClick={handleClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <TopicIcon style={{ marginRight: '0.5rem' }} />
                    {document.documentType}
                </Box>
                <Box sx={{
                    display: hover ? 'block' : 'none'
                }}>
                    <Tooltip title="Delete document">
                        <IconButton onClick={showDeleteDialog}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </ListItemButton>
            <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            sx={{
                borderRadius: '15px'
            }}
            >
                <DialogTitle>Delete Document</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete {document.companyName} {document.documentType}? This will also delete its question history.
                </DialogContent>
                <DialogActions>
                    <Button 
                    sx={{ color: 'red', marginRight: '0.5rem' }} 
                    onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button 
                    sx={{ 
                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                        borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
                    }} 
                    onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}


const SidebarItem = ({ company }) => {
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [newCompanyName, setNewCompanyName] = useState(company.companyName);

    const companies = useSelector(selectCompanies);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { _id, companyName, documents } = company;

    const theme = useTheme();

    useEffect(() => {
      if (editingMode) setSubMenuOpen(true);
    }, [editingMode]);
    

    const toggleOpen = () => {
        if (editingMode) return;
        setSubMenuOpen(!subMenuOpen);
    }

    const handleChange = (e) => setNewCompanyName(e.target.value);

    const handleAdd = () => {
        navigate(`/summary/${companyName}`);
    }

    const openDeleteDialog = () => {
        setDialogOpen(true);
    }

    const handleDelete = () => {
        dispatch(deleteCompanyStart(companies, _id));
        setDialogOpen(false);
    }

    const handleNameChange = () => {
        dispatch(updateCompanyStart(companies, _id, newCompanyName));
        setEditingMode(false);
    }

    const handleCloseEditingMode = () => setEditingMode(false);

    return (
        <React.Fragment>
            <ListItemButton onClick={toggleOpen} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: subMenuOpen ? theme.palette.action.hover : 'inherit'
            }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                {subMenuOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                {editingMode ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <TextField size='small' defaultValue={companyName} value={newCompanyName} onChange={handleChange} sx={{ width: '50%' }} />
                        <Box>
                            <Tooltip title="Update company name">
                                <IconButton onClick={handleNameChange}>
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <IconButton onClick={handleCloseEditingMode}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                )
                : <div>{companyName}</div>}
            </Box>
            {(subMenuOpen && !editingMode) && (
                <Box>
                    <Tooltip title="Add document">
                        <IconButton onClick={handleAdd} size="small" sx={{ marginRight: '-8px'}}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit name">
                        <IconButton onClick={() => setEditingMode(true)} size="small" sx={{ marginRight: '-8px'}}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete company">
                        <IconButton onClick={openDeleteDialog} size="small" sx={{ marginRight: '-8px'}}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
            </ListItemButton>
            <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListSubheader component="div" id="nested-list-subheader">
                    </ListSubheader>
                    {
                        documents.map((document, i) => (
                            <SidebarSubItem
                            key={i}
                            document={document}
                            />
                        ))
                    }
                </List>
            </Collapse>
            <Dialog 
            open={dialogOpen} 
            onClose={() => setDialogOpen(false)}
            sx={{
                borderRadius: '15px'
            }}
            >
                <DialogTitle>Delete Company</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete {companyName}? This will also delete all of its documents.
                </DialogContent>
                <DialogActions>
                    <Button 
                    sx={{ color: 'red', marginRight: '0.5rem' }} 
                    onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button 
                    sx={{ 
                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                        borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
                    }} 
                    onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default SidebarItem
