import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CardActions, Chip, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function RecipeReviewCard({blog,isEditable}) {

  const navigate = useNavigate()

  const deleteBlog = (id) =>{
    axios
      .delete(
        `{process.env.BASE_URL}/blogs/${id}`
      )
      .then((res) => {
        navigate("/");
        // toast.success(res.data.message);
      })
      // .catch((err) => toast.error(err.response.data.message));
      .catch(err=>console.log(err))
  };
  

  return (
    <Card >
      <CardHeader
        avatar={
          <img style={{width:30,height:30,borderRadius:"50%"}} src={blog.author.photoUrl} crossOrigin='true' alt={blog.author.name}/>
        }
        action={
          isEditable && (<>
            <IconButton  onClick={()=>navigate('/edit',{state:blog})}>
            <CreateIcon />
          </IconButton> <IconButton  onClick={()=>deleteBlog(blog._id)}>
            <DeleteIcon />
          </IconButton>
          </>)
          
        }
        title={blog.author.name}
        subheader={moment(blog.createdAt).format('llll')}
      />
      <CardMedia
        component="img"
        height="194"
        image={blog.photoUrl} crossOrigin='true'
        alt="Paella dish"
      />
      <CardContent sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Box>
          <Typography variant="body1">
          {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {blog.description}
          </Typography>
        </Box>
        <Box>
          <Chip label={blog.category} variant="outlined" />
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={()=>navigate(`/${blog._id}`)} size="small">Details</Button>
      </CardActions>
      
    </Card>
  );
}
