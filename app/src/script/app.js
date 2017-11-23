import React from 'react'
import { render } from 'react-dom'

require('../style/styles.scss');

class Test extends React.Component {
    render(){
        return <div>Hello</div>;
    }
}

render(<Test/>, document.querySelector('#app'));

console.log('helloq');