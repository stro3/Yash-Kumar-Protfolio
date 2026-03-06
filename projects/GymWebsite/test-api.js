const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('Health check response:', healthResponse.data);
    
    console.log('\nTesting classes endpoint...');
    const classesResponse = await axios.get('http://localhost:5000/api/classes');
    console.log('Classes response:', classesResponse.data);
    
    console.log('\nTesting trainers endpoint...');
    const trainersResponse = await axios.get('http://localhost:5000/api/trainers');
    console.log('Trainers response:', trainersResponse.data);
    
  } catch (error) {
    console.error('Error testing API:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testAPI();