STEEM Tag Bot
Updated and Modified to Tag(2018) by @Flemingfarm, Developed by @KLYE as Vooby(2017)

Free to Use for All! || Free to Modify

Designed to upvote a new post under a tag with no delay. The moment the blockchain 
publishes the block, the bot will vote the post.

------------------------------------------------------------------------------------------------------------------------------
The origin of Vooby as told by @KYLE in his post: https://steemit.com/steemdev/@klye/vooby-steem-bot-v0-0-1-open-source-nodejs-introduceyourself-upvoting-script

Vooby stands for "Voting Noobies" and is a stand alone NodeJS script which allows anyone to automate upvoting all posts in the
"#introduceyourself" (or any other) tag. I created it over the past few hours after deciding it would be neat to experiment with
upvoting new users to see if it increases user retention... and also to reward new comers to our network with their first little bit of
post payout!

The UPDATE:

I needed a way to automatically vote on every new post to the tag #actifit. After finding Vooby bot I had to make a few updates and modifications to the code, primarily adding the catch() in order to suppress the errors that would drop the script forcing a restart. In doing so I renamed it to better reflect its purpose. In it's current version the bot only logs a
successful upvote to the console and does not show a log listing for every new block scanned. 

This is a sample of the new output to the console: 
"Successfully voted 2% #actifit post! by browery  Posts Voted: 1 @ Block # 24555650"

AGAIN! THIS BOT VOTES WITH NO DELAY! 
------------------------------------------------------------------------------------------------------------------------------

Requirements to run:

INSTALL: 

Node.js ->	https://.nodejs.org/en/download

steem.js -> CLI - npm install steem --save

Forever ->  CLI - npm install forever -g (to run in daemon)

CONFIG - Edit Tab.js:
(These 4 variables MUST be input for bot to run!)

***IMPORTANT*** Your Posting Private Key Below

var wifkey = '';

***IMPORTANT*** Enter Voting account below (no @)

var voter = "";

***IMPORTANT*** Enter the Tag you want to upvote new posts in

var targettag = "";

***IMPORTANT*** Modify this (10000 = 100.00% vote & 100 = 1.00% vote)

var weight = 0;


************************ TO RUN SCRIPT ****************************

****************** At command line:  node tag.js ******************

************** As Forever: forever -e err.log tag.js **************
