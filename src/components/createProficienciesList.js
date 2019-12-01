import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';


export const createProficienciesList = (proficiencies) => {
    return (
        <Accordion>
            {<AccordionItem className="accordion" title={"Proficiencies ↓"} expanded="true">
                <div>
                    {proficiencies.map(item => { return (<li className="LanguageProficienciesList">{item}</li>)})}
                </div>
            </AccordionItem>}
        </Accordion>);
};