//WZone.wz, is designed to be a compacted Alpha Campaign, reducing tech and play time,
//for a more streamlined experience. Each NPbase will need to be scaled and balanced
//for what few techs are provided. Need to add code to remove the 2 repair droids or
//code to add 2 repair droids only for easy difficulty. As well as a balancing of the
//scav techs, or triggers on destruction of a scav base to grant additional research
//to scavs to maintain a challenging level of gameplay.
//
//Decide whether or not to include cyborgs in mission
//
//Future Additions,
//Alphav1 get every factory to produce units...done
//Alphav2 get reinforcements working for campaign end fight...
//Alphav3 get all videos linked for a complete package...stuck adding new vids, no docs
//Betav1 Balance scav tech/units for player tech for equal power level...awaiting testing
//Betav2 Balance NP tech/units for player tech for challanging gameplay...awaiting testing
//Betav3 Optimize NP/Scav bases for realnise...
//Gammav1 map design optimization...
//Gammav2 smooth any edges and polish for a final packaged release...

include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
const SCAVENGER_PLAYER = 7;
const SCAVENGER_RES1 = [
	"R-Wpn-Flamer-Damage01", "R-Wpn-Flamer-Range01", "R-Wpn-MG-Damage02", "R-Wpn-MG-ROF01",
];
const SCAVENGER_RES2 = [
	"R-Wpn-Flamer-Damage02", "R-Wpn-Flamer-ROF01", "R-Wpn-Mortar-Damage02",
	"R-Wpn-Mortar-ROF01", "R-Wpn-Rocket-ROF03",
];
const SCAVENGER_RES3 = [
	"R-Wpn-MG-Damage03", "R-Wpn-Cannon-Damage01", "R-Defense-WallUpgrade02",
	"R-Struc-Materials02",
];
const SCAVENGER_RES4 = [
	"R-Wpn-Flamer-Damage03", "R-Wpn-MG-Damage04", "R-Wpn-Rocket-Damage02",
	"R-Wpn-Cannon-Damage02", "R-Wpn-Mortar-Damage03", "R-Vehicle-Metals02",
	"R-Defense-WallUpgrade03", "R-Struc-Materials03",
];
const NEW_PARADIGM_RES1 = [
	"R-Wpn-MG1Mk1", "R-Vehicle-Body01", "R-Sys-Spade1Mk1", "R-Vehicle-Prop-Wheels",
	"R-Sys-Engineering01", "R-Wpn-MG-Damage03", "R-Wpn-MG-ROF01", "R-Wpn-Cannon-Damage01",
	"R-Wpn-Flamer-Damage03", "R-Wpn-Flamer-Range01", "R-Wpn-Flamer-ROF01",
	"R-Defense-WallUpgrade02","R-Struc-Materials02", "R-Vehicle-Engine01",
	"R-Struc-RprFac-Upgrade01", "R-Wpn-Rocket-Damage01", "R-Wpn-Rocket-ROF02",
	"R-Wpn-Mortar-Damage02", "R-Wpn-Mortar-ROF01",
];
const NEW_PARADIGM_RES2 = [
	"R-Wpn-MG-Damage04", "R-Wpn-MG-ROF02", "R-Wpn-Cannon-Damage03",
	"R-Defense-WallUpgrade03","R-Struc-Materials03", "R-Vehicle-Engine02",
	"R-Struc-RprFac-Upgrade03", "R-Wpn-Rocket-Damage02", "R-Wpn-Rocket-ROF03",
	"R-Vehicle-Metals02", "R-Wpn-Mortar-Damage03", "R-Wpn-Rocket-Accuracy02",
	"R-Wpn-RocketSlow-Damage02", "R-Cyborg-Metals03", "R-Wpn-Mortar-Acc01",
	"R-Wpn-RocketSlow-Accuracy01", "R-Wpn-Cannon-Accuracy01",
];
const NEW_PARADIGM_RES3 = [
	"R-Vehicle-Engine03", "R-Struc-RprFac-Upgrade03", "R-Wpn-Rocket-Damage03",
	"R-Vehicle-Metals03", "R-Wpn-RocketSlow-Damage03", "R-Cyborg-Metals03",
];
var radarTower
camAreaEvent("factory1Trigger", function()
{
	camCompleteRequiredResearch(SCAVENGER_RES1, SCAV_7);
	camEnableFactory("base1Factory");
	camPlayVideos({video: "MBDEMO_MSG", type: MISS_MSG});
});
camAreaEvent("factory2Trigger", function()
{
	camCompleteRequiredResearch(SCAVENGER_RES2, SCAV_7);
	camEnableFactory("base2Factory");
});
camAreaEvent("factory3Trigger", function()
{
	camCompleteRequiredResearch(SCAVENGER_RES3, SCAV_7);
	camEnableFactory("base3Factory");
	camPlayVideos({video: "MBDEMO2_MSG", type: MISS_MSG});
	//hackAddMessage() place blip on scav base 3
});
camAreaEvent("np3Trigger", function()
{
	camCompleteRequiredResearch(SCAVENGER_RES4, SCAV_7);
	//camCompleteRequiredResearch(NEW_PARADIGM_RES3, NEW_PARADIGM);
	camEnableFactory("base4Factory");
	camEnableFactory("base81Factory");
	camEnableFactory("base91Factory");
//NPAll out attack message
	camPlayVideos(["pcv901.ogg", {video: "MBDEMO3_MSG", type: MISS_MSG}]);
});
camAreaEvent("np2Trigger", function()
{
	//camCompleteRequiredResearch(NEW_PARADIGM_RES2, NEW_PARADIGM);
	camEnableFactory("base6Factory");
	camEnableFactory("base7Factory");
//NPRetaliation message
	camPlayVideos(["pcv901.ogg", {video: "MBDEMO5_MSG", type: MISS_MSG}]);
});
function eventAttacked(victim, structure) {
//Made to detect if a np struct is gone before playing a warning message when first 
//attacking np units.
//Doesn't work ai but it at least is usable as is, without errors. not cleaning it up.
//Will trigger even if struct is still around, but at least I can tag this to
//activate the first np factory.
	if (!camDef(structure) || !structure || structure.id !== radarTower.id)
	{
		if (!camDef(victim) || !victim || victim.player === CAM_HUMAN_PLAYER)
		{
			return;
		}
		if (victim.player === NEW_PARADIGM)
		{
			camCallOnce("NPWarning");
		}
	}
	else
	{
		return;
	}
}
function NPWarning(args)
{
	//camCompleteRequiredResearch(NEW_PARADIGM_RES1, NEW_PARADIGM);
	camEnableFactory("base51Factory");
	camPlayVideos(["pcv901.ogg", {video: "MBDEMO4_MSG", type: MISS_MSG}, "pcv900.ogg"]);
}

