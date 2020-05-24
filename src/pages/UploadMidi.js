import React from "react";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import DimensionsProvider from '../components/DimensionsProvider';
import { ControlledPiano, MidiNumbers } from 'react-piano';
import $ from "jquery"


import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import Tone from 'tone';
import { Midi } from '@tonejs/midi'



const firstNote = MidiNumbers.fromNote('c1');
const lastNote = MidiNumbers.fromNote('c7');



var sampler;
var samplerEpiano;
var samplerStrings;
var samplerOrgan;


var gain = new Tone.Gain(1.0);
var midi;
var isMidiLoaded = false;



var pianoVoice = {
    //Salamander Grand Piano V2
    //Yamaha C5
    "A0": "/audio/salamander/A0.mp3",
    "C1": "/audio/salamander/C1.mp3",
    "D#1": "/audio/salamander/Ds1.mp3",
    "F#1": "/audio/salamander/Fs1.mp3",
    "A1": "/audio/salamander/A1.mp3",
    "C2": "/audio/salamander/C2.mp3",
    "D#2": "/audio/salamander/Ds2.mp3",
    "F#2": "/audio/salamander/Fs2.mp3",
    "A2": "/audio/salamander/A2.mp3",
    "C3": "/audio/salamander/C3.mp3",
    "D#3": "/audio/salamander/Ds3.mp3",
    "F#3": "/audio/salamander/Fs3.mp3",
    "A3": "/audio/salamander/A3.mp3",
    "C4": "/audio/salamander/C4.mp3",
    "D#4": "/audio/salamander/Ds4.mp3",
    "F#4": "/audio/salamander/Fs4.mp3",
    "A4": "/audio/salamander/A4.mp3",
    "C5": "/audio/salamander/C5.mp3",
    "D#5": "/audio/salamander/Ds5.mp3",
    "F#5": "/audio/salamander/Fs5.mp3",
    "A5": "/audio/salamander/A5.mp3",
    "C6": "/audio/salamander/C6.mp3",
    "D#6": "/audio/salamander/Ds6.mp3",
    "F#6": "/audio/salamander/Fs6.mp3",
    "A6": "/audio/salamander/A6.mp3",
    "C7": "/audio/salamander/C7.mp3",
    "D#7": "/audio/salamander/Ds7.mp3",
    "F#7": "/audio/salamander/Fs7.mp3",
    "A7": "/audio/salamander/A7.mp3",
    "C8": "/audio/salamander/C8.mp3"

}

//http://molgav.nn.ru/tonejs1000instr/examples/simpleSynthWebAudioFontInstrument.html
var epianoVoice = {
    'C2': '/audio/epiano1/C2.mp3',
    'Db2': '/audio/epiano1/Cs2.mp3',
    'D2': '/audio/epiano1/D2.mp3',
    'Eb2': '/audio/epiano1/Ds2.mp3',
    'E2': '/audio/epiano1/E2.mp3',
    'F2': '/audio/epiano1/F2.mp3',
    'Gb2': '/audio/epiano1/Fs2.mp3',
    'G2': '/audio/epiano1/G2.mp3',
    'Ab2': '/audio/epiano1/Gs2.mp3',
    'A2': '/audio/epiano1/A2.mp3',
    'Bb2': '/audio/epiano1/As2.mp3',
    'B2': '/audio/epiano1/B2.mp3',

    'C3': '/audio/epiano1/C3.mp3',
    'Db3': '/audio/epiano1/Cs3.mp3',
    'D3': '/audio/epiano1/D3.mp3',
    'Eb3': '/audio/epiano1/Ds3.mp3',
    'E3': '/audio/epiano1/E3.mp3',
    'F3': '/audio/epiano1/F3.mp3',
    'Gb3': '/audio/epiano1/Fs3.mp3',
    'G3': '/audio/epiano1/G3.mp3',
    'Ab3': '/audio/epiano1/Gs3.mp3',
    'A3': '/audio/epiano1/A3.mp3',
    'Bb3': '/audio/epiano1/As3.mp3',
    'B3': '/audio/epiano1/B3.mp3',

    'C4': '/audio/epiano1/C4.mp3',
    'Db4': '/audio/epiano1/Cs4.mp3',
    'D4': '/audio/epiano1/D4.mp3',
    'Eb4': '/audio/epiano1/Ds4.mp3',
    'E4': '/audio/epiano1/E4.mp3',
    'F4': '/audio/epiano1/F4.mp3',
    'Gb4': '/audio/epiano1/Fs4.mp3',
    'G4': '/audio/epiano1/G4.mp3',
    'Ab4': '/audio/epiano1/Gs4.mp3',
    'A4': '/audio/epiano1/A4.mp3',
    'Bb4': '/audio/epiano1/As4.mp3',
    'B4': '/audio/epiano1/B4.mp3',
}




