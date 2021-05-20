import React, { Component } from "react";
import PropTypes from "prop-types";

// Import Style
import styles from '../stories.css';

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
            userInput: ""
        };
    }

    onChange = e => {
        const { suggestions, selectedType } = this.props;
        const userInput = e.currentTarget.value;
        if (userInput == '') {
            this.props.selectedItem(userInput);
        }
        const filteredSuggestions = suggestions.filter(suggestion => {
            switch (selectedType.toLowerCase().trim()) {
                case 'seller':
                    let sellerName = `${suggestion.firstName} ${suggestion.lastName}`;
                    return sellerName.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
                default:
                    return suggestion.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
            }
        });

        this.setState({
            filteredSuggestions,
            showSuggestions: true,
            userInput: userInput
        });
    };

    onClick = e => {
        this.setState({
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
        this.props.selectedItem(e.currentTarget.innerText);
    };

    render() {
        const { onChange, onClick,
            state: {
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        const { selectedType } = this.props;
        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className={styles.autocompleteUl}>
                        {filteredSuggestions.map((suggestion, index) => {
                            switch (selectedType.toLowerCase().trim()) {
                                case 'seller':
                                    let sellerName = `${suggestion.firstName} ${suggestion.lastName}`;
                                    return (
                                        <li key={sellerName} className={styles.autocompleteLi} onClick={onClick}>
                                            {<img className={styles.suggestionListImage} alt='No Image available' src={suggestion.profileImageUrl} />}<div className={styles.liText}>{sellerName}</div>
                                        </li>
                                    );
                                default:
                                    return (
                                        <li key={suggestion.title} className={styles.autocompleteLi} onClick={onClick}>
                                            <div className={styles.liText}>{suggestion.title}</div>
                                        </li>
                                    );
                            }
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