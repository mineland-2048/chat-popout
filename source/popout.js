/**
 * Chat-popout
 * A web app messaging popper
 * 
 * Original author: mineland (Andy)
 * 
 * This extension makes web chat messenger sites have a more compact friendly design
 * thats more usuable for popping in and out without taking much screen space
 * 
 * Currently works only on Whatsapp Web, but there is plans to expand into others
*/

// this is the main script for the extension. The documentation should be done better, but eh, im pretty new to this.


/**
 *  A <style> element for the popCSS since having a variable be the innerHTML of an element is not fun (?)
 *  Insert this element at the start once its been filled in with the desired css in its innerHTML
*/
// const styleElement = document.createElement("style");
const styleLink = document.createElement("link")
let siteURL = window.location.host; // "web.whatsapp.com", "discord.com"
let website = "siteURL";


/**
 * Checks for which site this is on and assigns the specified function to run
 * @returns 
*/
function startExtension() {
    // console.log(siteURL)

    /**
     * The thing do be starting tho
     */
    let startTheThing = function () {};

    switch(siteURL) {
        case "web.whatsapp.com" :
            website = "Whatsapp";
            startTheThing = Whatsapp;
        break;

        case "discord.com" :
            website = "Discord";
            startTheThing = Discord;
        break;

        default:
            return;

    }

    console.info(`Loading chat popout for ${website}`);
    startTheThing();
}

startExtension();

///////////////////////////////
//                           //
//  USEFUL GLOBAL FUNCTIONS  //
//                           //
///////////////////////////////

/**
 * Logs that the extension has ben loaded in site
 * @param {string} site The website
 */
function logReady(site) {
    if (!site) site =  website; 
    console.info(`Chat popout has been initialized for ${site}`);
}

/**
 * Sets all attributes from a list into a specified element
 * @param {HTMLElement} element 
 * @param {Object} list 
 */
function insertAttributes(element, list) {

    for(const attribute in list) {
        element.setAttribute(attribute, list[attribute]);
    }

}

// The on and off icons were made by me and are on /icons 
// -Andy

/**
 * Returns the On icon as a text form svg.
 * @param {string} color 
 * @returns HTMLElement
 */
function generateIconOn(color) {
    if (!color) { color = "#e0e0e0"; }
    let svgParent = document.createElement("span");

    /* this is the icons/full.svg pasted in because color is important*/ //xml
    svgParent.innerHTML =
    `<svg
    class="popIconOn" 
    width="5.3469601mm"
    height="5.3474774mm"
    viewBox="0 0 5.3469601 5.3474774"
    version="1.1"
    id="svg1"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"><defs
      id="defs1" /><g
      id="layer2"
      transform="translate(-104.86977,-17.912374)"><g
        id="g73"><path
          fill="iconColorHere"
          d="m 104.86977,17.912373 v 1.428853 l 0.36483,1.244885 -0.36483,1.244886 v 1.428853 h 1.42885 l 1.24488,-0.364836 1.24489,0.364836 h 1.42834 v -1.428853 l -0.36432,-1.244886 0.36432,-1.245402 v -1.428336 h -1.42782 l -1.24541,0.364835 -1.24488,-0.364835 z"
          style="stroke-width:1.29215;stroke-linecap:round"
          id="path70" /></g></g></svg>`;

    
    let svgElement = svgParent.children.item(0);
    svgElement.querySelector('[fill="iconColorHere"]').setAttribute("fill", color);


    return svgElement;
}

/**
 * Returns the Off icon as a text form svg.
 * @param {string} color 
 * @returns HTMLElement
 */
