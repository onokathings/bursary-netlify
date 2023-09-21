import { Container } from '@mui/material';
import { StudentBioData } from './student-bio-data/BioData';

function App() {
  return (
    <Container component={"main"} style={{marginTop: '10px'}}>
      {StudentBioData() }
    </Container>
  );
}

export default App;
