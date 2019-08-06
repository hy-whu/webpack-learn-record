import { sayHello } from './module'; //TreeShaking
import pic from './file.jpg'; 
import style from './index.css';
// import "@babel/polyfill"; //ES6函数转换
import _ from 'loadsh'

// import './index.css'

const bgImg = document.querySelector('.bg-img');
var img = new Image();
img.src = pic;

bgImg.appendChild(img);
img.classList.add(style.bg);

var btn = document.createElement('input');
btn.innerText = 'click';
document.body.appendChild(btn);

btn.addEventListener('click',function(){
  var textDiv = document.createElement('div');
  textDiv.innerText = 'add';
  document.body.appendChild(textDiv);
})
// console.log('\n'+pic);
sayHello();

console.log(_.join(['a','b','c'],'***'))
