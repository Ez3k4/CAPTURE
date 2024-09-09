   
document.addEventListener('DOMContentLoaded', function() {   
    // Function to initialize elements and animations
    function initialize() {

        //get dom element by class or id 
        function DOM (identifier) {
            const element = document.querySelector(identifier);
            const rect = element.getBoundingClientRect();
            return rect
        }
        
        // ----------------- Objects -------------------
        const plasmid_container = document.querySelector(".plasmid_container");
        let DOM_plasmid_container = plasmid_container.getBoundingClientRect();
    
        const svg_container = document.querySelector(".svg-container");

        const lipid_container = document.getElementById("lipid-container")
        let DOM_lipid_container = lipid_container.getBoundingClientRect();
    
        const scrollsource = document.querySelector(".scrollsource");
        let DOM_scrollsource = scrollsource.getBoundingClientRect();
    
        // ------------------ Important points -------------------
        const startpoint = {x: DOM_plasmid_container.x + (DOM_plasmid_container.width/2), y: DOM_plasmid_container.y + (DOM_plasmid_container.height/2)}
    
        const liposome_center = {x: DOM_lipid_container.x + (DOM_lipid_container.width/2), y: DOM_lipid_container.y + (DOM_lipid_container.height/2)}
    
        const bakterium_container = DOM(".bakterium-container")
        const bakterium_center = {x: bakterium_container.x + (bakterium_container.width/2), y: bakterium_container.y + (bakterium_container.height/2)}
        
        const scale_factor = 4

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
    
        const anchor_liposome = get_class_positions(".anchor", liposome_center) 
        const anchor_bakterium = get_class_positions(".anchor", bakterium_center)    

        // Get the viewport height
        const viewportHeight = window.innerHeight;
        console.log(viewportHeight)
        // Define variables for start and end triggers
        let plasmid_start_trigger;
        let plasmid_end_trigger;
        
        // Get the last element with the class "anchor"
        const last_anchor_element = document.querySelectorAll(".anchor");
        const last_anchor_position = last_anchor_element[last_anchor_element.length - 1].getBoundingClientRect();
        
        // Set triggers based on viewport height
        if (viewportHeight <= 650) {
            // For small screens
            plasmid_start_trigger = DOM_plasmid_container.y - DOM_scrollsource.y - 150; // Example adjustment
            plasmid_end_trigger = last_anchor_position.top - DOM_scrollsource.top + 150; // Example adjustment
            scroller_start_trigger = "0%";
            zoom_origin = "15% 70%";
        } else if (viewportHeight <= 900) {
            // For medium screens
            plasmid_start_trigger = DOM_plasmid_container.y - DOM_scrollsource.y - 150; // Example adjustment
            plasmid_end_trigger = last_anchor_position.top - DOM_scrollsource.top ; // Example adjustment
            scroller_start_trigger = "0%"; // Default value if not specified
            zoom_origin = "15% 75%"; // Default value if not specified
        } else {
            // For large screens
            plasmid_start_trigger = DOM_plasmid_container.y - DOM_scrollsource.y - 150; // Example adjustment
            plasmid_end_trigger = last_anchor_position.top - DOM_scrollsource.top - 300; // Example adjustment
            scroller_start_trigger = "0%"; // Default value if not specified
            zoom_origin = "15% 82%";
        }

        // Debouncung throttling for improved performance
        function debounce(func, wait) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }

        // Debounce the position_elements function to run at most once every 100ms
        const debouncedPositionElements = debounce(() => {
            position_elements('path.path1', bilipid_elements);
        }, 10);




        // Log the triggers for debugging
        console.log('Start Trigger:', plasmid_start_trigger);
        console.log('End Trigger:', plasmid_end_trigger);

        // enables matching animation to windowsize
        let mm = gsap.matchMedia();
        
        //create a timeline object
        let tl_plasmid = gsap.timeline({
                onUpdate: debouncedPositionElements,    
            //connect the timeline to scrolltrigger instead of duration in s
            scrollTrigger: {
                trigger: ".scrollsource", // selector or element 
                start: `${plasmid_start_trigger}px ${scroller_start_trigger}px`, // [trigger]=animated element, [scroller]=viewport
                end: `${plasmid_end_trigger}px bottom`,
                scrub: 1, // Add scrub to control the animation progress on scroll
                //markers: true, // Add markers 
            }, 
        })        

        function sync_move(fromElement, toElement, origin=[0,0],x_offset=0, y_offset=0){
          const p = MotionPathPlugin.getRelativePosition(fromElement, toElement, origin)
          gsap.set(fromElement, {
            x: "+=" + (p.x + x_offset),
            y: "+=" + (p.y + y_offset),
          })
        }

        // ---------------- points for sync_move -------------------
        //plasmid_container
        //svg_container
        const lung4 = document.querySelector(".lung4")
        const lung5 = document.querySelector(".lung5")
    
        // -------------- plasmid path ---------------
        // it assumes startpoint is {0/0} so its necessary to substract the starting coordinates from all other coordinates --> this can be changed saw something somewhere in the GSAP docs
        const plasmidPath1 = [
            {x: 0, y:0},
            {x: 0, y: anchor[0].y},
            {x: anchor[0].x, y: anchor[0].y}
        ]
        const plasmidPath2 = [
            {x: anchor[1].x, y: anchor[0].y},
            {x: anchor[1].x, y: anchor[1].y},
        ]
        const plasmidPath3 = [
            {x: anchor[1].x, y: anchor[2].y},
            {x: anchor[2].x, y: anchor[2].y},
        ]
        const plasmidPath4 = [
            {x: anchor[3].x, y: anchor[2].y},
            {x: anchor[3].x, y: anchor[3].y},
        ]
        const plasmidPath5 = [
            {x: anchor[3].x, y: anchor[4].y},
            {x: anchor[4].x, y: anchor[4].y},
        ]
        const plasmidPath6= [
            {x: anchor[4].x, y: anchor[4].y + 2},
            {x: anchor[5].x, y: anchor[5].y + 2},
        ]
        const plasmidPath7= [
            {x: anchor[6].x, y: anchor[6].y +2},
        ]
        const plasmidPath8= [
          {x: anchor[7].x, y: anchor[7].y +2},
        ]
    
        // ---------------- liposome path ------------------
 
        const liposomePath1 = [
            {x: 0, y: 0}
        ]
        const liposomePath2 = [
            {x: anchor_liposome[1].x -7, y: anchor_liposome[2].y -45},
            {x: anchor_liposome[2].x -7, y: anchor_liposome[2].y -45},
        ]
        const liposomePath3 = [
            {x: anchor_liposome[3].x -7, y: anchor_liposome[2].y -45},
            {x: anchor_liposome[3].x -7, y: anchor_liposome[3].y -45},
        ]
        const liposomePath4 = [
            {x: anchor_liposome[3].x -5, y: anchor_liposome[4].y -45},
            {x: anchor_liposome[4].x -5, y: anchor_liposome[4].y -45},
        ]
        const liposomePath5= [
            {x: anchor_liposome[4].x -5, y: anchor_liposome[4].y -45},
            {x: anchor_liposome[5].x -5, y: anchor_liposome[5].y -45},
        ]
        const liposomePath6= [
            {x: anchor_liposome[6].x -5, y: anchor_liposome[6].y -45},
        ]
        const liposomePath7= [
          {x: anchor_liposome[7].x -5, y: anchor_liposome[7].y -45},
        ]

        // ----------------Lung/bakterium path -----------------------

        const bakterium_path1= [
            {x: anchor_bakterium[11].x, y: anchor_bakterium[11].y +2},
        ] 
        const bakterium_path2= [
          {x: anchor_bakterium[12].x, y: anchor_bakterium[12].y +2},
        ] 

        // -------------- PLASMID ANIMATION ---------------
        // Animate the plasmid along the plasmidMoving path

        mm.add("(min-width: 1001px)", () => {

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
        tl_plasmid.fromTo(".plasmid_container", {
            scale: 2
        }, {
            scale: 1,
            duration: 1
        }, 0)
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
        .to(".plasmid_container", {
            motionPath: {
                path: plasmidPath6,
                curviness: 0.5,
                alignOrigin: [0.5, 1]
            },
            scale: 0.2,
            ease: "linear",
            duration: 1.5,
        })
        //6.5
        .to(".plasmid_container", {
            motionPath: {
                path: plasmidPath7,
                curviness: 0.5,
                alignOrigin: [0.5, 1]
            },
            scale: 0.2,
            ease: "linear",
            duration: 1.5,
        })
        //8
        .to(".plasmid_container", {
            motionPath: {
                path: plasmidPath8,
                curviness: 0.5,
                alignOrigin: [0.5, 1]
            },
            scale: 0.2,
            ease: "linear",
            duration: 1.5,
        })
    })
        //9.5     // ------------------- SVG functions ----------------------
    
        /* 1. getRawPathData
        2. getRawPathDataset
        3. repositionRawPath
        4. resizeRawPath
        5. adjustPath
        6. adjustPathDataset */
    
        const pathElement = document.querySelector('path.path1');
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
        adjustPath('path.path1', 0, 0)
    
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
        adjustPathDataset('path.path1', 'pathTo', 0, 0)
    // --------------- LIPOSOME ANIMATION ------------------

    // Retrieve the updated dataset value
    let pathTo = pathElement.dataset.pathTo;
    const pathOrigin = pathElement.getAttribute('data-path-origin');

    mm.add("(min-width: 1001px)", () => {

    //1.9
    tl_plasmid.to(".path1", {
        motionPath: {
            path: liposomePath1,
            curviness: 0.5,
            alignOrigin: [0.5, 0.5],
            fromCurrent: false
        },
        ease: "linear",
        attr: { d: pathTo },
        duration: 0.22
    }, 1.9)

    //2.1
    tl_plasmid.to(".svg-container", {
        motionPath: {
            path: liposomePath2,
            curviness: 0.5,
            alignOrigin: [0.5, 0.5],
            fromCurrent: true
        },
        ease: "linear",
        duration: 0.88,
    }, 2.12)

    //3
    tl_plasmid.to(".svg-container", {
        motionPath: {
            path: liposomePath3,
            curviness: 0.5,
            alignOrigin: [0.5, 0.5],
            fromCurrent: true
        },
        ease: "linear",
        duration: 1,
    }, 3)

    tl_plasmid.to(".svg-container", {
        rotation: 180,
        duration: 1,
    }, 3)

    //4
    tl_plasmid.to(".svg-container", {
        motionPath: {
            path: liposomePath4,
            curviness: 0.5,
            alignOrigin: [0.5, 0.5],
            fromCurrent: true
        },
        ease: "linear",
        duration: 1,
    }, 4)

    //5
    .to(".svg-container", {
        motionPath: {
            path: liposomePath5,
            curviness: 0.5,
            alignOrigin: [0.5, 1]
        },
        scale: 0.25,
        ease: "linear",
        duration: 1.5,
    },5)

    //6.5
    .to(".svg-container", {
        motionPath: {
            path: liposomePath6,
            curviness: 0.5,
            alignOrigin: [0.5, 1]
        },
        scale: 0.25,
        ease: "linear",
        duration: 1.5,
    },6.5)

    //8
    .to(".svg-container", {
        motionPath: {
            path: liposomePath7,
            curviness: 0.5,
            alignOrigin: [0.5, 1]
        },
        scale: 0.25,
        ease: "linear",
        duration: 1.5,
    },8)

    //9.5 svg-container and plasmid stick together at lung4(plasmid_container) and lung5(svg_container)
    tl_plasmid.to(lung4, {
        x: 0,
        y: 0,
        duration: 1,
        onUpdate: () => {
        sync_move(plasmid_container, lung4, [0.5, 0.5]);
        }
    },9.5)

    //scale up
    tl_plasmid.to(plasmid_container, {
        scale: 0.2 * scale_factor,
        duration: 1,
    },9.5)

    tl_plasmid.to(lung5, {
        x: 0,
        y: 0,
        duration: 1,
        onUpdate: () => {
        sync_move(svg_container, lung5, [0.5, 0], 3, 15);
        }
    },9.5)

    //scale up
    tl_plasmid.to(svg_container, {
        scale: 0.27 * scale_factor,
        duration: 1,
    },9.5)

    //9 svg-container and plasmid dragged by lung4 and lung5
    tl_plasmid.to(lung4, {
        x: 0,
        y: 40,
        duration: 1,
        onUpdate: () => {
        sync_move(plasmid_container, lung4, [0.5, 0.5]);
        }
    },10.5)

    tl_plasmid.to(lung5, {
        x: 0,
        y: 40.5,
        duration: 1,
        onUpdate: () => {
        sync_move(svg_container, lung5, [0.5, 0], 3, 15);
        }
    },10.5)

    //10 reverse encapsulation
    tl_plasmid.to(".path1",{
        attr: { d: pathOrigin },
        duration: 1,
        //ease: "power4.in",
        onUpdate: () => {
        sync_move(svg_container, lung5, [0.5, 0], 3, 15);
        }
    },10.88)

    tl_plasmid.to(lung4, {
        x: 0,
        y: 80,
        duration: 1,
        //ease: "power4.in",
        onUpdate: () => {
        sync_move(plasmid_container, lung4, [0.5, 0.5]);
        }
    },10.88)

    //vanish
    tl_plasmid.to(svg_container, {
        opacity: 0,
        duration: 0.1,
    },12.25)

    //11 final sync to make it stick in center of bacterium
    tl_plasmid.to(lung4, {
        x: 0,
        y: 80,
        duration: 3,
        onUpdate: () => {
        sync_move(plasmid_container, lung4, [0.5, 0.5]);
        }
    },12.5)

    // lung_text fading in
    tl_plasmid.to(".lung_text", {
        opacity: 1,
        duration: 1,
    }, 11)

    //amps fading in
    tl_plasmid.to(".amp", {
        opacity: 1,
        duration: 1,
    }, 12)

    //final shrink plasmid --> same time as lung
    //scale up
    tl_plasmid.to(plasmid_container, {
        scale: 0.2,
        duration: 1,
    },14.5)
    
})
    
    // ------------------ LUNG ANIMATION ---------------------

    mm.add("(min-width: 1001px)", () => {

    tl_plasmid.to(".lung-container", {
        motionPath: {
            path: bakterium_path1,
            curviness: 0.5,
            alignOrigin: [0.5, 1]
        },
        transformOrigin: zoom_origin,
        scale: 1 * scale_factor, // Ending value
        ease: "none",
        duration: 1
    }, 9.5);

    tl_plasmid.to(".lung-container", {
        motionPath: {
            path: bakterium_path1,
            curviness: 0.5,
            alignOrigin: [0.5, 1]
        },
        transformOrigin: zoom_origin,
        scale: 1, // Ending value
        ease: "none",
        duration: 1
    }, 14.5);
    
})
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
                const position = current_path.getPointAtLength((index + 1) * (pathLength/2) / (elements.length));
    
                element.style.left = (position.x) + 'px';
                element.style.top = (position.y) + 'px';
            });
        }
        
    
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
    
        fill_container_with_ClassInstances("svg-1", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid", "bilipid", 20);
        let bilipid_elements = document.querySelectorAll('.bilipid');
        position_elements('path.path1', bilipid_elements);

        // ------------------- Lipid animation ------------------------------
        // Select all elements with the class 'my-element'
        const bilipidElements = document.querySelectorAll(".bilipid");

        // Initialize an empty array for rotation degrees
        const rotationDegrees = [];

        // Calculate the number of elements to process (first half)
        const halfLength = Math.floor(bilipidElements.length / 2);

        // Generate the array of degrees
        for (let i = halfLength; i >= 0; i--) {
            const parts = 180 / halfLength;
            const degree = parts * -i
            rotationDegrees.push(degree);
        }

        // Generate the array of degrees for the second half
        for (let i = 1; i < halfLength + 1; i++) {
            const parts = 180 / halfLength;
            const degree = parts * i;
            rotationDegrees.push(degree);
        }

        mm.add("(min-width: 1001px)", () => {

        for (let index = 0; index < halfLength; index++) {
            const element = bilipidElements[index];
            const rotation = rotationDegrees[index]; // Cycle through degrees if more elements than degrees
            tl_plasmid.to(element, {
                rotation: rotation,
                duration: 0.22, // Duration of 0.22 seconds for each rotation
                transformOrigin: "0% 0%" // Set transform origin to center (default)
            }, 1.9);
        }
      
        for (let index = halfLength; index <= bilipidElements.length; index++) {
            const element = bilipidElements[index];
            const rotation = rotationDegrees[index]; // Cycle through degrees if more elements than degrees
            tl_plasmid.to(element, {
                rotation: rotation,
                duration: 0.22, // Duration of 0.22 seconds for each rotation
                transformOrigin: "0% 0%" // Set transform origin to center (default)
            }, 1.9);
        }
    })
        // -------------------------- reverse rotation ------------------------------------
        mm.add("(min-width: 1001px)", () => {

        for (let index = 0; index < halfLength; index++) {
            const element = bilipidElements[index];
            const rotation = -1*rotationDegrees[index]; // Cycle through degrees if more elements than degrees
            tl_plasmid.to(element, {
                rotation: 0, // Reverse the rotation
                duration: 0.5 // Duration of 0.22 seconds for each rotation
            }, 10.88);
        }

        for (let index = halfLength; index < bilipidElements.length; index++) {
            const element = bilipidElements[index];
            const rotation = -rotationDegrees[index]; // Cycle through degrees if more elements than degrees
            tl_plasmid.to(element, {
                rotation: 0, // Reverse the rotation
                duration: 0.5 // Duration of 0.22 seconds for each rotation
            }, 10.88);
        }
    })

        //-------------------------------------- bacterium lipids -------------------------------------
        fill_container_with_ClassInstances("svg-2", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid_bacterium", "bilipid_bacterium", 100);
        fill_container_with_ClassInstances("svg-2", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid_bacterium2", "bilipid_bacterium2", 120);

        const bacterium_bilipids = document.querySelectorAll('.bilipid_bacterium'); // Select all the elements you want to distribute
        const bacterium_bilipids2 = document.querySelectorAll('.bilipid_bacterium2'); // Select all the elements you want to distribute
        const path = document.querySelector('.path2'); // Select the path

        const staggerDelay = 0
        const half_elements = bacterium_bilipids.length / 2
        const lipids_that_need_to_move = 10

        // Distribute elements along the path with auto-rotation and centered alignment
        bacterium_bilipids.forEach((element, index) => {
        tl_plasmid.to(element, {
            motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5], // Center the element on the path
            autoRotate: true,
            start: index / bacterium_bilipids.length, // Distributes elements along the path
            end: index / bacterium_bilipids.length // Adjusts end point
            },
            duration: 0.1, // Adjust the duration as needed
            ease: "none" // Linear motion
        },0);
        });
        
        // Distribute elements along the path with auto-rotation and centered alignment
        bacterium_bilipids2.forEach((element, index) => {
        tl_plasmid.to(element, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5], // Center the element on the path
                autoRotate: true,
                start: index / bacterium_bilipids2.length, // Distributes elements along the path
                end: index / bacterium_bilipids2.length // Adjusts end point
            },
            duration: 0, // Adjust the duration as needed
            ease: "none", // Linear motion#
            opacity: 0, 
            },0);
        });
      
      
        //staggered movement
        // Animate the first half of the elements
        for (let index = 0; index < half_elements; index++) {
        const element = bacterium_bilipids[index];
        const delay = index * staggerDelay  
        tl_plasmid.to(element, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5], // Center the element on the path
                autoRotate: true,
                start: index / bacterium_bilipids.length, // Distributes elements along the path
                end: (index + lipids_that_need_to_move)/ (bacterium_bilipids.length + lipids_that_need_to_move*2) // Adjusts end point
            },
            duration: 0.8, // Adjust the duration as needed
            ease: "sine .out", // Linear motion
            delay: delay,
            }, 10.88); 
        }
        // Reverse staggered movement for the second animation
        for (let index = bacterium_bilipids.length; index > half_elements; index--) {
        const element = bacterium_bilipids[index];
        const delay = (bacterium_bilipids.length-index) * staggerDelay 
        
        tl_plasmid.to(element, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5], // Center the element on the path
                autoRotate: true,
                start: index / bacterium_bilipids.length, // Distributes elements along the path
                end: (index + lipids_that_need_to_move)/ (bacterium_bilipids.length + lipids_that_need_to_move*2) // Adjusts end point
            },
            duration: 0.8, // Adjust the duration as needed
            ease: "sine.out", // Linear motion
            delay: delay,
            }, 10.88); 
        }
   
      
      tl_plasmid.to(bacterium_bilipids, {
        opacity: 0,
        duration: 0.1,
      }, 12.25)
      
      tl_plasmid.to(bacterium_bilipids2, {
        opacity: 1,
        duration: 0.1,
      }, 12.25)
      
       //GSDevTools.create({ animation: tl_plasmid });

   //############################ SECRET BUTTON #############################

    document.getElementById('changeButton').addEventListener('click', function() {
        // Change the image source
        const img = document.querySelector('img[alt="Capture Logo"]');
        img.src="https://static.igem.wiki/teams/5057/imageedit-8-7228610421.gif"; // Replace with the new image URL

        // Change the background color
        // Change the background image, width, height, and text color
        document.body.style.backgroundImage = 'url("https://github.com/isaksolheim/cyberscape/raw/main/static/images/aquagalaxy.gif")';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.color = 'white';; // Replace with the desired background color

        // Change the font of headings
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.style.fontFamily = 'Space, Arial, sans-serif'; // Set the desired font family
            heading.style.fontSize = '33px'; // Set the desired font size
            heading.style.fontStyle = 'normal'; // Set the desired font style
            heading.style.fontWeight = 'normal'; // Set the desired font weight
            heading.style.color = 'rgb(0, 255, 226)'; // Set the desired font color
        });

        // Reload the page
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            $('header').css('padding-right', 0 + 'px');
            $('body').css('margin-right', -20 + 'px');
        }, 100); // Delay to ensure changes are applied before reload
    });

    }
    // Initialize elements and animations on page load
    initialize();
  
  

 });


// ############################################# LOADING SCREEN #########################################
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
function hideLoader(minDuration = 1500){
    $('body').addClass('loading');

    // Ensure the loader is displayed for at least the minimum duration
    setTimeout(() => {
        $('.page-loader').fadeOut('slow', function() {
            $('body').removeClass('loading');
            
            // Calculate scrollbar width
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            // Add padding to the header to compensate for scrollbar
            $('header').css('padding-right', scrollbarWidth + 'px');
            
            // Subtract margin to reposition the animation correctly after the scrollbar pops back in
            setTimeout(() => {
                $('body').css('margin-right', -scrollbarWidth + 'px');
            }, 10); // Adjust the delay as needed
        });
    }, minDuration);
}

