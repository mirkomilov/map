// ** MUI Imports
import MapView from "@arcgis/core/views/MapView";
import Color from "@arcgis/core/Color.js";
import WebMap from "@arcgis/core/WebMap";
import Handles from "@arcgis/core/core/Handles";
import Portal from "@arcgis/core/portal/Portal";
import Locate from "@arcgis/core/widgets/Locate";
import React from 'react';

const Map = () => {
  let userdata: any;
  userdata = React.useSelector((state: any) => state.userdata);

  new Portal();
  const viewMap = React.useRef<HTMLDivElement>(null);
  /**
   * Userdata from redux store
   * @param {any}
   */

  const handles = new Handles();

  const webmap = new WebMap({
    portalItem: {
      id: "2b37eee0201d4061944a31cc634775a3",
    },
  });

  const color = new Color("rgba(255, 0, 0, 1)")
  const view = new MapView({
    map: webmap,
    highlightOptions: {
      color: color,
      haloOpacity: 0.9,
      fillOpacity: 0,
    },
    popup: {
      autoOpenEnabled: false,
      dockEnabled: true,
      dockOptions: {
        breakpoint: false,
        buttonEnabled: false,
        position: "top-right",
      },
    },
  });

  let locateWidget = new Locate({
    view: view,
  });

  view.ui.add(locateWidget, "top-left");

  /**
   * Appends view to the html div element
   * @function initializeContainer
   * @param container {HTMLDivElement}
   */
  const initializeContainer = (container: HTMLDivElement) => {
    view.container = container;

    view.on("click", function (event) {
      handles.removeAll();

      /**
       * Onclick to the filtered layer fetches features
       * If filter returns an empty array closes popp
       * @param {any}
       */
      view.popup.close();
    })
  };

  React.useEffect(() => {
    if (userdata.loggedIn) {
      if (viewMap && viewMap.current) {
        initializeContainer(viewMap.current);
      }
    }
  }, [userdata.loggedIn]);

  return (
    <>
      <div
        className="w-full h-full"
        ref={viewMap as React.RefObject<HTMLDivElement>}
      ></div>
      <div className="widgets"></div>
    </>
  );
}

export default Map
