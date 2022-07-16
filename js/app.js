/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

// The document fragment isn't part of the active document tree structure
// Using document fragment is going to reduce the number of reflows and repaints.
const fragment = document.createDocumentFragment();
// Selecting all sections
let sections = document.body.querySelectorAll("section");
// upButton variable
const upButton = document.querySelector("button");
// Header section
const navSection = document.querySelector(".page__header");
// Selection collapse anchor
const collapse = document.querySelector("#collapse");
// Selecting addButton
const addButton = document.querySelector(".button");
// A variable that will be our timer to know if the user is scrolling or not
let isScrolling;
// anchors variable so every function can use it
let anchors;
// sectionCount to keep track the number of sections
let sectionCount = 0;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */



/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
/**
* @description Creating Nav bar based on the numbers of sections in the page
* @param {Nodelist} sections
*/
let createMenu = (sections) => {
  // Looping through every section to get attributes info
  for (const section of sections) {
    sectionCount += 1;
    // Creating a list element
    const newList = document.createElement("li");
    // Creating an anchor element
    const anchor = document.createElement("a");
    // Getting the content of anchor from data-nav attr of the section
    anchor.textContent = section.getAttribute("data-nav");
    // Adding href to the anchor
    anchor.setAttribute("href", "#" + section.getAttribute("id"));
    // Adding style to the anchor
    anchor.className = "menu__link";
    // Appending the anchor to the list
    newList.appendChild(anchor);
    // Appending the list to the Document Fragment
    fragment.appendChild(newList);
  }
  // Appending the new fregment to the DOM
  document.body.querySelector("#navbar__list").appendChild(fragment);
}


/**
* @description Add class 'active' to section when near top of viewport
*/
let scrollingUpdate = () => {
  // Checking if the top edge has got the top of section1
  if (sections[0].getBoundingClientRect().top < 0){
    // If yes upbutton will be visibel
   upButton.classList.add('visible');
  } else {
    // Otherwise we're at header section ,so we going to remove upbutton;
   upButton.classList.remove('visible');
  }

  // ClearTimeout throughout the Scroll
  window.clearTimeout(isScrolling);
  // Loop through each section
  for (const section of sections) {
    // Get distance from top
    const topSpace = section.getBoundingClientRect().top;
    const anchor = document.querySelector(`a[href="#${section.getAttribute("id")}"]`);
    // If the distance is between -100 : 100 px
    if (topSpace >= -100 && topSpace < 100) {
      // Add active class to both section and the anchor
      section.classList.add('active');
      if (anchor){anchor.classList.add('active');}
      // Otherwise, remove the class
    } else {
      section.classList.remove('active');
      anchor.classList.remove('active');
    }
  }
  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function() {
    /*
     * you are free to choose what action will happen when scrolling has stopped
     * console.log('Scrolling has stopped.')
     * or like changing navbar style display: none;
     */
  }, 150);
}


/**
* @description scrolling UP
* @param {eventObject} e
*/
let scrollingUp = (e) => {
 // Prevent the default action
 e.preventDefault();
 const offsetTop = navSection.offsetTop;
 // Window.scrollTo() scrolls to a particular set of coordinates in the document.
 window.scrollTo({
   // Specifies the number of pixels along the Y axis to scroll the window or element.
   top: offsetTop,
   // animate smoothly (smooth)
   behavior: 'smooth'
 });

}

/**
* @description Collapsing the whole page
*/
let collapsePage = () => {
  // Remove all the sections
  for (const section of sections){
    section.remove();
    console.log(section);
  }
  console.log(anchors)
  // Remove nav-bar menu
  for(const anchor of anchors){
    anchor.remove();
  }
  sectionCount = 0;
  // Stratching the header section to fill the space that we removed
  document.querySelector(".main__hero h1").textContent = "Collapsed Landing Page";
}


/**
* @description creating  new menu item, new section and adding events to them
*
*/
let addContent = () => {
    document.querySelector("main").insertAdjacentHTML("beforeend",
      `<section id="section${sectionCount+1}" data-nav="Section ${sectionCount+1}">
        <div class="landing__container">
          <h2>Section ${sectionCount+1}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget
            mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi
            quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse
            imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
      </section>
      `);
    sectionCount += 1;
    // Add the new section to the DOM
    sections = document.body.querySelectorAll("section");
    let newList = document.createElement("li");
    // Creating an anchor element
    let anchor = document.createElement("a");
    // Getting the content of anchor from data-nav attr of the section
    anchor.textContent = "Section" + sectionCount;
    // Adding href to the anchor
    anchor.setAttribute("href", "#" + "section" + sectionCount);
    // Adding style to the anchor
    anchor.className = "menu__link";
    // Appending the anchor to the list
    newList.appendChild(anchor);
    // Appending the new fregment to the DOM
    document.body.querySelector("#navbar__list").appendChild(newList);

    anchors = document.body.querySelectorAll("a");

    //  add a click event to the new anchor
    anchor.addEventListener('click', (e) => {
      // Prevent the default action
        e.preventDefault();
        // Getting the value of href attribute
        const href = anchor.getAttribute("href");
        // Selecting the section with href value (id)
        const section = document.querySelector(`${href}`);
        // offsetTop property returns the distance of
        // the outer border of the current element relative to
        // the inner border of the top of the offsetParent.
        const offsetTop = section.offsetTop;
        // Window.scrollTo() scrolls to a particular set of coordinates in the document.
        window.scrollTo({
          // Specifies the number of pixels along the Y axis to scroll the window or element.
          top: offsetTop,
          // Animate smoothly (smooth)
          behavior: 'smooth'
        });
    });

    // if we're at collapsed page andded a new section change the header
    if (document.querySelector(".main__hero h1").textContent === "Collapsed Landing Page") {
      document.querySelector(".main__hero h1").textContent = "Landing Page";
    }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
// Calling createMenu Function to create our menu
createMenu(sections);

// Scroll to section on link click
// Selecting all anchors that we have created before
anchors = document.querySelectorAll("a");
// Looping through every anchor adding an addEventListener
for (const anchor of anchors) {
  anchor.addEventListener('click', (e) => {
    if (anchor){
      // Prevent the default action
      e.preventDefault();
      // Getting the value of href attribute
      const href = anchor.getAttribute("href");
      // Selecting the section with href value (id)
      const section = document.querySelector(`${href}`);
      // offsetTop property returns the distance of
      // the outer border of the current element relative to
      // the inner border of the top of the offsetParent.
      const offsetTop = section.offsetTop;
      // Window.scrollTo() scrolls to a particular set of coordinates in the document.
      window.scrollTo({
        // Specifies the number of pixels along the Y axis to scroll the window or element.
        top: offsetTop,
        // Animate smoothly (smooth)
        behavior: 'smooth'
      });
    }
  });
}

// Set sections as active
window.addEventListener('scroll', scrollingUpdate);


// Add a click event to upButton
// So when it is clicked it scrolls to the header section
upButton.addEventListener('click', scrollingUp);


// Adding a click event to collapse anchor
collapse.addEventListener('click', collapsePage);

// Add a click event to add content button
addButton.addEventListener('click', addContent);
