import { data } from "jquery";
import React from "react";

import "../css/style.css";

import { ReactComponent as CloseBtn } from "../img/icons/close-btn.svg";
import { ReactComponent as Hamburger } from "../img/icons/hamburger-menu.svg";
import { ReactComponent as ARBtn } from "../img/icons/ar-btn.svg";
import _ from "lodash";

import artData from "../data.json";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    //remove crown artwork from menu
    // artData.artworks.shift();
    console.log(_.pull);
  }

  // Search function
  searchMenu() {
    const input = document.querySelector(".search");
    let search = input.value;
    // console.log(search);
    const listItems = document.getElementsByClassName("menu-item");
    const listText = document.getElementsByClassName("menu-text");
    // console.log(listText);
    for (let i = 0; i < listItems.length; i++) {
      let textLower = listText[i].textContent.toLowerCase();
      let textUpper = listText[i].textContent.toUpperCase();
      let listItemText = listText[i].textContent;
      //let text = (listText[i].textContent.toLowerCase()) || (listText[i].textContent.toUpperCase());
      //let text = listText[i].textContent.toUpperCase();
      // console.log(text);
      if (
        textLower.includes(search) ||
        textUpper.includes(search) ||
        listItemText.includes(search)
      ) {
        listItems[i].style.display = "initial";
      } else if (
        textLower.includes(search) &&
        textUpper.includes(search) &&
        listItemText.includes(search)
      ) {
        listItems[i].style.display = "initial";
      } else {
        listItems[i].style.display = "none";
      }
    }
  }

  render() {
    return (
      <main className="container">
        <section id="mySidenav" className="sidenav">
          <article className="sticky-side-menu-link">
            <div className="side-menu-header-container">
              <h1 className="menu-title">ARTWORKS</h1>
              <CloseBtn
                className="closebtn"
                onClick={this.props.closeSideMenu}
              />
            </div>
            <input
              className="search"
              type="text"
              name="search"
              placeholder="Search..."
              onKeyUp={this.searchMenu}
            />
          </article>

          <article className="side-menu-link">
            <ul className="menu">
              {artData.artworks
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((artwork) => (
                  <li
                    key={artwork.id}
                    data-id={artwork.id}
                    className="menu-item"
                  >
                    <a
                      href="#"
                      className="menu-text"
                      onClick={() => {
                        this.props.getArtwork(artwork.id);
                        this.props.closeSideMenu();
                      }}
                    >
                      <div>
                        {artwork.name}
                        <br />
                        <span>{artwork.artist}</span>
                      </div>
                      {artwork.ar ? (
                        <ARBtn
                          className="ar-btn"
                          alt="Augmented Reality Experience Button"
                        />
                      ) : (
                        <ARBtn
                          className="ar-btn disabled"
                          alt="Augmented Reality Experience Button"
                        />
                      )}
                    </a>
                  </li>

                  //<li data-id={artwork.id} className="menu-item"><a href="#" className="menu-text" onClick={this.props.getArtwork}>{artwork.name}<br/><span>{artwork.artist}</span></a></li>
                ))}
            </ul>
          </article>
        </section>
        <Hamburger className="hamburger" onClick={this.props.openSideMenu} />
      </main>
    );
  }
} //End of side menu hide and show

export { SideNav as default };
