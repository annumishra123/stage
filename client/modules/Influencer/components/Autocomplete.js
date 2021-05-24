import React, { Component } from "react";
import PropTypes from "prop-types";

// Import Style
import styles from '../influencer.css';

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
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
        if (userInput == '') {
            this.props.selectedItem(userInput);
        }
        const filteredSuggestions = suggestions.filter(suggestion => {
            let sellerName = `${suggestion.firstName} ${suggestion.lastName}`;
            return sellerName.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
        });

        this.setState({
            filteredSuggestions,
            showSuggestions: true,
            userInput: userInput
        });
    };

    onClick = (e, item) => {
        this.setState({
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
        this.props.selectedItem(item);
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
                            let sellerName = `${suggestion.firstName} ${suggestion.lastName}`;
                            return (
                                <li key={sellerName} className={styles.autocompleteLi} onClick={e => onClick(e, suggestion)}>
                                    {<img className={styles.suggestionListImage} alt='No Image available' src={suggestion.profileImageUrl} />}<div className={styles.liText}>{sellerName}</div>
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

        return <div className={styles.suggestionSection}>
            <input placeholder={this.props.placeholder} type="search" onChange={onChange} value={userInput} />
            {suggestionsListComponent}
        </div>;
    }
}

export default Autocomplete;