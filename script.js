const imageContainer= document.getElementById("image-container");
const loader=document.getElementById("loader");

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];

//unsplash api
const count=30;
const apiKey="6ukFVEyBb6PwZrIraVv2zlZLQpqWyHyYnD-g0Fe6hQg";
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`



//Helper function for attributes
function setAttributes(element,attributes){
	for(const key in attributes){
		element.setAttribute(key,attributes[key]);
	}
}

//Get Photo Function

function imageLoaded(){
	
	imagesLoaded++;
	console.log(imagesLoaded);
	if(imagesLoaded === totalImages){
		ready=true;
		loader.hidden=true;
		console.log("ready =", ready);
		console.log("totalimages and images loaded",totalImages, imagesLoaded);

	}
}
//display photos function
function displayPhotos(){
	imagesLoaded=0;
	totalImages = photosArray.length;
	console.log("total images =", totalImages);
	photosArray.forEach((photo) => {
		//anchor section

		const item=document.createElement('a');
		item.setAttribute('href',photo.links.html);
		item.setAttribute('target', '_blank');
		
			//Set attributes function to make code easier
		// setAttributes(item, {
		// 	href: photo.links.html,
		// 	target:_blank,
		// });
		const img=document.createElement("img");
		// setAttributes(img, {
		// 	src:photo.urls.regular,
		// 	alt:photo.alt_description,
		// 	title:photo.alt_description,
		// });
		img.addEventListener('load',imageLoaded);
		img.setAttribute('src', photo.urls.regular);
		img.setAttribute('alt',photo.alt_description);
		img.setAttribute('title',photo.alt_description);
		item.appendChild(img);
		imageContainer.appendChild(item);

	});
	
		
}
async function getPhotos(){
	try{
		const response = await fetch(apiUrl);
		photosArray =await response.json();
		displayPhotos();
		
	}catch (error){

	}
}
window.addEventListener('scroll', () =>{
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
		{	ready=false;
			getPhotos();
			

	}
});

getPhotos();