var stringsVoice = {
    'A0': '/audio/string_ensemble_2-mp3/A0.mp3',
    'A1': '/audio/string_ensemble_2-mp3/A1.mp3',
    'A2': '/audio/string_ensemble_2-mp3/A2.mp3',
    'A3': '/audio/string_ensemble_2-mp3/A3.mp3',
    'A4': '/audio/string_ensemble_2-mp3/A4.mp3',
    'A5': '/audio/string_ensemble_2-mp3/A5.mp3',
    'A6': '/audio/string_ensemble_2-mp3/A6.mp3',
    'A7': '/audio/string_ensemble_2-mp3/A7.mp3',
    'Ab1': '/audio/string_ensemble_2-mp3/Ab1.mp3',
    'Ab2': '/audio/string_ensemble_2-mp3/Ab2.mp3',
    'Ab3': '/audio/string_ensemble_2-mp3/Ab3.mp3',
    'Ab4': '/audio/string_ensemble_2-mp3/Ab4.mp3',
    'Ab5': '/audio/string_ensemble_2-mp3/Ab5.mp3',
    'Ab6': '/audio/string_ensemble_2-mp3/Ab6.mp3',
    'Ab7': '/audio/string_ensemble_2-mp3/Ab7.mp3',
    'B0': '/audio/string_ensemble_2-mp3/B0.mp3',
    'B1': '/audio/string_ensemble_2-mp3/B1.mp3',
    'B2': '/audio/string_ensemble_2-mp3/B2.mp3',
    'B3': '/audio/string_ensemble_2-mp3/B3.mp3',
    'B4': '/audio/string_ensemble_2-mp3/B4.mp3',
    'B5': '/audio/string_ensemble_2-mp3/B5.mp3',
    'B6': '/audio/string_ensemble_2-mp3/B6.mp3',
    'B7': '/audio/string_ensemble_2-mp3/B7.mp3',
    'Bb0': '/audio/string_ensemble_2-mp3/Bb0.mp3',
    'Bb1': '/audio/string_ensemble_2-mp3/Bb1.mp3',
    'Bb2': '/audio/string_ensemble_2-mp3/Bb2.mp3',
    'Bb3': '/audio/string_ensemble_2-mp3/Bb3.mp3',
    'Bb4': '/audio/string_ensemble_2-mp3/Bb4.mp3',
    'Bb5': '/audio/string_ensemble_2-mp3/Bb5.mp3',
    'Bb6': '/audio/string_ensemble_2-mp3/Bb6.mp3',
    'Bb7': '/audio/string_ensemble_2-mp3/Bb7.mp3',
    'C1': '/audio/string_ensemble_2-mp3/C1.mp3',
    'C2': '/audio/string_ensemble_2-mp3/C2.mp3',
    'C3': '/audio/string_ensemble_2-mp3/C3.mp3',
    'C4': '/audio/string_ensemble_2-mp3/C4.mp3',
    'C5': '/audio/string_ensemble_2-mp3/C5.mp3',
    'C6': '/audio/string_ensemble_2-mp3/C6.mp3',
    'C7': '/audio/string_ensemble_2-mp3/C7.mp3',
    'C8': '/audio/string_ensemble_2-mp3/C8.mp3',
    'D1': '/audio/string_ensemble_2-mp3/D1.mp3',
    'D2': '/audio/string_ensemble_2-mp3/D2.mp3',
    'D3': '/audio/string_ensemble_2-mp3/D3.mp3',
    'D4': '/audio/string_ensemble_2-mp3/D4.mp3',
    'D5': '/audio/string_ensemble_2-mp3/D5.mp3',
    'D6': '/audio/string_ensemble_2-mp3/D6.mp3',
    'D7': '/audio/string_ensemble_2-mp3/D7.mp3',
    'Db1': '/audio/string_ensemble_2-mp3/Db1.mp3',
    'Db2': '/audio/string_ensemble_2-mp3/Db2.mp3',
    'Db3': '/audio/string_ensemble_2-mp3/Db3.mp3',
    'Db4': '/audio/string_ensemble_2-mp3/Db4.mp3',
    'Db5': '/audio/string_ensemble_2-mp3/Db5.mp3',
    'Db6': '/audio/string_ensemble_2-mp3/Db6.mp3',
    'Db7': '/audio/string_ensemble_2-mp3/Db7.mp3',
    'E1': '/audio/string_ensemble_2-mp3/E1.mp3',
    'E2': '/audio/string_ensemble_2-mp3/E2.mp3',
    'E3': '/audio/string_ensemble_2-mp3/E3.mp3',
    'E4': '/audio/string_ensemble_2-mp3/E4.mp3',
    'E5': '/audio/string_ensemble_2-mp3/E5.mp3',
    'E6': '/audio/string_ensemble_2-mp3/E6.mp3',
    'E7': '/audio/string_ensemble_2-mp3/E7.mp3',
    'Eb1': '/audio/string_ensemble_2-mp3/Eb1.mp3',
    'Eb2': '/audio/string_ensemble_2-mp3/Eb2.mp3',
    'Eb3': '/audio/string_ensemble_2-mp3/Eb3.mp3',
    'Eb4': '/audio/string_ensemble_2-mp3/Eb4.mp3',
    'Eb5': '/audio/string_ensemble_2-mp3/Eb5.mp3',
    'Eb6': '/audio/string_ensemble_2-mp3/Eb6.mp3',
    'Eb7': '/audio/string_ensemble_2-mp3/Eb7.mp3',
    'F1': '/audio/string_ensemble_2-mp3/F1.mp3',
    'F2': '/audio/string_ensemble_2-mp3/F2.mp3',
    'F3': '/audio/string_ensemble_2-mp3/F3.mp3',
    'F4': '/audio/string_ensemble_2-mp3/F4.mp3',
    'F5': '/audio/string_ensemble_2-mp3/F5.mp3',
    'F6': '/audio/string_ensemble_2-mp3/F6.mp3',
    'F7': '/audio/string_ensemble_2-mp3/F7.mp3',
    'G1': '/audio/string_ensemble_2-mp3/G1.mp3',
    'G2': '/audio/string_ensemble_2-mp3/G2.mp3',
    'G3': '/audio/string_ensemble_2-mp3/G3.mp3',
    'G4': '/audio/string_ensemble_2-mp3/G4.mp3',
    'G5': '/audio/string_ensemble_2-mp3/G5.mp3',
    'G6': '/audio/string_ensemble_2-mp3/G6.mp3',
    'G7': '/audio/string_ensemble_2-mp3/G7.mp3',
    'Gb1': '/audio/string_ensemble_2-mp3/Gb1.mp3',
    'Gb2': '/audio/string_ensemble_2-mp3/Gb2.mp3',
    'Gb3': '/audio/string_ensemble_2-mp3/Gb3.mp3',
    'Gb4': '/audio/string_ensemble_2-mp3/Gb4.mp3',
    'Gb5': '/audio/string_ensemble_2-mp3/Gb5.mp3',
    'Gb6': '/audio/string_ensemble_2-mp3/Gb6.mp3',
    'Gb7': '/audio/string_ensemble_2-mp3/Gb7.mp3',
}

