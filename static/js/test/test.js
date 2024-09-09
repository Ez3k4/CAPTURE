// Register the plugins
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const bluePath1 = [
    {x: 400, y: 0},
    {x: 400, y: 200},
    {x: 200, y: 200},
    {x: 200, y: 400},
    {x: 100, y: 700}
];

const yellowPath = [
    {x: 0, y: 100},
    {x: -100, y: 400}
];


let tl_blue = gsap.timeline({
    // Connect the timeline to ScrollTrigger instead of duration in seconds
    scrollTrigger: {
        trigger: "body", // Selector or element 
        start: "top top", // [trigger]=animated element, [scroller]=viewport
        end: "center 70%",
        scrub: 1, // Add scrub to control the animation progress on scroll
        markers: true, // Add markers 
    },
    immediateRender: true,
});

tl_blue.to("#obj1", {
    motionPath: {
        path: bluePath1,
        curviness: 0,
        ease: "none",
    },
    duration: 100,
}),
tl_blue.fromTo("#obj1", {
    scale: 3
},
{
    scale: 1,
    duration: 30
}, 0)


/* let tl_yellow = gsap.timeline({
    // Connect the timeline to ScrollTrigger instead of duration in seconds
    scrollTrigger: {
        trigger: "body", // Selector or element 
        start: "top top", // [trigger]=animated element, [scroller]=viewport
        end: "center 70%",
        scrub: 1, // Add scrub to control the animation progress on scroll
        markers: {
            startColor: "blue", // Change start marker color
            endColor: "red", // Change end marker color
        },
    },
    immediateRender: true,
}); */

tl_blue.to("#obj2", {
    motionPath: {
        path: bluePath1,
        start: 0.7,
        curviness: 0,
        ease: "none",
    },
    duration: 50,
}, 70);