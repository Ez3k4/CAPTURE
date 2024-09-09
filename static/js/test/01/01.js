   
document.addEventListener('DOMContentLoaded', function() {   
    // ----------------- Objects -------------------
     const plasmid_container = document.querySelector(".plasmid_container");
     let DOM_plasmid_container = plasmid_container.getBoundingClientRect();
 
     const drop_container = document.querySelector(".drop_container");
     let DOM_drop_container = drop_container.getBoundingClientRect();
 
     const lipid_container = document.getElementById("lipid-container")
     let DOM_lipid_container = lipid_container.getBoundingClientRect();
 
     const scrollsource = document.querySelector(".scrollsource");
     let DOM_scrollsource = scrollsource.getBoundingClientRect();
 
     // ------------------ Important points -------------------
     const startpoint = {x: DOM_plasmid_container.x + (DOM_plasmid_container.width/2), y: DOM_plasmid_container.y + (DOM_plasmid_container.height/2)}
 
     const drop_center = {x: DOM_drop_container.x + (DOM_drop_container.width/2), y: DOM_drop_container.y + (DOM_drop_container.height/2)}
 
     const liposome_center = {x: DOM_lipid_container.x + (DOM_lipid_container.width/2), y: DOM_lipid_container.y + (DOM_lipid_container.height/2)}
 
    // gets each element with the id and returns the positions of it in an array of ClientRect objects
    function get_class_positions(class_name, startpoint) {
        const positions = [];
        const elements = document.querySelectorAll(class_name);
        for (let i = 0; i < elements.length; i++) {
            let element_x = elements[i].getBoundingClientRect().x - startpoint.x;
            let element_y = elements[i].getBoundingClientRect().y -startpoint.y;
            positions.push({x: element_x, y: element_y});
        }
        return positions;
    }
    const anchor = get_class_positions(".anchor", startpoint)
    console.table(anchor)
  
    const anchor_liposome = get_class_positions(".anchor", liposome_center)
    
    //create access point and import relevant packages
     gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
     //get dom element by class or id 
     function DOM_xy (identifier) {
         const element = document.querySelector(identifier);
         const rect = element.getBoundingClientRect();
         return {x: rect.x, y: rect.y}
     }
 
     /* // variables to set start and end for scrolltimeline
     let plasmid_start_trigger = DOM_plasmid_container.y - DOM_scrollsource.y
     let plasmid_end_trigger = DOM_drop_container.y - DOM_scrollsource.y + DOM_drop_container.height/2
     */
 
     //create a timeline object
     let tl_plasmid = gsap.timeline({
             onUpdate: () => {
                 //console.log(getCurrentPath('path.path1')),
                 position_elements('path.path1', bilipid_elements)
         },
 /*         //connect the timeline to scrolltrigger instead of duration in s
         scrollTrigger: {
             trigger: ".scrollsource", // selector or element 
             start: "40% 30%", // [trigger]=animated element, [scroller]=viewport
             end: "70% 30%",
             scrub: 1, // Add scrub to control the animation progress on scroll
             markers: true, // Add markers 
         }, */
     })
 
     // -------------- plasmid path ---------------
     // it assumes startpoint is {0/0} so its necessary to substract the starting coordinates from all other coordinates --> this can be changed saw something somewhere in the GSAP docs
     const plasmidPath1 = [
         {x: 0, y:0},
         {x: 0, y: anchor[0].y},
         {x: anchor[0].x, y: anchor[0].y}
     ]
     // scale 3
     const plasmidPath2 = [
         {x: anchor[1].x, y: anchor[0].y},
         {x: anchor[1].x, y: anchor[1].y},
     ]
     // scale 1
     const plasmidPath3 = [
         {x: anchor[1].x, y: anchor[2].y},
         {x: anchor[2].x, y: anchor[2].y},
     ]
     // move in drop
     const plasmidPath4 = [
         {x: anchor[3].x, y: anchor[2].y},
         {x: anchor[3].x, y: anchor[3].y},
     ]
     // drop opacity 1
     //before bilipid
     const plasmidPath5 = [
         {x: anchor[3].x, y: anchor[4].y},
         {x: anchor[4].x, y: anchor[4].y},
     ]
     //drop opacity 0
     //after bilipid
 
     // ---------------- liposome path ------------------
 
     const liposomePath1 = [
        {x: 0, y: 0}
    ]
    
    const liposomePath2 = [
        {x: anchor_liposome[1].x, y: anchor_liposome[1].y},
        {x: anchor_liposome[1].x, y: anchor_liposome[2].y},
        {x: anchor_liposome[2].x, y: anchor_liposome[2].y},
    ]
    
     // -------------- PLASMID ANIMATION ---------------
     // Animate the plasmid along the plasmidMoving path
     tl_plasmid.to(".plasmid_container", {
             motionPath: {
                 path: plasmidPath1,
                 curviness: 0.5,
                 alignOrigin: [0.5, 1]
             },
             scale: 1,
             ease: "linear",
             duration: 1,
         })
   //1
         .to(".plasmid_container", {
             motionPath: {
                 path: plasmidPath2,
                 curviness: 0.5,
                 alignOrigin: [0.5, 1]
             },
             scale: 1,
             ease: "linear",
             duration: 1,
         })
   //2
         .to(".plasmid_container", {
             motionPath: {
                 path: plasmidPath3,
                 curviness: 0.5,
                 alignOrigin: [0.5, 1]
             },
             scale: 1,
             ease: "linear",
             duration: 1,
         })
   //3
         .to(".plasmid_container", {
             motionPath: {
                 path: plasmidPath4,
                 curviness: 0.5,
                 alignOrigin: [0.5, 1]
             },
             scale: 1,
             ease: "linear",
             duration: 1,
         })
   //4
         .to(".plasmid_container", {
             motionPath: {
                 path: plasmidPath5,
                 curviness: 0.5,
                 alignOrigin: [0.5, 1]
             },
             scale: 1,
             ease: "linear",
             duration: 1,
         })
   //5
 
 
 
     // -------------- DROP ANIMATION ---------------
 /*     // inserted drop tween 
     tl_plasmid.to(".drop_container", {
             motionPath: {
             path: dropPath1,
                 curviness: 0.5,
                 alignOrigin: [0.5, 1] 
             },
             ease: "linear",
             opacity: 0,
         }, "inDrop") //starts when inDrop label is reached by plasmid
 
         .to(".drop_container", {
             motionPath: {
             path: dropPath2,
                 curviness: 0.5,
                 alignOrigin: [0.5, 1] 
             },
             ease: "linear",
             opacity: 0,
         }, "dropVisible") //starts when drop has opacity 1, then turn opacity to 0  */
 
     // ------------------- SVG functions ----------------------
 
     /* 1. getRawPathData
     2. getRawPathDataset
     3. repositionRawPath
     4. resizeRawPath
     5. adjustPath
     6. adjustPathDataset */
 
     const pathElement = document.querySelector('path.path1');
     const DOM_pathElement = pathElement.getBoundingClientRect()
     // extracts "d" attribute from given path class (has to be in quotes and path.path.class) and converts it to raw path array
     function getRawPath(pathSelector) {
         // Validate pathSelector
         if (typeof pathSelector !== 'string') {
             throw new Error(`Invalid pathSelector: ${pathSelector}. It must be a string.`);
         }
 
         // gets path element by special class name path1
         const pathElement = document.querySelector(pathSelector);
         if (!pathElement) {
             throw new Error(`No element found for selector: ${pathSelector}`);
         }
         //console.log("getRawPathData path element", pathElement); 
 
         // Original SVG path string
         let originalPathString = pathElement.getAttribute('d');
         //console.log(originalPathString); 
 
         // Convert to raw path data
         let rawPathData = MotionPathPlugin.stringToRawPath(originalPathString); 
         //console.log(rawPathData)
         return rawPathData
     }
 
     // extracts "dataset" attribute from given path class (has to be in quotes and path.path.class) and converts it to raw path array
     function getRawPathDataset(pathSelector, dataset) {
         // Validate pathSelector
         if (typeof pathSelector !== 'string') {
             throw new Error(`Invalid pathSelector: ${pathSelector}. It must be a string.`);
         }
         // gets path element by special class name path1
         const pathElement = document.querySelector(pathSelector);
         if (!pathElement) {
             throw new Error(`No element found for selector: ${pathSelector}`);
         }
         //console.log("getRawPathData path element", pathElement); 
 
         // Original SVG path string
         let originalDataset = pathElement.dataset[dataset];
         //console.log(originalDataset); 
 
         // Convert to raw path data
         let rawPathData = MotionPathPlugin.stringToRawPath(originalDataset); 
         //console.log(rawPathData)
         return rawPathData
     }
 
     // repositions raw path according to given x y values
     function repositionRawPath(rawPathData, dist_x = 0, dist_y = 0) {
         // Adjust x-coordinates
         rawPathData.forEach(subArray => {
             for (let j = 0; j < subArray.length; j += 2) {
                 subArray[j] += dist_x;
             }
         });
 
         // Adjust y-coordinates
         rawPathData.forEach(subArray => {
             for (let i = 1; i < subArray.length; i += 2) {
                 subArray[i] += dist_y;
             }
         });
 
         return rawPathData;
     }
 
     // scales Path x y coordinates according to the factors
     function resizeRawPath(rawPathData, factor_x = 1, factor_y = 1){
         // Adjust x-coordinates
         rawPathData.forEach(subArray => {
             for (let j = 0; j < subArray.length; j += 2) {
                 subArray[j] *= factor_x;
             }
         });
 
         // Adjust y-coordinates
         rawPathData.forEach(subArray => {
             for (let i = 1; i < subArray.length; i += 2) {
                 subArray[i] *= factor_y;
             }
         });
 
         return rawPathData;
     }
 
     function adjustPath(pathSelector, dist_x = 0, dist_y = 0, factor_x = 1, factor_y = 1) {
         let rawPath = getRawPath(pathSelector)
         //console.log(rawPath)
         let repositionedRawPath = repositionRawPath(rawPath, dist_x, dist_y)
         //console.log(repositionedRawPath)
         let resized_repositioned_RawPath = resizeRawPath(repositionedRawPath, factor_x, factor_y)
         //console.log(resized_repositioned_RawPath)
         let adjustedPath = MotionPathPlugin.rawPathToString(resized_repositioned_RawPath)
         document.querySelector(pathSelector).setAttribute('d', adjustedPath);
     }
     adjustPath('path.path1', 0, -60)
 
     function adjustPathDataset(pathSelector, dataset, dist_x = 0, dist_y = 0, factor_x = 1, factor_y = 1) {
         // Get the raw path dataset
         let rawPathDataset = getRawPathDataset(pathSelector, dataset);
         //console.log('Raw Path Dataset:', rawPathDataset);
 
         // Reposition the raw path dataset
         let repositionedRawPathDataset = repositionRawPath(rawPathDataset, dist_x, dist_y);
         //console.log('Repositioned Raw Path Dataset:', repositionedRawPathDataset);
 
         // Resize the repositioned raw path dataset
         let resized_repositioned_RawPathDataset = resizeRawPath(repositionedRawPathDataset, factor_x, factor_y);
         //console.log('Resized and Repositioned Raw Path Dataset:', resized_repositioned_RawPathDataset);
 
         // Convert the raw path dataset to a string
         let adjustedPathDataset = MotionPathPlugin.rawPathToString(resized_repositioned_RawPathDataset);
         //console.log('Adjusted Path:', adjustedPathDataset);
 
         // Remove the 'z' command from the adjusted path dataset
         adjustedPathDataset = adjustedPathDataset.replace(/z/gi, '');
         //console.log('Adjusted Path without z:', adjustedPathDataset);
 
         // Update the dataset attribute on the selected element
         let pathElement = document.querySelector(pathSelector);
         if (pathElement) {
             pathElement.dataset[dataset] = adjustedPathDataset;
             //console.log(`Updated dataset[${dataset}] on element ${pathSelector}:`, pathElement.dataset[dataset]);
         } else {
             //console.error(`Element with selector ${pathSelector} not found.`);
         }
     }
     adjustPathDataset('path.path1', 'pathTo', 0, -60)
 
 
     // --------------- LIPOSOME ANIMATION ------------------
 
     // Retrieve the updated dataset value
     let pathTo = pathElement.dataset.pathTo;
     //console.log("Path To", pathTo)
 

     tl_plasmid.to(".path1", {
        motionPath: {
            path: liposomePath1,
                curviness: 0.5,
                alignOrigin: [0.5, 1],
                fromCurrent: false
            },
            ease: "linear",
            attr: { d: pathTo },
            duration: 0.22
        }, 1.9)
  
     tl_plasmid.to(".svg-container", {
       motionPath: {
         path: liposomePath2,
         curviness: 0.5,
         alignOrigin: [0.5, 1],
         fromCurrent: true
       },
       ease: "linear",
       duration: 0.88,
     }, 2.12) 
 
     // ------------------ Position elements on SVG ------------------------
 
     // Function to get the current path data of an element with path by its path-classname
     // !!! path_class needs to be quotated!!!
     function getCurrentPath(path_class) {
         return document.querySelector(path_class);
     }
 
     function position_elements(path_class, elements){
         let current_path = getCurrentPath(path_class)
         let pathLength = current_path.getTotalLength();
 
         
         elements.forEach((element, index) => {
             const position = current_path.getPointAtLength((index + 1) * pathLength / (elements.length + 1));
 
             element.style.left = (position.x) + 'px';
             element.style.top = (position.y) + 'px';
         });
     }
 
     /* document.addEventListener('DOMContentLoaded', function() {
         position_elements('bilipid', 'path.path1');
     });
     */
 
     window.addEventListener("scroll", () => {
     /*     let plasmid = document.getElementById("plasmid");
         let DOM_plasmid = plasmid.getBoundingClientRect();
         // console.log("Plasmid x:", rect_plasmid.x, "Plasmid y:", rect_plasmid.y);
         let plasmid_center = {x: DOM_plasmid.x + DOM_plasmid.width/2, y: DOM_plasmid.y + DOM_plasmid.height/2}
         console.log("Plasmid center: ", plasmid_center) */
     })
 
     // ----------------------- Init Lipids --------------------
 
     // can be used to init for example Bilipid svgs
     class MyComponent {
         constructor(template, className, Id) {
             this.template = template;
             this.className = className;
             
             // adds the div element type to the Component instance
             this.element = document.createElement('div');
             // adds the class name to the component (--> here chosen to be a div)
             this.element.className = className;
             // adds id to the component (--> here chosen to be a div)
             this.element.id = Id;
             // inserts the template as inner value of the component (--> here chosen to be a div)
             this.element.innerHTML = template;
         }
     }
     
     // function to create myCompund instances as img/svgs, pass all arguments as strings
     function fill_container_with_ClassInstances(container_id, image_source, instance_name, div_class, number){
         // select container to fill over class name
         const container = document.getElementById(container_id);
         // create loop for number of instances
         for (let i = 0; i < number; i++) {
         // create instance by using the fukkking constructor and giving him arguments from function
         // process source arg to image
         const template = `<img src=${image_source}>`
         const IdName = `${instance_name}_${i}`;
         const component = new MyComponent(template, div_class, IdName)
         
         container.appendChild(component.element);
         }
     }
 
     fill_container_with_ClassInstances("svg-1", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid", "bilipid", 35);
     let bilipid_elements = document.querySelectorAll('.bilipid');
     position_elements('path.path1', bilipid_elements);
   
   
   
 // Add GSAP DevTools for the timeline
 //GSDevTools.create({ animation: tl_plasmid });
 });
 