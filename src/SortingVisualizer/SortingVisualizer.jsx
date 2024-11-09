import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations,getBubbleSortAnimations,getInsertionSortAnimations,getSelectionSortAnimations } from '../SortingAlgorithms/SortingAlgorithm.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'blue';
const SECONDARY_COLOR = 'red';

// Maximum number of elements
const MAX_ARRAY_SIZE = 320;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            arraySize: 50, // Default value for the slider and array size
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.resetArray(this.state.arraySize);
    }

    resetArray(size) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });
    }

    handleChange(event) {
        const newSize = parseInt(event.target.value, 10);
        this.setState({ arraySize: newSize }, () => {
            this.resetArray(newSize);
        });
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    selectionSort(){
        const animations = getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, action] = animations[i];
    
            if (action === 'compare' || action === 'revert') {
                const color = action === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (action === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barTwoIdx}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, action] = animations[i];
    
            if (action === 'compare' || action === 'revert') {
                const color = action === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (action === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barTwoIdx}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    
    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, action] = animations[i];
    
            if (action === 'compare' || action === 'revert') {
                const color = action === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (action === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barTwoIdx}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const { array, arraySize } = this.state;
        const barWidth = Math.max(2, Math.floor(800 / arraySize)); // Calculate bar width based on array size

        return (
            <>
                <div className="array-container">
                    {array.map((value, index) => (
                        <div
                            className="array-bar"
                            key={index}
                            style={{ height: `${value}px`, width: `${barWidth}px` }}
                        >
                            {/* {value} */}
                        </div>
                    ))}

                    <footer className="footer">
                    <input
                            type="range"
                            min="10"
                            max={MAX_ARRAY_SIZE}
                            step="1"
                            value={arraySize}
                            onChange={this.handleChange}
                            className="slider"
                        />
                        
                        <button onClick={() => this.resetArray(arraySize)}>Generate New Array</button>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>

            

                        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                        <button onClick={() => this.selectionSort()}>Selection Sort</button>
                        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    </footer>
                </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
