import React, { Component,Fragment} from 'react';
import { render } from 'react-dom';
import RReactKeyboard from './r-react-keyboard';
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      keyboard:true,
      value:'salam',
      title:'inter value'
    }
  }
  theme1 = {
    keyBackground:'#696969',
    keyColor:'#fff',
    background:'#242424',
    titleColor:'#fff',
    screenColor:'#000',
    screenBackground:'#eee',
    keyActiveColor:'#4c6bff',
    keyBoxShadow:'0 1px 2px 0px #000', 
  }
  theme2 = {
    keyBackground:'#5b696c',
    keyColor:'#fff',
    background:'#36474f',
    titleColor:'#fff',
    screenColor:'#000',
    screenBackground:'#fff',
    keyActiveColor:'#699bb4',
    keyBoxShadow:'0 1px 2px 1px #29333c', 
  }
  theme3 = {
    keyBackground:'#3b3e4b',
    keyColor:'#fff',
    background:'#2d2f39',
    titleColor:'#fff',
    screenColor:'#000',
    screenBackground:'#eee',
    keyActiveColor:'#4556aa',
    keyBoxShadow:'0 1px 2px 1px #222', 
  }
  openKeyboard(){
    this.setState({keyboard:true});
  }
  send(value){
    this.setState({value});
  }
  change(value){
    this.setState({value});
  }
  closeKeyboard(){
    this.setState({keyboard:false});
  }
  render(){
    var {keyboard} = this.state;
    return(
      <Fragment>
        <button onClick={this.openKeyboard.bind(this)}>open keyboard</button>
        <div id='result'>{this.state.value}</div>
        {
          keyboard && 
          <RReactKeyboard 
          value={this.state.value} 
          title={this.state.title}
          onClose={this.closeKeyboard.bind(this)}
          keyHeight={48}
          gap={3}
          languageIndex={0}
          onChange={this.change.bind(this)}
          languages={[
            {
              direction:'rtl',
              name:'Fa',
              extraKey:{lowerCase:'پ'},
              dictionary:{
                'q':{lowerCase:'ص',hotKey:'ض'},
                'w':{lowerCase:'ث'},
                'e':{lowerCase:'ق'},
                'r':{lowerCase:'ف'},
                't':{lowerCase:'ع',hotKey:'غ'},
                'y':{lowerCase:'ه'},
                'u':{lowerCase:'خ'},
                'i':{lowerCase:'ح'},
                'o':{lowerCase:'ج'},
                'p':{lowerCase:'چ'},
                'a':{lowerCase:'ش'},
                's':{lowerCase:'س'},
                'd':{lowerCase:'ی',hotKey:'ئ'},
                'f':{lowerCase:'ب'},
                'g':{lowerCase:'ل'},
                'h':{lowerCase:'ا',hotKey:'آ'},
                'j':{lowerCase:'ت'},
                'k':{lowerCase:'ن'},
                'l':{lowerCase:'م'},
                'z':{lowerCase:'ط',hotKey:'ظ'},
                'x':{lowerCase:'ز',hotKey:'ژ'},
                'c':{lowerCase:'ر'},
                'v':{lowerCase:'د',hotKey:'ذ'},
                'b':{lowerCase:'و'},
                'n':{lowerCase:'ک'},
                'm':{lowerCase:'گ'},
                'English':{lowerCase:'Persian'}
              }
            }
          ]}
        />
        }
      </Fragment>
    );
  }
}
render(<App />, document.getElementById('root'));
