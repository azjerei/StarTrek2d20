﻿import {Skill} from './skills';
import {Source} from './sources';
import {character} from '../common/character';

export enum Role {
    // Core
    CommandingOfficer,
    ExecutiveOfficer,
    OperationsManager,
    ChiefEngineer,
    ChiefOfSecurity,
    ShipsCounselor,
    ChiefMedicalOfficer,
    ScienceOfficer,
    FlightController,
    CommunicationsOfficer,

    // Command Division
    Admiral,
    Adjutant,
    StrategicOperations,
    IntelligenceOfficer,
    FleetLiaisonOfficer,
    DiplomaticAttache,

    // Sciences Division
    ChiefSurgeon,
    HeadNurse,
    Anesthesiologist,
    PhysiciansAssistant,
}

class RoleModel {
    name: string;
    description: string;
    department: Skill;
    ability: string;
    source: Source;

    constructor(name: string, description: string, department: Skill, ability: string, source: Source) {
        this.name = name;
        this.description = description;
        this.department = department;
        this.ability = ability;
        this.source = source;
    }
}

export class RoleViewModel extends RoleModel {
    id: Role;

    constructor(id: Role, base: RoleModel) {
        super(base.name, base.description, base.department, base.ability, base.source);
        this.id = id;
    }
}

