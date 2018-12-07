const tagsList = ['Durian', 'Grapefruits', 'Cute Kittens', 'Dragon', 'Chendol', 'Science', 'Food', 'Christmas', 'Art', 'Tiger'];
let n = 4;

//This function, randomly, Generate a NEW array of 4 elements, from tagsList.
function getRandom(tagsList, n){
    let result = new Array(n); //console.log(result); 4 empty string
    let len = tagsList.length; //console.log(len); length of the tagsList = 11
    let taken = new Array(len); //console.log(taken); 11 empty string
    if (n > len) //error checking//this will never happen because n, which is 4 only, will always less than tagsList.length of 11
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) { //iterating from 3>2>1>0
        let x = Math.floor(Math.random() * len); // iterate 4x to get 4 random number ranging from 0 to 10,
        result[n] = tagsList[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
//New array: 'tags' which consist of 4 elements from tagsList, randomly selected.
const tags = getRandom(tagsList, 4);// check: console.log(tags);
//New var: 'tag' from 'tags'(consist of 4 elements) choose 1 randomly.
let random = Math.floor(Math.random()* (tags.length - 1));
let tag = tags[random];//check: console.log(tag);

const selections = document.getElementById('selections');//iterate 4x: and then...
function fourSelections(){
	for (let i = 0; i < 4; i++){
		let li = document.createElement("li");//create <li> 4x
		li.innerHTML = tags[i]; //fill each li with each tags
		li.classList.add('bullet');//add a class name 'bullet' to each li
		selections.appendChild(li);//append li under selections
	}
}
fourSelections();

selections.onclick = function(event){
	// document.innerHTML.style.color = "purple";
	let clickedChoice = event.target.innerHTML;
	if (clickedChoice == tag){
		alert("Yay! That's correct! Click Ok and try the next one!");
	}
	else {
		alert("Oh no :( that's wrong. The Correct answer is " + 
			"<"+tag+">" + ". Click OK and try the next one!");
	}
	
	location.reload();
}

const list = document.getElementById('list-data');
function getTaggedPhotos(tagName){
	fetch('https://api.tumblr.com/v2/tagged?tag='+ tagName +'&api_key=SvwqCcMBfgCc0854B0S023QsO9ffFcPEoB4oB2LRHliFC54l5F').then(function(response){
	console.log(response);

	if (!response.ok){
		window.alert('Hey, seems like something went wrong. Please contact admin.')
		return;
	}
	return response.json();//get json object
	})
	.then(function(result){
	  // console.log(result);//use json object here
	  if (!result){
	  	return;
	  }
	  //clear list
	  list.innerHTML = '';
	  const items = result.response;
	  let masonry;

	  //for each item, add image to list
	  for (let i=0; i<items.length; i++){
	  	// console.log(items[i]);
	  	const item = items[i];

	  	if (item.photos != undefined){//create li and img to append
	  		const altSizes = item.photos[0].alt_sizes;
		  	const imgSrc = altSizes[altSizes.length - 2].url;

		  	const img = document.createElement('img');
		  	img.src = imgSrc;
		  	img.onload = function(){
		  		masonry.layout();
		  	}

		  	const li = document.createElement('li');
		  	li.appendChild(img);
		  	// li.innerHTML = imgSrc;

		  	list.appendChild(li);
	  	}
	  }
	 
	  //initialise masonry after list has loaded
	  masonry = new Masonry(list, {
		itemSelector: 'li',
		// gutterWidth: 8,
		});

	  //run layout
	  masonry.layout();
		})
	.catch(function(err){
		window.alert('Hey, seems like Tumblr API is down. Please try again later.')
		console.log('message ', err);
	})
}
getTaggedPhotos(tag);