function generateIconOff(color) {
        
    if (!color) { color = "#e0e0e0"; }
    let svgParent = document.createElement("span");

    /* this is the icons/full.svg pasted in because color is important*/ //xml
    svgParent.innerHTML =  
    `<svg
    class="popIconOff" 
    width="5.3469524mm"
    height="5.3474774mm"
    viewBox="0 0 5.3469524 5.3474774"
    version="1.1"
    id="svg1"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"><defs
      id="defs1" /><g
      id="layer2"
      transform="translate(-90.993059,-18.104839)"><g
        id="g74"
        transform="translate(3.0454413,7.8273318)"
        style="display:inline"><path
          fill="iconColorHere"
          d="m 87.947612,10.277506 v 1.428853 l 0.36484,1.244886 -0.36484,1.244885 v 1.428853 h 1.42885 l 1.24489,-0.364835 1.24488,0.364835 h 1.42834 V 14.19613 l -0.36432,-1.244885 0.36432,-1.245402 v -1.428337 h -1.42782 l -1.2454,0.364836 -1.24489,-0.364836 z m 0.56224,0.56224 h 1.1281 l 0.41547,0.121439 0.002,3.979086 -0.41703,0.122473 h -1.12809 V 13.93413 l 0.28783,-0.982885 -0.28783,-0.982886 z"
          style="stroke:none;stroke-width:1.29215;stroke-linecap:round;stroke-opacity:1"
          id="path72" /></g></g></svg>`;

    let svgElement = svgParent.children.item(0);

    svgElement.querySelector('[fill="iconColorHere"]').setAttribute("fill", color);
      
    return svgElement;
    
}

/**
 * Returns a generic back button svg
 * @param {string} color 
 * @returns Element
 */
function generateIconBack(color) {
    const button = document.createElement("div");

    if (!color) color = "currentcolor";

    button.innerHTML = //html
    `<svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24">
        <path fill="${color}" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path>
    </svg>`;


    let icon = button.children.item(0);

    return icon;
}

/**
 * Toggles the popped out style for the current website.
 */
function togglePopped() {

    let mode = document.documentElement.getAttribute("chat-popped") == "true" ? "false" : "true";
    // console.info(mode);

    
    document.documentElement.setAttribute("chat-popped", mode);

}

/**
 * Checks if the document is popped or not
 * @returns bool
 */
function isPopped() {
    if (document.documentElement.getAttribute("chat-popped") == "true") { return true; }
    return false;
}




// Set every website either down here or in separate files
// Plans: messenger, discord, idk what else
// Discord actually has an ok mobile ui. Know this because of MS Edge having ok compat with it.
// Whatsapp was the main annoyance i had, which was the primary reason for the creation of this extension.
// If anyone wants to expand this, go for it. But beware of the jank.


/**
 * This is the whole engine for Whatsapp Web. You can use this as a guide on how to modify your desired page.
 * Its awful, so beware of the jank.
 */
