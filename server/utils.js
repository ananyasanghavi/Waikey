const distance = require('scipy.spatial').distance;

const eyeAspectRatio = (eye) => {
    const A = distance.euclidean(eye[1], eye[5]);
    const B = distance.euclidean(eye[2], eye[4]);
    const C = distance.euclidean(eye[0], eye[3]);
    const ear = (A + B) / (2.0 * C);
    return ear;
};

const stopDetection = () => {
    console.log("Detection stopped");
    // Implement logic to stop detection
};

module.exports = { eyeAspectRatio, stopDetection };