//Unfinished section
//
//
//UNFINISHED CODE
//add np transport and ground reinforcements, add templates for np mantis units,
//code for ground waves, after a 2 minute warning every 1 minute for 6 waves[100]
//after destroying 3rd np base. and 10 transport waves[100] every 1 minutes after
//destroying/passing by scavBase4. First transport arrives on trigger.
//
//
camAreaEvent("npFinal", function()
{

});
function grantStartTech()
{
	const TECH = [
		"R-Wpn-MG1Mk1","R-Vehicle-Body01", "R-Sys-Spade1Mk1", "R-Vehicle-Prop-Wheels"
	];
	const STRUCTS = [
		"A0CommandCentre", "A0PowerGenerator", "A0ResourceExtractor",
		"A0ResearchFacility", "A0LightFactory"
	];

	camCompleteRequiredResearch(TECH, CAM_HUMAN_PLAYER);
	for (var i = 0, l = STRUCTS.length; i < l; ++i)
	{
		enableStructure(STRUCTS[i], CAM_HUMAN_PLAYER);
	}

	//NOTE: Leaving this in for simplicities sake.
	enableResearch("R-Wpn-MG-Damage03", CAM_HUMAN_PLAYER);
	completeResearch("R-Wpn-MG-Damage03", CAM_HUMAN_PLAYER);
}