class Roles {
    private _roles: { [id: number]: RoleModel } = {
        [Role.CommandingOfficer]: new RoleModel(
            "Commanding Officer",
            "The captain. Even if the commanding officer does not hold the rank of captain, they will be referred to as captain by their subordinates. Every ship must have a commanding officer.",
            Skill.Command,
            "The commanding officer may spend a point of Determination to grant any other character they can communicate with one point of Determination; this does not have to be linked to a Value.",
            Source.Core),
        [Role.ExecutiveOfficer]: new RoleModel(
            "Executive Officer",
            "Second-in-Command. The executive officer is the captain’s chief advisor, and takes command in situations where the captain is unable to. If a ship does not have a dedicated executive officer, an officer in another role should be noted as second-in-command, but they will not gain the benefits of this role.",
            Skill.Command,
            "When another character in communication with the executive officer spends a point of Determination, the executive officer may spend 3 Momentum (Immediate) to let that character regain the spent point of Determination.",
            Source.Core),
        [Role.OperationsManager]: new RoleModel(
            "Operations Manager",
            "The operations manager manages and oversees all technical operations aboard or involving the ship, normally from the Operations station on the Bridge, or in conjunction with the chief engineer (on smaller ships, one officer may fill both roles). This often entails taking on the duties of a science officer, if there is no dedicated science officer in the senior staff.",
            Skill.Engineering,
            "When the operations manager succeeds at a Task assisted by the ship’s Computers or Sensors, or using a tricorder, the character generates one bonus Momentum, which may only be used on the Obtain Information Momentum Spend.",
            Source.Core),
        [Role.ChiefEngineer]: new RoleModel(
            "Chief Engineer",
            "The chief engineer is responsible for ensuring that the ship remains operational and functional, and commands the engineering department aboard the ship.",
            Skill.Engineering,
            "When aboard the ship, the chief engineer always has the Advantage “Engineering Department”, which represents the ship’s complement of engineers and technicians.",
            Source.Core),
        [Role.ChiefOfSecurity]: new RoleModel(
            "Chief of Security",
            "The chief of security oversees the ship’s security department, and is responsible for ensuring the safety of the ship and crew during missions, for the investigation of disciplinary and criminal matters, and for overseeing the protection of important persons aboard the ship. On many ships, the chief of security operates from the Tactical station on the bridge.",
            Skill.Security,
            "When aboard the ship, the chief of security always has the Advantage “Security Detachment”, which represents the ship’s security personnel.",
            Source.Core),
        [Role.ChiefMedicalOfficer]: new RoleModel(
            "Chief Medical Officer",
            "The chief medical officer, also known as ship’s surgeon, or ship’s doctor, is responsible for the health and wellbeing of the crew and other persons aboard the ship, and leads the ship’s medical department. A chief medical officer can order, and countermand the orders of, senior officers where matters of that officer’s health are concerned.",
            Skill.Medicine,
            "When aboard the ship, the chief medical officer always has the Advantage “Medical Department”, which represents the ship’s medical personnel.",
            Source.Core),
        [Role.ScienceOfficer]: new RoleModel(
            "Science Officer",
            " A science officer is responsible for advising the commanding officer of all matters scientific, providing hypotheses in matters concerning the unknown. Not all ships have a dedicated science officer within the senior staff, often having the operations manager take on these duties.",
            Skill.Science,
            "When the science officer succeeds at a Task assisted by the ship’s Computers or Sensors, or using a tricorder, the character generates one bonus Momentum, which may only be used on the Obtain Information Momentum spend.",
            Source.Core),
        [Role.FlightController]: new RoleModel(
            "Flight Controller",
            "Not a typical senior staff role, some captains, particularly those operating in uncharted space, choose the most senior helmsman or flight control officer to serve as senior staff as well.",
            Skill.Conn,
            "When the flight controller is required to analyze or repair technology related to flight or propulsion, they may use the Conn Discipline instead of Engineering.",
            Source.Core),
        [Role.ShipsCounselor]: new RoleModel(
            "Ship's Counselor",
            "On larger ships and starbases, it’s common to have personnel dedicated to the mental soak. Some captains regard them as valuable advisors, as their training covers both culture and psychology, making them exceptionally good at reading the moods and intentions of others.",
            Skill.Medicine,
            "After succeeding at a Task to determine the emotional state or intent of another living creature, the ship’s counselor gains one bonus Momentum, which may only be used on the Obtain Information Momentum Spend.",
            Source.Core),
        [Role.CommunicationsOfficer]: new RoleModel(
            "Communications Officer",
            "More common in the earlier days of Starfleet, dedicated communications officers are typically skilled in linguistics and cryptography, and aided with advanced translation and decryption technologies, and thus valuable during encounters with both new cultures, and with hostile ones.",
            undefined,
            "When a Task attempted by the communications officer is increased in Difficulty because of an unfamiliar language or encryption, ignore that Difficulty increase.",
            Source.Core),
        [Role.Admiral]: new RoleModel(
            "Admiral",
            "Flag Officers only.",
            Skill.Command,
            "Select three additional Focuses, reflecting areas of expertise or subjects that pertain to the admiral’s assignment. At the start of each mission, the admiral chooses one of their three Focuses, and every Main Character receives that as an additional Focus for the mission, due to additional briefings and instructional resources.",
            Source.CommandDivision),
        [Role.Adjutant]: new RoleModel(
            "Adjutant",
            "The adjutant must be at least a lieutenant commander. This is the admiral’s closest advisor and assistant, providing aid and support like an executive officer supports a commanding officer. A good adjutant is always prepared with mission proposals, alternative plans, and hypothetical scenarios to allow the admiral to react to problems.",
            Skill.Command,
            "At the start of any scene, the adjutant may spend one Momentum (Immediate) in order to change the Focus chosen by the admiral for the duration of that scene only. The new Focus must be one of the others selected by the admiral.",
            Source.CommandDivision),
        [Role.StrategicOperations]: new RoleModel(
            "Strategic Operations Officer",
            " This officer coordinates the movements and activities of vessels and forces in a given region or on a particular mission. Typically officers with a keen understanding of strategy, they advise the admiral and adjust plans independently when they cannot consult the admiral.",
            Skill.Command,
            "Regardless of rank, the strategic operations officer has authority over all vessels and forces linked to their region or mission. They may reduce the Difficulty of Persuade Tasks with the commanding officers of those vessels and forces by 1, to a minimum of 0.",
            Source.CommandDivision),
        [Role.IntelligenceOfficer]: new RoleModel(
            "Intelligence Officer",
            " An intelligence officer receives Starfleet Intelligence, other branch and Federation ally reports on strategic and diplomatic developments in the region. These reports, and analyses, allow the officer to inform the admiral and other cleared personnel about matters that might impact decisions.",
            Skill.Security,
            "Once per mission, an intelligence officer may create an Advantage without requiring a Task or spending any resources. This Advantage reflects some detail or insight the officer learned in an intelligence report.",
            Source.CommandDivision),
        [Role.FleetLiaisonOfficer]: new RoleModel(
            "Fleet Liaison Officer",
            " A fleet liaison represents the interests of the fleet, and Starfleet as a whole, to one of the Federation’s allies. A Starfleet officer will represent the Federation, though the Gamemaster may allow other fleet liaison officers; for example, a joint KlingonFederation task force may include a Klingon Empire liaison. These officers report to superiors and allow cooperation between allies.",
            Skill.Command,
            "The fleet liaison officer gains an additional Trait (write it in the character sheet after export): Contacts Amongst X, where X is the fleet or service the liaison works with/for. For example, a Klingon Defence Force has the trait Contacts Amongst the Klingon Defence Force.",
            Source.CommandDivision),
        [Role.DiplomaticAttache]: new RoleModel(
            "Diplomatic Attaché",
            "A civilian from the Federation Diplomatic Corps and a valuable part of the staff who advises the admiral, and briefs them on culture, protocol, and other essential information during negotiations and other diplomatic activities.",
            undefined,
            "At the start of any Social Conflict involving a foreign culture, the diplomatic attaché may spend two Momentum (Immediate) to create an Advantage for any Main Character present, representing a briefing provided by the attaché. This may be performed even if the attaché character is not personally present in that scene; it is prior counsel, rather than immediate assistance.",
            Source.CommandDivision),
        [Role.ChiefSurgeon] : new RoleModel(
            "Chief Surgeon",
            "On larger ships, the medical staff may be robust enough to support a dedicated surgery team. The head of this team is the chief surgeon. While the duties of this role may often be filled by the chief medical officer, when there is a dedicated surgeon, a character may choose to assume this role.",
            Skill.Medicine,
            "The chief surgeon gains a Bonus d20 to Control + Medicine Tasks to treat an Injury from a Lethal attack.",
            Source.SciencesDivision),
        [Role.HeadNurse] : new RoleModel(
            "Head Nurse",
            " On almost any Federation starship, sickbay is staffed by a number of nurses, who assist the doctors on board with treating patients. There is, however, always a senior nurse – with the most experience, who works closely with the chief medical officer in managing the nursing staff.",
            Skill.Medicine,
            "The head nurse may substitute their Medicine Discipline in place of Command whenever attempting to coordinate or direct the medical staff on board the ship. Per the Direct Task, this may only be used with characters subordinate to the head nurse, and thus would not apply to doctors or surgeons.",
            Source.SciencesDivision),
        [Role.Anesthesiologist] : new RoleModel(
            "Anesthesiologist",
            "These medical professionals are experts in treating pain and ensuring that patients do not suffer during the course of their treatments. This is of particular importance during major surgeries and other invasive treatments, as the anesthesiologist is also responsible for monitoring the patient’s vital signs and making adjustments to medications during the proceedings. This allows the surgeons and physicians to focus on the task at hand.",
            Skill.Medicine,
            "When the anesthesiologist is providing assistance during a Medicine Task, they do not count against any limit on the number of characters that may assist.",
            Source.SciencesDivision),
        [Role.PhysiciansAssistant] : new RoleModel(
            "Physician's Assistant",
            "Filling a role between doctor and nurse, physician’s assistants are trained medical personnel that have attended medical school, but are not full doctors. Unlike nurses, however, they have sufficient training to diagnose and treat most minor to moderate conditions, and can make medical recommendations as well as prescribe medications. For more complex or life-threatening conditions, the physician’s assistant will call in a full doctor and then provide assistance.",
            Skill.Medicine,
            "When providing assistance to  another character attempting a Medicine Task on a patient that the physician’s assistant has already treated with a successful Medicine Task – the physician’s assistant provides two d20s to the Dice Pool instead of the usual one.",
            Source.SciencesDivision),
    };