var organVoice = {
    'A0': '/audio/drawbar_organ-mp3/A0.mp3',
    'A1': '/audio/drawbar_organ-mp3/A1.mp3',
    'A2': '/audio/drawbar_organ-mp3/A2.mp3',
    'A3': '/audio/drawbar_organ-mp3/A3.mp3',
    'A4': '/audio/drawbar_organ-mp3/A4.mp3',
    'A5': '/audio/drawbar_organ-mp3/A5.mp3',
    'A6': '/audio/drawbar_organ-mp3/A6.mp3',
    'A7': '/audio/drawbar_organ-mp3/A7.mp3',
    'Ab1': '/audio/drawbar_organ-mp3/Ab1.mp3',
    'Ab2': '/audio/drawbar_organ-mp3/Ab2.mp3',
    'Ab3': '/audio/drawbar_organ-mp3/Ab3.mp3',
    'Ab4': '/audio/drawbar_organ-mp3/Ab4.mp3',
    'Ab5': '/audio/drawbar_organ-mp3/Ab5.mp3',
    'Ab6': '/audio/drawbar_organ-mp3/Ab6.mp3',
    'Ab7': '/audio/drawbar_organ-mp3/Ab7.mp3',
    'B0': '/audio/drawbar_organ-mp3/B0.mp3',
    'B1': '/audio/drawbar_organ-mp3/B1.mp3',
    'B2': '/audio/drawbar_organ-mp3/B2.mp3',
    'B3': '/audio/drawbar_organ-mp3/B3.mp3',
    'B4': '/audio/drawbar_organ-mp3/B4.mp3',
    'B5': '/audio/drawbar_organ-mp3/B5.mp3',
    'B6': '/audio/drawbar_organ-mp3/B6.mp3',
    'B7': '/audio/drawbar_organ-mp3/B7.mp3',
    'Bb0': '/audio/drawbar_organ-mp3/Bb0.mp3',
    'Bb1': '/audio/drawbar_organ-mp3/Bb1.mp3',
    'Bb2': '/audio/drawbar_organ-mp3/Bb2.mp3',
    'Bb3': '/audio/drawbar_organ-mp3/Bb3.mp3',
    'Bb4': '/audio/drawbar_organ-mp3/Bb4.mp3',
    'Bb5': '/audio/drawbar_organ-mp3/Bb5.mp3',
    'Bb6': '/audio/drawbar_organ-mp3/Bb6.mp3',
    'Bb7': '/audio/drawbar_organ-mp3/Bb7.mp3',
    'C1': '/audio/drawbar_organ-mp3/C1.mp3',
    'C2': '/audio/drawbar_organ-mp3/C2.mp3',
    'C3': '/audio/drawbar_organ-mp3/C3.mp3',
    'C4': '/audio/drawbar_organ-mp3/C4.mp3',
    'C5': '/audio/drawbar_organ-mp3/C5.mp3',
    'C6': '/audio/drawbar_organ-mp3/C6.mp3',
    'C7': '/audio/drawbar_organ-mp3/C7.mp3',
    'C8': '/audio/drawbar_organ-mp3/C8.mp3',
    'D1': '/audio/drawbar_organ-mp3/D1.mp3',
    'D2': '/audio/drawbar_organ-mp3/D2.mp3',
    'D3': '/audio/drawbar_organ-mp3/D3.mp3',
    'D4': '/audio/drawbar_organ-mp3/D4.mp3',
    'D5': '/audio/drawbar_organ-mp3/D5.mp3',
    'D6': '/audio/drawbar_organ-mp3/D6.mp3',
    'D7': '/audio/drawbar_organ-mp3/D7.mp3',
    'Db1': '/audio/drawbar_organ-mp3/Db1.mp3',
    'Db2': '/audio/drawbar_organ-mp3/Db2.mp3',
    'Db3': '/audio/drawbar_organ-mp3/Db3.mp3',
    'Db4': '/audio/drawbar_organ-mp3/Db4.mp3',
    'Db5': '/audio/drawbar_organ-mp3/Db5.mp3',
    'Db6': '/audio/drawbar_organ-mp3/Db6.mp3',
    'Db7': '/audio/drawbar_organ-mp3/Db7.mp3',
    'E1': '/audio/drawbar_organ-mp3/E1.mp3',
    'E2': '/audio/drawbar_organ-mp3/E2.mp3',
    'E3': '/audio/drawbar_organ-mp3/E3.mp3',
    'E4': '/audio/drawbar_organ-mp3/E4.mp3',
    'E5': '/audio/drawbar_organ-mp3/E5.mp3',
    'E6': '/audio/drawbar_organ-mp3/E6.mp3',
    'E7': '/audio/drawbar_organ-mp3/E7.mp3',
    'Eb1': '/audio/drawbar_organ-mp3/Eb1.mp3',
    'Eb2': '/audio/drawbar_organ-mp3/Eb2.mp3',
    'Eb3': '/audio/drawbar_organ-mp3/Eb3.mp3',
    'Eb4': '/audio/drawbar_organ-mp3/Eb4.mp3',
    'Eb5': '/audio/drawbar_organ-mp3/Eb5.mp3',
    'Eb6': '/audio/drawbar_organ-mp3/Eb6.mp3',
    'Eb7': '/audio/drawbar_organ-mp3/Eb7.mp3',
    'F1': '/audio/drawbar_organ-mp3/F1.mp3',
    'F2': '/audio/drawbar_organ-mp3/F2.mp3',
    'F3': '/audio/drawbar_organ-mp3/F3.mp3',
    'F4': '/audio/drawbar_organ-mp3/F4.mp3',
    'F5': '/audio/drawbar_organ-mp3/F5.mp3',
    'F6': '/audio/drawbar_organ-mp3/F6.mp3',
    'F7': '/audio/drawbar_organ-mp3/F7.mp3',
    'G1': '/audio/drawbar_organ-mp3/G1.mp3',
    'G2': '/audio/drawbar_organ-mp3/G2.mp3',
    'G3': '/audio/drawbar_organ-mp3/G3.mp3',
    'G4': '/audio/drawbar_organ-mp3/G4.mp3',
    'G5': '/audio/drawbar_organ-mp3/G5.mp3',
    'G6': '/audio/drawbar_organ-mp3/G6.mp3',
    'G7': '/audio/drawbar_organ-mp3/G7.mp3',
    'Gb1': '/audio/drawbar_organ-mp3/Gb1.mp3',
    'Gb2': '/audio/drawbar_organ-mp3/Gb2.mp3',
    'Gb3': '/audio/drawbar_organ-mp3/Gb3.mp3',
    'Gb4': '/audio/drawbar_organ-mp3/Gb4.mp3',
    'Gb5': '/audio/drawbar_organ-mp3/Gb5.mp3',
    'Gb6': '/audio/drawbar_organ-mp3/Gb6.mp3',
    'Gb7': '/audio/drawbar_organ-mp3/Gb7.mp3',
}

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden"
    },
    title: {
        fontWeight: "bolder",
        color: "black"
    },
    subheader: {
        width: "100%"
    }
});

