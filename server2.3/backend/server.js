import app from './app.js';
import config from './config';

const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');

const { PORT } = config;
const { exec } = require('child_process');

// Replace 'your_executable' with the path to your C++ executable 
const executablePath = './configtranslation'; 
const workingDir = '../../client';

app.use(express.json());
                                        
app.post('/writeToTemplate', (req, res) => { const { data } = req.body; 
// Write data to a local file 
fs.writeFile('../../client/template/template', data + '\n', (err) => 
	{ if (err) { console.error(err); res.status(500).send('Error writing to file'); } 
	else { res.status(200).send('Data written to file successfully'); } 
	}); 
}); 

app.post('/writeDeployList', (req, res) => { const { data } = req.body; 
// Write data to a local file 
fs.writeFile('../../client/config/deploy-list.txt', data + '\n', (err) => 
	{ if (err) { console.error(err); res.status(500).send('Error writing to file'); } 
	else { res.status(200).send('Data written to file successfully'); } 
	});
					    
// Execute the C++ executable 
exec(executablePath, { cwd: workingDir }, (error, stdout, stderr) => 
	{ if (error) { console.error(`Error executing the C++ executable: ${error}`); return; } 
	 // Log the standard output 
	 console.log(`stdout: ${stdout}`); 
	 // Log any errors from the executable 
	 if (stderr) { console.error(`stderr: ${stderr}`); } 
	});
					    
}); 


// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
	  key: fs.readFileSync('/home/jacdodd/HeavilyArmedPenguins/key.pem'),
	  cert: fs.readFileSync('/home/jacdodd/HeavilyArmedPenguins/cert.pem'),
}, app);

httpServer.listen(8000, () => {
	    console.log('HTTP Server running on port 8000');
});

httpsServer.listen(3000, () => {
	    console.log('HTTPS Server running on PORT 3000');
});
