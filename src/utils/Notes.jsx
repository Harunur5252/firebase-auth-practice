import React, { useContext } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { NoteContext } from '../context/Note.Context';
import Note from './Note'

function Notes() {
  const {notes} = useContext(NoteContext)
  return (
    <div>
      <Typography sx={{
        marginTop: 12,
        textAlign: 'center',
      }} component="h1" variant="h5">
         All Notes
      </Typography>
            {notes && notes?.map(note => {
              return (
                <Grid item sm={4} key={note?.id}>
                   <Note note={note} />
                </Grid>
              )
            })}
    </div>
  )
}

export default Notes