class UploadMidi extends React.Component {
    constructor() {
        super();

        this.state = {
            activePiano: [],
            trackPianoMax: 0.0,
            secondsElapsed: 0,
            incrementer: null,
            trackState: "stopped",
            loadingKeys: true,
            BPM: 190,
            valueModulated: 0,
            tempoMod: 1,
            valueVoice: "1"
        };

        this.scrollingKeys = [];

        this.onClickPlay = this.onClickPlay.bind(this);
        this.onClickStop = this.onClickStop.bind(this);
        this.onClickPause = this.onClickPause.bind(this);
        this.handleUploadMidi = this.handleUploadMidi.bind(this);
    }

    componentDidMount() {
        let currentComponent = this;
        sampler = new Tone.Sampler(pianoVoice, function () {
            // will repitch the closest sample
            samplerEpiano = new Tone.Sampler(epianoVoice, function () {
                // will repitch the closest sample 
                samplerStrings = new Tone.Sampler(stringsVoice, function () {
                    // will repitch the closest sample
                    samplerOrgan = new Tone.Sampler(organVoice, function () {
                        // will repitch the closest sample

                        gain.toMaster();
                        sampler.connect(gain);
                        samplerEpiano.connect(gain);
                        samplerStrings.connect(gain);
                        samplerOrgan.connect(gain);
                        currentComponent.setState({ loadingKeys: false });
                    });
                });
            });
        });


    }

