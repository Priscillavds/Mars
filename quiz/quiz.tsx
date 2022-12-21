import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from '../algemeen/button'
import Constants from "expo-constants";
import React, { useState, useContext, useEffect } from "react";

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number,
    imgUri?: string
}

interface Queistion {
    category: string;
    id: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    question: string;
    tags: string[];
    type: string;
    difficulty?: string;
    regions: any[];
    isNiche: boolean;
}

const questions: Queistion[] = [{
    id: "",
    category: "",
    correctAnswer: "A",
    incorrectAnswers: ["B", "C", "D"],
    question: "Press A",
    tags: [],
    type: "",
    difficulty: "",
    regions: [],
    isNiche: false,
}, {
    id: "",
    category: "",
    correctAnswer: "B",
    incorrectAnswers: ["A", "C"],
    question: "Press B",
    tags: [],
    type: "",
    difficulty: "",
    regions: [],
    isNiche: false,
}]

export const Quiz = ({ route }: { route: any }) => {
    const profiel: Profiel = route.params.getProfiel(route.params.playerId);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [question, setQuestion] = useState<Queistion>();
    const [ansewers, setAnsewers] = useState<JSX.Element[]>([]);
    const [time, setTime] = useState<number>(0);
    const [message, setMessage] = useState<string | null>(null);
    const maxTime = 10;

    const loadMoreQuestion = () => {

        console.log("Loading")

    }

    const nextQuestion = () => {
        setQuestionIndex(questionIndex => {
            if ((questionIndex + 1) >= questions.length) { loadMoreQuestion(); return 0; }
            return questionIndex + 1
        });
    }

    const setupQuestion = () => {
        let localQuestion: Queistion = questions[questionIndex];
        let localAnsewers: JSX.Element[] = localQuestion.incorrectAnswers.map((ansewer: string) => (
            <Button
                func={() => { wrongAnswer("Wrong answer"); }}
                name={ansewer}
                backColor="red"
                borderColor="red"
                textColor="white"
            ></Button>));

        localAnsewers.push((
            <Button
                func={() => { correctAnswer() }}
                name={localQuestion.correctAnswer}
                backColor="red"
                borderColor="red"
                textColor="white"
            ></Button>))

        localAnsewers = localAnsewers.sort(() => Math.random() - .5);

        setQuestion(localQuestion);
        setMessage(null);
        setTime(0);
        setAnsewers([...localAnsewers]);
    }

    const correctAnswer = () => {

        setMessage(message => {
            if (message == null) { return "Correct answer" }
            return message
        })
        route.params.updateProfiel(profiel.id, { id: 87, name: profiel.name, wrong: profiel.wrong, correct: profiel.correct + 1, imgUri: profiel.imgUri })
    }

    const wrongAnswer = (boodschap: string) => {
        
            setMessage(message => {
                if (message == null) {
                    route.params.updateProfiel(profiel.id, { id: 87, name: profiel.name, wrong: profiel.wrong + 1, correct: profiel.correct, imgUri: profiel.imgUri })
                    console.log(boodschap)
                    return boodschap;

                }
                return message;
            })
        
    }

    useEffect(() => {
        setupQuestion();
    }, [questionIndex]);


    useEffect(() => {
        let handle = setInterval(() => {
            setTime(time => {
                if (time >= maxTime) { wrongAnswer("Time up"); return 0 }
                return time + 1
            });

        }, 1000);

        return () => {
            clearInterval(handle);
        }
    }, []);

    return (
        <View style={styles.container}>

            <Text>{question?.question}</Text>
            {ansewers.map((element: JSX.Element) => element)}
            {!message && <Text>{time} / {maxTime}</Text>}
            {message && <>
                {message.startsWith("C") ?
                    <Text> {message}</Text> :
                    <Text> {message} Correct answer {question?.correctAnswer}</Text>}
                <Button
                    func={() => { nextQuestion(); }}
                    name="Next"
                    backColor="red"
                    borderColor="red"
                    textColor="white"
                ></Button>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#ffb7b2"
    },

});