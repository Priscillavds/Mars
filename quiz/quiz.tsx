import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from "expo-constants";
import React, { useState, useEffect } from "react";

import { normalTextSize } from '../profiel/styleProfiel';
import { Button } from '../algemeen/button';

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

let questions: Queistion[] = [];

export const Quiz = ({ route }: { route: any }) => {
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [question, setQuestion] = useState<Queistion>();
    const [ansewers, setAnsewers] = useState<JSX.Element[]>([]);
    const [time, setTime] = useState<number>(0);
    const [message, setMessage] = useState<string | null>(null);

    const [timer, setTimer] = useState<number>(10);
    const [difficulty, setDifficulty] = useState<string>("easy")
    const [player, setPlayer] = useState<number>(2);

    const profiel: Profiel = route.params.getProfiel(player);

    const LoadData = async () => {
        let loadTimer: string | null = await AsyncStorage.getItem("timer");
        let loadDifficulty: string | null = await AsyncStorage.getItem("difficulty");
        let loadPlayer: string | null = await AsyncStorage.getItem("player");

        if (loadTimer != null) setTimer(parseInt(loadTimer));
        if (loadPlayer != null) setPlayer(parseInt(loadPlayer));
        if (loadDifficulty != null) setDifficulty(loadDifficulty);
    }

    LoadData()

    const loadMoreQuestion = async (first: boolean) => {
        let localDifficulty = "easy";

        if (difficulty == "normal") localDifficulty = "medium";

        if (difficulty == "hard") localDifficulty = "hard";

        const result: Response = await fetch("https://the-trivia-api.com/api/questions?limit=5&difficulty=" + localDifficulty);
        questions = await result.json();

        if (first) setupQuestion()

    }

    useEffect(() => { loadMoreQuestion(true) }, []);

    const nextQuestion = () => {
        setQuestionIndex(questionIndex => {
            if ((questionIndex + 1) >= questions.length) { loadMoreQuestion(false); return 0; }
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
                borderColor="darkred"
                textColor="white"
            ></Button>));

        localAnsewers.push((
            <Button
                func={() => { correctAnswer() }}
                name={localQuestion.correctAnswer}
                backColor="red"
                borderColor="darkred"
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
        if (profiel) {
            route.params.updateProfiel(profiel.id, { id: 87, name: profiel.name, wrong: profiel.wrong, correct: profiel.correct + 1, imgUri: profiel.imgUri })
        }
    }

    const wrongAnswer = (boodschap: string) => {

        setMessage(message => {
            if (message == null && profiel) {
                route.params.updateProfiel(profiel.id, { id: 87, name: profiel.name, wrong: profiel.wrong + 1, correct: profiel.correct, imgUri: profiel.imgUri })
                return boodschap;

            }
            return message;
        })

    }

    useEffect(() => {
        if (questions.length > 0) {
            setupQuestion();
        }
    }, [questionIndex]);


    useEffect(() => {
        let handle = setInterval(() => {
            setTime(time => {
                if (timer <= time) { wrongAnswer("Time up"); return 0 }
                return time + 1
            });

        }, 1000);

        return () => {
            clearInterval(handle);
        }
    }, []);

    return (
        <View>
            <LinearGradient style={styles.gradient} colors={["#ffb7b2", "#FFE0E0"]}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        {question ?
                            <Text style={styles.question}>{question.question}</Text> :
                            <Text style={styles.question}>Loading</Text>
                        }
                    </View>
                    <View style={styles.main}>
                        {ansewers.map((element: JSX.Element, index: number) => <View key={index} style={styles.buttonContainer}>{element}</View>)}
                    </View>
                    <View style={styles.footer}>
                        {!message && question &&
                            <View style={styles.timeBar}>
                                <View style={[styles.bar, { width: `${(timer - time) * (100 / timer)}%` }]}></View>
                                <Text style={styles.timeText}>{timer - time}</Text>
                            </View>}
                        {message && <>
                            {message.startsWith("C") ?
                                <Text style={[styles.text, { color: "green" }]}> {message}</Text> :
                                <>
                                    <Text style={[styles.text, { color: "red" }]}> {message} </Text>
                                    <Text style={[styles.text, { color: "red" }]}> Correct answer {question?.correctAnswer}</Text>
                                </>}
                            <View style={styles.buttonContainer}>
                                <Button
                                    func={() => { nextQuestion(); }}
                                    name="Next"
                                    backColor="red"
                                    borderColor="darkred"
                                    textColor="white"
                                ></Button>
                            </View>
                        </>}
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: "column",
        flex: 1,
        padding: 15
    },

    question: {
        fontSize: normalTextSize,
        textAlign: "center",
        color: "#AD2B2B"
    },

    header: {
        height: "20%",
        justifyContent: "center",
    },

    main: {
        height: "45%",
        justifyContent: "center",
        alignItems: "center",
    },

    footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonContainer: {
        marginTop: normalTextSize,
        width: "70%",
    },

    text: {
        fontSize: normalTextSize,
        textAlign: "center"
    },

    timeBar: {
        position: "relative",
        borderColor: "darkred",
        borderStyle: "solid",
        borderWidth: normalTextSize * .25,
        width: "80%",
        height: normalTextSize * 1.75,
        borderRadius: 100000,
        overflow: "hidden"
    },

    timeText: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        textAlign: "center",
        color: "white",
        fontSize: normalTextSize * .75

    },

    bar: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "red",
        width: "100%",
        height: "200%",
    },
    
    gradient: {
        height: "100%"
    }
});
