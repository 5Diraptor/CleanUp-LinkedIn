var blockads = null;
var blockjobs = null;
var blockaddfeed = null;
var blockevents = null;
var blockfreshpps = null;

var blockhiring = null;
var blockstartpost = null;

var blockall = null;
var reminder = null;



chrome.storage.sync.get("block_ads", ({ block_ads }) => {
	blockads = block_ads;
});

chrome.storage.sync.get("block_jobs", ({ block_jobs }) => {
	blockjobs = block_jobs;
});

chrome.storage.sync.get("block_addfeed", ({ block_addfeed }) => {
	blockaddfeed = block_addfeed;
});

chrome.storage.sync.get("block_events", ({ block_events }) => {
	blockevents = block_events;
});

chrome.storage.sync.get("block_freshpps", ({ block_freshpps }) => {
	blockfreshpps = block_freshpps;
});



chrome.storage.sync.get("block_hiring", ({ block_hiring }) => {
	blockhiring = block_hiring;
});
chrome.storage.sync.get("block_startpost", ({ block_startpost }) => {
	blockstartpost = block_startpost;
});




chrome.storage.sync.get("block_all", ({ block_all }) => {
	blockall = block_all;
});

chrome.storage.sync.get("feed_reminder", ({ feed_reminder }) => {
	reminder = feed_reminder;
});





chrome.storage.sync.get("enabled", ({ enabled }) => {
	if (enabled) {
		if (blockall) {
			let main = document.getElementById("main");
			main.children[1].style.display = "none";
			main.children[2].style.display = "none";
			window.addEventListener("scroll", function(e) {
					main.children[1].style.display = "none";
					main.children[2].style.display = "none";
			});
			window.addEventListener("load", function(e) {
					main.children[1].style.display = "none";
					main.children[2].style.display = "none";
			});
			window.addEventListener("onload", function(e) {
					main.children[1].style.display = "none";
					main.children[2].style.display = "none";
			});
			
		} else {
			window.addEventListener("scroll", clearAds);
		};
		
		if (blockfreshpps) {
			blockfreshperspectives();
			window.addEventListener("load", blockfreshperspectives);
		};
		if (blockstartpost) {
			window.addEventListener("load", blockstartnewpost);
		};
	};

});


// Beta - check for changes in DOM tree rather then fire on scrolling

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    console.log(mutations, observer);
    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});




	
function clearAds () {
	
	let main = document.getElementById("main");
	let allLiAds = document.getElementsByClassName("feed-shared-update-v2");
	for (var i = 0; i < allLiAds.length; i++) {
		
		let post = allLiAds.item(i);
		// alert("ads: "+ads+" // jobs: "+jobs);
		if (blockads) {
			try {
				let postPromo1 = post.querySelector('.feed-shared-actor__description'); 
				let postTitle1 = post.querySelector('.feed-shared-actor__title');
				postTitle1 = postTitle1.textContent.trim();
				let postSub1 = postPromo1.textContent.trim();
				if (postSub1 == "Promoted") {
					post.style.display = "none";
					console.log("cleared an ad from: " + postTitle1);
				};
			} catch (error) {
				console.log(error);
			};
			
			try {
				
				let postPromo2 = post.querySelector('.feed-shared-actor__sub-description'); 
				let postTitle2 = post.querySelector('.feed-shared-actor__title');
				postTitle2 = postTitle2.textContent.trim();
				let postSub2 = postPromo2.textContent.trim();
				if (postSub2 == "Promoted") {
					post.style.display = "none";
					console.log("cleared an ad from: " + postTitle2);
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			// console.log("ad blocking turned off");
		};
		
		if (blockjobs) {
			
			try {
			
				let postPromo3 = post.querySelector('.feed-shared-header__text-view'); 
				let postSub3 = postPromo3.textContent.trim();
				if (postSub3 == "Jobs recommended for you") {
					post.style.display = "none";
					console.log("cleared a `Jobs recommended` post");
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			// console.log("jobs blocking turned off");
		};
		
		if (blockaddfeed) {
			
			try {
			
				let postPromo3 = post.querySelector('.feed-shared-header__text-view'); 
				let postSub3 = postPromo3.textContent.trim();
				if (postSub3 == "Add to your feed") {
					post.style.display = "none";
					console.log("cleared an `Add to your feed` post");
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			// console.log("jobs blocking turned off");
		};
		
		if (blockaddfeed) {  // using the blockaddfeed option to also kill off "popular courses" promo
			
			try {
			
				let postPromo3 = post.querySelector('.feed-shared-header__text-view'); 
				let postSub3 = postPromo3.textContent.trim();
				if (postSub3 == "Popular course on LinkedIn Learning") {
					post.style.display = "none";
					console.log("cleared an `Add to your feed` post");
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			// console.log("jobs blocking turned off");
		};
		
		if (blockevents) {
			
			try {
			
				let postPromo3 = post.querySelector('.feed-shared-text-view'); 
				let postSub3 = postPromo3.textContent.trim();
				if (postSub3 == "Events recommended for you") {
					post.style.display = "none";
					console.log("cleared an `Events recommended` post");
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			// console.log("jobs blocking turned off");
		};

		
		post.classList.remove("feed-shared-update-v2");
		post.style.margin = "0 0 8px";
		post.style.padding = "0";

	};
	
	if (blockhiring) {
		try {
			let postPromo3 = main.querySelector('.feed-shared-text-view'); 
			let postSub3 = postPromo3.textContent.trim();
			if (postSub3 == "Add to your feed") {
				post.style.display = "none";
				console.log("cleared an `Are you hiring` post");
			};
		} catch (error) {
			console.log(error);
		};
	}
	
	if (blockstartpost) {
		/// alert(blockstartpost);
		try {
			let block = main.getElementsByClassName("share-box-feed-entry__closed-share-box")[0];
			console.info(block);
			block.style.display = "none";
			//let postID7 = post.querySelector('.share-box-feed-entry__closed-share-box'); 
			//let postSub3 = postPromo3.textContent.trim();
			//if (postSub3 == "Add to your feed") {
			//	post.style.display = "none";
			//	console.log("cleared an `Start a new post` post");
			//};
		} catch (error) {
			console.log(error);
		};
	}
	
 };


function feedReminder() {
	var url = window.location.href;
	var q = "/feed/";
	
	if (reminder && url.search(q) > 0) {
		let reminderEl = '<div style="border-radius: 10px; padding: 15px; background-color: white; margin: 0 0 10px;">Enjoy your uncluttered feed, courtesy of CleanUp LinkedIn!</div>';
		let main = document.getElementById("main");
	
		main.children[0].insertAdjacentHTML('afterbegin', reminderEl);
	};
}

function blockfreshperspectives() {
	var mainEl = document.getElementById("main");
	
	let freshEl = mainEl.getElementsByClassName("feed-welcome-back-feed");
	for (var i = 0; i < freshEl.length; i++) {
		
		let prefeed = freshEl.item(i);
		prefeed.style.display = "none";
	}
	
	

}

function blockstartnewpost() {
		try {
			let block = main.getElementsByClassName("share-box-feed-entry__closed-share-box")[0];
			console.info(block);
			block.style.display = "none";
		} catch (error) {
			console.log(error);
		};
}


window.addEventListener("load", feedReminder);

