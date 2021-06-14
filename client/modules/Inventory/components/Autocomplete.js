import React, { Component } from "react";
import PropTypes from "prop-types";

// Import Style
import styles from './inventory.css';

export class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };
    static defaultProperty = {
        suggestions: []
    };
    constructor(props) {
        super(props);
        this.state = {
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
            inputArr: [],
            isNewAdded: false
        };
    }

    onChange = e => {
        const { suggestions } = this.props;
        const { inputArr, isNewAdded } = this.state;
        let userInput = e.currentTarget.value, finalInput = '';

        if (inputArr.length > 1) {
            let valArr = e.currentTarget.value.split(',');
            userInput = valArr[valArr.length - 1];
        } else if (inputArr.length == 1) {
            userInput = userInput.replace(inputArr[0], '');
        }

        if (userInput == '') {
            this.props.selectedItem([]);
            this.setState({ inputArr: [], isNewAdded: false });
        } else {
            finalInput = inputArr.length != 0 && isNewAdded ? `${inputArr.join(',')},${userInput}` : userInput;
        }

        let filteredSuggestions = suggestions.filter(suggestion => {
            return suggestion.value.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
        });

        this.setState({
            filteredSuggestions,
            showSuggestions: true,
            userInput: finalInput,
            isNewAdded: false
        });
    };

    onClick = e => {
        const { inputArr } = this.state;
        let tmpArr = inputArr;
        if (e.currentTarget.innerText != '') {
            tmpArr.push(e.currentTarget.innerText);
        }
        this.setState({
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: tmpArr.join(','),
            inputArr: tmpArr,
            isNewAdded: true
        });
        this.props.selectedItem(tmpArr);
    };

    render() {
        const { onChange, onClick,
            state: {
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className={styles.autocompleteUl}>
                        {filteredSuggestions.map((suggestion, index) => {
                            return (
                                <li key={suggestion.key} className={styles.autocompleteLi} onClick={onClick}>
                                    <div className={styles.liText}>{suggestion.value}</div>
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div>
                        <em>No suggestions</em>
                    </div>
                );
            }
        }

        return <div>
            <input type="search" onChange={onChange} value={userInput} />
            {suggestionsListComponent}
        </div>;
    }
}

export default Autocomplete;