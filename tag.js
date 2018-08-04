// STEEM Tag Bot  v0.0.3
// Developed by @KLYE as Vooby, Updated and Modified to Tag by @Flemingfarm
// Free to Use for All! || Free to Modify

// Designed to upvote a new post under a tag with no delay. The moment the blockchain 
// publishes the block, the bot will vote the post. Follow the config steps below, save
// file, then run the script at the CLI.

//--------------------------------------------------------------------------
//----- PLEASE DO NOT USE THIS CODE BELOW MALICIOUSLY / FOR EVIL DEEDS -----
//--------------------------------------------------------------------------

//----- Requirements to run:

//----- INSTALL: 
//----- Node.js ->	https://.nodejs.org/en/download
//----- steem.js -> CLI - npm install steem --save

//----- CONFIG:

// ***IMPORTANT*** Your Posting Private Key Below
var wifkey = '5J4NMbHyR5pF1imrEN786dBcpnwgwiPkG8wk9c1i4HFYh4iXzd6';

// ***IMPORTANT*** Enter Voting account below (no @)
var voter = "flemingfarm";

// ***IMPORTANT*** Enter the Tag you want to upvote new posts in
var targettag = "actifit";

// ***IMPORTANT*** May want to modify this (10000 = 100.00% vote & 100 = 1.00% vote)
var weight = 175;

// No need to modify these variables
const steem = require('steem');
var totalvote = 0;
var metadatascan;
var json_metadata;
var op;
var lastblock = '';


//--------------------- DATE/TIME CODE BLOCK -----------------------
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

//-------------------------------------------------------------------


//----- SCRIPT STARTED

console.log("- Steem Tag Bot - By @Flemingfarm - Listening to STEEM Network for #"+ targettag +" posts -");
console.log("-------------------------------------------------------------------------------------------");
console.log("------------------------------- Started: @ " + dateTime + " -------------------------------");

//steem.api.setOptions({ url: 'https://api.steemit.com' });

//----- GRAB CURRENT STEEM BLOCK
steem.api.streamBlockNumber(function (err1, lastblock) {
   
//NOTE: Sometimes the Script Fails to Hook Into STEEM. Try Running Script Again if it Fails!

//----- SEE IF POST IS OUR TARGET ----
try {
var process_post = function (op) {
    if (op["author"] != "") {
            steem.broadcast.vote(
            wifkey,
            voter,
            op["author"],
            op["permlink"],
            weight,
            function (downerr, result) {
                if (downerr) {
                    var error = JSON.stringify(downerr);
                    if (error.toLowerCase().indexOf("You have already voted in a similar way.\n") >= 0) {
                        console.log("Oops! Tag tried to vote for a post it already voted on!");
                    }
                }
                if (result) {
                    totalvote++;
					console.log("Successfully voted " + weight/100 + "%" + " #" + targettag + " post " + " by " + op["author"] + 
					"   Posts Voted: " + totalvote + " @ Block # " + lastblock);
				}
				
            }
        );
    }
};
}
catch (e) {
return null
}

//----- STREAMING LATEST BLOCK OPERATIONS -----
steem.api.streamOperations(function (err2, blockops) {
	try {
	var opType = blockops[0];	// get 1st item in blockops and apply to operationType variable to check type later
	
	var op = blockops[1];	// get 2nd item in blockops and store it later to be parsed if it's our specified type of operation
	
	if (op["json_metadata"] !== undefined) {

		metadatascan = op["json_metadata"];
		if (metadatascan !== '') {
			var tags = JSON.parse(metadatascan);
			var actualtags = tags["tags"];
			if (actualtags != undefined) {
				var tagtag = String(actualtags);

				if (op["parent_author"] === '') {
					if (tagtag.toLowerCase().indexOf(targettag) >= 0) {
						process_post(op);
					}
					
				}
				
			
			}
			

        }
		
    }
	}
	catch (e) {
		return null;
	}
});
}); 