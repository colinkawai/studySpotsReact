(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{23:function(e,t,a){},233:function(e,t,a){"use strict";a.r(t);var n,i=a(0),o=a.n(i),r=a(6),s=a.n(r),l=(a(60),a(18)),c=a.n(l),u=a(50),p=a(10),d=a(11),m=a(13),h=a(12),g=a(3),f=a(14),v=a(30),b=a(1),C=a.n(b),k=function(e){return e.split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join("")},E=(a(23),0),O=a(75),y="undefined"!==typeof O&&O._scriptMap||new Map,w=((n=O)._scriptMap=n._scriptMap||y,a(27)),j=a(29),M=["click","dblclick","dragend","mousedown","mouseout","mouseover","mouseup","recenter"],L=function(e){function t(){return Object(p.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.markerPromise=function(){var e={},t=new Promise((function(t,a){e.resolve=t,e.reject=a}));return e.then=t.then.bind(t),e.catch=t.catch.bind(t),e.promise=t,e}(),this.renderMarker()}},{key:"componentDidUpdate",value:function(e){this.props.map===e.map&&this.props.position===e.position&&this.props.icon===e.icon||(this.marker&&this.marker.setMap(null),this.renderMarker())}},{key:"componentWillUnmount",value:function(){this.marker&&this.marker.setMap(null)}},{key:"renderMarker",value:function(){var e=this,t=this.props,a=t.map,n=t.google,i=t.position,o=t.mapCenter,r=t.icon,s=t.label,l=t.draggable,c=t.title,u=Object(j.a)(t,["map","google","position","mapCenter","icon","label","draggable","title"]);if(!n)return null;var p=i||o;p instanceof n.maps.LatLng||(p=new n.maps.LatLng(p.lat,p.lng));var d=Object(w.a)({map:a,position:p,icon:r,label:s,title:c,draggable:l},u);this.marker=new n.maps.Marker(d),M.forEach((function(t){e.marker.addListener(t,e.handleEvent(t))})),this.markerPromise.resolve(this.marker)}},{key:"getMarker",value:function(){return this.markerPromise}},{key:"handleEvent",value:function(e){var t=this;return function(a){var n="on".concat(k(e));t.props[n]&&t.props[n](t.props,t.marker,a)}}},{key:"render",value:function(){return null}}]),t}(o.a.Component);M.forEach((function(e){return L.propTypes[e]=C.a.func})),L.defaultProps={name:"Marker"};var S=a(32),P=a.n(S),I=function(e){function t(){return Object(p.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.renderInfoWindow()}},{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.google,n=t.map;a&&n&&(n!==e.map&&this.renderInfoWindow(),this.props.position!==e.position&&this.updatePosition(),this.props.children!==e.children&&this.updateContent(),this.props.visible===e.visible&&this.props.marker===e.marker&&this.props.position===e.position||(this.props.visible?this.openWindow():this.closeWindow()))}},{key:"renderInfoWindow",value:function(){var e=this.props,t=(e.map,e.google),a=(e.mapCenter,Object(j.a)(e,["map","google","mapCenter"]));if(t&&t.maps){var n=this.infowindow=new t.maps.InfoWindow(Object(w.a)({content:""},a));t.maps.event.addListener(n,"closeclick",this.onClose.bind(this)),t.maps.event.addListener(n,"domready",this.onOpen.bind(this))}}},{key:"onOpen",value:function(){this.props.onOpen&&this.props.onOpen()}},{key:"onClose",value:function(){this.props.onClose&&this.props.onClose()}},{key:"openWindow",value:function(){this.infowindow.open(this.props.map,this.props.marker)}},{key:"updatePosition",value:function(){var e=this.props.position;e instanceof window.google.maps.LatLng||(e=e&&new window.google.maps.LatLng(e.lat,e.lng)),this.infowindow.setPosition(e)}},{key:"updateContent",value:function(){var e=this.renderChildren();this.infowindow.setContent(e)}},{key:"closeWindow",value:function(){this.infowindow.close()}},{key:"renderChildren",value:function(){var e=this.props.children;return P.a.renderToString(e)}},{key:"render",value:function(){return null}}]),t}(o.a.Component);I.defaultProps={visible:!1};var D={position:"absolute",width:"100%",height:"100%"},N={position:"absolute",left:0,right:0,bottom:0,top:0},W=["ready","click","dragend","recenter","bounds_changed","center_changed","dblclick","dragstart","heading_change","idle","maptypeid_changed","mousemove","mouseout","mouseover","projection_changed","resize","rightclick","tilesloaded","tilt_changed","zoom_changed"],R=function(e){function t(e){var a;if(Object(p.a)(this,t),a=Object(m.a)(this,Object(h.a)(t).call(this,e)),!e.hasOwnProperty("google"))throw new Error("You must include a `google` prop");return a.listeners={},a.state={currentLocation:{lat:a.props.initialCenter.lat,lng:a.props.initialCenter.lng}},a.mapRef=o.a.createRef(),a.handleChange=a.handleChange.bind(Object(g.a)(a)),a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"handleChange",value:function(){var e=this.state.currentLocation.lat,t=this.state.currentLocation.lng;this.props.onLocationChange(e,t)}},{key:"componentDidMount",value:function(){var e=this;this.props.centerAroundCurrentLocation&&navigator&&navigator.geolocation&&(this.geoPromise=function(e){var t=!1;return{promise:new Promise((function(a,n){e.then((function(e){return t?n({isCanceled:!0}):a(e)})),e.catch((function(e){return n(t?{isCanceled:!0}:e)}))})),cancel:function(){t=!0}}}(new Promise((function(e,t){navigator.geolocation.getCurrentPosition(e,t)}))),this.geoPromise.promise.then((function(t){var a=t.coords;e.setState({currentLocation:{lat:a.latitude,lng:a.longitude}})})).catch((function(e){return e}))),this.loadMap()}},{key:"componentDidUpdate",value:function(e,t){e.google!==this.props.google&&this.loadMap(),this.props.visible!==e.visible&&this.restyleMap(),this.props.zoom!==e.zoom&&this.map.setZoom(this.props.zoom),this.props.center!==e.center&&this.setState({currentLocation:this.props.center}),t.currentLocation!==this.state.currentLocation&&(this.recenterMap(),this.handleChange()),this.props.bounds&&this.props.bounds!==e.bounds&&this.map.fitBounds(this.props.bounds)}},{key:"componentWillUnmount",value:function(){var e=this,t=this.props.google;this.geoPromise&&this.geoPromise.cancel(),Object.keys(this.listeners).forEach((function(a){t.maps.event.removeListener(e.listeners[a])}))}},{key:"loadMap",value:function(){var e=this;if(this.props&&this.props.google){var t=this.props.google.maps,a=this.mapRef.current,n=s.a.findDOMNode(a),i=this.state.currentLocation,o=new t.LatLng(i.lat,i.lng),r=this.props.google.maps.MapTypeId||{},l=String(this.props.mapType).toUpperCase(),c=Object.assign({},{mapTypeId:r[l],center:o,zoom:this.props.zoom,maxZoom:this.props.maxZoom,minZoom:this.props.minZoom,clickableIcons:!!this.props.clickableIcons,disableDefaultUI:this.props.disableDefaultUI,zoomControl:this.props.zoomControl,zoomControlOptions:this.props.zoomControlOptions,mapTypeControl:this.props.mapTypeControl,mapTypeControlOptions:this.props.mapTypeControlOptions,scaleControl:this.props.scaleControl,streetViewControl:this.props.streetViewControl,streetViewControlOptions:this.props.streetViewControlOptions,panControl:this.props.panControl,rotateControl:this.props.rotateControl,fullscreenControl:this.props.fullscreenControl,scrollwheel:this.props.scrollwheel,draggable:this.props.draggable,draggableCursor:this.props.draggableCursor,keyboardShortcuts:this.props.keyboardShortcuts,disableDoubleClickZoom:this.props.disableDoubleClickZoom,noClear:this.props.noClear,styles:this.props.styles,gestureHandling:this.props.gestureHandling});Object.keys(c).forEach((function(e){null===c[e]&&delete c[e]})),this.map=new t.Map(n,c),W.forEach((function(t){e.listeners[t]=e.map.addListener(t,e.handleEvent(t))})),t.event.trigger(this.map,"ready"),this.forceUpdate()}}},{key:"handleEvent",value:function(e){var t,a=this,n="on".concat(k(e));return function(e){t&&(clearTimeout(t),t=null),t=setTimeout((function(){a.props[n]&&a.props[n](a.props,a.map,e)}),0)}}},{key:"recenterMap",value:function(){var e=this.map,t=this.props.google;if(t){var a=t.maps;if(e){var n=this.state.currentLocation;n instanceof t.maps.LatLng||(n=new t.maps.LatLng(n.lat,n.lng)),e.setCenter(n),a.event.trigger(e,"recenter")}}}},{key:"restyleMap",value:function(){this.map&&this.props.google.maps.event.trigger(this.map,"resize")}},{key:"renderChildren",value:function(){var e=this,t=this.props.children;if(t)return o.a.Children.map(t,(function(t){if(t)return o.a.cloneElement(t,{map:e.map,google:e.props.google,mapCenter:e.state.currentLocation})}))}},{key:"render",value:function(){Object.assign({},N,this.props.style,{display:this.props.visible?"inherit":"none"}),this.state.currentLocation;var e=Object.assign({},D,this.props.containerStyle);return o.a.createElement("div",{style:e,className:this.props.className},o.a.createElement("div",{style:{height:"100%",width:"100%"},ref:this.mapRef},"Loading map..."),this.renderChildren())}}]),t}(o.a.Component);W.forEach((function(e){return R.propTypes[k(e)]=C.a.func})),R.defaultProps={zoom:14,initialCenter:{lat:37.774929,lng:-122.419416},center:{},centerAroundCurrentLocation:!1,style:{},containerStyle:{},visible:!0};var T=R,q=a(19),x=a.n(q),A=("".concat("drvg4LDqYomYiPGMoBJ9qKRuVnst3Vw-WZUsodT4eW3z82VAuV1cQY34Dd3-Vyql7wqJoW7nG8ab24yWnFEbqQiKnP5hHFEFA008lyAfUPvCJEoEMvjK5tQoTlxLXnYx"),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).onMarkerClick=function(e,t,n){a.props.onMarkerClick(e,t,n)},a.onMapClicked=function(e){a.props.showingInfoWindow&&a.props.onMapClicked()},a.locationChange=a.locationChange.bind(Object(g.a)(a)),a.onMapClicked=a.onMapClicked.bind(Object(g.a)(a)),a.centerMoved=a.centerMoved.bind(Object(g.a)(a)),a.onMarkerClick=a.onMarkerClick.bind(Object(g.a)(a)),a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"centerMoved",value:function(e,t){this.props.centerMoved(e,t)}},{key:"locationChange",value:function(e,t){this.props.handleLocationChange(e,t)}},{key:"render",value:function(){for(var e=this.props.names,t=this.props.locations,a=this.props.addresses,n=this.props.ratings,i=this.props.activeMarker,r=this.props.showingInfoWindow,s=this.props.selectedPlace,l=[],c=0;c<e.length;c++)l.push(o.a.createElement(v.Marker,{onClick:this.onMarkerClick,title:e[c],name:e[c],position:{lat:t[c].latitude,lng:t[c].longitude},addresses:a[c],ratings:n[c]}));return(o.a.createElement("div",null,o.a.createElement(T,{centerAroundCurrentLocation:!0,google:this.props.google,style:{width:"100%",height:"100%",position:"relative"},className:"map",zoom:14,onClick:this.onMapClicked,onDragend:this.centerMoved,onLocationChange:this.locationChange},l,o.a.createElement(v.InfoWindow,{marker:i,visible:r},o.a.createElement("div",null,o.a.createElement("h1",null,s.name),o.a.createElement("h2",null,"Yelp Rating: ",s.ratings,"/5"),o.a.createElement("h3",null,s.addresses))))))}}]),t}(i.Component)),z=Object(v.GoogleApiWrapper)({apiKey:"AIzaSyBFUHG2hhGRTX-FTfz3nwMMNPXKHvqGxZ8"})(A),V=(a(92),a(7)),F=a(234),U=a(241),Y=a(235),_=a(236),B=a(237),J=a(9),K=a.n(J),Z=function(e){var t=e.buttonLabel,a=e.className,n=e.names,r=(e.ratings,e.placeID),s=Object(i.useState)(0),l=Object(V.a)(s,2),c=l[0],u=l[1],p=Object(i.useState)(0),d=Object(V.a)(p,2),m=d[0],h=d[1],g=Object(i.useState)(0),f=Object(V.a)(g,2),v=f[0],b=f[1],C=Object(i.useState)(0),k=Object(V.a)(C,2),E=k[0],O=k[1],y=Object(i.useState)(0),w=Object(V.a)(y,2),j=w[0],M=w[1],L=Object(i.useState)(!1),S=Object(V.a)(L,2),P=(S[0],S[1]),I=Object(i.useState)(""),D=Object(V.a)(I,2),N=(D[0],D[1]),W=Object(i.useState)(!1),R=Object(V.a)(W,2),T=R[0],q=R[1],A=function(){return q(!T)},z="http://localhost:3001/api/getDataAverage/"+r;return o.a.createElement("div",null,o.a.createElement(F.a,{color:"danger",onClick:function(){x.a.get(z).then((function(e){u(e.data.data[0].averageSeatRating),h(e.data.data[0].averageComfortRating),b(e.data.data[0].averageInternetRating),O(e.data.data[0].averageNoiseRating),M(e.data.data[0].averageOutletRating)})).catch((function(e){console.log(e)})),x.a.get("https://cors-anywhere.herokuapp.com/".concat("https://api.yelp.com/v3/businesses/",r),{headers:{Authorization:"Bearer ".concat("drvg4LDqYomYiPGMoBJ9qKRuVnst3Vw-WZUsodT4eW3z82VAuV1cQY34Dd3-Vyql7wqJoW7nG8ab24yWnFEbqQiKnP5hHFEFA008lyAfUPvCJEoEMvjK5tQoTlxLXnYx")}}).then((function(e){P(e.data.hours[0].is_open_now),N(e.data.display_phone)})).catch((function(e){console.log(e.res)})),A()}},t," Read Reviews"),o.a.createElement(U.a,{isOpen:T,fade:!1,toggle:A,className:a},o.a.createElement(Y.a,{toggle:A},n),o.a.createElement(_.a,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",o.a.createElement("div",null," Seating"),o.a.createElement(K.a,{name:"Seating",editing:!1,starCount:5,value:c}),o.a.createElement("div",null," Seat Comfort"),o.a.createElement(K.a,{name:"Comfort",editing:!1,starCount:5,value:m}),o.a.createElement("div",null," Internet Rating"),o.a.createElement(K.a,{name:"Internet Speed",editing:!1,starCount:5,value:v}),o.a.createElement("div",null," Noise Level "),o.a.createElement(K.a,{name:"Noise",editing:!1,starCount:5,value:E}),o.a.createElement("div",null," Outlet Availability "),o.a.createElement(K.a,{name:"Outlet Availability",editing:!1,starCount:5,value:j})),o.a.createElement(B.a,null,o.a.createElement(F.a,{color:"secondary",onClick:A},"Cancel"))))},G=a(238),Q=a(239),H=a(240),X=function(e){var t=Object(i.useState)(!1),a=Object(V.a)(t,2),n=a[0],r=a[1],s=Object(i.useState)(0),l=Object(V.a)(s,2),c=l[0],u=l[1],p=Object(i.useState)(0),d=Object(V.a)(p,2),m=d[0],h=d[1],g=Object(i.useState)(0),f=Object(V.a)(g,2),v=f[0],b=f[1],C=Object(i.useState)(0),k=Object(V.a)(C,2),E=k[0],O=k[1],y=Object(i.useState)(0),w=Object(V.a)(y,2),j=w[0],M=w[1],L=function(){return r(!n)};return o.a.createElement("div",null,o.a.createElement(F.a,{color:"primary",onClick:L,id:"filterButton",style:{marginBottom:"1rem",marginTop:"1rem",marginLeft:"3rem"}},"Filter"),o.a.createElement(G.a,{isOpen:n},o.a.createElement(Q.a,null,o.a.createElement("div",{className:"filterList"},o.a.createElement(H.a,null,o.a.createElement("div",null," Select minimum rating for each category "),o.a.createElement("br",null),o.a.createElement("div",{className:"filterListInside"},o.a.createElement("div",{className:"filterText"},"Seating: "),o.a.createElement("div",{className:"filterStar"},o.a.createElement(K.a,{name:"Seating",editing:!0,starCount:5,value:c,onStarClick:function(e,t,a){u(e)}}))),o.a.createElement("div",{className:"filterListInside"},o.a.createElement("div",{className:"filterText"},"Seat Comfort:"),o.a.createElement("div",{className:"filterStar"},o.a.createElement(K.a,{name:"SeatComfort",editing:!0,starCount:5,value:m,onStarClick:function(e,t,a){h(e)}}))),o.a.createElement("div",{className:"filterListInside"},o.a.createElement("div",{className:"filterText"},"Internet Speed: "),o.a.createElement("div",{className:"filterStar"},o.a.createElement(K.a,{name:"internetSpeed",editing:!0,starCount:5,value:v,onStarClick:function(e,t,a){b(e)}}))),o.a.createElement("div",{className:"filterListInside"},o.a.createElement("div",{className:"filterText"},"Noise Level:"),o.a.createElement("div",{className:"filterStar"},o.a.createElement(K.a,{name:"Noise",editing:!0,starCount:5,value:E,onStarClick:function(e,t,a){O(e)}}))),o.a.createElement("div",{className:"filterListInside"},o.a.createElement("div",{className:"filterText"},"Outlet Availability:"),o.a.createElement("div",{className:"filterStar"},o.a.createElement(K.a,{name:"Outlet",editing:!0,starCount:5,value:j,onStarClick:function(e,t,a){M(e)}}))),o.a.createElement(F.a,{onClick:function(){e.onFilter(c,m,v,E,j),L()}},"Submit"))))))},$=function(e){var t=e.buttonLabel,a=e.className,n=e.names,r=(e.rating,e.placeID),s=Object(i.useState)(0),l=Object(V.a)(s,2),c=l[0],u=l[1],p=Object(i.useState)(0),d=Object(V.a)(p,2),m=d[0],h=d[1],g=Object(i.useState)(0),f=Object(V.a)(g,2),v=f[0],b=f[1],C=Object(i.useState)(0),k=Object(V.a)(C,2),E=k[0],O=k[1],y=Object(i.useState)(0),w=Object(V.a)(y,2),j=w[0],M=w[1],L=Object(i.useState)(!1),S=Object(V.a)(L,2),P=S[0],I=S[1],D=function(){return I(!P)};return o.a.createElement("div",null,o.a.createElement(F.a,{color:"danger",onClick:D},t," Write Review"),o.a.createElement(U.a,{isOpen:P,fade:!1,toggle:D,className:a},o.a.createElement(Y.a,{toggle:D},n),o.a.createElement(_.a,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",o.a.createElement("div",null,"Seating"),o.a.createElement(K.a,{name:n,editing:!0,starCount:5,value:c,onStarClick:function(e,t,a){u(e)}}),o.a.createElement("div",null,"Seat Comfort"),o.a.createElement(K.a,{name:n,editing:!0,starCount:5,value:m,onStarClick:function(e,t,a){h(e)}}),o.a.createElement("div",null,"Internet Speed"),o.a.createElement(K.a,{name:n,editing:!0,starCount:5,value:v,onStarClick:function(e,t,a){b(e)}}),o.a.createElement("div",null,"Nosie Level"),o.a.createElement(K.a,{name:n,editing:!0,starCount:5,value:E,onStarClick:function(e,t,a){O(e)}}),o.a.createElement("div",null,"Outlet Availability"),o.a.createElement(K.a,{name:n,editing:!0,starCount:5,value:j,onStarClick:function(e,t,a){M(e)}})),o.a.createElement(B.a,null,o.a.createElement(F.a,{color:"primary",onClick:function(){e.putData(r,c,m,v,E,j),D()}},"Submit"),o.a.createElement(F.a,{color:"secondary",onClick:D},"Cancel"))))},ee=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).putDataToDB=function(e,t,a,n,i,o){x.a.post("http://localhost:3001/api/putData",{placeID:e,seatRating:t,comfortRating:a,noiseRating:i,internetRating:n,outletRating:o})},a.filterPlaces=a.filterPlaces.bind(Object(g.a)(a)),a.state={elements:[]},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.names!==e.names&&this.createList()}},{key:"componentDidMount",value:function(){this.createList()}},{key:"createList",value:function(){for(var e=this.props.names,t=this.props.addresses,a=this.props.ratings,n=this.props.placeID,i=[],r=0;r<e.length;r++)i.push(o.a.createElement("li",null,o.a.createElement("div",null,e[r]),o.a.createElement("div",null,t[r]),o.a.createElement("div",null," Yelp rating: ",a[r],"/5"),o.a.createElement(Z,{names:e[r],ratings:a[r],showReviews:this.showReviews,placeID:n[r]}),o.a.createElement("br",null),o.a.createElement($,{names:e[r],putData:this.putDataToDB,placeID:n[r]}),o.a.createElement("br",null)));this.setState({elements:i})}},{key:"filterPlaces",value:function(e,t,a,n,i){var o=[e,t,a,n,i];this.props.onFilter(o)}},{key:"render",value:function(){return o.a.createElement("div",{className:this.props.className,id:this.props.id},o.a.createElement(X,{onFilter:this.filterPlaces}),o.a.createElement("ol",null,this.state.elements))}}]),t}(i.Component),te=a(55),ae=(a(230),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).targetElement=null,a.onMarkerClick=function(e,t,n){a.setState({selectedPlace:e,activeMarker:t,showingInfoWindow:!0})},a.handleOnMapClicked=function(e){a.state.showingInfoWindow&&a.setState({showingInfoWindow:!1,activeMarker:null})},a.handleFilters=function(){var e=Object(u.a)(c.a.mark((function e(t){var n,i,o,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.getMapInfo(t);case 2:return n=e.sent,e.next=5,a.filterPlaces(t,n);case 5:return i=e.sent,e.next=8,a.removePlaces(i,n);case 8:return o=e.sent,console.log(o),e.next=12,a.filterFinal(o);case 12:r=e.sent,console.log(r);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.getMapInfo=function(e){return new Promise((function(t,n){var i=[],o=[],r=[],s=[],l=[],c=[];x.a.get("https://cors-anywhere.herokuapp.com/".concat("https://api.yelp.com/v3/businesses/search?"),{headers:{Authorization:"Bearer ".concat("drvg4LDqYomYiPGMoBJ9qKRuVnst3Vw-WZUsodT4eW3z82VAuV1cQY34Dd3-Vyql7wqJoW7nG8ab24yWnFEbqQiKnP5hHFEFA008lyAfUPvCJEoEMvjK5tQoTlxLXnYx")},params:{categories:"coffee, libraries",latitude:a.state.currentLocation.lat,longitude:a.state.currentLocation.lng,limit:20}}).then((function(n){for(var u in n.data.businesses){var p=n.data.businesses[u].location;o.push(n.data.businesses[u].coordinates),c.push(n.data.businesses[u].id),r.push(n.data.businesses[u].name),s.push(n.data.businesses[u].rating),l.push(p.address1+" "+p.city+", "+p.state+" "+p.zip_code)}void 0===e&&a.setState({placeID:c,locations:o,names:r,ratings:s,addresses:l}),i.push(c),i.push(o),i.push(r),i.push(s),i.push(l),void 0!==e&&t(i)}))})).catch((function(e){console.log("Yelp API call error")}))},a.filterFinal=function(e){return new Promise((function(t,n){var i=e[0],o=e[1],r=e[2],s=e[3],l=e[4];a.setState({placeID:i,locations:o,names:r,ratings:s,addresses:l}),t("great success")}))},a.filterPlaces=function(e,t){return new Promise((function(a,n){for(var i=t[0],o=(i.length,[]),r=function(t){var n="http://localhost:3001/api/getDataAverage/"+i[t];x.a.get(n).then((function(a){for(var n=[a.data.data[0].averageSeatRating,a.data.data[0].averageComfortRating,a.data.data[0].averageInternetRating,a.data.data[0].averageNoiseRating,a.data.data[0].averageOutletRating],i=0;i<n.length;i++)if(n[i]<e[i]){o.push(t);break}})).then((function(){a(o)})).catch((function(e){console.log(e)}))},s=0;s<i.length;s++)r(s)}))},a.removePlaces=function(e,t){return new Promise((function(a,n){var i=t[0],o=t[1],r=t[2],s=t[3],l=t[4],c=e.length;for(console.log(e);c--;)console.log("here"),o.splice(e[c],1),i.splice(e[c],1),r.splice(e[c],1),s.splice(e[c],1),l.splice(e[c],1);a([i,o,r,s,l])}))},a.state={showingInfoWindow:!1,show:!1,activeMarker:{},selectedPlace:{},addresses:[],locations:[],names:[],placeID:[],hours:[],ratings:[],currentLocation:{lat:"",lng:""}},a.onMarkerClick=a.onMarkerClick.bind(Object(g.a)(a)),a.handleOnMapClicked=a.handleOnMapClicked.bind(Object(g.a)(a)),a.handleCenterMoved=a.handleCenterMoved.bind(Object(g.a)(a)),a.handleLocationChange=a.handleLocationChange.bind(Object(g.a)(a)),a.filterPlaces=a.filterPlaces.bind(Object(g.a)(a)),a.removePlaces=a.removePlaces.bind(Object(g.a)(a)),a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.targetElement=document.querySelector("#listView"),Object(te.a)(this.targetElement)}},{key:"handleCenterMoved",value:function(e,t){var a=this;this.setState({currentLocation:{lat:t.center.lat(),lng:t.center.lng()}},(function(){a.getMapInfo()}))}},{key:"handleLocationChange",value:function(e,t){var a=this;this.setState({currentLocation:{lat:e,lng:t}},(function(){a.getMapInfo()}))}},{key:"render",value:function(){var e=this.state.names,t=this.state.locations,a=this.state.addresses,n=this.state.ratings,i=this.state.activeMarker,r=this.state.showingInfoWindow,s=this.state.selectedPlace,l=this.state.placeID;return o.a.createElement("div",{className:"container"},o.a.createElement("div",{id:"title"}," Study Spots"),o.a.createElement("div",{className:"mapListContainer"},o.a.createElement(ee,{className:"ViewList",id:"listView",names:e,locations:t,addresses:a,ratings:n,placeID:l,onFilter:this.handleFilters}),o.a.createElement(z,{className:"mapContainer",names:e,locations:t,addresses:a,ratings:n,activeMarker:i,showingInfoWindow:r,selectedPlace:s,onMapClicked:this.handleOnMapClicked,onMarkerClick:this.onMarkerClick,centerMoved:this.handleCenterMoved,handleLocationChange:this.handleLocationChange})))}}]),t}(o.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(ae,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},56:function(e,t,a){e.exports=a(233)},75:function(e,t,a){"use strict";(function(t){e.exports="object"===typeof window.self&&window.self.self===window.self&&window.self||"object"===typeof t&&t.global===t&&t||this}).call(this,a(22))}},[[56,1,2]]]);
//# sourceMappingURL=main.457f0178.chunk.js.map