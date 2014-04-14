Game.RequiresConfirmation=function(upgrade,prompt){
	upgrade.clickFunction=function(){Game.UpgradesById[upgrade.id].buy(1);}
}
var next='None';
var clicking=false;
var speedbaking=false;
var resettable=false;
var timer;
var resetRatio=0.15;
var wrinklersNum=0;
var cookiesGetLastGame;
var resetGoldenBaseNum=300;
function startClicking(){
	timer=setInterval('Game.ClickCookie()' , 100);
}
function stopClicking(){
	clearInterval(timer);
}
function resetnum(){
	return Game.cookiesReset*resetRatio;
}
function gameReset(){
	if(resettable){
		cookiesGetLastGame=Game.cookiesEarned;
		Game.Reset(1);
		resettable=false;
	}
	if(Game.goldenClicksLocal>=resetGoldenNum() && Game.frenzy==0 && Game.goldenCookie.chain==0 && Game.clickFrenzy==0){
		resettable=true;
	}
}
function resetGoldenNum(){
	return resetGoldenBaseNum*(Game.Has('Lucky day')?2:1)*(Game.Has('Serendipity')?2:1);
}
function currentCps(){
	return Game.cookiesPs*((Game.frenzy>0)?Game.frenzyPower:1);
}
function goldenClick(){
	if(Game.goldenCookie.life>0){
		Game.goldenCookie.click();
	}
}
function seasonPopupClick(){
	if(Game.seasonPopup.life>0&&(Game.seasonPopup.life<Game.fps||Game.frenzy>0)){
		Game.seasonPopup.click();
	}
}
function wrinklersClick(){
	for(var i in Game.wrinklers){
		if(Game.frenzy==0&&Game.wrinklers[i].sucked>currentCps()*60){
			Game.wrinklers[i].hp=0;
		}
	}
}
function cookieClicking(){
	if((Game.clickFrenzy>0||Game.cookiesPs<=Game.mouseCps()*10||speedbaking)&&!clicking){
		startClicking();
		clicking=true;
	}
	if((Game.clickFrenzy==0&&Game.cookiesPs>Game.mouseCps()*10&&!speedbaking)&&clicking){
		stopClicking();
		clicking=false;
	}
}
var buy=function(){
	gameReset();
	seasonPopupClick();
	wrinklersClick();
	goldenClick();
	cookieClicking();
	if(Game.BuildingsOwned == 0){
		if(Game.cookies>=15){
			Game.Objects['Cursor'].buy();
			console.log('Buy:Cursor');
		}
	}else{
		var build='Cursor';
		var wait=Game.Objects[build].getPrice()/Game.cookiesPs;
		var value=Math.log(1+Game.Objects[build].cps()/Game.cookiesPs)/wait;
		for(var i in Game.Objects){
			var iwait=Game.Objects[i].getPrice()/Game.cookiesPs;
			var ivalue=Math.log(1+Game.Objects[i].cps()/Game.cookiesPs)/iwait;
			if(value<ivalue){
				build=Game.Objects[i].name;
				value=ivalue;
			}
		}
		var upgrade='none';
		var upwait=0;
		var upvalue=0;
		for(var i in Game.UpgradesInStore){
			var iwait=Game.UpgradesInStore[i].getPrice()/Game.cookiesPs;
			var ivalue=0;
			var name=Game.UpgradesInStore[i].name;
			var gain=0;
			var twait=(Game.UpgradesInStore[i].getPrice()+addition)/currentCps();
			if(iwait<=300){
				switch(name){
				case 'Reinforced index finger':
					gain=0.1*Game.Objects['Cursor'].amount;
					break;
				case 'Carpal tunnel prevention cream':
				case 'Ambidextrous':
					gain=Game.Objects['Cursor'].cps()*Game.Objects['Cursor'].amount;
					break;
				case 'Thousand fingers':
					gain=0.1*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Million fingers':
					gain=0.5*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Billion fingers':
					gain=2*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Trillion fingers':
					gain=10*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Quadrillion fingers':
					gain=20*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Quintillion fingers':
					gain=100*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Sextillion fingers':
					gain=200*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Septillion fingers':
					gain=400*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Octillion fingers':
					gain=800*(Game.BuildingsOwned-Game.Objects['Cursor'].amount);
					break;
				case 'Forwards from grandma':
					gain=0.3*Game.Objects['Grandma'].amount;
					break;
				case 'Steel-plated rolling pins':
				case 'Lubricated dentures':
				case 'Prune juice':
				case 'Double-thick glasses':
				case 'Farmer grandmas':
				case 'Worker grandmas':
				case 'Miner grandmas':
				case 'Cosmic grandmas':
				case 'Transmuted grandmas':
				case 'Altered grandmas':
				case 'Grandmas\' grandmas':
				case 'Antigrandmas':
				case 'Rainbow grandmas':
				case 'Aging agents':
					gain=Game.Objects['Grandma'].cps()*Game.Objects['Grandma'].amount;
					break;
				case 'Cheap hoes':
					gain=1*Game.Objects['Farm'].amount;
					break;
				case 'Fertilizer':
				case 'Cookie trees':
				case 'Genetically-modified cookies':
				case 'Gingerbread scarecrows':
				case 'Pulsar sprinklers':
					gain=Game.Objects['Farm'].cps()*Game.Objects['Farm'].amount;
					break;
				case 'Sturdier conveyor belts':
					gain=4*Game.Objects['Factory'].amount;
					break;
				case 'Child labor':
				case 'Sweatshop':
				case 'Radium reactors':
				case 'Recombobulators':
				case 'Deep-bake process':
					gain=Game.Objects['Factory'].cps()*Game.Objects['Factory'].amount;
					break;
				case 'Sugar gas':
					gain=10*Game.Objects['Mine'].amount;
					break;
				case 'Megadrill':
				case 'Ultradrill':
				case 'Ultimadrill':
				case 'H-bomb mining':
				case 'Coreforge':
					gain=Game.Objects['Mine'].cps()*Game.Objects['Mine'].amount;
					break;
				case 'Vanilla nebulae':
					gain=30*Game.Objects['Shipment'].amount;
					break;
				case 'Wormholes':
				case 'Frequent flyer':
				case 'Warp drive':
				case 'Chocolate monoliths':
				case 'Generation ship':
					gain=Game.Objects['Shipment'].cps()*Game.Objects['Shipment'].amount;
					break;
				case 'Antimony':
					gain=100*Game.Objects['Alchemy lab'].amount;
					break;
				case 'Essence of dough':
				case 'True chocolate':
				case 'Ambrosia':
				case 'Aqua crustulae':
				case 'Origin crucible':
					gain=Game.Objects['Alchemy lab'].cps()*Game.Objects['Alchemy lab'].amount;
					break;
				case 'Ancient tablet':
					gain=1666*Game.Objects['Portal'].amount;
					break;
				case 'Insane oatling workers':
				case 'Soul bond':
				case 'Sanity dance':
				case 'Brane transplant':
				case 'Deity-sized portals':
					gain=Game.Objects['Portal'].cps()*Game.Objects['Portal'].amount;
					break;
				case 'Flux capacitors':
					gain=9876*Game.Objects['Time machine'].amount;
					break;
				case 'Time paradox resolver':
				case 'Quantum conundrum':
				case 'Causality enforcer':
				case 'Yestermorrow comparators':
				case 'Far future enactment':
					gain=Game.Objects['Time machine'].cps()*Game.Objects['Time machine'].amount;
					break;
				case 'Sugar bosons':
					gain=99999*Game.Objects['Antimatter condenser'].amount;
					break;
				case 'String theory':
				case 'Large macaron collider':
				case 'Big bang bake':
				case 'Reverse cyclotrons':
				case 'Nanocosmics':
					gain=Game.Objects['Antimatter condenser'].cps()*Game.Objects['Antimatter condenser'].amount;
					break;
				case 'Gem polish':
					gain=1000000*Game.Objects['Prism'].amount;
					break;
				case '9th color':
				case 'Chocolate light':
				case 'Grainbow':
				case 'Pure cosmic light':
				case 'Glow-in-the-dark':
					gain=Game.Objects['Prism'].cps()*Game.Objects['Prism'].amount;
					break;
				case 'Oatmeal raisin cookies':
				case 'Peanut butter cookies':
				case 'Plain cookies':
				case 'Sugar cookies':
				case 'Coconut cookies':
				case 'White chocolate cookies':
				case 'Macadamia nut cookies':
					gain=Game.cookiesPs/Game.globalCpsMult*0.05;
					break;
				case 'Double-chip cookies':
				case 'White chocolate macadamia nut cookies':
				case 'All-chocolate cookies':
					gain=Game.cookiesPs/Game.globalCpsMult*0.1;
					break;
				case 'Dark chocolate-coated cookies':
				case 'White chocolate-coated cookies':
				case 'Eclipse cookies':
				case 'Zebra cookies':
				case 'Snickerdoodles':
				case 'Stroopwafels':
				case 'Macaroons':
				case 'Empire biscuits':
				case 'British tea biscuits':
				case 'Chocolate british tea biscuits':
				case 'Round british tea biscuits':
				case 'Round chocolate british tea biscuits':
				case 'Round british tea biscuits with heart motif':
				case 'Round chocolate british tea biscuits with heart motif':
					gain=Game.cookiesPs/Game.globalCpsMult*0.15;
					break;
				case 'Madeleines':
				case 'Palets':
				case 'Palmiers':
				case 'Sabl&eacute;s':
				case 'Skull cookies':
				case 'Ghost cookies':
				case 'Bat cookies':
				case 'Slime cookies':
				case 'Pumpkin cookies':
				case 'Eyeball cookies':
				case 'Spider cookies':
				case 'Christmas tree biscuits':
				case 'Snowflake biscuits':
				case 'Snowman biscuits':
				case 'Holly biscuits':
				case 'Candy cane biscuits':
				case 'Bell biscuits':
				case 'Present biscuits':
					gain=Game.cookiesPs/Game.globalCpsMult*0.2;
					break;
				case 'Caramoas':
				case 'Sagalongs':
				case 'Shortfoils':
				case 'Win mints':
				case 'Fig gluttons':
				case 'Loreols':
				case 'Jaffa cakes':
				case 'Grease\'s cups':
				case 'Gingerbread men':
				case 'Gingerbread trees':
				case 'Pure heart biscuits':
				case 'Ardent heart biscuits':
				case 'Sour heart biscuits':
				case 'Weeping heart biscuits':
				case 'Golden heart biscuits':
				case 'Eternal heart biscuits':
					gain=Game.cookiesPs/Game.globalCpsMult*0.25;
					break;
				case 'Rose macarons':
				case 'Lemon macarons':
				case 'Chocolate macarons':
				case 'Pistachio macarons':
				case 'Hazelnut macarons':
				case 'Violet macarons':
					gain=Game.cookiesPs/Game.globalCpsMult*0.3;
					break;
				case 'Kitten helpers':
					var milkMult=Game.Has('Santa\'s milk and cookies')?1.05:1;
					gain=Game.cookiesPs*Game.milkProgress*0.05*milkMult;
					break;
				case 'Kitten workers':
					var milkMult=Game.Has('Santa\'s milk and cookies')?1.05:1;
					gain=Game.cookiesPs*Game.milkProgress*0.1*milkMult;
					break;
				case 'Kitten engineers':
				case 'Kitten overseers':
				case 'Kitten managers':
					var milkMult=Game.Has('Santa\'s milk and cookies')?1.05:1;
					gain=Game.cookiesPs*Game.milkProgress*0.2*milkMult;
					break;
				case 'Season switcher':
				case 'Ghostly biscuit':
					if(Game.Has('One mind')&&!Game.Has('Elder Pact')){
						Game.Upgrades[name].buy();
						return;
					}
					break;
				case 'Lovesick biscuit':
					if(Game.Has('Elder Pact')&&!Game.Has('Eternal heart biscuits')){
						Game.Upgrades[name].buy();
						return;
					}
					break;
				case 'Festive biscuit':
					if(Game.Has('Elder Pact')&&Game.Has('Eternal heart biscuits')){
						Game.Upgrades[name].buy();
						return;
					}
					break;
				case 'A festive hat':
					gain=10e14;
					break;
				case 'Increased merriness':
				case 'Improved jolliness':
					gain=Game.cookiesPs/Game.globalCpsMult*0.15;
					break;
				case 'A lump of coal':
				case 'An itchy sweater':
					gain=Game.cookiesPs/Game.globalCpsMult*0.01;
					break;
				case 'Reindeer baking grounds':
				case 'Weighted sleighs':
				case 'Ho ho ho-flavored frosting':
				case 'Season savings':
				case 'Toy workshop':
					gain=10e14;
					break;
				case 'Naughty list':
					gain=Game.Objects['Grandma'].cps()*Game.Objects['Grandma'].amount;
					break;
				case 'Santa\'s bottomless bag':
				case 'Santa\'s helpers':
					gain=10e14;
					break;
				case 'Santa\'s legacy':
					gain=Game.cookiesPs/Game.globalCpsMult*(Game.santaLevel+1)*0.1;;
					break;
				case 'Santa\'s milk and cookies':
					var mult=1;
					if (Game.Has('Kitten helpers')) mult*=(1+Game.milkProgress*0.05*0.05);
					if (Game.Has('Kitten workers')) mult*=(1+Game.milkProgress*0.1*0.05);
					if (Game.Has('Kitten engineers')) mult*=(1+Game.milkProgress*0.2*0.05);
					if (Game.Has('Kitten overseers')) mult*=(1+Game.milkProgress*0.2*0.05);
					gain=Game.cookiesPs/Game.globalCpsMult*mult;
					break;
					gain=10e14;
					break;
				case 'Santa\'s dominion':
					gain=Game.cookiesPs/Game.globalCpsMult*0.5;
					break;
				case 'Bingo center/Research facility':
				case 'Persistent memory':
				case 'Specialized chocolate chips':
				case 'Designer cocoa beans':
				case 'Ritual rolling pins':
				case 'Underworld ovens':
				case 'One mind':
				case 'Exotic nuts':
				case 'Arcane sugar':
				case 'Elder Pact':
				case 'Elder Pledge':
				case 'Sacrificial rolling pins':
					if(Game.cookies>Game.Upgrades[name].getPrice()){
						Game.Upgrades[name].buy();
						return;
					}
					break;
				case 'Communal brainsweep':
					if(Game.Has('Skull cookies')&&Game.Has('Ghost cookies')&&Game.Has('Bat cookies')
					&&Game.Has('Slime cookies')&&Game.Has('Pumpkin cookies')&&Game.Has('Eyeball cookies')
					&&Game.Has('Spider cookies')&&Game.cookies>Game.Upgrades[name].getPrice()){
						Game.Upgrades[name].buy();
						return;
					}
					break;
				case 'Plastic mouse':
				case 'Iron mouse':
				case 'Titanium mouse':
				case 'Adamantium mouse':
				case 'Unobtainium mouse':
				case 'Eludium mouse':
				case 'Wishalloy mouse':
					if(Game.cookies>Game.Upgrades[name].getPrice()){
						Game.Upgrades[name].buy();
						return;
					}
					break;
				case 'Lucky day':
				case 'Serendipity':
				case 'Get lucky':
					if(Game.cookies>Game.Upgrades[name].getPrice()){
						Game.Upgrades[name].buy();
						return;
					}
					break;
				case 'Heavenly chip secret':
					if(!speedbaking){
						var mult=parseFloat(Game.prestige['Heavenly chips'])*0.02*0.05;
						gain=Game.cookiesPs/Game.globalCpsMult*mult;
					}
					break;
				case 'Heavenly cookie stand':
					if(!speedbaking){
						var mult=parseFloat(Game.prestige['Heavenly chips'])*0.02*0.2;
						gain=Game.cookiesPs/Game.globalCpsMult*mult;
					}
					break;
				case 'Heavenly bakery':
				case 'Heavenly confectionery':
				case 'Heavenly key':
					if(!speedbaking){
						var mult=parseFloat(Game.prestige['Heavenly chips'])*0.02*0.25;
						gain=Game.cookiesPs/Game.globalCpsMult*mult;
					}
					break;
				}
			}
			ivalue=Math.log(1+gain/Game.cookiesPs)/iwait;
			if(upvalue<ivalue){
				upgrade=Game.UpgradesInStore[i].name;
				upvalue=ivalue;
			}
		}
		var ratio=(Game.UpgradesOwned>150)?150:Game.UpgradesOwned;
		var time=(Game.Has('Get lucky'))?150:73;
		var maxtime=Game.fps*time;
		var frenzy=(Game.frenzy>0 && Game.frenzy<maxtime)?Game.frenzyPower:1;
		var addition=84000*Game.cookiesPs/frenzy*(ratio*ratio)/(150*150)
		if(value>=upvalue){
			var border=Game.Objects[build].getPrice()+(speedbaking?0:addition);
			if(Game.cookies>border || Game.Objects[build].getPrice()<Game.cookiesPs/frenzy){
				console.log('Buy:'+build);
				Game.Objects[build].buy();
				next='none';
			}else if(next!=build){
				console.log('Next:'+build+'('+Beautify(border)+')');
				next=build;
			}
		}else{
			var border=Game.Upgrades[upgrade].getPrice()+(speedbaking?0:addition);
			if(Game.cookies>border || Game.Upgrades[upgrade].getPrice()<Game.cookiesPs/frenzy){
				console.log('Buy:'+upgrade);
				Game.Upgrades[upgrade].buy();
				next='none';
			}else if(next!=upgrade){
				console.log('Next:'+upgrade+'('+Beautify(border)+')');
				next=upgrade;
			}
		}
	}
};
setInterval('buy()',500);
