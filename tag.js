﻿//----- CONFIG:

// ***IMPORTANT*** Your Posting Private Key Below
var wifkey = '';

// ***IMPORTANT*** Enter Voting account below (no @)
var voter = "";

// ***IMPORTANT*** Enter the Tag you want to upvote new posts in
var targettag = "";

// ***IMPORTANT*** May want to modify this (10000 = 100.00% vote & 100 = 1.00% vote)
var weight = 175;

// No need to modify these variables
const steem = require('steem');
var totalvote = 0;
var metadatascan;
var json_metadata;
var op;
lastBlock = '';

//----- SCRIPT STARTED

console.log("- Steem Tag Bot - By @Flemingfarm - Listening to STEEM Network for #" + targettag + " posts -");
console.log("-------------------------------------------------------------------------------------------");
console.log("---- Started: @ " + new Date() + " ----");

steem.api.setOptions({
    url: 'https://api.steemit.com'
});

//----- GRAB CURRENT STEEM BLOCK
steem.api.streamBlockNumber(function (err1, lastBlock) {

    //NOTE: Sometimes the Script Fails to Hook Into STEEM. Try Running Script Again if it Fails!

    //----- SEE IF POST IS OUR TARGET ----
    "use strict";
    try {
        var process_post = function (op) {
            if (op["author"] !== "") {
                setTimeout(steem.broadcast.vote(
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
                            lastBlock++;
                            console.log("Successfully voted " + weight / 100 + "%" + " #" + targettag + " post " + " by " + op["author"] +
                                "   Posts Voted: " + totalvote + " @ Block # " + lastBlock);
                        }

                    }), 3000); // ***IMPORTANT*** Change this value to change the wait time per vote, in milliseconds.
            }
        };
    } catch (e) {
        return null;
    }

    //----- STREAMING LATEST BLOCK OPERATIONS -----
    steem.api.streamOperations(function (err2, blockops) {
        try {
            //var opType = blockops[0]; // get 1st item in blockops and apply to operationType variable to check type later

            var op = blockops[1]; // get 2nd item in blockops and store it later to be parsed if it's our specified type of operation

            if (op["json_metadata"] !== undefined) {

                metadatascan = op["json_metadata"];
                if (metadatascan !== '') {
                    var tags = JSON.parse(metadatascan);
                    var actualtags = tags["tags"];
                    if (actualtags !== undefined) {
                        var tagtag = String(actualtags);

                        if (op["parent_author"] === '') {
                            if (tagtag.toLowerCase().indexOf(targettag) >= 0) {
                                process_post(op);
                            }

                        }

                    }

                }

            }
        } catch (e) {
            return null;
        }
    });
    return lastBlock;
});
