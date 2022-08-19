//WZone.wz Fastplay script
//Includes 4 scav bases, 3 NPbases, and 1 NP LZ.
//Enemies are set to get stronger as you progress with only basic research being granted
//to the player. Limit of 12 oil resources and small attack waves result in a calulated
//approach to achieving victory in this setting. Includes use of 3 altered video files
//inside sequences.wz and 2 altered audio files included.
//Current Version Alpha 1.2.1
//Missing code sections:
//    Enemy LZ reinforcements
//    Player LZ intro and include a set unit list determined by Difficulty
//      Easy: 	2 trucks, 6 Machinegun, 2 Repair
//      Medium:	2 trucks, 8 Machinegun
//      Hard: 	2 trucks
//-------------------------------------Resources-----------------------------------------
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
//---------------------------------Enemy ID and Tech-------------------------------------
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
//-------------------------------------Variables-----------------------------------------
var radarTower
var Wave
var lzWave
//-----------------------------------Event Triggers--------------------------------------
camAreaEvent("factory1Trigger", function()
{
	camCompleteRequiredResearch(SCAVENGER_RES1, SCAV_7);
	camEnableFactory("base1Factory");
	camPlayVideos({video: "MBDEMO_MSG", type: MISS_MSG});
	queue("sendScavAttack");
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
	//hackAddMessage() place blip on scav base 3=============================
});
camAreaEvent("np3Trigger", function()
{
	camCompleteRequiredResearch(SCAVENGER_RES4, SCAV_7);
	camCompleteRequiredResearch(NEW_PARADIGM_RES3, NEW_PARADIGM);
	camEnableFactory("base4Factory");
	camEnableFactory("base81Factory");
	camEnableFactory("base91Factory");
	camPlayVideos(["pcv901.ogg", {video: "MBDEMO3_MSG", type: MISS_MSG}]);
});
camAreaEvent("np2Trigger", function()
{
	camCompleteRequiredResearch(NEW_PARADIGM_RES2, NEW_PARADIGM);
	camEnableFactory("base6Factory");
	camEnableFactory("base7Factory");
	camPlayVideos(["pcv901.ogg", {video: "MBDEMO5_MSG", type: MISS_MSG}]);
});
camAreaEvent("npFinal", function()
{
	var Wave = 10;
	setTimer("NPBlitz", camChangeOnDiff(camMinutesToMilliseconds(2)));
});
camAreaEvent("enemyLZtrigger", function()
{
	var lzWave = 10;
	setTimer("NPLZReinforcements", camChangeOnDiff(camSecondsToMilliseconds(60)));
	camPlayVideos(["pcv382.ogg"]);
	//hackAddMessage() reveal enemyLZ========================================
});
//------------------------------Mission Objective Videos---------------------------------
function camArtifactPickup_artifactpos()
{
	camCallOnce("VidPmod");
}
function camArtifactPickup_base2Command()
{
	camCallOnce("VidComm");
}
function camArtifactPickup_base82Factory()
{
	camCallOnce("VidSynap");
}
function VidPmod()
{
	camPlayVideos({video: "MBDEMO7_MSG", type: MISS_MSG});
}
function VidComm()
{
	camPlayVideos({video: "MBDEMO8_MSG", type: MISS_MSG});
}
function VidSynap()
{
	camPlayVideos({video: "MBDEMO9_MSG", type: MISS_MSG});
}
//-----------------------------------Game Mechanics--------------------------------------
function sendScavAttack()
{
	camManageGroup(camMakeGroup("scavGroup0"), CAM_ORDER_ATTACK, {
		morale: 50,
		fallback: camMakePos("base1Assembly"),
		regroup: false,
		count: -1
	});
}
function NPLZReinforcements()
{
	if (lzWave !== 0)
	{
		lzWave -= 1;
			if (difficulty === HARD || difficulty === INSANE)
			{
				var tdroids = [cTempl.nphthmg, cTempl.nphtmrp, cTempl.nphtca2, cTempl.nphthmg, cTempl.nphtmrp, cTempl.nphtca2, cTempl.nphthmg, cTempl.nphtmrp, cTempl.nphtca2];
			}
			else
			{
				var tdroids = [cTempl.nphthmg, cTempl.nphtmrp, cTempl.nphtca2,cTempl.nphthmg, cTempl.nphtmrp];
			}
		camSendReinforcement(NEW_PARADIGM, camMakePos("NPLZPos"), tdroids, CAM_REINFORCE_TRANSPORT,
			{
				entry: { x: 99, y: 42 },
				exit: { x: 0, y: 0 },
				order: CAM_ORDER_ATTACK,
				data: {
					regroup: false,
					count: -1,
					pos: camMakePos("enemyLZ"),
					repair: 66,
				},
			}
		);
		//hackAddMessage() place blip at enemyLZ================================
	}
	if (lzWave === 0)
	{
		removeTimer("NPLZReinforcements");
	}
}
function NPBlitz()
{
	if (Wave !== 0)
	{
		Wave -= 1;
		var TankNum = 8 + camRand(6);
		var list = [cTempl.nphtmor, cTempl.nphtsen, cTempl.nphthmg, cTempl.nphtmrp, cTempl.nphtca2];
		var droids = [];
		for (var i = 0; i < TankNum; ++i)
		{
			droids.push(list[camRand(list.length)]);
		}
		camSendReinforcement(NEW_PARADIGM, camMakePos("NPBlitzPos"), droids, CAM_REINFORCE_GROUND);
		camPlayVideos(["pcv902.ogg"]);
		//hackAddMessage() place blip at NPBlitzPos=============================
	}
	if (Wave === 0)
	{
		removeTimer("NPBlitz");
	}
}
function eventAttacked(victim, structure)
{
//Made to detect if a np struct is gone before playing a warning message when first -----
//attacking np units.--------------------------------------------------------------------
//Doesn't work ai but it at least is usable as is, without errors. not cleaning it up.---
//Will trigger even if struct is still around, but at least I can tag this to------------
//activate the first np factory.---------------------------------------------------------
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
	camCompleteRequiredResearch(NEW_PARADIGM_RES1, NEW_PARADIGM);
	camEnableFactory("base51Factory");
	camPlayVideos(["pcv901.ogg", {video: "MBDEMO4_MSG", type: MISS_MSG}, "pcv900.ogg"]);
}
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
	enableResearch("R-Wpn-MG-Damage03", CAM_HUMAN_PLAYER);
	completeResearch("R-Wpn-MG-Damage03", CAM_HUMAN_PLAYER);
}
function eventStartLevel()
{
	setAlliance(NEW_PARADIGM, SCAV_7, true);
	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, undefined);
	var startpos = getObject("startPosition");
	var lz = getObject("landingZone");
	var enemyLZ = getObject("enemylandingZone");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	setNoGoArea(enemyLZ.x, enemyLZ.y, enemyLZ.x2, enemyLZ.y2, NEW_PARADIGM);
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
//-------------------------------------Artifacts-----------------------------------------
	camSetArtifacts({
		"base1Factory": { tech: "R-Wpn-MG2Mk1" },
		"artifactpos": { tech: "R-Struc-PowerModuleMk1" },
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
		"base2Command": { tech: "R-Struc-CommandRelay" },
		"base82Factory": { tech: "R-Comp-SynapticLink" },
		"base92Factory": { tech: "R-Struc-Factory-Cyborg" },
	});
//----------------------------------Enemy Factories--------------------------------------
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
		"base51Factory": {
			assembly: "base5Assembly",
			order: CAM_ORDER_DEFEND,
			groupSize: 9,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(15)),
			templates: [cTempl.nphmg]
		},
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
		"base81Factory": {
			assembly: "base8Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(20)),
			templates: [cTempl.npmrl, cTempl.npblc]
		},
		"base91Factory": {
			assembly: "base9Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(20)),
			templates: [cTempl.npltat, cTempl.nphmg]
		},
		"base82Factory": {
			assembly: "base82Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(15)),
			templates: [ cTempl.npcybc, cTempl.npcybf, cTempl.npcybr ]
		},
		"base92Factory": {
			assembly: "base92Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(15)),
			templates: [ cTempl.npcybc, cTempl.npcybf, cTempl.npcybr ]
		}
	});
//----------------------------Start of Mission Event Queue-------------------------------
	radarTower = getObject("radarTower");
	camPlayVideos({video: "MBDEMO1_MSG", type: MISS_MSG});
//have transport drop units at starting point then camPlayVideos
//(["pcv901.ogg", {video: "MBDEMO6_MSG", type: MISS_MSG}]);
}