    cleanChords(updatedNotes){
        var allTimes = updatedNotes.map(a =>
            a.time,
        );
        var uniqTimes = [...new Set(allTimes)];
        uniqTimes = uniqTimes.reverse();

        var versionTwoNotes = []

        var arrayLength = uniqTimes.length;
        for (var i = 0; i < arrayLength; i++) {
            var value = uniqTimes[i];
            const currentEvents = updatedNotes.filter(event => {
                return event.time <= value && event.time + event.duration > value;
            });
            var newNotes = currentEvents.map(obj => (
                {
                    id: i,
                    time: obj.time,
                    midiNumber: obj.midiNumber,
                    note: obj.note,
                    velocity: obj.velocity,
                    duration: obj.duration
                }
            ));

            versionTwoNotes.push(newNotes);
        }
        versionTwoNotes = [].concat.apply([], versionTwoNotes);


        versionTwoNotes = versionTwoNotes.filter((chord, index, self) =>
            index === self.findIndex((t) => (
                t.time === chord.time && t.midiNumber === chord.midiNumber
            ))
        )


        return versionTwoNotes;
    }

    loadScrollingNotes(updatedNotes){
        let currentComponent = this;
        this.scrollingKeys = [];

        var allTimes = updatedNotes.map(a =>
            a.time,
        );
        var uniqTimes = [...new Set(allTimes)];

        var arrayLength = uniqTimes.length;
        
        for (var i = 0; i < arrayLength; i++) {
            var value = uniqTimes[i];
            const currentEvents = updatedNotes.filter(event => {
                return event.time <= value && event.time + event.duration > value;
            });

            var cEvents = currentEvents.map(a =>
                a.midiNumber + currentComponent.state.valueModulated
            );

            var customPiano = <div className={"pianoMoving scrollPiano" + i} key={i}>
                <ControlledPiano
                        activeNotes={
                            cEvents
                        }
                        noteRange={{ first: firstNote, last: lastNote }}
                        playNote={(midiNumber) => {
                            // Play a given note - see notes below
                        }}
                        stopNote={(midiNumber) => {
                            // Stop playing a given note - see notes below
                        }}
                        onPlayNoteInput={(midiNumber) => {
                            // Play a given note - see notes below
                        }}
                        onStopNoteInput={(midiNumber) => {
                            // Stop playing a given note - see notes below
                        }}
                        disabled={false}
                    />
                </div>;

                this.scrollingKeys.push(customPiano);
        }

        this.scrollToBottom();
    }

