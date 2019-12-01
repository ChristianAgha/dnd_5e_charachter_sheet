import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';

export const createLanguagesList = (languages) => { 
    return (
        <Accordion>
            {<AccordionItem className="accordion" title={"Languages ↓"} expanded="true">
                <div>
                    {languages.map(item => { return (<li className="LanguageProficienciesList">{item}</li>)})}
                </div>
            </AccordionItem>}
        </Accordion>);
};