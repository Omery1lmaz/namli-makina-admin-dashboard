import CircularProgress from '@mui/joy/CircularProgress';

const smallCircularProgressBar = () => {
  return <CircularProgress color="info" size="sm" variant="plain" />;
};

const MediumCircularProgressBar = () => {
  return <CircularProgress color="info" size="md" variant="plain" />;
};
const LargeCircularProgressBar = () => {
  return <CircularProgress color="info" size="lg" variant="plain" />;
};

export {
  smallCircularProgressBar,
  MediumCircularProgressBar,
  LargeCircularProgressBar,
};
