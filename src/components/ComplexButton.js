import * as React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  alignItems: 'center',
  borderRadius: '35px',
  // boxShadow: '3px 3px red, -1em 0 0.4em olive',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
  borderRadius: 'inherit',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  borderRadius: 'inherit',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
  borderRadius: 'inherit',
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
  borderRadius: 'inherit',
}));

export default function ButtonBaseDemo({ imageUrl, imageTitle, linkTo, imageWidth = "80%", imageHeight = "100%" }) {
  return (
    <ImageButton
      id="botaoComplex"
      component={Link}
      to={linkTo}
      focusRipple
      key={imageTitle}
      style={{
        width: `${imageWidth}`,
        height: `${imageHeight}`,
        alignItems: "center"
      }}
    >
      <ImageSrc style={{ backgroundImage: `url(${imageUrl})` }} />
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        <Typography id="typography_button"
          component="span"
          variant="subtitle1"
          color="inherit"
          sx={(theme) => ({
            position: 'relative',
            p: 4,
            pt: 2,
            pb: `calc(${theme.spacing(1)} + 6px)`,
            fontSize: "2rem"
          })}
        >
          {imageTitle}
          <ImageMarked className="MuiImageMarked-root" />
        </Typography>
      </Image>
    </ImageButton>
  );
}