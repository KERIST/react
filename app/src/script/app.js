import React from 'react';
import ReactDOM from 'react-dom';

require('../style/styles.scss');


class Test extends React.Component {
    render(){
        return <Btn />;
    }
}

Test.defaultProps = {name: "Alex"};

class Btn extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {color: 'rgb(1,2,3)', txt: 'click!', borderColor: 'rgb(0,0,0)', bgColor: 'transparent'};
        this.btnClick = this.btnClick.bind(this);
    }
    
    btnClick(e){
        let cR = ~~(Math.random() * 255),
            cG = ~~(Math.random() * 255),
            cB = ~~(Math.random() * 255),
            RGB = `rgb(${cR}, ${cG}, ${cB})`,
            bgRGBA = `rgba(${cR}, ${cG}, ${cB}, .1)`,
            borderRGB = `rgb(${cG}, ${cB}, ${cR})`;
            console.log(e.target);
        this.setState({color: RGB, txt: (cR + ""), borderColor: borderRGB, bgColor: bgRGBA});
    }

    render(){
        return <button onClick={this.btnClick} style={{color: this.state.color, border: `2px solid ${this.state.borderColor}`, backgroundColor: this.state.bgColor}} className="btn">{this.state.color}</button>;
    }
}

class Article extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return <article>
            <h3>{this.props.title}</h3>
            <p>{this.props.txt}</p>
            <strong>{this.props.author}</strong>
        </article>;
    }
}

class SayHello extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {name: 'stranger'};
        this.change = this.change.bind(this);
    }

    change(e){
        console.log(e.target.value);

        this.setState({name: e.target.value.length ? e.target.value : 'stranger'});
    }

    render(){
        return <div className="sayHello">
            <input type="text" onChange={this.change}/>
            <p>Hello {this.state.name} </p>
        </div>
    }
}

var data = [{id: 0, imgLink: 'https://cdn.pixabay.com/photo/2017/11/14/00/57/christmas-2947257__340.jpg', name: 'JUAN CARLOS', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
{id: 1, imgLink: 'https://cdn.pixabay.com/photo/2017/11/12/19/22/high-speed-2943518__340.jpg', name: 'JANE SMITH', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
{id: 2, imgLink: 'https://cdn.pixabay.com/photo/2017/09/25/07/49/powerboat-2784250__340.jpg', name: 'MARIO ROSSI', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
{id: 3, imgLink: 'https://cdn.pixabay.com/photo/2017/11/02/09/16/christmas-2910468__340.jpg', name: 'JUAN PEREZ', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
{id: 4, imgLink: 'https://cdn.pixabay.com/photo/2017/11/03/20/11/fire-2915539__340.jpg', name: 'JOHN JOHNSON', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}];

class ListItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {textHidden: true};
    }

    click(e){
        e.target.closest('.list__item').querySelector('p').classList.toggle('hidden');
    }

    render(){
        return <li key={this.props.id} onClick={this.click} className="list__item">
            <img src={this.props.link} width="100px" height="100px"/>
            <div>
                <strong>{this.props.name}</strong>
                <p className={this.state.textHidden ? 'hidden' : ''}>{this.props.text}</p>
            </div>
        </li>
    }
}

class PersonsList extends React.Component {
    
    constructor(props){
        super(props);
        let me = this;
        this.change = this.change.bind(this);
        this.items = data.slice(0);
        let renderItems = this.items.map(function(el){
            return me.getRenderItem(el);
        });
        this.state = {items: renderItems};
    }

    getRenderItem(data){
        return <ListItem key={data.id} link={data.imgLink} name={data.name} text={data.text} />;
    }

    change(e){
        let value = e.target.value.toLowerCase(),
        me = this,
        filterItems = this.items.filter(function(el){
            return ~el.name.toLowerCase().indexOf(value);
        }),
        renderItems = filterItems.map(function(el){
            return me.getRenderItem(el);
        });
        this.setState({items: renderItems});
    }

    render(){
        return <div>
            <input type="text" onChange={this.change}/>
            <ul>
                {this.state.items}
            </ul>
        </div>;
    }
}

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {result: 0};
    }

    render(){
        return <div className="block">
            <label>A: <input type="number" range="1" /></label> 
            <label>B: <input type="number" range="1" /></label>
            <div><button>+</button><button>-</button><button>*</button><button>/</button></div>
            <div>Result: {this.state.result}</div>             
        </div>
    }
}

ReactDOM.render(<div>
    <Btn />
    <Article className="block" title="Artile" txt="Lorem ipsum dolor sit amet consectetur adipisicing elit." author="John QQ"/>
    <SayHello className="block"/>
    <PersonsList />
    <Calculator />
</div>, document.querySelector('#app'));

