import React, {useEffect, useState} from "react";

import {View, Button, Text, ActivityIndicator} from "react-native";

export interface ResponseResult {
    category:         string;
    id:               string;
    correctAnswer:    string;
    incorrectAnswers: string[];
    question:         string;
    tags:             string[];
    type:             string;
    difficulty:       string;
    regions:          any[];
    isNiche:          boolean;
}

const Quiz = () => {
  //const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
  const [wrongAnswers, setWrongAnswers]= useState([""]);
  const [newQuestions, setNewQuestions] = useState(0);


  useEffect(() => {
    const loadData = async() => {
    
     // setLoading(true);
      
      const result = await fetch("https://the-trivia-api.com/api/questions?limit=5"); 
      const json : ResponseResult[]= await result.json();
      setQuestions(json[0].question);
      setAnswers(json[0].correctAnswer)
      setWrongAnswers(json[0].incorrectAnswers)
      
     // setLoading(false);
  }
  loadData();
  },[newQuestions])
  const allQuestions = [answers, ...wrongAnswers];

  let shuffled = allQuestions
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
 

  return (
      /*<button>{answers}</button><br />
      <button>{wrongAnswers[0]}</button><br />
      <button>{wrongAnswers[1]}</button><br />
      <button>{wrongAnswers[2]}</button><br />*/
      <>
      <div>{questions}</div>
      <button>{shuffled[0]}</button><br />
      <button>{shuffled[1]}</button> <br />
      <button>{shuffled[2]}</button> <br />
      <button>{shuffled[3]}</button> <br />
      <button onClick={() => setNewQuestions(newQuestions + 1)}>Next</button>
      
      
      </>
    )
}