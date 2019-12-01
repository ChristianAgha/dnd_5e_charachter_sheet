import React, { useState, useEffect } from 'react';
import AbilityScore from './AbilityScore';
import { roll4DropLowest } from '../functions/dice'
import { Button } from 'primereact/button';
import { Accordion, AccordionItem } from 'react-sanfona';

const ScoreCalculator = () => {
    const [getStats, setStats] = useState({});

    useEffect(() => {
        setStats({
            "str": 8,
            "dex": 8,
            "con": 8,
            "int": 8,
            "wis": 8,
            "cha": 8
        });
    }, []);

    const rollDice4sStats = () => {
        const newRollsArr = Object.keys(getStats).map(() => roll4DropLowest());
        const newRollsObj = {
            "str": newRollsArr[0],
            "dex": newRollsArr[1],
            "con": newRollsArr[2],
            "int": newRollsArr[3],
            "wis": newRollsArr[4],
            "cha": newRollsArr[5]
        };
        setStats(newRollsObj);
    };

    const abilityDisplay = Object.keys(getStats).map(key => {
        return (<AbilityScore key={key} ability={key} score={getStats[key]}/>);
    });
    return (
        // <div className="score-calculator">
        <div>
        <Accordion>
            {<AccordionItem className="accordion" title={"Ability Score Calculator ↓"}>
                <Button label="ROLL 🎲" className="p-button-raised" style={{ marginTop: '1rem' }} onClick={rollDice4sStats}/>
                <div className="stats-display ">
                    {abilityDisplay}
                </div>
            </AccordionItem>}
        </Accordion>
        </div>
    );
};

export default ScoreCalculator;