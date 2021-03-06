﻿import * as React from 'react';
import {Era, ErasHelper} from '../helpers/eras';
import {Source, SourcesHelper} from '../helpers/sources';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {SetHeaderText} from '../common/extensions';
import {Window} from '../common/window';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Button} from '../components/button';
import {CheckBox} from '../components/checkBox';

export class EraSelectionPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);

        SetHeaderText("ERA");

        const profileButton = document.getElementById("profile-button");
        if (profileButton !== undefined) {
            profileButton.style.display = "";
        }

        character.saveStep(PageIdentity.Era);
    }

    render() {
        const sources = SourcesHelper.getSources().map((s, i) => {
            const className = character.hasSource(i) ? "source source-selected" : "source";
            return (
                <div key={i} className={className} onClick={() => { this.sourceChanged(i); } }>{s.name}</div>
            );
        });

        const eras = ErasHelper.getEras().map((e, i) => {
            return (
                <tr key={i} onClick={() => { if (Window.isCompact()) this.eraSelected(e.id); }}>
                    <td className="selection-header">{e.name}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.eraSelected(e.id) }} /></td>
                </tr>
            );
        });

        return (
            <div className="page">
                <div className="page-text">
                    Select sources.
                    Ask your GM which are available.
                </div>
                <div>
                    <div className="source source-emphasis" onClick={() => { this.toggleSources(true); } }>Select All</div>
                    <div className="source source-emphasis" onClick={() => { this.toggleSources(false); } }>Select None</div>
                </div>
                <div className="source-container">
                    {sources}
                </div>
                <br/><br/><br/><br/>
                <div className="page-text">
                    Select which Era to play in.
                    Ask your GM which Era to choose.
                </div>
                <table className="selection-list">
                    <tbody>
                        {eras}
                    </tbody>
                </table>
            </div>
        );
    }

    private sourceChanged(source: Source) {
        if (character.hasSource(source)) {
            character.removeSource(source);
        }
        else {
            character.addSource(source);
        }

        this.forceUpdate();
    }

    private toggleSources(selectAll: boolean) {
        if (selectAll) {
            SourcesHelper.getSources().forEach(s => {
                character.addSource(s.id);
            });
        }
        else {
            SourcesHelper.getSources().forEach(s => {
                character.removeSource(s.id);
            });
        }

        this.forceUpdate();
    }

    private eraSelected(era: Era) {
        character.era = era;
        Navigation.navigateToPage(PageIdentity.ToolSelecton);
    }
}