function Whatsapp (){

    let app = document.getElementById("app");
    let parentElement = "";
    let chat = "";
    let contacts = "";
    let info = "";

    // popCSS //
    /**
     * change this css to the one in /css/whatsapp.css whenever a change is applied there
     * TODO: fix this terrible mess to actually browser.insertCSS() or something because
     * it currently just inserts a new <style> into the head of the document.
     * Kinda messed up if you ask me
     * -Andy
     */

    let filePath = "css/whatsapp.css"
    // let styleSheet = styleElement.sheet;

    
    


    styleLink.type = "text/css";
    styleLink.rel = "stylesheet";
    styleLink.href = browser.runtime.getURL(filePath);
    document.head.appendChild(styleLink);

    styleLink.id = "ohgod"

    console.info(styleLink)
    let stopTheThing = ()=>{
        document.getElementById("ohgod").remove();
    }


    /**
     * Handles the events for clicking ui elements.
     * @param {Event} e 
     */
    function clickEvents(e) {

        const target = e.target
        let triggerList = {
            "#pane-side > div:nth-child(1)": "enterChat",
            ".backButton" : "contacts",
            ".popToggleButton": "togglePopped"
        }

        /**
         * Finds if it has a parent thats been assigned to an event. 
         * @returns string
         */
        function findParent() {
            // console.warn(triggerList)
            for(triggerClass in triggerList) {
                // console.log(triggerClass)
                if (target.closest(triggerClass)) {
                    // console.info(triggerList[triggerClass]);
                    return triggerList[triggerClass];
                }
            }
            return "";
        }

        let trigger = findParent();

        // Triggers an event based on the trigger
        switch(trigger) {
            case "enterChat":
                enterChat();
                break;

            case "contacts":
                contactListOpen();
                break;

            case "togglePopped":
                togglePopped();
                enterChat();
                break;

        }

    }

    /**
     * checks if the #main element exists and removes the chats shown attribute if it doesnt
     * @returns bool
     */
    function mainExists() {
        if (!document.querySelector("#main")) {
            // console.log("doesnt exist"); 
            chat.removeAttribute("shown"); 
            return false;
        }
        // console.log("exists")
        return true;
    }


    /**
     * Closes the chat window and opens the contact list
     * @returns 
     */
    function contactListOpen() {        
        if (!mainExists()) return;

        contacts.setAttribute("playAnim", "animPopout");
        
        // I have no idea what function is responsible for taking the whole chat window back to its original state
        // This is a hack for the manually added back button on the contacts
        var key = new KeyboardEvent('keydown', {'key': 'Escape'});
        document.dispatchEvent(key);

        // chat.style.setProperty("z-index", "-10");
        chat.removeAttribute("shown");
        
        // console.log(chat);
        // console.log(event);
    }

    /**
     * Enters the main chat window
     * @returns 
     */
    function enterChat() {
        
        // Checks if the main chat window or back button for said chat window exists to not do anything more.
        if (!mainExists() || document.querySelector("#backButton") || !isPopped()) return;
        
        contacts.removeAttribute("playAnim");
        // The process of adding the back button
        let header = chat.querySelector("header");
        let pfpButton = chat.querySelector("header > div:nth-child(1)");
        let backButton = document.createElement("button");

        backButton.id = "backButton";

        // Icon taken from the site's other menus with actual back arrows
        backButton.innerHTML = //html
        `
                <span data-icon="back" class="">
                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24">
                        <title>back</title>
                        <path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path>
                    </svg>
                </span>
        `;

        // Sets the button into the profile settings back button classes. Do they change on updates? 
        // I dont like these names
        // _3OtEr is the button class so that it changes color when clicked
        backButton.className = "backButton kk3akd72 dmous0d2 fewfhwl7 ajgl1lbb ltyqj8pj _3OtEr";

        // Hijacks the Profile picture that is used to open the profile into a button to take you back to the contacts list
        // similar to how it works on the mobile app
        header.insertAdjacentElement("afterbegin", backButton);
        backButton.insertAdjacentElement("beforeend", pfpButton)

        // adds the button class to the contact name so that it changes color aswell like it does on the mobile app
        header.querySelector(".backButton + div").className += " _3OtEr";
        
        chat.setAttribute("shown", "true");
    }

    /**
     * Initializes a lot of ids for easier name access and other stuff
     */
    function init() {
        
        // browser.tabs.insertCSS({file: 'whatsapp.css'});
        popMenus =  document.querySelector("#app > div > :nth-last-child(1) > :nth-last-child(4)");
        contacts =  document.querySelector("#app > div > :nth-last-child(1) > :nth-last-child(3)");
        chat =      document.querySelector("#app > div > :nth-last-child(1) > :nth-last-child(2)");
        info =      document.querySelector("#app > div > :nth-last-child(1) > :nth-last-child(1)");
        parentElement =    document.querySelector("#app > div > :nth-last-child(1)");
        parentElement.id = "parentElement"
        
        popMenus.id = "pop-menus";
        contacts.id = "contacts";
        chat.id = "chat";
        info.id = "info";
        
        // The page has an annoying tab navigation that opens the chat window if focused
        app.addEventListener("focusin", () => { enterChat(); })

        // Adds the Pop toggle button to the header of the contacts to turn off the effects of the extension
        // Would like it if people could use the same icon as in here for consistency sake.
        if (! document.querySelector(".popToggleButton")) {

            // Button layout:
            // div(parent) > div(parentWrapper) > span(wrapper) > svg

            let headerButtonsElement = document.querySelector("#contacts > header > div:nth-last-child(1) > div > span");
            let toggleButtonParent = document.createElement("div");
            let toggleButton = document.createElement("div");
            let spanWrapper = document.createElement("span");

            // Sets classes to be the same as its neighbours
            // these messy class names are from the whatsapp ui picked by hand.
            // TODO: maybe grab these programatically with query selectors in case it ever changes?
            toggleButtonParent.className = "_3OtEr rOo0o";
            
            toggleButton.className = "_3ndVb fbgy3m38 ft2m32mm oq31bsqd nu34rnf1 popToggleButton";
            // Should probably set this so that it can be localized later
            toggleButton.ariaLabel = "Toggle popout";
            toggleButton.title = "Toggle popout";


            // Creates the icons for when popped and not.
            let iconOn = generateIconOn("currentcolor");;
            let iconOff = generateIconOff("currentcolor");

            // Appends the icons to the button
            spanWrapper.appendChild(iconOn);
            spanWrapper.appendChild(iconOff);
            
            // Ojo: outerHTML can only be used after its on a node already.
            // "currentcolor" is the color that the other buttons use for their icons
            
            // Appends the wrapper to its parent-wrapper
            toggleButton.appendChild(spanWrapper);

            // Appends the parent-wrapper into the parent
            toggleButtonParent.appendChild(toggleButton);
            
            // Lastly, appends the whole thing into the start of the header buttons
            headerButtonsElement.insertAdjacentElement("afterbegin", toggleButtonParent);
        }

        // Handles the events when you click on various ui stuff
        document.addEventListener("click", (e) => { clickEvents(e)}, {"passive": true})

        logReady();
        document.documentElement.removeAttribute("chat-popup-loading");

    }

    /**
     * Initial load setup to check if the page is already functional.
     * @returns 
     */
    function load() {

        if (!app) {
            setTimeout(load, 1000)
            app = document.getElementById("app");
            return
        }
        // Adds the css into the page or updates it if it exists already. Oh god
        if (document.querySelector("#ohgod")) { document.querySelector("#ohgod").replaceWith(styleElement);} else {
            document.head.appendChild(styleElement)
        }

        styleElement.id = "ohgod";
        document.head.appendChild(styleElement);

        // This could be used for auto updating css on a repository if any update is done.
        // If i expand this enough it would be fun to try this maybe.
        // 
        // let styleLink = document.createElement("link");
        // styleLink.id = "ohgodLink";
        // styleLink.rel = "stylesheets"
        // styleLink.href = browser.runtime.getURL("css/whatsapp.css");

    
        // Pops the window up (sets the popped ui)
        document.documentElement.setAttribute("chat-popped", "true");
        document.documentElement.setAttribute("chat-popup-loading", "true");
    
        // Hack to see if Whatsapp specifically has already started when the extension was called.
        if (document.querySelector("#app > div > :nth-child(8)")) { init(); return;}


        // If not, it means the site is loading in. 
        // Wait until the first animation finishes loading to do anything. 
        // There has to be a better way to do this surely
        app.addEventListener("animationend", (e) => { init(); } , { once: true});
    }


    load();

}


