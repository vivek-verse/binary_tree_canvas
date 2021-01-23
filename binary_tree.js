let d = document;
let _ = (id) => d.getElementById(id);
_("bt").style.backgroundColor="teal";
let canvas = _("bt");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
let cn = canvas.getContext("2d");

let randomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class Node{
	constructor(val, radius=20, font="20px Calibri", color=randomColor()){
		this.left = null;
		this.right = null;
		this.fromLeft = 0;
		this.fromTop = 0;
		this.radius = radius;
		this.val = val;
		this.font = font;
		this.color = color
	}
}


class BinaryTree{
	constructor(){
		this.root = null;
	}

	width(){
		let queue = [];
		let width = 0;
		let current = this.root;
		queue.push(current);
		while(queue.length){
			let count = queue.length;
			width = Math.max(count, width);
			while(count--){
				let node = queue.shift();
				if(node.left){
					queue.push(node.left);
				}
				if(node.right){
					queue.push(node.right);
				}
			}

		}

		return width;

	}

	height(){
		let root = this.root;
		function traverse(node){
			if(!node) return 0;
			let hLeft = traverse(node.left);
			let hRight = traverse(node.right);
			return Math.max(hLeft + 1, hRight + 1);
		}
		return traverse(root);
	}

	insert(val){
		let newNode = new Node(val);
		if(!this.root){
			this.root = newNode;
			this.root.fromLeft = _("bt").offsetWidth/2;
			this.root.fromTop = 50;
			return this;
		}else{
			let node = this.root;
			let widthSep = 200;
			let heightSep = 50;
			while(true){
				if(newNode.val < node.val){
					if(node.left === null){
						newNode.fromLeft = node.fromLeft - widthSep;
						newNode.fromTop = node.fromTop + heightSep;
						node.left = newNode;
						return this;
					}else{
						node = node.left;
					}					
				}else if(newNode.val > node.val){
					if(node.right === null){
						newNode.fromLeft = node.fromLeft + widthSep;
						newNode.fromTop = node.fromTop + heightSep;
						node.right = newNode;
						return this;
					}else{
						node = node.right;
					}
				}else{
					return this;
				}
				widthSep = widthSep/2;
			}
		}
	}

	plot(){
		let queue = [];
		let current = this.root;
		queue.push(current);
		while(queue.length){
			let node = queue.shift();
			cn.beginPath();
			cn.arc(node.fromLeft, node.fromTop, node.radius, 0, 2 * Math.PI);
			cn.fillStyle = node.color;
      		cn.fill();
      		cn.lineWidth = 5;
      		cn.strokeStyle = '#003300';
			cn.stroke();
			cn.fillStyle = "white";
			cn.textAlign = "center";
			cn.font = node.font;
			cn.fillText(node.val, node.fromLeft, node.fromTop + (node.radius)/4);
			if(node.left){
				cn.beginPath();
				cn.moveTo(node.fromLeft - node.radius, node.fromTop);
				cn.lineTo(node.left.fromLeft, node.left.fromTop - node.radius);
				cn.stroke();
				queue.push(node.left);
			}
			if(node.right){
				cn.beginPath();
				cn.moveTo(node.fromLeft + node.radius, node.fromTop);
				cn.lineTo(node.right.fromLeft, node.right.fromTop - node.radius);
				cn.stroke();
				queue.push(node.right);
			}
		}
	}
}

let tree = new BinaryTree();

tree.insert(10);
tree.insert(19);
tree.insert(8);
tree.insert(17);
tree.insert(6);
tree.insert(84);
tree.insert(9);
tree.insert(18);
tree.insert(15);
tree.insert(4);
tree.insert(5);
tree.insert(13);
tree.insert(2);
tree.insert(11);
tree.insert(19);
tree.insert(28);
tree.insert(37);
tree.insert(46);
tree.insert(55);
tree.insert(16);
tree.insert(1);
tree.plot();
