import jwt from 'jsonwebtoken';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserModel from './model/User.js';
import NumberSchema from './model/Number.js';
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO_URL);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 6500;
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
    .then((hash) => {
        UserModel.create({ name, email, password: hash })
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.status(500).send('User already exists');
        });
    })
    .catch((err) => {
        res.status(500).send('Error');
    });
   
});
app.post('/store-details', async (req, res) => {
    const numberPlate = req.body.numberPlate;
    const phoneNumber = req.body.phoneNumber;
    const formData = new NumberSchema({ numberPlate, phoneNumber });
    try{
        await formData.save();
        res.send('Data stored successfully');
    }catch(err){
        res.status(500).send('Error');
    }
});

app.post('/logout', (req, res) => {
        localStorage.removeItem('token');
        res.send('Logged out successfully');
    });
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user=>{
            if(user){
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if(match){
                            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);  
                            res.json({ token });
                        } else {
                            res.json('Wrong password');
                        }
                    })
                    .catch(err => {
                        res.status(500).send('Error');
                    });
            } else {
                res.json('User does not exist');
            }
        })
        .catch(err => {
            res.status(500).send('Error');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// // Import the WebSocket module
// const WebSocket = require('websocket').server;
// const http = require('http');

// // Create an HTTP server
// const server = http.createServer(function(request, response) {
//     // Process HTTP requests if needed
// });

// // Bind the WebSocket server to the HTTP server
// const wsServer = new WebSocket({
//     httpServer: server
// });

// // WebSocket server event handler for connections
// wsServer.on('request', function(request) {
//     const connection = request.accept(null, request.origin);

//     // Event handler for incoming messages
//     connection.on('message', function(message) {
//         // Start the detection when receiving the message
//         if (message.utf8Data === 'startDetection') {
//             const { spawn } = require('child_process');

//             const pythonProcess = spawn('python3', ['path/to/detection.py']);

//             pythonProcess.stdout.on('data', (data) => {
//                 // Handle output from the detection.py file if needed
//                 console.log(data.toString());
//             });

//             pythonProcess.stderr.on('data', (data) => {
//                 // Handle error output from the detection.py file if needed
//                 console.error(data.toString());
//             });

//             pythonProcess.on('close', (code) => {
//                 // Handle process close event if needed
//                 console.log(`Detection process exited with code ${code}`);
//             });
//         }
//     });

//     // Event handler for connection close
//     connection.on('close', function(reasonCode, description) {
//         // Handle connection close event if needed
//     });
// });

// // Start the HTTP server
// server.listen(8080, function() {
//     console.log('Server is listening on port 8080');
// });

// // import express from 'express';
// // const app = express();
// // import cv from '@u4/opencv4nodejs';
// // const dlib = require('dlib');
// // const shapePredictor = new dlib.shape_predictor('shape_predictor_68_face_landmarks.dat');

// // const { eyeAspectRatio } = require('./utils');

// // const videoCapture = new cv.VideoCapture(0);

// // const faceDetector = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

// // const frameCheck = 20;
// // const earThreshold = 0.25;

// // let signal = true;
// // let flag = 0;

// // app.get('/', (req, res) => {
// //   res.send('Hello, world!');
// // });

// // app.post('/start_detection', (req, res) => {
// //   signal = true;
// //   detect();
// //   res.json({ message: 'Detection started' });
// // });

// // app.post('/stop_detection', (req, res) => {
// //   signal = false;
// //   res.json({ message: 'Detection stopped' });
// // });

// // const detect = () => {
// //   const frame = videoCapture.read();
// //   const grayFrame = frame.bgrToGray();
// //   const faces = faceDetector.detectMultiScale(grayFrame).objects;

// //   for (const rect of faces) {
// //     const shape = shapePredictor.predict(grayFrame, rect);
// //     const landmarks = shape.parts();

// //     const leftEye = landmarks.slice(36, 42);
// //     const rightEye = landmarks.slice(42, 48);

// //     const leftEar = eyeAspectRatio(leftEye);
// //     const rightEar = eyeAspectRatio(rightEye);
// //     const ear = (leftEar + rightEar) / 2;

// //     const leftEyeHull = new cv.Contour(leftEye.map((pt) => new cv.Point2(pt.x, pt.y)));
// //     const rightEyeHull = new cv.Contour(rightEye.map((pt) => new cv.Point2(pt.x, pt.y)));

// //     frame.drawContours([leftEyeHull], new cv.Vec3(0, 255, 0), 1);
// //     frame.drawContours([rightEyeHull], new cv.Vec3(0, 255, 0), 1);

// //     if (ear < earThreshold) {
// //       flag += 1;
// //       console.log(flag);
// //       if (flag >= frameCheck) {
// //         frame.putText('ALERT!', new cv.Point(10, 30), cv.FONT_HERSHEY_SIMPLEX, 0.7, new cv.Vec3(0, 0, 255), 2);
// //         frame.putText('ALERT!', new cv.Point(10, 325), cv.FONT_HERSHEY_SIMPLEX, 0.7, new cv.Vec3(0, 0, 255), 2);
// //         signal = false;
// //         // Play alert sound
// //       }
// //     } else {
// //       flag = 0;
// //     }
// //   }

// //   cv.imshow('Frame', frame);
// //   const keyPressed = cv.waitKey(1);
// //   if (keyPressed === 113) { // 'q' key
// //     signal = false;
// //   }

// //   if (signal) {
// //     detect();
// //   } else {
// //     videoCapture.release();
// //     cv.destroyAllWindows();
// //   }
// // };

// // app.listen(5000, () => {
// //   console.log('Server started on port 5000');
// // });
// // // import express from 'express';
// // // import * as faceapi from 'face-api.js';
// // // import mixer from 'mixer';
// // // require('coffee-script/register');



// // // mixer.init();
// // // mixer.music.load("music.wav");

// // // const thresh = 0.25;
// // // const frame_check = 20;

// // // const { eyeAspectRatio, stopDetection } = require('./utils');

// // // const app = express();
// // // app.use(express.json());

// // // const PORT = 3000;

// // // app.post('/start_detection', async (req, res) => {
// // //     await faceapi.nets.ssdMobilenetv1.loadFromDisk('weights');
// // //     await faceapi.nets.faceLandmark68Net.loadFromDisk('weights');

// // //     const videoCapture = new cv.VideoCapture(0);

// // //     grabFrames(videoCapture, 1, async (frame) => {
// // //         const canvas = faceapi.createCanvasFromMedia(frame);
// // //         const displaySize = { width: frame.cols, height: frame.rows };
// // //         faceapi.matchDimensions(canvas, displaySize);
// // //         const detections = await faceapi.detectAllFaces(frame).withFaceLandmarks();

// // //         detections.forEach(async detection => {
// // //             const landmarks = detection.landmarks;
// // //             const leftEye = landmarks.getLeftEye();
// // //             const rightEye = landmarks.getRightEye();

// // //             const leftEAR = eyeAspectRatio(leftEye);
// // //             const rightEAR = eyeAspectRatio(rightEye);
// // //             const ear = (leftEAR + rightEAR) / 2.0;

// // //             if (ear < thresh) {
// // //                 flag += 1;
// // //                 if (flag >= frame_check) {
// // //                     mixer.music.play();
// // //                     flag = 0;
// // //                 }
// // //             } else {
// // //                 flag = 0;
// // //             }
// // //         });

// // //         res.json({ message: 'Detection started' });
// // //     });
// // // });

// // // app.post('/stop_detection', (req, res) => {
// // //     stopDetection();
// // //     res.json({ message: 'Detection stopped' });
// // // });

// // // app.listen(PORT, () => {
// // //     console.log(`Server is running on port ${PORT}`);
// // // });



// // // // import express from 'express';
// // // // const app = express();
// // // // import cv from 'opencv4nodejs';
// // // // import { grabFrames } from 'opencv.js';
// // // // import dlib from 'dlib';
// // // // import mixer from 'mixer';


// // // // mixer.init();
// // // // mixer.music.load("music.wav");

// // // // const thresh = 0.25;
// // // // const frame_check = 20;

// // // // const detector = dlib.get_frontal_face_detector();
// // // // const predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat");

// // // // const { eyeAspectRatio, stopDetection } = require('./utils');

// // // // app.use(express.json());

// // // // const PORT = 3000;

// // // // app.post('/start_detection', (req, res) => {
// // // //     const videoCapture = new cv.VideoCapture(0);

// // // //     grabFrames(videoCapture, 1, (frame) => {
// // // //         const resizedFrame = frame.resize(450, 300);
// // // //         const grayFrame = resizedFrame.bgrToGray();

// // // //         const { faces } = detector.detectMultiScale(grayFrame);
// // // //         faces.forEach((faceRect) => {
// // // //             const shape = predictor(grayFrame, faceRect);
// // // //             const shapeArray = shape.parts().map(part => [part.x, part.y]);
// // // //             const leftEye = shapeArray.slice(36, 42);
// // // //             const rightEye = shapeArray.slice(42, 48);

// // // //             const leftEAR = eyeAspectRatio(leftEye);
// // // //             const rightEAR = eyeAspectRatio(rightEye);
// // // //             const ear = (leftEAR + rightEAR) / 2.0;

// // // //             if (ear < thresh) {
// // // //                 flag += 1;
// // // //                 if (flag >= frame_check) {
// // // //                     mixer.music.play();
// // // //                     flag = 0;
// // // //                 }
// // // //             } else {
// // // //                 flag = 0;
// // // //             }
// // // //         });
// // // //     });
    
// // // //     res.json({ message: 'Detection started' });
// // // // });

// // // // app.post('/stop_detection', (req, res) => {
// // // //     stopDetection();
// // // //     res.json({ message: 'Detection stopped' });
// // // // });

// // // // app.listen(PORT, () => {
// // // //     console.log(`Server is running on port ${PORT}`);
// // // // });

// // // // // import express from 'express';
// // // // // import axios from 'axios';

// // // // // const app = express();
// // // // // const PORT = process.env.PORT || 3000;

// // // // // app.post('/start_detection', async (req, res) => {
// // // // //     try {
// // // // //         await axios.post('http://localhost:5000/start_detection');
// // // // //         res.send('Blink detection started.');
// // // // //     } catch (error) {
// // // // //         console.error('Error starting detection:', error.message);
// // // // //         res.status(500).send('Error starting detection.');
// // // // //     }
// // // // // });

// // // // // app.post('/stop_detection', async (req, res) => {
// // // // //     try {
// // // // //         await axios.post('http://localhost:5000/stop_detection');
// // // // //         res.send('Blink detection stopped.');
// // // // //     } catch (error) {
// // // // //         console.error('Error stopping detection:', error.message);
// // // // //         res.status(500).send('Error stopping detection.');
// // // // //     }
// // // // // });

// // // // // app.listen(PORT, () => {
// // // // //     console.log(`Server is running on port ${PORT}`);
// // // // // });




// // // // // import { spawn } from 'child_process';
// // // // // import express from 'express';
// // // // // import jwt from 'jsonwebtoken';
// // // // // import bcrypt from 'bcrypt';
// // // // // import cors from 'cors';
// // // // // import cookieParser from 'cookie-parser';

// // // // // const app = express();
// // // // // app.use(express.json());
// // // // // app.use(cors());
// // // // // app.use(cookieParser());

// // // // // const PORT = process.env.PORT || 6500;

// // // // // app.post('/detect-blinks', async (req, res) => {
// // // // //     const pythonProcess = spawn('python', ['../flask-server/trial.py']);

// // // // //     pythonProcess.stdout.on('data', (data) => {
// // // // //         console.log(`stdout: ${data}`);
// // // // //     });

// // // // //     pythonProcess.stderr.on('data', (data) => {
// // // // //         console.error(`stderr: ${data}`);
// // // // //     });

// // // // //     pythonProcess.on('close', (code) => {
// // // // //         console.log(`child process exited with code ${code}`);
// // // // //     });

// // // // //     res.send('Blink detection started.');
// // // // // });

// // // // // // Your other routes and middleware go here...

// // // // // app.listen(PORT, () => {
// // // // //     console.log(`Server is running on port ${PORT}`);
// // // // // });
// // // // // import express from 'express';
// // // // // import mongoose from 'mongoose';
// // // // // import dotenv from 'dotenv';
// // // // // import bcrypt from 'bcrypt';
// // // // // import cors from 'cors';
// // // // // import cookieParser from 'cookie-parser';
// // // // // import UserModel from './model/User.js';
// // // // // const app = express();
// // // // // dotenv.config();
// // // // // mongoose.connect(process.env.MONGO_URL);
// // // // // app.use(express.json());
// // // // // app.use(cors());
// // // // // app.use(cookieParser());

// // // // // const PORT = process.env.PORT || 6500;
// // // // // app.post('/register', async (req, res) => {
// // // // //     const { name, email, password } = req.body;
// // // // //     bcrypt.hash(password, 10)
// // // // //     .then((hash) => {
// // // // //         UserModel.create({ name, email, password: hash })
// // // // //         .then((user) => {
// // // // //             res.send(user);
// // // // //         })
// // // // //         .catch((err) => {
// // // // //             res.status(500).send('User already exists');
// // // // //         });
// // // // //     })
// // // // //     .catch((err) => {
// // // // //         res.status(500).send('Error');
// // // // //     });
   
// // // // // });
// // // // // // app.post('/login', async (req, res) => {
// // // // // //     const { email, password } = req.body;
// // // // // //     UserModel.findOne({ email: email })
// // // // // //         .then(user=>{
// // // // // //             if(user){
// // // // // //                 if(user.password===password){
// // // // // //                     res.json('Success');
// // // // // //                 }else{
// // // // // //                     res.json('Wrong password');
// // // // // //                 }
// // // // // //             }else{
// // // // // //                 res.json('User does not exist');
// // // // // //             }
// // // // // //         }
        
// // // // // //         )
// // // // // // });
// // // // // app.post('/login', async (req, res) => {
// // // // //     const { email, password } = req.body;
// // // // //     UserModel.findOne({ email: email })
// // // // //         .then(user=>{
// // // // //             if(user){
// // // // //                 bcrypt.compare(password, user.password)
// // // // //                     .then(match => {
// // // // //                         if(match){
// // // // //                             res.json('Success');
// // // // //                         } else {
// // // // //                             res.json('Wrong password');
// // // // //                         }
// // // // //                     })
// // // // //                     .catch(err => {
// // // // //                         res.status(500).send('Error');
// // // // //                     });
// // // // //             } else {
// // // // //                 res.json('User does not exist');
// // // // //             }
// // // // //         })
// // // // //         .catch(err => {
// // // // //             res.status(500).send('Error');
// // // // //         });
// // // // // });
// // // // // app.listen(PORT, () => {
// // // // //     console.log(`Server is running on port ${PORT}`);
// // // // // });
