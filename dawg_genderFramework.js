/*:
 * @plugindesc A framework for adding dynamic gender information to Actors.
 * @author dawg
*/

// The concat function combines the contents of two arrays into one new array - i.e. array1.concat(array2) - doesn't matter what order you put them in. You can add more name lists as you desire!
mascNames = [
	"Finn",
	"Jake",
	"Rigby",
	"Arnold",
	"Eddy"
]
femNames = [
	"Fiona",
	"Marceline",
	"Margaret",
	"Helga",
	"Sarah"
]

allNames = femNames.concat(mascNames);

//This array contains separate gender objects, which can be set as a new "gender" property on a database object like an Actor, and then checking it, i.e. $dataActors[2].gender.gender will spit out whatever value that property has.
//For example, if the character is set as a woman, calling $dataActors[2].gender.nominative will return "she".
genders = [
{gender:"nonbinary",nominative:"they",objective:"them",possessiveAdj:"their",possessivePron:"theirs",reflexive:"themself",nameList:allNames},
{gender:"woman",nominative:"she",objective:"her",possessiveAdj:"her",possessivePron:"hers",reflexive:"herself",nameList:femNames},
{gender:"man",nominative:"he",objective:"him",possessiveAdj:"his",possessivePron:"his",reflexive:"himself",nameList:mascNames}
]
//Example of an extra gender you might add: {gender:"gender-neutral",nominative:"ze",objective:"hir",possessiveAdj:"hir",possessivePron:"hirs",reflexive:"hirself",nameList:allNames};

//Functions for getting information about a character's gender! Useful for dialogue; you need to either use a Show Text command from the Script Calls sheet I linked in the "JS Code Tutorials" thread on the class Discord server, or have a common event
//set the values of a bunch of variables so that they can be called in the default 
function gender(character) {
  return character.gender.gender;
}
function nom(character) {
  return character.gender.nominative;
}
function obj(character) {
  return character.gender.objective;
}
function posAdj(character) {
  return character.gender.possessiveAdj;
}
function posPron(character) {
  return character.gender.possessivePron;
}
function ref(character) {
  return character.gender.reflexive;
}

//Function to generate a new character and use their information for different purposes; you could generate a character and then assign the values from this function to an actor in the database!
function newCharacter() {
  const gender = genders[Math.floor(Math.random() * genders.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return {name:name,gender:gender};
}

//If you're using MZ:
function actorDialogueMZ(character,bgType,posType,text) {
	const faceName = character.faceName();
	const faceIndex = character.faceIndex();
	$gameMessage.setFaceImage(faceName, faceIndex);
	const speakerName = character.name();
	$gameMessage.setBackground(bgType); // 0 = window, 1 = dim, 2 = transparent
	$gameMessage.setPositionType(posType); // 0 = top, 1 = middle, 2 = bottom
	$gameMessage.setSpeakerName(speakerName);
	$gameMessage.add(text);
	$gameMap._interpreter.setWaitMode('message');
}
//If you're using MV:
function actorDialogueMV(character,bgType,posType,text) {
	const faceName = character.faceName();
	const faceIndex = character.faceIndex();
	$gameMessage.setFaceImage(faceName, faceIndex);
	$gameMessage.setBackground(bgType); // 0 = window, 1 = dim, 2 = transparent
	$gameMessage.setPositionType(posType); // 0 = top, 1 = middle, 2 = bottom
	$gameMessage.add(text);
	$gameMap._interpreter.setWaitMode('message');
}
