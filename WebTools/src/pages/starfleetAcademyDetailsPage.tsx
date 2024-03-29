﻿import * as React from 'react';
import {character, CharacterType} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Track, TracksHelper} from '../helpers/tracks';
import {AttributesHelper} from '../helpers/attributes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {TalentsHelper} from '../helpers/talents';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {ElectiveSkillList} from '../components/electiveSkillList';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {ValueInput, Value} from '../components/valueInput';
import {TalentList} from '../components/talentList';
import {MajorsList} from '../components/majorsList';
import {SkillView} from '../components/skill';

export class StarfleetAcademyDetailsPage extends React.Component<IPageProperties, {}> {
    private _major: Skill;
    private _electiveSkills: Skill[];
    private _talent: string;
    private _focus1: HTMLInputElement;
    private _focus2: HTMLInputElement;
    private _focus3: HTMLInputElement;
    private _trait: HTMLInputElement;
    private _attributesDone: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this._electiveSkills = [];
    }

    render() {
        const track = TracksHelper.getTrack(character.track);

        if (character.track === Track.EnlistedSecurityTraining) {
            return this.renderEnlistedSecurityTrainingDetails();
        }
        else if (character.track === Track.ShipOperations) {
            return this.renderShipOperationsDetails();
        }
        else if (character.track === Track.UniversityAlumni) {
            return this.renderUniversityAlumniDetails();
        }
        else if (character.track === Track.ResearchInternship) {
            return this.renderResearchInternshipDetails();
        }

        var training = "Select three focuses for your character, at least one reflecting the time at Starfleet Academy.";
        if (character.type === CharacterType.KlingonWarrior) {
            if (character.enlisted) {
                var training = "Select three focuses for your character, at least one reflecting their time training.";
            } else {
                var training = "Select three focuses for your character, at least one reflecting the time at KDF Academy.";
            }
        }

        return (
            <div className="page">
                <div className="header-text"><div>{track.name}</div></div>
                <div className="panel">
                    <div className="desc-text">{track.description}</div>
                </div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES (Select up to three)</div>
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Academy} points={3} onDone={(done) => { this._attributesDone = done; } }/>
                </div>
                <MajorsList skills={track.majorDisciplines} onMajorSelected={skill => this.onMajorSelected(skill) } onOtherSelected={skills => this.onElectiveSkillsSelected(skills) }/>
                <div className="panel">
                    <div className="header-small">FOCUS</div>
                    <div>{training}</div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus1 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus2 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus3 = input; } } />
                    </div>
                    <div><b>Suggestions: </b> {track.focusSuggestions.join(", ")}</div>
                </div>
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <TalentList skills={[...SkillsHelper.getSkills(), Skill.None]} onSelection={(talent) => { this.onTalentSelected(talent) } }/>
                </div>
                <div className="panel">
                    <div className="header-small">VALUE</div>
                    <ValueInput value={Value.Track}/>
                </div>
                <Button text="CAREER" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private renderEnlistedSecurityTrainingDetails() {
        const track = TracksHelper.getTrack(character.track);

        return (
            <div className="page">
                <div className="header-text"><div>{track.name}</div></div>
                <div className="panel">
                    <div className="desc-text">{track.description}</div>
                </div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES (Select up to three) </div>
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Academy} points={3} onDone={(done) => { this._attributesDone = done; } }/>
                </div>
                <div className="panel">
                    <div className="header-small">DISCIPLINES</div>
                    <SkillView points={2} skill={Skill.Security} />
                    <SkillView points={1} skill={Skill.Conn} />
                    <SkillView points={1} skill={Skill.Engineering} />
                </div>
                <div className="panel">
                    <div className="header-small">FOCUS</div>
                    <div>Select two focuses for your character. You have already gained the <b>Chain of Command</b> focus.</div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus1 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus2 = input; } } />
                    </div>
                    <div><b>Suggestions: </b> {track.focusSuggestions.join(", ") }</div>
                </div>
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <TalentList skills={[...SkillsHelper.getSkills(), Skill.None]} onSelection={(talent) => { this.onTalentSelected(talent) } }/>
                </div>
                <div className="panel">
                    <div className="header-small">VALUE</div>
                    <ValueInput value={Value.Track}/>
                </div>
                <Button text="CAREER" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private renderShipOperationsDetails() {
        const track = TracksHelper.getTrack(character.track);

        return (
            <div className="page">
                <div className="header-text"><div>{track.name}</div></div>
                <div className="panel">
                    <div className="desc-text">{track.description}</div>
                </div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES (Select up to three) </div>
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Academy} points={3} onDone={(done) => { this._attributesDone = done; } }/>
                </div>
                <div className="panel">
                    <div className="header-small">DISCIPLINES</div>
                    <SkillView points={2} skill={Skill.Conn} />
                    <SkillView points={1} skill={Skill.Engineering} />
                    <SkillView points={1} skill={Skill.Science} />
                </div>
                <div className="panel">
                    <div className="header-small">FOCUS</div>
                    <div>Select three focuses for your character.</div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus1 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus2 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus3 = input; } } />
                    </div>
                    <div><b>Suggestions: </b> {track.focusSuggestions.join(", ") }</div>
                </div>
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <TalentList skills={[...SkillsHelper.getSkills(), Skill.None]} onSelection={(talent) => { this.onTalentSelected(talent) } }/>
                </div>
                <div className="panel">
                    <div className="header-small">VALUE</div>
                    <ValueInput value={Value.Track}/>
                </div>
                <Button text="CAREER" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private renderUniversityAlumniDetails() {
        const track = TracksHelper.getTrack(character.track);

        return (
            <div className="page">
                <div className="header-text"><div>{track.name}</div></div>
                <div className="panel">
                    <div className="desc-text">{track.description}</div>
                </div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES (Select up to three) </div>
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Academy} points={3} onDone={(done) => { this._attributesDone = done; } }/>
                </div>
                <div className="panel">
                    <div className="header-small">DISCIPLINES</div>
                    <SkillView points={2} skill={Skill.Science} />
                    <SkillView points={1} skill={Skill.Engineering} />
                    <SkillView points={1} skill={Skill.Command} />
                </div>
                <div className="panel">
                    <div className="header-small">FOCUS</div>
                    <div>Select three focuses for your character.</div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus1 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus2 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus3 = input; } } />
                    </div>
                    <div><b>Suggestions: </b> {track.focusSuggestions.join(", ") }</div>
                </div>
                <div className="panel">
                    <div className="header-small">TRAIT</div>
                    <div>Define a trait that reflects the time, people and relationships that were important to the character during their time on campus.</div>
                    <div>Example: <i>Alumni of Stanford - Class of '59</i></div>
                    <div>
                        <div className="textinput-label">TRAIT</div>
                        <input type="text" ref={(input) => { this._trait = input; } } />
                    </div>
                </div>
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <TalentList skills={[...SkillsHelper.getSkills(), Skill.None]} onSelection={(talent) => { this.onTalentSelected(talent) } }/>
                </div>
                <div className="panel">
                    <div className="header-small">VALUE</div>
                    <ValueInput value={Value.Track}/>
                </div>
                <Button text="CAREER" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private renderResearchInternshipDetails() {
        const track = TracksHelper.getTrack(character.track);

        return (
            <div className="page">
                <div className="header-text"><div>{track.name}</div></div>
                <div className="panel">
                    <div className="desc-text">{track.description}</div>
                </div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES (Select up to three) </div>
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Academy} points={3} onDone={(done) => { this._attributesDone = done; } }/>
                </div>
                <div className="panel">
                    <div className="header-small">DISCIPLINES</div>
                    <SkillView points={2} skill={Skill.Science} />
                    <SkillView points={1} skill={Skill.Engineering} />
                    <SkillView points={1} skill={Skill.Medicine} />
                </div>
                <div className="panel">
                    <div className="header-small">FOCUS</div>
                    <div>Select three focuses for your character.</div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus1 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus2 = input; } } />
                    </div>
                    <div>
                        <div className="textinput-label">FOCUS</div>
                        <input type="text" ref={(input) => { this._focus3 = input; } } />
                    </div>
                    <div><b>Suggestions: </b> {track.focusSuggestions.join(", ") }</div>
                </div>
                <div className="panel">
                    <div className="header-small">TRAIT</div>
                    <div>Define a trait that reflects the research and scientific work done during the character's internship.</div>
                    <div>Example: <i>Nanoprobe Breakthrough</i></div>
                    <div>
                        <div className="textinput-label">TRAIT</div>
                        <input type="text" ref={(input) => { this._trait = input; } } />
                    </div>
                </div>
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <TalentList skills={[...SkillsHelper.getSkills(), Skill.None]} onSelection={(talent) => { this.onTalentSelected(talent) } }/>
                </div>
                <div className="panel">
                    <div className="header-small">VALUE</div>
                    <ValueInput value={Value.Track}/>
                </div>
                <Button text="CAREER" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onMajorSelected(skill: Skill) {
        this._major = skill;
        this.forceUpdate();
    }

    private onElectiveSkillsSelected(skills: Skill[]) {
        this._electiveSkills = skills;
        this.forceUpdate();
    }

    private onTalentSelected(talent: string) {
        this._talent = talent;
        this.forceUpdate();
    }

    private onNext() {
        const ignoresDisciplineRequirements =
            character.track === Track.EnlistedSecurityTraining ||
            character.track === Track.ShipOperations ||
            character.track === Track.ResearchInternship ||
            character.track === Track.UniversityAlumni;

        if (!this._attributesDone) {
            Dialog.show("You have not distributed all Attribute points.");
            return;
        }

        if (this._major == null && !ignoresDisciplineRequirements) {
            Dialog.show("You must select a Major before proceeding.");
            return;
        }

        if (this._electiveSkills.length !== 2 && !ignoresDisciplineRequirements) {
            Dialog.show("You must select 2 Other Disciplines to improve before proceeding.");
            return;
        }

        if (!this._talent || this._talent === "Select talent") {
            Dialog.show("You must select a talent before proceeding.");
            return;
        }

        var focus1 = this._focus1.value;
        var focus2 = this._focus2.value;
        var focus3 = this._focus3 ? this._focus3.value : null;

        if (!ignoresDisciplineRequirements) {
            if (!focus1 || focus1.length === 0 ||
                !focus2 || focus2.length === 0 ||
                !focus3 || focus3.length === 0) {
                Dialog.show("You need to type in three Focuses. Choose from the suggestions if you cannot come up with your own.");
                return;
            }
        }
        else {
            if (!focus1 || focus1.length === 0 ||
                !focus2 || focus2.length === 0) {
                Dialog.show("You need to type in two Focuses. Choose from the suggestions if you cannot come up with your own.");
                return;
            }
        }

        character.addFocus(focus1);
        character.addFocus(focus2);

        if (focus3 && focus3.length > 0) {
            character.addFocus(focus3);
        }

        var trait = this._trait ? this._trait.value : null;
        if (trait && trait.length > 0) {
            character.addTrait(trait);
        }

        character.addTalent(this._talent);

        character.workflow.next();
        Navigation.navigateToPage(PageIdentity.Career);
    }
}
