// import logo from './logo.svg'; // then in react can use <img src={logo} className="App-logo" alt="logo" />
import './jqueryGlobal.js';
import 'letteringjs';
import 'textillate';
import React, { Component } from 'react';

// import './css/App.css';
// import 'animate.css';

var $ = window.$;

class App extends Component {
    constructor(props) {
        super(props);

        this.options = {
            url1: 'https://storage.googleapis.com/french-books/fleursdumap.htm',
            url2: 'http://www.lemonde.fr/europe/article/2018/03/18/ce-qu-il-faut-savoir-avant-l-election-presidentielle-en-russie_5272676_3214.html'
        }
    }

    componentDidMount() {
        this.getNewText(); // very first time
        this.timer = setInterval(this.getNewText.bind(this), 8000);

        // textillate effect
        $('.App-french').textillate({ 
            in: { 
                effect: 'bounceIn',
                shuffle: true,
                delay: 3 
            },
            out: {
                effect: 'hinge', 
                shuffle: true
            }
        });

        $('.App-french span:first').on('click', '> *', (e) => {
            let word = e.currentTarget.getAttribute('aria-label');
            this.getDictionary(word);
        });
    }

    getNewText() {
        fetch('/getText', { method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                let result = json.data;

                $('.App-french').find('.texts li:first').text(result);
                $('.App-french').textillate('start');

                console.log(result);
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    getDictionary(word) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch(
            '/definition', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ word: word })
            }
        ).then((res) => {
            return res.json().then((json) => {
                console.log(json.data);
            });
        });
    }

    render() {
        return ( 
            <div className = "App" >
                <div className = "App-container" >
                    <div className = "App-french" >
                        Test
                    </div> 
                </div > 
            </div>
        );
    }
}

export default App;