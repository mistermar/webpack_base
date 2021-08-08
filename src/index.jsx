import "core-js/stable";
import "regenerator-runtime/runtime";
import Post from "@models/Post"
import "./babel"
import * as $ from 'jquery'
import "./styles/styles.css"
import "./styles/less.less"
import "./styles/sass.sass"
import React from "react"
import {render} from "react-dom"

const post = new Post('WebPack  Title')

$('pre').html(post.toString())

const App = () => (
  <div className="container">
    <h1>WEBPACK Course</h1>

    <hr/>
    <div className="logo"></div>

    <hr/>
    <pre></pre>

    <div className="box">
      LESS
    </div>
  </div>
)
render(<App/>, document.getElementById("app"))

//console.log(post.toString())
//console.log("XML", xml)

