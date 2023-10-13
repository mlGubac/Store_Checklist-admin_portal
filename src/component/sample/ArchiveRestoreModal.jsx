import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'

import { useUserGet, useUserResetPassword, useUserArchive } from '../../hooks/UserController';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const ArchiveRestoreModal = () => {

    const [openModalArchive, setOpenModalArchive] = useState(false);
    const [archiveChecked, setArchiveChecked] = useState(false);
    const [archiveData, setArchiveData] = useState(null);

    const { mutate: userArchive, isLoading: archiveLoading, isSuccess: archiveSuccess, isError: archiveError } = useUserArchive();

    const handleCloseModalArchive = () => setOpenModalArchive(false);

    const handleArchive = (e) => {
        if (archiveChecked) {
          const obj = {
            id: archiveData.id,
            status: true
          }
          userArchive(obj);
        } else {
          const obj = {
            id: archiveData.id,
            status: false
          }
          userArchive(obj);
        }
    }
    
    return (
        <>
            <Modal
                open={openModalArchive}
                onClose={handleCloseModalArchive}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display="flex" flexDirection="column" alignItems="center">

                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                        Confirmation
                    </Typography>
                    
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}component="h2" align="center">
                        {archiveChecked ? 
                            "Are you sure you want to RESTORE this data?"
                            :
                            "Are you sure you want to ARCHIVE this data?"
                        }
                    </Typography>
                    
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button 
                            variant="outlined" 
                            sx={{mx: 2}} 
                            onClick={handleCloseModalArchive} 
                            color="error"
                        >
                            No
                        </Button>
                        <Button 
                            variant="outlined" 
                            sx={{mx: 2}} 
                            color="success" 
                            onClick={handleArchive}
                        >
                            Yes
                        </Button>
                    
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ArchiveRestoreModal