    scrollToBottom(){
        $(".pianoScroll").scrollTop($(".pianoScroll")[0].scrollHeight);
    }

    scrollToChord(id){
        console.log(id);
        var toScroll = ".scrollPiano" + id;

        $(".pianoScroll").scrollTop($(toScroll).offset().top);

    }


    async handleUploadMidi(event) {
        event.stopPropagation();
        event.preventDefault();

        let currentComponent = this;
        var file = event.target.files[0];

        Tone.Transport.stop();
        Tone.Transport.cancel();


        var reader = new FileReader();

        reader.onload = async function (e) {

            var readerResult = reader.result;

            //const midi = await Midi.fromUrl("path/to/midi.mid")

            // load a midi file in the browser
            midi = await Midi.fromUrl(readerResult)

            //The formula is 60000 / (BPM * PPQ) (milliseconds).
            //BPM = midi.header.tempos[0].bpm * currentComponent.state.tempoMod
            currentComponent.setState({ BPM: midi.header.tempos[0].bpm * currentComponent.state.tempoMod });

            var PPQ = midi.header.ppq
            var msPerTick = 60000 / (currentComponent.state.BPM * PPQ)
            var secTick = msPerTick / 1000.0

            Tone.Transport.bpm.value = currentComponent.state.BPM

            if (midi.header.timeSignatures[0]) {
                Tone.Transport.timeSignature = midi.header.timeSignatures[0].timeSignature
            } else {
                Tone.Transport.timeSignature = 120
            }

            var track = midi.tracks[0]

            var givenNotes = track.notes
            var updatedNotes = givenNotes.map(obj => (
                {
                    time: (obj.ticks * secTick),
                    midiNumber: obj.midi,
                    note: obj.name,
                    velocity: obj.velocity,
                    duration: (obj.durationTicks * secTick)
                }
            ));
            //console.log(updatedNotes);

            var versionTwoNotes = currentComponent.cleanChords(updatedNotes);
           
            currentComponent.loadScrollingNotes(versionTwoNotes);
            //console.log(versionTwoNotes);

            var midiPart = new Tone.Part(function (time, value) {
                //Show Current Piano Playing

                const currentEvents = versionTwoNotes.filter(event => {
                    return event.time <= value.time && event.time + event.duration > value.time;
                });

                var cEvents = currentEvents.map(a =>
                    a.midiNumber + currentComponent.state.valueModulated
                );


                Tone.Draw.schedule(function () {
                    currentComponent.setState({
                        activePiano: cEvents,
                    })
                    if (currentEvents[0]) {
                        currentComponent.scrollToChord(currentEvents[0].id)
                    }

                }, time)


                //use the events to play                         
                if (currentComponent.state.valueVoice == "1") {
                    sampler.triggerAttackRelease(currentComponent.midiToPitch(value.midiNumber + currentComponent.state.valueModulated), value.duration, time, value.velocity)
                } else if (currentComponent.state.valueVoice == "2") {
                    samplerEpiano.triggerAttackRelease(currentComponent.midiToPitch(value.midiNumber + currentComponent.state.valueModulated), value.duration, time, value.velocity)
                } else if (currentComponent.state.valueVoice == "3") {
                    samplerStrings.triggerAttackRelease(currentComponent.midiToPitch(value.midiNumber + currentComponent.state.valueModulated), value.duration, time, value.velocity)
                } else if (currentComponent.state.valueVoice == "4") {
                    samplerOrgan.triggerAttackRelease(currentComponent.midiToPitch(value.midiNumber + currentComponent.state.valueModulated), value.duration, time, value.velocity)
                }

            }, versionTwoNotes).start(0);


            currentComponent.setState({ trackPianoMax: currentComponent.getRecordingEndTime() });

            //check midi load
            isMidiLoaded = true
        }
        reader.readAsDataURL(file);


    }



