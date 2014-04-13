/**
 * 
 */
// Global variables
var CurrentDate;
var Gold;
var Platinum;
var Iron;
var Copper;
var Zinc;
var Palladium;
var Crystalline;
var Helium;
var TheCompany;
var TheMarket;
var TheCommunity;
var CurrentSentiment;
var TurnCounter;
var endGameConditionsMet;

// Constants
var positive = "positive";
var neutral = "neutral";
var negative = "negative";
var supportive ="supportive";
var opposing = "opposing";
var goodLanding = "good";
var badLanding = "bad";
var okLanding = "ok";
var crashLanding = "crash";
var stableMarket = "stable";
var climbingMarket = "climbing";
var glutMarket = "glut";
	



// Constructors and helper functions
function explorerPlatform()
{
}

function explorationCompany(name, startingBudget, startingDebt, startingLocation, startDate)
{
	//alert("explorationCompany called");
	this.m_name = name;
	this.m_currentFunding = startingBudget;
	this.m_currentDebt = startingDebt;
	this.m_location = startingLocation;
	this.m_foundingDate = startDate;

}

//This function is called when a world event is indicated
function worldEvent ()
{
}

//This function creates the community, other functions will drive community responses
function community ()
{
	//alert("community called");
	// Possible values are
	// positive, neutral, negative, opposing, supportive
	this.m_sentiment = neutral;
	this.m_attitude = supportive;
}

function setFundingLevel()
{
	}
function setSentiment(sentiment){
	this.m_sentiment = sentiment;
}

function setAttitude(attitude){
	this.m_attitude = attitude;
}
//This function creates the market place. Other functions will trigger market events
function commodityMarket()
{
}

//Create commodities, these are the commercial building blocks
function commodity (name,novelty, value)
{
maximum = 10;
minimum = 1;
this.m_name = name;
this.m_novelty = novelty;
this.m_match = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
this.m_value = value;
}

function initCommodities()
{
	//alert("initCommodities called");
	Gold = new commodity("Gold", 5, 10);
	Platinum = new commodity("Platinum", 20);
	Iron= new commodity("Iron", 4);
	Copper= new commodity("Copper", 10);
	Zinc= new commodity("Zinc", 5);
	Palladium= new commodity("Palladium", 25);
	Crystalline= new commodity("Crystalline", 30);
	Helium = new commodity("Helium", 0, 40);
}

//Functions
function startGame(){
	//alert("startGame called");
	TheCompany= new explorationCompany(document.getElementById('companyName').value, 60000000, 60000000, document.getElementById('companyLocation').value, document.getElementById('datepicker').value);
	TheCommunity = new community();
	initCommodities();
	document.getElementById('theName').innerHTML = TheCompany.m_name;
	//alert (this.m_name);
	//alert(document.getElementById('theName').innerHTML);
	document.getElementById('theLocation').innerHTML = TheCompany.m_location;
	document.getElementById('theDate').innerHTML = TheCompany.m_foundingDate;
	document.getElementById('currentAccount').innerHTML = 60000000;
	document.getElementById('currentDebt').innerHTML = 60000000;
	TurnCounter= 0;
	document.getElementById('turncounter').innerHTML = TurnCounter;
}

function startTurn(){
	TurnCounter = TurnCounter +1;
	document.getElementById('turncounter').innerHTML = TurnCounter;
	document.getElementById('communitySentiment').innerHTML = TheCommunity.m_sentiment;
	document.getElementById('communityAttitude').innerHTML =TheCommunity.m_attitude;

	
}

function endTurn(){
	var landingQual = document.getElementById('landingQuality').value.toLowerCase();
	var marketCondition = document.getElementById('marketQuality').value.toLowerCase();
	var incomeMade = document.getElementById('incomeMade').value;
	var bonusPercentage = 0;
	var bonusAwarded;
	if(goodLanding == landingQual){
		TheCommunity.m_sentiment = positive;
		bonusPercentage = bonusPercentage + 10;
	}
	if(landingQual == okLanding){
		TheCommunity.m_sentiment = neutral;
		bonusPercentage = bonusPercentage + 5;
	}
	if(landingQual == badLanding){
		TheCommunity.m_sentiment = neutral;
		bonusPercentage = bonusPercentage + 2;
	}
	if(landingQual == crashLanding){
		TheCommunity.m_sentiment = negative;
	}

	if(stableMarket == marketCondition){
		TheCommunity.m_attitude = neutral;
		bonusPercentage = bonusPercentage + 5;
	}
	if(climbingMarket == marketCondition){
		TheCommunity.m_attitude = supportive;
		bonusPercentage = bonusPercentage + 10;
	}
	if(glutMarket == marketCondition){
		TheCommunity.m_attitude = opposing;
	}

	document.getElementById('communitySentiment').innerHTML = TheCommunity.m_sentiment;
	document.getElementById('communityAttitude').innerHTML =TheCommunity.m_attitude;
	
	
	// Money stuff
	// Get the amount of money made
	bonusAwarded = (incomeMade * bonusPercentage) /100;
	// Tell the player what the penalty or bonus is
	document.getElementById('bonus').innerHTML =bonusAwarded;
	TheCompany.m_currentFunding = TheCompany.m_currentFunding + incomeMade + bonusAwarded;
	document.getElementById('newCurrentAccount').innerHTML =TheCompany.m_currentFunding;
}