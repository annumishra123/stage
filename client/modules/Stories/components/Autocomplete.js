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
        let userInput = e.currentTarget.value;
        if (userInput == '') {
            this.props.selectedItem(userInput);
        }
        let filteredSuggestions = suggestions.filter(suggestion => {
            switch (selectedType.toLowerCase().trim()) {
                case 'seller':
                case 'multiseller':
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

    onClick(suggestion, e) {
        this.setState({
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
        this.props.selectedItem({
            name: e.currentTarget.innerText, email: suggestion.email,
            username: suggestion.username, billingId: suggestion.defaultBillingInfoId
        });
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
                                case 'multiseller':
                                    let sellerName = `${suggestion.firstName} ${suggestion.lastName}`;
                                    return (
                                        <li key={index} className={styles.autocompleteLi} onClick={onClick.bind(this, suggestion)}>
                                            {<img className={styles.suggestionListImage} alt='No Image available' src={suggestion.profileImageUrl} />}<div className={styles.liText}>{sellerName}</div>
                                        </li>
                                    );
                                default:
                                    return (
                                        <li key={index} className={styles.autocompleteLi} onClick={onClick.bind(this, suggestion)}>
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