    midiToPitch = midi => {
        const scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const octave = Math.floor(midi / 12) - 1;
        const note = midi % 12;
        return scaleIndexToNote[note] + octave;
    }



    getRecordingEndTime = () => {
        let currentComponent = this;

        if (midi.tracks.length === 0) {
            return 0;
        }

        var PPQ = midi.header.ppq
        var msPerTick = 60000 / (currentComponent.state.BPM * PPQ)
        var secTick = msPerTick / 1000.0


        var high = 0;
        var allTracks = midi.tracks.map(event => event.notes)
        allTracks.forEach(track => {
            var thisHigh = Math.max(
                ...track.map(event => (event.ticks * secTick) + (event.durationTicks * secTick)),
            );

            if (thisHigh > high) {
                high = thisHigh
            }
        })
        return high;
    };



    onChangeTrack(e) {
        let currentComponent = this;
        if (isMidiLoaded && this.state.loadingKeys == false) {

            let progressionPosition = e.target.value
            Tone.Transport.seconds = progressionPosition
            this.setState({ secondsElapsed: parseFloat(progressionPosition) });

            //draw current value
            var PPQ = midi.header.ppq
            var msPerTick = 60000 / (currentComponent.state.BPM * PPQ)
            var secTick = msPerTick / 1000.0

            midi.tracks.forEach(track => {
                var givenNotes = track.notes
                var updatedNotes = givenNotes.map(obj => (
                    {
                        time: (obj.ticks * secTick),
                        midiNumber: obj.midi,
                        note: obj.name,
                        velocity: obj.velocity,
                        duration: (obj.durationTicks * secTick)
                    }
                ));
                const currentEvents = updatedNotes.filter(event => {
                    return event.time <= progressionPosition && event.time + event.duration > progressionPosition;
                });
                var cEvents = currentEvents.map(a =>
                    a.midiNumber + currentComponent.state.valueModulated
                );
                currentComponent.setState({
                    activePiano: cEvents,
                });

                var cEachNote = cEvents.map(a =>
                    currentComponent.midiToPitch(a)
                );
            });
        }
    }



