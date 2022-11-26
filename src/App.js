import logo from "./logo.svg";
import SideNav from "./components/side-nav.js";
import "./App.css";
import React, { useRef, useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import PullMenu from "./components/pullup-menu.js";
import BadgeMenu from "./components/badge-menu.js";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import LogoPage from "./components/logo.js";
import data from "./data.json";
import { gsap } from "gsap";
import { isCompositeComponent } from "react-dom/test-utils";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY3RoZXJpYXVsdDk3IiwiYSI6ImNremgycWY2cjI1c2Eydmt1MHRjZDhmN24ifQ.R_TgJcYa-2HWW-Yz8ca2-g";

function App() {
  let appTesting = true; //! change to false to activate position distance checking for badges, change to true for testing/debugging
  let userLng;
  let userLat;
  let distanceFromWaypoint = 0.00014; //distance needed to be from waypoint to collect a badge (14 meters)

  let menuUp = true;
  let sideMenuOpen = false;
  let badgeMenuOpen = false;
  let captOpen = false;

  //artwork state variables
  let [artwork_id, setId] = useState("0");
  let [artwork_artist, setArtist] = useState("");
  let [artwork_year, setYear] = useState("");
  let [artwork_material, setMaterial] = useState("");
  let [artwork_title, setTitle] = useState("The Robert McLaughlin Gallery");
  let [artwork_description, setDescription] = useState(
    "The Robert McLaughlin Gallery is a public art gallery in Oshawa, Ontario, Canada. It is the largest public art gallery in the Regional Municipality of Durham, of which Oshawa is a part. The gallery houses a significant collection of Canadian contemporary and modern artwork."
  );
  let [artwork_audio, setAudio] = useState("");
  let [artworks_visited, setVisited] = useState([]);
  let [artworks_current, setCurrent] = useState(true);
  let [artwork_captions, setCaptions] = useState("");
  let [artwork_funFacts, setFunFacts] = useState("");
  let [playing, playAudio] = useState(false);

  

  const bounds = [
    [-79.01808046351204, 43.82294908585224], // Southwest coordinates 43.82294908585224, -79.01808046351204
    [-78.70133897188, 43.963409442018026], // Northeast coordinates 43.97868894806841, -78.61396666057524/ 43.963409442018026, -78.70133897188
  ];

  // object for storing pin artwork data
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-78.866266, 43.89484],
        },
        properties: {
          title: `${data.artworks[0].name}`,
          artist: `${data.artworks[0].artist}`,
          year: `${data.artworks[0].year}`,
          material: `${data.artworks[0].material}`,
          description: `${data.artworks[0].description}`,
          audio: `${data.artworks[0].audioFile}`,
          caption: `${data.artworks[0].caption}`,
          funFacts: `${data.artworks[0].funFacts}`,
        },
        id: 1,
        visited: false,
        qr_url: "https://rmgpublicart.ca/Map/?artwork=crown",
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-78.865741, 43.894815],
        },
        properties: {
          title: `${data.artworks[1].name}`,
          artist: `${data.artworks[1].artist}`,
          year: `${data.artworks[1].year}`,
          material: `${data.artworks[1].material}`,
          description: `${data.artworks[1].description}`,
          audio: `${data.artworks[1].audioFile}`,
          caption: `${data.artworks[1].caption}`,
          funFacts: `${data.artworks[1].funFacts}`,
        },
        id: 2,
        visited: false,
        qr_url: "https://rmgpublicart.ca/Map/?artwork=grace",
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-78.86597335338594, 43.89517103523595],
        },
        properties: {
          title: `${data.artworks[2].name}`,
          artist: `${data.artworks[2].artist}`,
          year: `${data.artworks[2].year}`,
          material: `${data.artworks[2].material}`,
          description: `${data.artworks[2].description}`,
          audio: `${data.artworks[2].audioFile}`,
          caption: `${data.artworks[2].caption}`,
          funFacts: `${data.artworks[2].funFacts}`,
        },
        id: 3,
        visited: false,
        qr_url:
          "https://rmgpublicart.ca/Map/?artwork=group-portrait-1957",
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-78.860214, 43.897024],
        },
        properties: {
          title: `${data.artworks[3].name}`,
          artist: `${data.artworks[3].artist}`,
          year: `${data.artworks[3].year}`,
          material: `${data.artworks[3].material}`,
          description: `${data.artworks[3].description}`,
          audio: `${data.artworks[3].audioFile}`,
          caption: `${data.artworks[3].caption}`,
          funFacts: `${data.artworks[3].funFacts}`,
        },
        id: 4,
        visited: false,
        qr_url: "https://rmgpublicart.ca/Map/?artwork=reverb",
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-78.8665, 43.895025],
        },
        properties: {
          title: `${data.artworks[4].name}`,
          artist: `${data.artworks[4].artist}`,
          year: `${data.artworks[4].year}`,
          material: `${data.artworks[4].material}`,
          description: `${data.artworks[4].description}`,
          audio: `${data.artworks[4].audioFile}`,
          caption: `${data.artworks[4].caption}`,
          funFacts: `${data.artworks[4].funFacts}`,
        },
        id: 5,
        visited: false,
        qr_url:
          "https://rmgpublicart.ca/Map/?artwork=river-tree-bench",
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-78.86563330735321, 43.8953898565125],
        },
        properties: {
          title: `${data.artworks[5].name}`,
          artist: `${data.artworks[5].artist}`,
          year: `${data.artworks[5].year}`,
          material: `${data.artworks[5].material}`,
          description: `${data.artworks[5].description}`,
          audio: `${data.artworks[5].audioFile}`,
          caption: `${data.artworks[5].caption}`,
          funFacts: `${data.artworks[5].funFacts}`,
        },
        id: 6,
        visited: false,
        qr_url: "https://rmgpublicart.ca/Map/?artwork=upstart-ii",
      },
    ],
  };

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.866266);
  const [lat, setLat] = useState(43.89484);
  const [zoom, setZoom] = useState(17);

  //*** responsive control (for handling side menu size) ***
  const mediaQuery = window.matchMedia("(max-width: 820px)");
  const mobileWidth = 820;
  let mobile = false;

  // handle load window event for mobile vs desktop
  function handleMobileChange(e) {
    // Check if the media query is true
    if (e.matches) {
      // window is mobile sized
      mobile = true;
    } else {
      // window is desktop sized
      mobile = false;
    }
  }

  // handle window resize event
  function mobileChangeOnResize() {
    if (mobileWidth > window.innerWidth) {
      // window is mobile sized
      mobile = true;
    } else {
      // window is desktop sized
      mobile = false;
    }
  }

  // Register event listener
  window.addEventListener("load", handleMobileChange(mediaQuery));
  // Register event listener
  window.addEventListener("resize", mobileChangeOnResize);

  // load map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    //when map loads
    map.current.on("load", () => {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(setLocation);
      }, 3000);
    });

    // add map navigations
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // add location control
    const locateTheUser = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true, //have high accuracy for tracking position
      },
      trackUserLocation: true, //always be tracking the position of the user for updates on movement
      showUserHeading: true, //show where the user is looking
    });

    map.current.addControl(locateTheUser, "top-right"); //add control for getting position of user

    async function makePathToArtwork(coord) {
      //update user position
      navigator.geolocation.getCurrentPosition(setLocation);

      //if the user has allowed their position to be tracked
      if (userLat && userLng) {
        let getPath = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${userLng},${userLat};${coord[0]},${coord[1]}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiY3RoZXJpYXVsdDk3IiwiYSI6ImNremgycWY2cjI1c2Eydmt1MHRjZDhmN24ifQ.R_TgJcYa-2HWW-Yz8ca2-g`,
          { method: "GET" }
        );

        let path = await getPath.json();
        let pathInfo = path.routes[0];
        let directions = pathInfo.geometry.coordinates;
        let mapData = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: directions,
          },
        };

        if (map.current.getSource("directions")) {
          map.current.getSource("directions").setData(mapData);
        } else {
          map.current.addLayer({
            id: "directions",
            type: "line",
            source: {
              type: "geojson",
              data: mapData,
            },
            paint: {
              "line-color": "#002A66",
              "line-width": 4,
              "line-opacity": 0.75,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
          });
        }
      }
    }

    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = `marker-unvisited marker-${feature.id}`;
      el.onclick = () => {
        setArtist(
          (artwork_artist = feature.properties.artist),
          setYear((artwork_year = feature.properties.year)),
          setMaterial((artwork_material = feature.properties.material)),
          setTitle(
            (artwork_title = feature.properties.title),
            setDescription(
              (artwork_description = feature.properties.description),
              setAudio(
                (artwork_audio = feature.properties.audio),
                setCaptions(
                  (artwork_captions = feature.properties.caption),
                  setId((artwork_id = feature.id)),
                  setFunFacts((artwork_funFacts = feature.properties.funFacts))
                )
              )
            )
          )
        );

        let current = document.querySelector('.current-marker')
        if(current){
          current.classList.remove("current-marker")
        }
        el.classList.add("current-marker")
        //if the waypoint hasn't been visited
        if (!feature.visited) {
          //! change appTesting to true if not testing
          if (!appTesting) {
            //! ** Start of distance check function **
            //! This function checks if the user is within 15 meters of a waypoint
            //! Then they are given a badge if so
            //! This function should be used with the launch of the app
            //check user's latitude and longitude distance from waypoint
            if (
              userLng >=
                feature.geometry.coordinates[0] - distanceFromWaypoint &&
              userLng <= feature.geometry.coordinates[0] + distanceFromWaypoint
            ) {
              if (
                userLat >=
                  feature.geometry.coordinates[1] - distanceFromWaypoint &&
                userLat <=
                  feature.geometry.coordinates[1] + distanceFromWaypoint
              ) {
                //add the marker claimed id to the marker
                el.classList.add("marker-claimed");
                el.classList.remove("marker-unvisited");
                //set the waypoint to visited
                setVisited((artworks_visited) =>{
                  artworks_visited.concat({ visited: true, id: feature.id })
                  console.log(artworks_visited)
                }
                );
                document.querySelector(".badgeMenuNotification").style.display =
                  "unset"; //show the notification on the badge menu
                feature.visited = true;
              }
            }
            //! ** End of distance function **
          } else {
            //! waypoint visit testing
            //add the marker claimed id to the marker
            el.classList.add("marker-claimed");
            el.classList.remove("marker-unvisited");
            //set the waypoint to visited
            setVisited((artworks_visited) =>
              artworks_visited.concat({ visited: true, id: feature.id })
            );
            document.querySelector(".badgeMenuNotification").style.display =
              "unset"; //show the notification on the badge menu
            feature.visited = true;
          }
        }

        // open the pull up menu
        openPullUpMenu("");
        // close all other menus
        closeSideMenu();
        closeBadgeMenu();

        //get the position of the artwork waypoint
        const artworkPosition = Object.keys(feature.geometry.coordinates).map(
          (position) => feature.geometry.coordinates[position]
        );

        //set the navigation for the user to the waypoint
        makePathToArtwork(artworkPosition);
      };

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map.current);
    }

    //function to set the location of the user for navigation
    function setLocation(p) {
      userLat = p.coords.latitude;
      userLng = p.coords.longitude;
    }

    //add click listener for map canvas to close menu when map is clicked
    document.querySelector(".mapboxgl-canvas").addEventListener("click", () => {
      // close all menus
      if (menuUp) {
        document.querySelector(".wrapper").style.height = "10%";
        // remove blur from map
        document.querySelector(".map-container").style.webkitFilter =
          "blur(0px)";
        window.Howler.stop(); //stop all audio once menu is closed
        // arrow rotate
        document.querySelector(".panel-toggle").style.transform =
          "rotate(181deg)";
        menuUp = false;
      }
      closeBadgeMenu();
      closeSideMenu();
    });
  });

  //homepath for the app
  let homePath = "https://rmgpublicart.ca/";

  // open pull up menu
  function openPullUpMenu(qrCode) {
    for (const feature of geojson.features) {
      if (qrCode == feature.qr_url) {
        //when map loads
        map.current.on("load", () => {
          //grab the marker that is tied to the qr code
          let qrMarker = document.querySelector(`.marker-${feature.id}`);

          //fly to the waypoint that the QR code loads
          map.current.flyTo({
            center: [
              feature.geometry.coordinates[0],
              feature.geometry.coordinates[1],
            ],
            zoom: 19,
            essential: true,
          });

          //add the marker claimed id to the marker
          qrMarker.id = "marker-claimed";
          //if the waypoint hasn't been visited
          if (!feature.visited) {
            //set the waypoint to visited
            setVisited((artworks_visited) =>
              artworks_visited.concat({ visited: true, id: feature.id })
            );
            document.querySelector(".badgeMenuNotification").style.display =
              "unset"; //show the notification on the badge menu
            feature.visited = true;
          }
        });

        //set data for the pull-up menu
        setArtist(
          (artwork_artist = feature.properties.artist),
          setYear((artwork_year = feature.properties.year)),
          setMaterial((artwork_material = feature.properties.material)),
          setTitle(
            (artwork_title = feature.properties.title),
            setDescription(
              (artwork_description = feature.properties.description),
              setAudio(
                (artwork_audio = feature.properties.audio),
                setCaptions(
                  (artwork_captions = feature.properties.caption),
                  setId((artwork_id = feature.id),
                  setFunFacts((artwork_funFacts = feature.properties.funFacts)))
                )
              )
            )
          )
        );
      }
    }

    //call the close menu function
    closeSideMenu();
    menuUp = true;
    closeBadgeMenu();

    document.querySelector(".wrapper").style.height = "85%";
    // add blur to map container
    document.querySelector(".map-container").style.webkitFilter = "blur(5px)";
    // arrow rotate
    document.querySelector(".panel-toggle").style.transform = "rotate(0deg)";

    handleControlsDisplay();

    //set audio playing to false
    handlePause();
  }

  //function to close pull-up menu
  function closePullUpMenu() {
    document.querySelector(".wrapper").style.height = "10%";
    // remove blur from map
    document.querySelector(".map-container").style.webkitFilter = "blur(0px)";
    window.Howler.stop(); //stop all audio once menu is closed
    // arrow rotate
    document.querySelector(".panel-toggle").style.transform = "rotate(181deg)";
    menuUp = false;
  }

  //function to handle pull-up menu state
  function handlePullUpMenu() {
    if (menuUp) {
      closePullUpMenu();
      menuUp = false;
    } else {
      openPullUpMenu("");
      menuUp = true;
    }
  }

  // function to close side menu
  function closeSideMenu() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".hamburger").style.display = "unset";
    sideMenuOpen = false;
  }

  // function to open side menu
  function openSideMenu() {
    // check if on mobile device
    if (mobile) {
      document.getElementById("mySidenav").style.width = "100%";
      document.querySelector(".hamburger").style.display = "none";
    } else {
      document.getElementById("mySidenav").style.width = "40%";
    }
    closePullUpMenu();
    closeBadgeMenu();
    menuUp = false;

    //add click listener for map canvas to close menu when map is clicked
    document.querySelector(".mapboxgl-canvas").addEventListener("click", () => {
      // close all menus
      if (menuUp) {
        closePullUpMenu();
        menuUp = false;
      }
      closeBadgeMenu();
      closeSideMenu();
    });
  }

  // function to close badge menu
  function closeBadgeMenu() {
    document.querySelector(".badgeParent").style.width = "0";
    document.querySelector(".badgeMenuBtn").style.display = "unset";
    badgeMenuOpen = false;
  }

  // function to get artwork details from side menu
  function getArtwork(id) {
    handleControlsDisplay();
    // match list item id to geojson data
    for (const feature of geojson.features) {
      if (id == feature.id) {
        let qr = feature.qr_url;

        //fly to the waypoint that the sideNav loads
        map.current.flyTo({
          center: [
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1],
          ],
          zoom: 19,
          essential: true,
        });

        // open specific pull up menu
        openPullUpMenu(qr);
      }
    }
    sideMenuOpen = false;
    menuUp = true;
  }

  //* functions for retrieving captions

  // function to open captions
  function openCaptions() {
    document.querySelector("#Rectangle_96").classList.add("active");
    document.querySelector("#CC").classList.add("active");
    document.querySelector(".artworkCaption").style.animation =
      "captionOpenAnimation 0.5s";
    document.querySelector(".artworkCaption").style.display = "block";
    document.querySelector(".artworkCaption").style.opacity = "1";
    // document.querySelector(".artworkCaption").style.height = "100%";
    captOpen = true;
  }

  //function to close captions
  function closeCaptions() {
    document.querySelector("#Rectangle_96").classList.remove("active");
    document.querySelector("#CC").classList.remove("active");
    document.querySelector(".artworkCaption").style.animation =
      "captionCloseAnimation 0.5s";
    document.querySelector(".artworkCaption").style.display = "none";
    document.querySelector(".artworkCaption").style.opacity = "0";
    // document.querySelector(".artworkCaption").style.height = "0";
    captOpen = false;
  }

  function handleCaptions() {
    if (captOpen) {
      closeCaptions();
      captOpen = false;
    } else {
      openCaptions();
      captOpen = true;
    }
  }

  // determine whether audio controls should be displayed
  function handleControlsDisplay() {
    // check if artist field is empty
    // if (artwork_artist != "") {
    //   document.querySelector(".name-artist").style.display = "block";
    //   document.querySelector(".media-icons-container").style.display = "flex";
    // }
  }

  //* audio button controls

  //play button
  function handlePlay() {
    playAudio(true);
    document.getElementById("playButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "unset";
  }

  //pause button
  function handlePause() {
    playAudio(false);
    document.getElementById("playButton").style.display = "unset";
    document.getElementById("pauseButton").style.display = "none";
  }

  //on window load
  window.onload = () => {
    //check for qr code url
    let chosenArtwork = window.location.href;
    closePullUpMenu();
    if (window.location.href != homePath) {
      //open menu corresponding to the qr code
      openPullUpMenu(chosenArtwork);
    }
    handleControlsDisplay();
  };
  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" />
      <SideNav
        getArtwork={getArtwork}
        openSideMenu={openSideMenu}
        closeSideMenu={closeSideMenu}
      />
      <BadgeMenu
        artId={artwork_id}
        artworkValues={geojson.features}
        artworksVisited={artworks_visited}
        closeBadgeMenu={closeBadgeMenu}
        closePullUpMenu={closePullUpMenu}
        closeSideMenu={closeSideMenu}
      />
      <PullMenu
        arrowClick={handlePullUpMenu}
        captionClick={handleCaptions}
        audioState={playing}
        audioPlay={handlePlay}
        audioPause={handlePause}
        artId={artwork_id}
        artYear={artwork_year}
        artMaterial={artwork_material}
        artTitle={artwork_title}
        artistName={artwork_artist}
        artDescription={artwork_description}
        artAudio={artwork_audio}
        artFunFacts={artwork_funFacts}
        artCaptions={artwork_captions}
      />
      <LogoPage />
    </div>
  );
}

export default App;
