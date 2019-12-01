import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { createProficienciesList } from './createProficienciesList';
import { createLanguagesList } from './createLanguagesList';

const basicInfoSchema = Yup.object().shape({
    chosenName: Yup.string().notRequired(),
    chosenClass: Yup.string().required('Class is required'),
    chosenRace: Yup.string().required('Race is required'),
  });

const BasicInfo = ()  => {
    const [getName, setName] = useState("");
    const [classOptions, setClassOptions] = useState([]);
    const [raceOptions, setRaceOptions] = useState([]);
    const [getClass, setClass] = useState("");
    const [getRace, setRace] = useState("");
    const [getProficiencies, setproficiencies] = useState([]);
    const [getLanguages, setLanguages] = useState([]);

    useEffect( () => {
        axios.get('/classes/')
        .then((response) => {
            setClassOptions(response.data.results);
        });
        axios.get('/races/')
        .then((response) => {
            setRaceOptions(response.data.results);
        });
    }, []);

    const handleSubmit = (e) => {
        const chosenClass = e.chosenClass.name;
        const chosenRace = e.chosenRace.name;
        const chosenClassIndex = parseInt(e.chosenClass.url.slice(35));
        const chosenRaceIndex = parseInt(e.chosenRace.url.slice(33));

        setClass(chosenClass);
        setRace(chosenRace);
        getRaceLanguages(chosenRaceIndex);
        getClassProficiencies(chosenClassIndex);
    }

    function getRaceLanguages(raceIndex) {
        axios.get(`/races/${raceIndex}`)
        .then((response) => {
        let languages = [];
        response.data.languages.forEach((e)  => {
            languages.push(e['name']);
        });
        setLanguages(languages);
        });
    };

    function getClassProficiencies(classIndex) {
        axios.get(`/classes/${classIndex}`)
        .then((response) => {
        let proficiencies = [];
        response.data.proficiencies.forEach((e)  => {
            proficiencies.push(e['name']);
        });
        setproficiencies(proficiencies);
        });
    };

    const setCharachterName = e => {
        setName(e);
    };

    return(
        <>
            <h2>Choose name, race & class</h2>
            <Formik>
                <Field name="chosenName" render={({field}) =>
                    <span className='p-float-label' style={{ marginTop: '1rem' }}>
                        <InputText id='chosenName' {...field}  value={getName} onChange={e => {
                            setCharachterName(e.target.value)}} style={{ width: '100%' }}/>
                        <label htmlFor='chosenName'>Enter Name</label>
                    </span>
                }/>
            </Formik>
            <Formik 
                initialValues={{chosenClass: '', chosenRace: ''}}
                validationSchema={basicInfoSchema}
                onSubmit={e => handleSubmit(e)}
                render={() => (
                    <Form>
                        <Field name="chosenRace" render={({field}) =>
                        <Dropdown
                            {...field}
                            style={{ width: '100%', marginTop: '1rem' }}
                            optionLabel="name"
                            options={raceOptions}
                            placeholder="Select D&D Race"/>}/>
                        <ErrorMessage name='chosenRace'/>

                        <Field name="chosenClass" render={({field}) =>
                        <Dropdown
                            {...field}
                            style={{ width: '100%', marginTop: '1rem' }}
                            optionLabel="name"
                            options={classOptions}
                            placeholder="Select D&D Class"/>}/>
                        <ErrorMessage name='chosenClass'/>
                        <Button label="Select" className="p-button-raised" style={{ marginTop: '1rem' }}/>
                    </Form>
                )}
            />
            <div>
                <h3 className="NameRaceClass">{getName} {(getName && getRace && getClass) ? "the" : null} {getRace} {getClass}</h3>
            </div>
            <div>
                {createProficienciesList(getProficiencies)}
            </div>
            <div>
                {createLanguagesList(getLanguages)}
            </div>
        </>
    );
};

export default BasicInfo;