    onClickPlay() {
        if (isMidiLoaded && this.state.loadingKeys == false) {
            if (this.state.trackState == "stopped" || this.state.trackState == "paused") {

                this.state.incrementer = setInterval(() => {
                    requestAnimationFrame(() => {

                        if (this.getRecordingEndTime().toFixed(0) == this.state.secondsElapsed.toFixed(0)) {
                            this.onClickStop();
                        } else {
                            this.setState({
                                secondsElapsed: this.state.secondsElapsed + 0.5
                            })
                        }
                    })
                }, 500);

                Tone.Transport.start();
                this.setState({ trackState: Tone.Transport.state });
            }
        }
    }



    onClickPause() {
        if (isMidiLoaded && this.state.loadingKeys == false) {
            if (this.state.trackState == "started") {
                Tone.Transport.pause();

                //Clear Progressions in Tracker
                clearInterval(this.state.incrementer);

                this.setState({ trackState: Tone.Transport.state });
            }
        }
    }


    onClickStop() {
        if (isMidiLoaded && this.state.loadingKeys == false) {
            if (this.state.trackState == "started" || this.state.trackState == "paused") {
                Tone.Transport.stop();

                clearInterval(this.state.incrementer);

                this.setState({
                    trackState: Tone.Transport.state,
                    secondsElapsed: 0,
                    activePiano: []
                });
            }
        }

    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Typography className={classes.title} variant="h5" noWrap>
                    Upload
            </Typography>

                <input ref={(ref) => { this.uploadInput = ref; }} type="file" onChange={(event) => {
                    this.handleUploadMidi(event)
                }} />

                <div className="pianoScroll">
                    {this.scrollingKeys}
                </div>


                <div className="playerContainer">
                    <div className="slider-options">
                        {this.state.trackState == "stopped" || this.state.trackState == "paused" ?
                            <button className="sliderPlay" onClick={this.onClickPlay}><PlayArrowIcon></PlayArrowIcon></button>
                            :
                            <button className="sliderPause" onClick={this.onClickPause}><PauseIcon></PauseIcon></button>
                        }
                        <button className="sliderStop" onClick={this.onClickStop}><StopIcon></StopIcon></button>

                        <h1 className="slider-stopwatch">{(this.state.secondsElapsed).toFixed(2)}</h1>
                    </div>

                    <input className="slider-range" type='range' step="any" value={this.state.secondsElapsed} min={0.0} max={this.state.trackPianoMax} onChange={this.onChangeTrack.bind(this)} />
                </div>


                <div className="pianoHeader">

                    <ControlledPiano
                        activeNotes={
                            this.state.activePiano
                        }
                        noteRange={{ first: firstNote, last: lastNote }}
                        playNote={(midiNumber) => {
                            // Play a given note - see notes below
                        }}
                        stopNote={(midiNumber) => {
                            // Stop playing a given note - see notes below
                        }}
                        onPlayNoteInput={(midiNumber) => {
                            // Play a given note - see notes below
                        }}
                        onStopNoteInput={(midiNumber) => {
                            // Stop playing a given note - see notes below
                        }}
                        disabled={false}
                    />

                </div>

            </div>
        );
    }
}

UploadMidi.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UploadMidi);