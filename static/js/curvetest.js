

const scrollsource = document.querySelector(".scrollsource")

// Function to calculate a point on a curve given an origin, radius, and angle
function calculatePointOnCurve(originX, originY, radius, angleInDegrees) {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    return {
        x: originX + Math.cos(angleInRadians) * radius,
        y: originY + Math.sin(angleInRadians) * radius
    };
}

// Function to generate an array of points along a curved path
// originX, originY: The origin of the curve
// radius: The radius of the curve
// startAngle, endAngle: The starting and ending angles of the curve in degrees
// steps: The number of points to generate along the curve
const radius = 100 
function generateCurvedPathPoints(originX, originY, radius, startAngle, endAngle, steps) {
    const points = [];
    const angleStep = (endAngle - startAngle) / steps;

    for (let i = 0; i <= steps; i++) {
        const angle = startAngle + (angleStep * i);
        points.push(calculatePointOnCurve(originX, originY, radius, angle));
    }

    return points;
}

// Example usage to generate points
let curvePoints = generateCurvedPathPoints(1000, 1000, radius, -90, 360, 1000);

// Integrating generated points into the plasmidMoving animation
let plasmidMoving = curvePoints.map((point, index) => ({
    top: `${point.y}px`,
    left: `${point.x}px`,
    offset: index / curvePoints.length // Adjust as needed for smooth animation
}));
console.log(plasmidMoving)
// connecting the ScrollTimeline to the plasmid 
const plasmidTiming = {
    fill: 'both',
    timeline: new ViewTimeline({
        subject: scrollsource,
        axis: 'block',
    }),
    rangeStart: '50%',
    rangeEnd: '60%'
};

// Update the animate call as needed with the new plasmidMoving array
document.getElementById("plasmid").animate(plasmidMoving, plasmidTiming);















/* Path made curvy by easing the transform
const plasmidMoving = [
    { 
        top: `${start_y}px`, 
        left: `${start_x}px`, offset: 0.0,
    },

// first curve
    { 
        top: `${centered_coordinates[0].y -100}px`, 
        left: `${start_x}px`, offset: 0.02,
        transform: 'scale(1)'
    },

    { 
        top: `${centered_coordinates[0].y}px`, 
        left: `${centered_coordinates[0].x}px`, offset: 0.05,
        transform: 'scale(3)'
    },

    { 
        top: `${centered_coordinates[0].y}px`, 
        left: `${centered_coordinates[1].x-100}px`, offset: 0.1,
        transform: 'scale(1) translateY(10em)',
        easing: 'cubic-bezier(1,0,.57,.57)',
    }, 
    
    { 
        top: `${centered_coordinates[0].y +100}px`, 
        left: `${centered_coordinates[1].x-100}px`, offset: 0.2,
        transform: 'scale(1) translateX(100px)',
        easing: 'cubic-bezier(1,0,.57,.57)',
    },
    { 
        top: `${centered_coordinates[2].y}px`, 
        left: `${centered_coordinates[3].x}px`, offset: 0.3},
    { 
        top: `${centered_coordinates[4].y}px`, 
        left: `${centered_coordinates[3].x}px`, offset: 0.4},
    {
        top: `${centered_coordinates[4].y}px`, 
        left: `${centered_coordinates[4].x}px`, offset: 0.5},
    {
        top: `${centered_coordinates[5].y}px`, 
        left: `${centered_coordinates[5].x}px`, offset: 0.6},
]; */