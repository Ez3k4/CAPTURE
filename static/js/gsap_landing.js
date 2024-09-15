document.addEventListener('DOMContentLoaded', function() {   
    // Function to initialize elements and animations
    function initialize() {


    /* ################################# Tools / Functions ################################# */

    function getElement(className) {
        return document.querySelector(className);
    }

    //get bounding client rect of element selected by class or id 
    function DOM (identifier) {
        const element = document.querySelector(identifier);
        const rect = element.getBoundingClientRect();
        return rect
    }

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

    function sync_move(fromElement, toElement, origin=[0,0],x_offset=0, y_offset=0){
        const p = MotionPathPlugin.getRelativePosition(fromElement, toElement, origin)
        gsap.set(fromElement, {
        x: "+=" + (p.x + x_offset),
        y: "+=" + (p.y + y_offset),
        })
    }


    // ----------------------------------- init elements --------------------------------------
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
    /* ################################# Objects ################################# */

    //create bilipid elements in the svg-1 container
    fill_container_with_ClassInstances("svg-1", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid", "bilipid", 20);
    let bilipid_elements = document.querySelectorAll('.bilipid');
    position_elements('path.path1', bilipid_elements);
    //create bilipid elements in the svg-2 container that is inside the lung
    fill_container_with_ClassInstances("svg-2", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid", "bilipid2", 20);
    let bilipid_elements2 = document.querySelectorAll('.bilipid2');
    position_elements('path.path2', bilipid_elements2);


    const plasmid = getElement(".plasmid_container")
    const plasmid2 = getElement(".plasmid_container2")
    const liposome = getElement(".svg-container")
    const liposome2 = getElement(".svg-container2")
    const biofilm_alive = getElement(".biofilm-alive")
    const biofilm_dead = getElement(".biofilm-dead")
    const lung = getElement(".lung-container")

    const DOM_plasmid = DOM(".plasmid_container")
    const DOM_liposome = DOM(".lipid-container")

    // important points
    const startpoint = {x: DOM_plasmid.x + (DOM_plasmid.width/2), y: DOM_plasmid.y + (DOM_plasmid.height/2)}
    const liposome_center = {x: DOM_liposome.x + (DOM_liposome.width/2), y: DOM_liposome.y + (DOM_liposome.height/2)}



    /* ################################# Motion Paths ################################# */

    // get calculated anchor coordinates for plasmid and liposome
    const anchor = get_class_positions(".anchor", startpoint)
    const anchor_liposome = get_class_positions(".anchor", liposome_center) 

    // get path dataset attributes
    const pathElement = document.querySelector('path.path1');
    let pathTo = pathElement.dataset.pathTo;



    /* --------------------------------- Plasmid path --------------------------------- */
    const plasmidPath1 = [
        {x: 0, y:0},
        {x: 0, y: anchor[0].y},
        {x: anchor[0].x, y: anchor[0].y}]
        console.log(plasmidPath1)
    const plasmidPath2 = [
        {x: anchor[1].x, y: anchor[0].y},
        {x: anchor[1].x, y: anchor[1].y},]
    const plasmidPath3 = [
        {x: anchor[1].x, y: anchor[2].y},
        {x: anchor[2].x, y: anchor[2].y},]
    const plasmidPath4 = [
        {x: anchor[3].x, y: anchor[2].y},
        {x: anchor[3].x, y: anchor[3].y},]
    const plasmidPath5 = [
        {x: anchor[3].x, y: anchor[4].y},
        {x: anchor[4].x, y: anchor[4].y},]


    /* --------------------------------- Liposome path --------------------------------- */
    const liposomePath1 = [
        {x: 0, y: 0}]
    const liposomePath2 = [
        {x: anchor_liposome[1].x -7, y: anchor_liposome[2].y -45},
        {x: anchor_liposome[2].x -7, y: anchor_liposome[2].y -45},]
    const liposomePath3 = [
        {x: anchor_liposome[3].x -7, y: anchor_liposome[2].y -45},
        {x: anchor_liposome[3].x -7, y: anchor_liposome[3].y -45},]
    const liposomePath4 = [
        {x: anchor_liposome[3].x -5, y: anchor_liposome[4].y -45},
        {x: anchor_liposome[4].x -5, y: anchor_liposome[4].y -45},]

    /* ################################# Timeline ################################# */

    // enables matching animation to windowsize
    let mm = gsap.matchMedia();

    //create a timeline object
    let tl_plasmid = gsap.timeline({
            onUpdate: () => {
                //console.log(getCurrentPath('path.path1')),
                position_elements('path.path1', bilipid_elements)
        },
        //connect the timeline to scrolltrigger instead of duration in s
        scrollTrigger: {
            trigger: ".scrollsource", // selector or element 
            start: "10% center", // [trigger]=animated element, [scroller]=viewport
            end: "30% center",
            scrub: 1, // Add scrub to control the animation progress on scroll
            markers: true, // Add markers 
        },
    });


    /* --------------------------------- Plasmid path --------------------------------- */
    //0
    tl_plasmid.to(plasmid, {
        motionPath: {
            path: plasmidPath1,
            curviness: 0.5,
            alignOrigin: [0.5, 1]
        },
        scale: 1,
        ease: "linear",
        duration: 1,
    })
    // set initial plasmid size to 2 for better visibility
    tl_plasmid.fromTo(plasmid, {
        scale: 2
    }, {
        scale: 1,
        duration: 1
    }, 0)
    //1
    .to(plasmid, {
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
    .to(plasmid, {
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
    .to(plasmid, {
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
    .to(plasmid, {
        motionPath: {
            path: plasmidPath5,
            curviness: 0.5,
            alignOrigin: [0.5, 1]
        },
        scale: 1,
        ease: "linear",
        duration: 1,
    })


    /* --------------------------------- Liposome path --------------------------------- */

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
    tl_plasmid.to(liposome, {
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
    tl_plasmid.to(liposome, {
        motionPath: {
            path: liposomePath3,
            curviness: 0.5,
            alignOrigin: [0.5, 0.5],
            fromCurrent: true
        },
        ease: "linear",
        duration: 1,
    }, 3)

    tl_plasmid.to(liposome, {
        rotation: 180,
        duration: 1,
    }, 3)
    //4
    tl_plasmid.to(liposome, {
        motionPath: {
            path: liposomePath4,
            curviness: 0.5,
            alignOrigin: [0.5, 0.5],
            fromCurrent: true
        },
        ease: "linear",
        duration: 1,
    }, 4)

    /* --------------------------------- Common path --------------------------------- */
    // guide element inside lung
    const guide = getElement(".lung1")
    const scale_factor = 5
    //5
    tl_plasmid.to(guide, {
        x: 0,
        y: 330,
        duration: 1,
        onUpdate: () => {
        sync_move(plasmid, guide, [0.5, 0.5]);
        sync_move(liposome, guide, {x: 158, y: 50 });
        }
    },5)
    // shrink
    tl_plasmid.to(plasmid, {
        scale: 1 / scale_factor,
        duration: 2
    }, 5);
    
    tl_plasmid.to(liposome, {
        scale: 1 / scale_factor,
        duration: 2
    }, 5);
    //6
    tl_plasmid.to(guide, {
        x: -170,
        y: "+=75",
        duration: 1,
        onUpdate: () => {
        sync_move(plasmid2, guide, [0.5, 0.5]);
        sync_move(liposome2, guide, {x: 158, y: 50 });
        }
    },6)
    //7
    //grow
    tl_plasmid.to(plasmid2, {
        opacity: 1,
        scale: 1,
        duration: 1,
        onUpdate: () => {
        sync_move(plasmid2, guide, [0.5, 0.5]);
        }
    }, 7);
    
    tl_plasmid.to(liposome2, {
        scale: 1,
        duration: 1,
        onUpdate: () => {
        sync_move(liposome2, guide, {x: 158, y: 50 });
        }
    }, 7);
    

    /* --------------------------------- Lung animation --------------------------------- */

    const zoom_origin = "15% 70%"

    mm.add("(min-width: 1001px)", () => {

    //7
    //pin lung
    tl_plasmid.from(lung, {
        scrollTrigger: {
            trigger: lung,
            pin: true,
            scrub: 1,
            start: "center center",
            end: "+=3000px center",
            markers: {
                startColor: "blue",
                endColor: "yellow"
            }
        }
    })



/*     //zoom in
    tl_plasmid.to(lung, {
        transformOrigin: zoom_origin,
        scale: 1 * scale_factor, 
        ease: "none",
        duration: 1,
    }, 7); */

})









    /* --------------------------------- Lipid animation --------------------------------- */

    // Select all elements with the class 'my-element'
    const bilipidElements = document.querySelectorAll(".bilipid");
    const bilipidElements2 = document.querySelectorAll(".bilipid2");

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
    //lipids of the second liposome
    for (let index = 0; index < halfLength; index++) {
        const element = bilipidElements2[index];
        const rotation = rotationDegrees[index]; // Cycle through degrees if more elements than degrees
        tl_plasmid.to(element, {
            rotation: rotation,
            duration: 0.22, // Duration of 0.22 seconds for each rotation
            transformOrigin: "0% 0%" // Set transform origin to center (default)
        }, 0);
    }

    for (let index = halfLength; index <= bilipidElements.length; index++) {
        const element = bilipidElements2[index];
        const rotation = rotationDegrees[index]; // Cycle through degrees if more elements than degrees
        tl_plasmid.to(element, {
            rotation: rotation,
            duration: 0.22, // Duration of 0.22 seconds for each rotation
            transformOrigin: "0% 0%" // Set transform origin to center (default)
        }, 0);
    }
})



    }
// Initialize elements and animations on page load
initialize();
});














    /* tl_plasmid.to(lung, {
        scale: 7,
        transformOrigin: "27% 40%", 
        duration: 0.5,
    })

    tl_plasmid.from(biofilm_alive, {
        scrollTrigger: {
            trigger: lung,
            pin: true,
            pinSpacing: true,
            scrub: 2,
            start: "center center",
            end: "+=3000px center",
            markers: {
                startColor: "blue",
                endColor: "yellow"
            }
        }
    }) */






















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
