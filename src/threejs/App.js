import React, { Component } from 'react';
import * as THREE from 'three';
import './App.less';

var camera, scene, renderer;
var geometry, material, mesh;
 
function init() {
 
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;
 
    scene = new THREE.Scene();
 
    geometry = new THREE.BoxGeometry( 1.5, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();
 
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
 
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("three-id").appendChild( renderer.domElement );
 
}
 
function animate() {
 
    requestAnimationFrame( animate );
 
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.02;
 
    renderer.render( scene, camera );
 
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