/**
 * Here comes the Discord
 */
function Discord() {
    const app = document.getElementById("app-mount");

    

    /**
         * Initial load setup to check if the page is already functional.
         * I should probably make this a global function now that i think about it 
         */
    function load() {

        // if its the call popout window then bail
        if (window.location.href === "https://discord.com/popout") return;


        // Adds the css into the page or updates it if it exists already. Oh god
        if (document.querySelector("#ohgod")) document.querySelector("#ohgod").replaceWith(styleElement);
        else document.head.appendChild(styleElement);

        styleElement.id = "ohgod";



        // Pops the window up (sets the popped ui)
        document.documentElement.setAttribute("chat-popped", "true");
        document.documentElement.setAttribute("chat-popup-loading", "true");

        // Hack to see if Discord specifically has already started when the extension was called.


        // If not, it means the site is loading in. 
        
        /**
         * checks if the main element exists or not. If not, bail and let it retry later. 
         */
        function checkIfCanInit() {
            if (app.querySelector("[class^=upperContainer")) { 
                // console.info("it has begun");
                return true; 
            }
            // console.info("it hasnt stopped")
            return false;
        }

        const targetNode = app;
        const config = { attributes: true, childList: true, subtree: true };

        const callback = (mutationList, observer) => {
            if (checkIfCanInit()) { 
                // alert("observed");

                observer.disconnect(); 
                init();
                return;
            }
        }

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);



        const titleElement = document.querySelector("title");

        const notifChecker = (mutationList, observer) => {
            if (!isNaN(parseInt(document.title.charAt(1)))) {
                // alert("notif");
                // REGEX EXPLANATION:
                // the first one matches the titles notification count if it exists.
                // (12) <-- looks for numbers between parenthesis ()
                // replace replaces Anything that isnt a number with blanks so its just numbers left

                let n = document.title
                    .match(/\(\d*\)/g).toString()
                    .replace(/\D/g, "");
                app.setAttribute("notifCount", n)

                app.style.setProperty("--notif-count", `'${n}'`);
            } 
            else {
                // alert("title")
;                app.setAttribute("notifCount", 0);
                app.style.setProperty("--notif-count", ``);
                
            }
        }

        const notifObserver = new MutationObserver(notifChecker);
        notifObserver.observe(titleElement, config);

        notifChecker();

        if (document.querySelector("main")) { init(); return;}



    }



    function init() {

        // alert("initd")

        // Contains the guild nav bar and the base window
        let appContainer = app.querySelector("[class^=container_]");

        // Server nav bar
        let serverNavBar = appContainer.querySelector("nav[class^=guilds_]");

        // contains the chat and sidebar
        let baseWindow = appContainer.querySelector("div[class^=base_]");

        let sidebar = baseWindow.querySelector("[class^=sidebar_");
        // let chat = baseWindow.querySelector('.chat__52833');

        let chatHeader = baseWindow.querySelector("section");
        
        let upperContainer = chatHeader.querySelector("[class^=upperContainer_]");


        // enterChat();

        const targetNode = appContainer;
        const config = { attributes: true, childList: true, subtree: true };

        const callback = (mutationList, observer) => {

            // if the pop toggle button is gone, it means that it has refreshed.
            // alert("popBUtton is gone ????");
            if (!document.querySelector(".togglePopButton") && document.querySelector("[class^=upperContainer_]")) enterChat();

            const currentMenu = app.getAttribute("menu");
            const oncall = app.getAttribute("oncall");

            if (document.querySelector("[class^=callContainer_]")) app.setAttribute("oncall", "true"); 
            else app.removeAttribute("oncall");

            // Checks if its on a call
            if (oncall == "true" && currentMenu == "chat") {
                // alert('calling')
                enterChat();
            }


        }
        
        const appObserver = new MutationObserver(callback);
        appObserver.observe(targetNode, config);


        let guildBackdrop = document.createElement("div");
        guildBackdrop.className = "guildBackdrop";


        guildBackdrop.addEventListener("click", () => { setSidebar(false);});
        if (!document.querySelector(".guildBackdrop")) {sidebar.insertAdjacentElement("afterend", guildBackdrop);
        } else { document.querySelector(".guildBackdrop").replaceWith(guildBackdrop)}

        // console.log("int start");
        
        // i didnt want to use an interval because i think it would be inefficient, but the observer just doesnt work for this reliably
        setInterval(()=> {
            const settings = app.getAttribute("settings");
            // console.log("interval");

            if (document.querySelector("[class^=standardSidebarView_]") 
                && settings !== "open") {
                // console.warn("settings");

                // alert('settings')
                enterSettings();
                return;
            }
            if (app.getAttribute("settings") == "open") { 
                app.removeAttribute("settings");
            }



        }, 150);
        
        enterChat();


        /**
         * returns wether there is a popup thing open or not
         * currently: fullscreen image; inbox and similar popups; and emoji picker
         * @returns bool
         */
        function hasPopupOpen() {
            return (
                   document.querySelector("[class^=focusLock_") 
                || document.querySelector("[id^=popout]")
                || document.querySelector("#emoji-picker-tab-panel")
            );
        }

        // esc to toggle sidebar
        document.addEventListener("keydown", (e) => { 
            if (e.key == "Escape" && !hasPopupOpen()) {
                e.preventDefault();
                toggleSidebar();
            }
        })



        // app.querySelector(".panels__58331 > div:nth-last-child(1) > div:nth-last-child(1) > button:nth-last-child(1)").addEventListener("click", enterSettings);



    
        // console.log(upperContainer);
        // console.log(topLeftHeader);
        // alert("initd");
    }

    /**
     * Things that happen when you enter a new chat
     */
    function enterChat() {

        let screen = "chat";
        if (document.querySelector("[class^=callContainer_]")) screen = "call";
        
        app.setAttribute("menu", screen);

        // top header of the chat window
        let upperContainer = document.querySelector("[class^=upperContainer_]");

        
        // Back button procedure
        let chatMenuButton = document.createElement("button");
        
        
        chatMenuButton.className = "btnHamburger_df0060 hamburger_d103be chatMenuButton";
        chatMenuButton.type = "button"
        chatMenuButton.ariaLabel = "Channel list";

        /* the hamburger button from the mobile web design literally has just 6 spans. Fun*/
        chatMenuButton.innerHTML = /*html*/ 
        `<span></span><span></span><span></span><span></span><span></span><span></span>`;

        if (upperContainer.querySelector(".chatMenuButton")) { 
            upperContainer.querySelector(".chatMenuButton").replaceWith(chatMenuButton); 
        }
        else { upperContainer.insertAdjacentElement("afterbegin", chatMenuButton); }

        chatMenuButton.addEventListener("click", (e) => {
            e.preventDefault();
            toggleSidebar();
        });



        let notifBadge = document.createElement("div");

        notifBadge.className = "lowerBadge__669e7 notificationBadge";
        notifBadge.innerHTML = //html
        `
        <div class="numberBadge__50328 base__92a12 eyebrow__60985 baseShapeRound__95d0f" id="notifBadgeNumber"></div>
        `;

        chatMenuButton.appendChild(notifBadge);

        

        // Popout button procedure
        let togglePopButton = document.createElement("div");
        togglePopButton
        togglePopButton.className = "togglePopButton";

        togglePopButton.innerHTML = /*html*/ 
        `<div class="iconWrapper_af9215 clickable_d23a1a" role="button" aria-label="Toggle Popout" aria-expanded="false"></div>
        `;

        togglePopButton.children[0].appendChild(generateIconOn("currentColor"));
        togglePopButton.children[0].appendChild(generateIconOff("currentColor"));


        togglePopButton.addEventListener("click", togglePopped);

        // returns early if adding the popbutton isnt necessary rn

        if (screen === "call") {  
            upperContainer.querySelector("[class^=toolbar_]").insertAdjacentElement("afterbegin", togglePopButton);
            return;
        }
            
        // replaces the help button with the toggle popped button
        let replaceTarget = upperContainer.querySelector(".toolbar__88c63 > a");
        
        // if it exists already, replace that intead
        if (app.querySelector(".togglePopButton")) replaceTarget = app.querySelector(".togglePopButton");  
        
        // if no replace target exists, just shove it at the end of the topbar
        if (!replaceTarget) { upperContainer.appendChild(togglePopButton); return;}
        replaceTarget.replaceWith(togglePopButton);
        

    }

    /**
     * Toggles the sidebar
     */
    function toggleSidebar() {

        if (app.getAttribute("sidebarOpen") === "true") {
            app.setAttribute("sidebarOpen", "false");
            return;
        }
        app.setAttribute("sidebarOpen", "true");
        return
        
    }

    /**
     * Sets the app.sidebarOpen attribute to the state given
     * @param {bool} state state of "sidebarOpen"
     */
    function setSidebar(state) {
        app.setAttribute("sidebarOpen", state);
    }

    function enterSettings() {
        if (!isPopped()) return;

        app.setAttribute("settings", "open");
        // console.log("enter")
        let settings = document.querySelector(".standardSidebarView__1129a");        
        
        function addBackButton() {
            // console.info("-------------------");

            if (document.querySelector(".header-title-fix")) { 
                // console.info("removing old header: ", document.querySelector(".header-title-fix"), document.querySelector(".header-title-fix").textContent); 
                document.querySelector(".header-title-fix").remove(); 
            }


            let settingsContainer = settings.querySelector("[class^=contentColumn");
            // console.log("h");
            let settingsContentHeader = settingsContainer.querySelector("h2");

            let headerTitleReplacement = document.createElement("h2");
            headerTitleReplacement.className = "defaultColor__37d78 heading-lg-semibold_a200cd defaultColor__87d87 header-title-fix";
            headerTitleReplacement.setAttribute("data-text-variant", "heading-lg/semibold");

            let tabText = document.querySelector("[class^=sidebar__] [aria-selected='true']").textContent.trim();
            // console.info("tabText is: ", tabText);

            headerTitleReplacement.textContent = tabText;

            let firstTitle = "";
            if (settingsContentHeader) { 
                firstTitle = settingsContentHeader.textContent.trim();
                // console.info("firstTitle is: ", firstTitle)
                // console.log("contentHeader is: ", settingsContentHeader);
            }


            // checks if the first found title is the same as the tab selected
            // if it is, then checks if its on top of the page
            if (firstTitle == tabText) {
                // console.warn("h2 is not the first element");
                // console.log(settingsContentHeader)
                settingsContentHeader.hidden = true;
                settingsContentHeader.ariaHidden = true;
            }

            settingsContainer.insertAdjacentElement("beforebegin", headerTitleReplacement);
            settingsContentHeader = headerTitleReplacement;

            // if (!document.querySelector(".separator")) settingsContentHeader.insertAdjacentHTML("afterend", "<div class='separator'> </div>");
             
            let backButton = document.createElement("button");
            backButton.addEventListener("click", (e) => { 
                e.preventDefault();
                toggleSidebar();
            });

            backButton.className = "settingsBackButton";
            backButton.appendChild(generateIconBack());

            // console.log(settingsContentHeader);
    
            // if it doesnt exists, then add.
            if (!settingsContentHeader.querySelector(".settingsBackButton") ) {
                settingsContentHeader.insertAdjacentElement("afterbegin", backButton);
            }
        }
        
        if (settings.getAttribute("evented") === "true") return;
        let settingsButtons = settings.querySelector("div > div > nav > div");
        
        settings.setAttribute("evented", "true");
        settingsButtons.addEventListener("click", (e) => {
            if (e.target.getAttribute("role") === "tab" || e.target.parentElement.getAttribute("role") === "tab") { 
                // alert("tab"); 
                setTimeout(addBackButton, 0);
                setSidebar(false);
            }
        })

        addBackButton();
        setSidebar(true);

    }

    load();
}
