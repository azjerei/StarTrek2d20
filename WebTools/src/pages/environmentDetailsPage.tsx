﻿import * as React from 'react';
import {character, CharacterType} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Environment, EnvironmentsHelper } from '../helpers/environments';
import {Species, SpeciesHelper } from '../helpers/species';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {Skill} from '../helpers/skills';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {ElectiveSkillList} from '../components/electiveSkillList';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {ValueInput, Value} from '../components/valueInput';

export class EnvironmentDetailsPage extends React.Component<IPageProperties, {}> {
    private _electiveSkills: Skill[];
    private _otherSpecies: Species;
    private _attributeDone: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this._electiveSkills = [];
        this._otherSpecies = null;

        if (character.environment === Environment.AnotherSpeciesWorld) {
            if (character.otherSpeciesWorld === undefined) {
                this._otherSpecies = SpeciesHelper.generateSpecies();
                while (this._otherSpecies === character.species) {
                    this._otherSpecies = SpeciesHelper.generateSpecies();
                }

                character.otherSpeciesWorld = SpeciesHelper.getSpeciesByType(this._otherSpecies).name;
            }
            else {
                this._otherSpecies = SpeciesHelper.getSpeciesByName(character.otherSpeciesWorld);
            }
        }
    }

    render() {
        var env = EnvironmentsHelper.getEnvironment(character.environment);
        const species = SpeciesHelper.getSpeciesByType(character.species);
        var otherSpeciesName = "";

        if (character.environment === Environment.Homeworld) {
            env.attributes = species.attributes;
        }
        else if (character.environment === Environment.AnotherSpeciesWorld) {
            const otherSpecies = SpeciesHelper.getSpeciesByType(this._otherSpecies);
            env.attributes = otherSpecies.attributes;
            otherSpeciesName = `(${otherSpecies.name})`;
        }

        var nextPageName = character.type === CharacterType.KlingonWarrior ? "CASTE" : "UPBRINGING";

        return (
            <div className="page">
                <div className="header-text"><div>{env.name} {otherSpeciesName}</div></div>
                <div className="panel">
                    <div className="desc-text">{env.description}</div>
                </div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES (Select one)</div>
                    <AttributeImprovementCollection
                        filter={env.attributes}
                        mode={AttributeImprovementCollectionMode.Increase}
                        points={1}
                        onDone={(done) => { this._attributeDone = done; } }/>
                </div>
                <div className="panel">
                    <div className="header-small">DISCIPLINES (Select one)</div>
                    <ElectiveSkillList
                        points={1}
                        skills={env.disciplines}
                        onUpdated={skills => this.onElectiveSkillsSelected(skills) }/>
                </div>
                <div className="panel">
                    <div className="header-small">VALUE</div>
                    <ValueInput value={Value.Environment}/>
                </div>
                <Button text={nextPageName} className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onElectiveSkillsSelected(skills: Skill[]) {
        this._electiveSkills = skills;
        this.forceUpdate();
    }

    private onNext() {
        if (!this._attributeDone) {
            Dialog.show("You must select 1 Attribute to improve before proceeding.");
            return;
        }

        if (this._electiveSkills.length === 1) {
            character.workflow.next();
            Navigation.navigateToPage(PageIdentity.Upbringing);
        }
        else {
            Dialog.show("You must select 1 Discipline to improve before proceeding.");
        }
    }
}
