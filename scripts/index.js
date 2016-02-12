window.onload = function(){
	var data = {
      "nodes": [
        {"href": "http://physicslover.com/","text" : "Mysite"},
        {"href": "https://www.quora.com/","text" : "quora"},
        {"href": "http://idl.cs.washington.edu/","text" : "Stanford VIS"},
        {"href": "http://blog.jobbole.com/","text" : "伯乐在线"},
        {"href": "http://www.tianya.cn/techforum/articleslist/0/16.shtml","text" : "鬼话连篇"},
        {"href": "http://www.wise-qatar.org/","text" : "wise-qatar"},
        {"href": "http://www.36kr.com/","text" : "36kr"},
        {"href": "https://www.palantir.com/","text" : "palantir"},
        {"href": "http://thenextweb.com/","text" : "TheNextWeb"},
        {"href": "http://visjs.org/","text" : "visjs"},
        {"href": "http://bitwiseshiftleft.github.io/sjcl/doc/","text" : "sjcl加密"},
        {"href": "http://mcolor.sinaapp.com/","text" : "在线配色"},
        {"href": "http://johnny-five.io/","text" : "jsIOT"},
        {"href": "http://www.javascriptoo.com/","text" : "javascriptOO"},
        {"href": "http://www.bing.com/knows/search?q=%E5%88%86%E5%BD%A2%E5%87%A0%E4%BD%95%E5%AD%A6&mkt=zh-cn&FORM=BKACAI","text" : "分形几何学"},
        {"href": "http://www.worldwidetelescope.org/","text" : "worldwidetelescope"},
        {"href": "http://www.cnet.com/","text" : "cNet"},
        {"href": "http://www.scientificamerican.com/","text" : "scientificAmerican"},
        {"href": "http://tooling.github.io/book-of-modern-frontend-tooling/","text" : "Modern Frontend Tooling"},
        {"href": "http://lodash.com/","text" : "lodash"},
        {"href": "http://marvl.infotech.monash.edu.au/software/","text" : "Monash VIS"},
        {"href": "http://www.tinypng.com/","text" : "tinypng"},
        {"href": "http://okonet.ru/viennajs-webpack-introduction/","text" : "Webpack"},
        {"href": "http://yanhaijing.com/es5/#50","text" : "ECMAScript5.1中文版"},
        {"href": "http://todomvc.com/","text" : "todoMVC"},
        {"href": "http://reactivex.io/","text" : "Responsive Programming"},
        {"href": "http://d3js.org/","text" : "d3js"},
        {"href": "https://github.com/ariutta/svg-pan-zoom","text" : "svg zoom"},
        {"href": "http://overapi.com/","text" : "overapi"},
        {"href": "http://www.reactnative.com/","text" : "reactnative"},
        {"href": "http://openprocessing.org/","text" : "openprocessing"},
        {"href": "http://www.deviantart.com/","text" : "deviantart"},
        {"href": "http://techfieldday.com/","text" : "techfieldday"},
        {"href": "http://www.vicarious.com/","text" : "vicarious"},
        {"href": "http://www.magicleap.com/","text" : "Magic Leap"}
      ],
      "links": []
    };
	var  width = window.screen.width,
        height = window.screen.height,
             φ = 20,
             α = 0,
             λ = {},
           num = data.nodes.length;
   	for (var i = data.nodes.length - 1; i >= 0; i--) {
   		λ = pos();
   		data.nodes[i].x = λ.x;
   		data.nodes[i].y = λ.y;
   		//data.nodes[i].fixed = true;
   		data.links.unshift({"source": i, "target":  i+1});
   	};
   	data.links.pop();
    var force = d3.layout.force()
        .size([width, height])
        .charge(-500)
        .linkDistance(50)
        .on("tick", particleMotion);
    var drag = force.drag()
        .on("dragstart", dragstart);
    var svg = d3.select("#svgvas").append("svg")
        .attr("width", width)
        .attr("height", height);
    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");
    +function(){
        force
          .nodes(data.nodes)
          .links(data.links)
          .start();
        link = link.data(data.links)
          .enter().append("line")
          .attr("class", "link");
        node = node.data(data.nodes)
          .enter()
          .append("g")
          .on("dblclick", dblclick)
          .call(drag);
        node.append("circle")
          .attr("class", "node")
          .attr("r", 9);
        node.append("text")
          .attr("x", 12)
          .attr("dy", ".4em")
          .attr("href",function(d){
          	return d.href;
          })
          .on("click", openSite)
          .text(function(d){ return d.text });
    }()
    function openSite(d){
    	window.open(d.href);
    }
    function particleMotion() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
      node.attr("transform", function(d) { return "translate("+d.x+","+d.y+")"; });
    }
    function dblclick(d) {
      d3.select(this).classed("fixed", d.fixed = false);
    }
    function dragstart(d) {
      d3.select(this).classed("fixed", d.fixed = true);
    }
    function pos(){
        α += Math.PI/Math.E;
        return {
            x : width/2 + Math.cos(α)*(φ+=5),
            y : height/2 + Math.sin(α)*(φ+=5)
        }
    }
}
