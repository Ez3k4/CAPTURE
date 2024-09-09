
// polyfill
import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';
//import 'https://2024.igem.wiki/freiburg/js/polyfill/polyfill_scroll.js'
//import '../js/polyfill/polyfill_scroll.js'

// write hover over html function to log xy pos of mouse cursor


const plasmid = document.getElementById("plasmid");
let rect_plasmid = plasmid.getBoundingClientRect();
const start_div = document.querySelector(".startpoint");
let rect_start_div = start_div.getBoundingClientRect();

console.log("Plasmid x:", rect_plasmid.x, "Plasmid y:", rect_plasmid.y);
console.log("Start Div x:", rect_start_div.x, "Start Div y:", rect_start_div.y);
const start_x = rect_start_div.width/2 - rect_plasmid.width/2;
const start_y = rect_start_div.height/2 -rect_plasmid.height/2;
console.log("Start X: " + start_x, "Start Y: " + start_y)

// gets each element with the id and returns the positions of it in an array of ClientRect objects
function get_class_positions(class_name) {
    const positions = [];
    const elements = document.querySelectorAll(class_name);
    for (var i = 0; i < elements.length; i++) {
        var element_position = elements[i].getBoundingClientRect();
        positions.push(element_position);
    }
    return positions;
}
const class_DOMrect = get_class_positions(".anchor")
//console.log(class_DOMrect)

// calculates the coordinates needed to draw object centered in relation to its parent div (=> startpoint div)
// this could be solved different
function get_element_center(elements, object) {
    const elements_xy = []
    for (var i = 0; i < elements.length; i++) {
        var element_x = (elements[i].x + elements[i].width / 2 - object.width / 2) - rect_start_div.x;
        var element_y = (elements[i].y + elements[i].height / 2 - object.height / 2) - rect_start_div.y;
        elements_xy.push({x: element_x, y: element_y});
    }
    return elements_xy
}
const centered_coordinates = get_element_center(class_DOMrect, plasmid)
console.log("centered coordinates")
console.log(centered_coordinates)

const radius = 100

// funtions for curved segments
// Function to calculate a point on a curve given an origin, radius, and angle
function calculatePointOnCurve(originX, originY, radius, angleInDegrees) {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    return {
        x: originX + Math.cos(angleInRadians) * radius,
        y: originY + Math.sin(angleInRadians) * radius
    };
}

/* // Function to generate an array of points along a curved path
// originX, originY: The origin of the curve
// radius: The radius of the curve
// startAngle, endAngle: The starting and ending angles of the curve in degrees
// steps: The number of points to generate along the curve */
function generateCurvedPathPoints(originX, originY, radius, startAngle, endAngle, steps) {
    const points = [];
    const angleStep = (endAngle - startAngle) / steps;

    for (let i = 0; i <= steps; i++) {
        const angle = startAngle + (angleStep * i);
        points.push(calculatePointOnCurve(originX, originY, radius, angle));
    }

    return points;
}
// ---> returns array of points

/* let firstCurvePoints = generateCurvedPathPoints(start_x + radius, centered_coordinates[0].y - radius, radius, -180, -270, 9)
console.log(firstCurvePoints)
let firstCurvePoint = firstCurvePoints.map((point, index, offset) => ({
    top: `${point.y}px`,
    left: `${point.x}px`,
    offset: offset + (index / firstCurvePoints.length) // Adjust as needed for smooth animation
}));
console.log(firstCurvePoint)
 */
//creating the path for the plasmid 
//top = y , left = x

const plasmidMoving = [
    { 
        top: `${start_y}px`, 
        left: `${start_x}px`, offset: 0.0,
    },

    { 
        top: `${centered_coordinates[0].y}px`, 
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
        left: `${centered_coordinates[1].x}px`, offset: 0.1,
        transform: 'scale(1)',
    }, 

    { 
        top: `${centered_coordinates[2].y}px`, 
        left: `${centered_coordinates[1].x}px`, offset: 0.2,
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
];
console.log(plasmidMoving)

/* // creating a ScrollTimeline that can be used instead of a set Timeline
//--> how can i set it to the scrollbox element? Maybe by changing CSSUnitValue
const myScrollTimeline = new ScrollTimeline({
    source: document.scrollingElement,
    orientation: 'vertical',
    scrollOffsets: [
    new CSSUnitValue(0, 'percent'),
    new CSSUnitValue(100, 'percent'),
    ],
});
console.log(myScrollTimeline) */
const scrollsource = document.querySelector(".scrollsource")
/* const myViewTimeLine = new ViewTimeLine({
    subject: scrollsource,
    axis: 'block',
}) */

// connecting the ScrollTimeline to the plasmid 
const plasmidTiming = {
    fill: 'both',
    timeline: new ViewTimeline({
        subject: scrollsource,
        axis: 'block',
    }),
    rangeStart: '40%',
    rangeEnd: '100%'
};

// creating the animation for the plasmid by giving animate the path and the timeline 
document.getElementById("plasmid").animate(plasmidMoving, plasmidTiming);
console.log("Animation started");

window.addEventListener("scroll", () => {
    //console.log("Plasmid x:", plasmid.x, "Plasmid y:", plasmid.y);
    //console.log(myScrollTimeline.currentTime.value)
});

function curved_path (radius) {}
