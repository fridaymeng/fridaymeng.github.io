import React, { Component } from 'react';
import * as THREE from 'three';
import './App.less';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

function init() {

  var material = new THREE.LineBasicMaterial( { color: 0x0088cc } );

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
  geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

  var line = new THREE.Line( geometry, material );

  scene.add( line );
  renderer.render( scene, camera );
 
}

function animate() {
 
    requestAnimationFrame( animate );
    // console.log(Math.random());
}


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
    init();
    animate();
  }
  componentWillUnmount() {
    
  }
  render(){
    return (
      <div className="three-class" id="three-id"></div>
    );
  }
}


export default App;