function eventStartLevel()
{
	setAlliance(NEW_PARADIGM, SCAV_7, true);
	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, undefined);
	var startpos = getObject("startPosition");
	var lz = getObject("landingZone");
	var enemyLz = getObject("enemyLZ");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);

	setReinforcementTime(-1);
	setMissionTime(-1);
	grantStartTech();

	setPower(1000, CAM_HUMAN_PLAYER);

	camSetEnemyBases({
		"southBase": {
			cleanup: "scavBase1",
			detectMsg: "FAST_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"eastBase": {
			cleanup: "scavBase2",
			detectMsg: "FAST_BASE2",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"westBase": {
			cleanup: "scavBase3",
			detectMsg: "FAST_BASE3",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"northBase": {
			cleanup: "scavBase4",
			detectMsg: "FAST_BASE4",
			detectSnd: "pcv375.ogg",
			eliminateSnd: "pcv391.ogg"
		},
		"NPSouthBase": {
			cleanup: "npBase1",
			detectMsg: "FAST_BASE5",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg"
		},
		"NPMiddleBase": {
			cleanup: "npBase2",
			detectMsg: "FAST_BASE6",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg"
		},
		"NPEastBase": {
			cleanup: "npBase3",
			detectMsg: "FAST_BASE7",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg"
		},
	});

	camSafeRemoveObject("flamerArti", false);
	camSetArtifacts({
		"base1Factory": { tech: "R-Wpn-MG2Mk1" },
		"artifactpos": { tech: "R-Struc-PowerModuleMk1" },
//cam1/cam1bpow.ogg needs to play on pickup of 'artifactpos'
		"radarTower": { tech: "R-Struc-Research-Module" },
		"base2Factory": { tech: "R-Wpn-Cannon1Mk1" },
		"base3Factory": { tech: "R-Vehicle-Prop-Halftracks" },
		"base4Factory": { tech: "R-Wpn-Mortar01Lt" },
		"base51Factory": { tech: "R-Vehicle-Body05" },
		"base6Factory": { tech: "R-Wpn-MG3Mk1" },
		"base7Factory": { tech: "R-Wpn-Rocket02-MRL" },
		"base81Factory": { tech: "R-Wpn-Rocket01-LtAT" },
		"base91Factory": { tech: "R-Vehicle-Body11" },
		"base1Research": { tech: "R-Struc-Factory-Module" },
		"base2Research": { tech: "R-Struc-Power-Upgrade01" },
		"base3Research": { tech: "R-Struc-Research-Upgrade01" },
		"base4Research": { tech: "R-Vehicle-Engine01" },
//		"base2Command": { tech: "command turret" }, play custom video cam1ccomb.ogg when artifact is retrieved.
//		"base82Factory": { tech: "synaptic link" }, play cam1/cam1acp.ogg when artifact is retrieved.
//		"base92Factory": { tech: "cyborg something or something" }, its the last obtainable artifact
	});

	camSetFactories({
		"base1Factory": {
			assembly: "base1Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(5)),
			templates: [cTempl.bloke, cTempl.trike]
		},
		"base2Factory": {
			assembly: "base2Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(6)),
			templates: [cTempl.bloketwin, cTempl.triketwin, cTempl.buggy, cTempl.bjeep]
		},
		"base3Factory": {
			assembly: "base3Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(7)),
			templates: [cTempl.blokeheavy, cTempl.trikeheavy, cTempl.buggytwin, cTempl.bjeeptwin]
		},
		"base4Factory": {
			assembly: "base4Assembly",
			order: CAM_ORDER_DEFEND,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(5)),
			templates: [cTempl.blokeheavy, cTempl.trikeheavy, cTempl.buggyheavy, cTempl.rbjeepheavy]
		},
//NPBase1: A single 2nd level factory to build a defensive force for when the player arrives.
		"base51Factory": {
			assembly: "base5Assembly",
			order: CAM_ORDER_DEFEND,
			groupSize: 9,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(15)),
			templates: [cTempl.nphmg]
		},
//NPBase2: Two 1st level factories to spit out small assault groups to harass player(revenge).
		"base6Factory": {
			assembly: "base6Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(20)),
			templates: [cTempl.npblc, cTempl.nphmg]
		},
		"base7Factory": {
			assembly: "base7Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(20)),
			templates: [cTempl.nphmg, cTempl.npblc]
		},
//NPBase3: Two 3rd level factories to squash the player for destroying their bases.
		"base81Factory": {
			assembly: "base8Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(10)),
			templates: [cTempl.npmrl, cTempl.npblc]
		},
		"base91Factory": {
			assembly: "base9Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(10)),
			templates: [cTempl.npltat, cTempl.nphmg]
		}
	});
	radarTower = getObject("radarTower");
	camPlayVideos({video: "MBDEMO1_MSG", type: MISS_MSG});
//have transport drop units at starting point then camPlayVideos
//(["pcv901.ogg", {video: "MBDEMO6_MSG", type: MISS_MSG}]);
}
