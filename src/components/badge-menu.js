import React from "react";

import "../css/style.css";

import { ReactComponent as CloseBtn } from "../img/icons/close-btn.svg";
import { ReactComponent as BadgeMenuIcon } from "../img/icons/badge-btn.svg";
import Badge from "./badge.js";

// import BlueBadge from "../img/badges/badge_crown.svg";
import GreenBadge from "../img/badges/badge_grace.svg";
import GreenTwoBadge from "../img/badges/badge_groupportrait.svg";
import OrangeBadge from "../img/badges/badge_reverb.svg";
// import PurpleBadge from "../img/badges/badge_rivertree.svg";
// import RedBadge from "../img/badges/badge_silentbells.svg";
import YellowBadge from "../img/badges/badge_upstartII.svg";
import GreyBadge from "../img/temp_badges/badge_grey.svg";

//* For mobile control
const mediaQuery = window.matchMedia("(max-width: 820px)");
let mobile = false;

// check if menu is open
// let badgeMenuOpen = false;
// let badgeMenuSelector = document.querySelector(".badgeParent").style.width;
// if (badgeMenuSelector === "40%" || badgeMenuSelector === "100%") {
//     badgeMenuOpen = true;
// } else {
//     badgeMenuOpen = false;
// }

function mobileChange(e) {
  // Check media size to be true
  if (e.matches) {
    mobile = true;
  } else {
    mobile = false;
  }
}

// Register event listener
window.addEventListener("load", mobileChange(mediaQuery));

class BadgeMenu extends React.Component {
  constructor() {
    super();
    const localBadgeArray = JSON.parse(
      localStorage.getItem("VisitedArray") || "[]"
    );
    if (localBadgeArray.length === 0) {
      this.state = {
        badgeArray: [
          // { color: BlueBadge, visited: false, id: 1 },
          { color: GreenBadge, visited: false, id: 2 },
          { color: GreenTwoBadge, visited: false, id: 3 },
          { color: OrangeBadge, visited: false, id: 4 },
          // { color: PurpleBadge, visited: false, id: 5 },
          { color: YellowBadge, visited: false, id: 6 },
          // {color: RedBadge, visited:false, id: 7},
          // {color: GreyBadge, visited:false, id: 8},
        ],
      };
    } else {
      this.state = {
        badgeArray: localBadgeArray,
      };
    }

    this.onClick = this.onClick.bind(this);
    this.openBadgeMenu = this.openBadgeMenu.bind(this);
  }

  openBadgeMenu() {

    //clear badge notification
    document.querySelector(".badgeMenuNotification").style.display = "none";

    if (mobile) {
      document.getElementById("badgePassportCard").style.width = "100%";
      document.querySelector(".badgeMenuBtn").style.display = "none";
      // document.querySelector('.marker').style.fill = "#005113";
    } else {
      document.getElementById("badgePassportCard").style.width = "40%";
    }

    let newBadgeArray = this.state.badgeArray.slice();
    let index;
    console.log(this.props.artworksVisited)
    //loop through all artworks to check if they have been visited
    for (let element of this.props.artworksVisited) {
      if (element.visited) {
        if(element.id == 6){
          index = 3;
        }else{
          index = element.id - 2;
        }
        newBadgeArray[index].visited = true;
        localStorage.setItem("VisitedArray", JSON.stringify(newBadgeArray));
        this.setState({
          badgeArray: newBadgeArray,
        });
      }
    }

    this.props.closePullUpMenu();
    this.props.closeSideMenu();
  }

  // closeBadgeMenu() {
  //     document.querySelector('.badgeParent').style.width = "0";
  //     document.querySelector('.badgeMenuBtn').style.display = "unset";
  // }

  onClick(event) {
    // console.log(event)
    // let newBadgeArray = this.state.badgeArray.slice();
    // let index = event.target.getAttribute("data-id") - 1;
    // newBadgeArray[index].visited = true;
    // localStorage.setItem('VisitedArray', JSON.stringify(newBadgeArray))
    // this.setState({
    //     badgeArray : newBadgeArray
    // })
  }

  render() {
    return (
      <main>
        <section className="badgeParent" id="badgePassportCard">
          <article className="badgeheader">
            <CloseBtn
              className="badgeCloseBtn"
              onClick={this.props.closeBadgeMenu}
            />
            <h1>BADGES</h1>
          </article>
          <article className="badgeInfo">
            <p>
              Collect a unique badge at each artwork! Once you've collected them
              all, show this page at the Robert Mclaughlin Gallery for a free
              prize!
            </p>
          </article>
          <article className="badgeContainer">
            {/* removing crown from badge */}
            {/* <Badge
              badge={this.state.badgeArray[0]}
              onBadgeClick={this.onClick}
            /> */}
            <Badge
              badge={this.state.badgeArray[0]}
              onBadgeClick={this.onClick}
            />
            <Badge
              badge={this.state.badgeArray[1]}
              onBadgeClick={this.onClick}
            />
            <Badge
              badge={this.state.badgeArray[2]}
              onBadgeClick={this.onClick}
            />
            {
            //river tree
            /* <Badge
              badge={this.state.badgeArray[4]}
              onBadgeClick={this.onClick}
            /> */}
            <Badge
              badge={this.state.badgeArray[3]}
              onBadgeClick={this.onClick}
            />
            {/* <Badge badge={this.state.badgeArray[6]} onBadgeClick={this.onClick} />
                        <Badge badge={this.state.badgeArray[7]} onBadgeClick={this.onClick} /> */}
          </article>
        </section>
        <div className="badgeBtnContainer">
          <BadgeMenuIcon
            className="badgeMenuBtn"
            onClick={this.openBadgeMenu}
          />
        </div>
        <span className="badgeMenuNotification"></span>
      </main>
    );
  }
}

export { BadgeMenu as default };