    getRoles() {
        var departments = this.determineHighestDiscipline();
        var roles: RoleViewModel[] = [];
        var n = 0;
        for (var role in this._roles) {
            var r = this._roles[role];
            if (character.hasSource(r.source)) {
                if (((character.isYoung() || character.enlisted) && n === Role.CommandingOfficer) ||
                    (character.enlisted && n === Role.ExecutiveOfficer)) {
                    n++;
                    continue;
                }
                roles.push(new RoleViewModel(n, r));
            }
            n++;
        }

        return roles.sort((a, b) => {
            return departments.indexOf(a.department) > -1 ? -1 : 1;
        });
    }

    getRole(role: Role) {
        return this._roles[role];
    }

    getRoleByName(role: string) {
        var n = 0;

        for (var rol in this._roles) {
            var r = this._roles[rol];
            if (r.name === role) {
                return n;
            }
            n++;
        }

        return undefined;
    }

    applyRole(role: Role) {
        const r = this.getRole(role);
        character.roleAbility = r.ability;
    }

    private determineHighestDiscipline() {
        var skills = [];
        character.skills.forEach(s => {
            skills.push(s);
        });

        var disciplines = skills.sort((a, b) => { return b.expertise - a.expertise });
        var highest = [disciplines[0].skill];
        var value = disciplines[0].expertise;

        for (var i = 1; i < disciplines.length; i++) {
            if (disciplines[i].expertise === value) {
                highest.push(disciplines[i].skill);
            }
            else {
                break;
            }
        }

        return highest; 
    }
}

export const RolesHelper = new Roles();