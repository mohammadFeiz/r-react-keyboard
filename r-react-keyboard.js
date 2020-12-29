import React,{Component,createContext} from 'react';
import './index.css';
import $ from 'jquery';
var keyboardContext = createContext();

export default class RReactKeyboard extends Component {
  constructor(props) {
    super(props);
    var {value = '',theme,languageIndex = false,languages} = this.props;
    this.theme = {
      background:'#c9ced4',keyColor:'#28292b',keyActiveColor:'#1d5ee4',keyBackground:'#fff',screenBackground:'#eee',screenColor:'#666',
      titleColor:'#000',highlight:'#7fb9ef',keyBoxShadow:undefined,
      ...theme
    };
    this.state = {
      caps:false,sym:false,value,init:true,
      languageIndex,
      isMobile:'ontouchstart' in document.documentElement?true:false,
      rows:this.rows,rtl:this.getRTL()
    }
    this.state.rows = languageIndex !== false?this.getRowsByLanguageIndex(languageIndex):this.getOriginalRows();
  }
  changeValue(value){
    this.setState({value});
    if(this.props.onChange && !this.props.onSend){
      this.props.onChange(value)
    }
  }
  getRTL(){
    var {languages,languageIndex} = this.props;
    return languageIndex !== false && languages[languageIndex].direction === 'rtl';
  }
  getOriginalRows(){
    return [
        {
          items: [
            {lowerCase:'1',sym:'{'},{lowerCase:'2',sym:'}'},{lowerCase:'3',sym:'|'},{lowerCase:'4',sym:'['},{lowerCase:'5',sym:']'},
            {lowerCase:'6',sym:'\\'},{lowerCase:'7',sym:'~'},{lowerCase:'8',sym:'<'},{lowerCase:'9',sym:'>'},{lowerCase:'0',sym:'`'},
          ]
        },
        {
          items: [
            {lowerCase:'q',caps:'Q',hotKey:'Q',sym:'+'},{lowerCase:'w',caps:'W',sym:'x'},{lowerCase:'e',caps:'E',sym:'÷'},{lowerCase:'r',caps:'R',sym:'='},{lowerCase:'t',caps:'T',sym:'/'},
            {lowerCase:'y',caps:'Y',sym:'_'},{lowerCase:'u',caps:'U',sym:'€'},{lowerCase:'i',caps:'I',sym:'£'},{lowerCase:'o',caps:'O',sym:'¥'},{lowerCase:'p',caps:'P',sym:'*'},
          ]
        },
        {
          style:{padding:'0 5%'},
          items: [
            {lowerCase:'a',caps:'A',sym:'!'},{lowerCase:'s',caps:'S',sym:'@'},{lowerCase:'d',caps:'D',sym:'#'},{lowerCase:'f',caps:'F',sym:'$'},{lowerCase:'g',caps:'G',sym:'%'},
            {lowerCase:'h',caps:'H',sym:'^'},{lowerCase:'j',caps:'J',sym:'&'},{lowerCase:'k',caps:'K',sym:'('},{lowerCase:'l',caps:'L',sym:')'},   
          ]
        },
        {
          items: [
            {
              icon:'caps',id:'key-caps',flex:1.5,
              keyDown:()=>this.setState({caps:!this.state.caps})
            },
            {lowerCase:'z',caps:'Z',sym:'-'},{lowerCase:'x',caps:'X',sym:'\''},{lowerCase:'c',caps:'C',sym:'\"'},{lowerCase:'v',caps:'V',sym:':'},
            {lowerCase:'b',caps:'B',sym:';'},{lowerCase:'n',caps:'N',sym:','},{lowerCase:'m',caps:'M',sym:'?'},  
            {
              keyDown:()=>{
                let {init,value} = this.state;
                if(init){this.changeValue(''); this.setState({init:false})}
                else if(value.length > 0){this.changeValue(value.slice(0,value.length - 1))}
              },
              icon:'back',id:'key-back',sym:'+',flex:1.5
            },    
          ]
        },
        {
          items: [
            {lowerCase:'!#1',id:'sym',flex:1.5,keyDown:()=>this.setState({sym:!this.state.sym})},
            {lowerCase:','},
            {
              lowerCase:'English',id:'key-space',flex:5,
              keyDown:()=>{
                let {init,value} = this.state;
                if(init){this.changeValue(''); this.setState({init:false})}
                else if(value.length > 0 && value[value.length - 1] !== ' '){
                  this.changeValue(value + ' ');
                }
              }
            },
            {lowerCase:'.'},
            {icon:'inter',id:'key-inter',flex:1.5,keyDown:()=>this.inter()},
          ]
        }
      ]
  }
  getIcon(type){
    var {caps} = this.state;
    var {keyColor,keyActiveColor,keyBackground} = this.theme;
    var capsColor = caps?keyActiveColor:keyColor;
    
    var icons = {
      inter:(
        <svg style={{width:"20px",height:"14px"}} width={20} height={14}>
          <path stroke={keyColor} fill='none' d="M18 2 L18 8 L6 8" strokeWidth={4}></path>
          <path stroke={keyColor} d="M6 8 L6 11 L2 8 L6 5 L6 8" strokeWidth={2}></path>
        </svg>
      ),
      caps:(
        <svg style={{width:"20px",height:"14px"}} width={20} height={14}>
          <path fill={capsColor} d="M12 7 L12 14 L8 14 L8 7"></path><path fill={capsColor} d="M17 7 L10 0 L3 7"></path>
        </svg>
      ),
      back:(
        <svg style={{width:"20px",height:"12px"}} width={20} height={12}>
          <path fill={keyColor} d="M5 0 L0 6 L5 12 L20 12 L20 0 L5 0"></path>
          <path stroke={keyBackground} d="M10 4 L14 8"></path><path stroke={keyBackground} d="M14 4 L10 8"></path>
        </svg>
      )
    }
    return icons[type]
  }
  getUpper(item){
    var {caps,sym} = this.state;
    if(item.icon){return this.getIcon(item.icon);}
    if(this.hotKeyMode && item.hotKey){return item.hotKey;}
    if(sym&& item.sym){return item.sym;}
    if(caps && item.caps){return item.caps;}
    return item.lowerCase;
  }
  inter(){
    if(this.props.onSend){
      this.props.onSend(this.state.value);
      this.changeValue('');
      this.setState({init:true})
    }
  }
  keydown(item){
    var {rows,isMobile} = this.state;
    var {keyDown} = item;
    if(keyDown){item.keyDown()}
    else{
      $(window).bind(isMobile?'touchend':'mouseup',$.proxy(this.keyup,this));
      this.active = item;
      item.active = true;
      this.setState({rows});
      this.timeout = setTimeout(()=>{
        this.hotKeyMode = true;
        this.keyup()
      },600)
    }
  }
  keyup(){
    clearTimeout(this.timeout)
    var {isMobile} = this.state;
    $(window).unbind(isMobile?'touchend':'mouseup',this.keyup);
    var {rows,value,init} = this.state;
    this.active.active = false;
    if(init){
      this.setState({rows,init:false})
      this.changeValue(this.getUpper(this.active))
    }
    else{
      this.setState({rows})
      this.changeValue(value + this.getUpper(this.active))
    }
    this.hotKeyMode = false;
    this.active = false;
  }
  getStyle(){
    var {style = {}} = this.props;
    var {rtl} = this.state;
    var {background} = this.theme;
    return {background,direction:rtl?'rtl':'ltr',...style};
  }
  close(){
      this.setState({init:true});
      this.props.onClose();
  }
  lcdMouseDown(){
    var {init} = this.state;
    this.setState({init:!init})
  }
  SetState(obj){
    this.setState(obj)
  }
  changeLanguage(index){
    if(index === false){this.setState({rows:this.getOriginalRows(),rtl:false,languageIndex:index}); return;}
    this.setState({rows:this.getRowsByLanguageIndex(index),rtl:this.getRTL(),languageIndex:index})
  }
  getRowsByLanguageIndex(index){
    var rows = this.getOriginalRows();
    if(index === false){return rows;}
    var {languages} = this.props;
    var language = languages[index];
    for(let i = 0; i < rows.length; i++){
      let row = rows[i];
      for(let j = 0; j < row.items.length; j++){
        let key = row.items[j];
        if(!key.lowerCase){continue}
        if(!language.dictionary[key.lowerCase]){continue;}
        var {lowerCase,upperCase,hotKey} = language.dictionary[key.lowerCase];
        key.lowerCase = lowerCase;
        key.caps = upperCase;
        key.hotKey = hotKey
      }
      if(i === 2){
        if(language.extraKey){
          row.items.push(language.extraKey);
          row.style = undefined;
        }
        else {
          row.style = {padding:'0 5%'};
        }
      }
    }
    return rows;
  }
  render() {
    var {rtl,rows,languages,languageIndex,caps,value,sym,init,isMobile} = this.state;
    var {languages,onSend} = this.props;
    var {
      title = '',    
      keyHeight = 36,
      gap = 2,
    } = this.props;
    var contextValue = {
      caps,sym,value,init,title,keyHeight,gap,isMobile,theme:this.theme,languages,rtl,
      keydown:this.keydown.bind(this),
      getUpper:this.getUpper.bind(this),
      lcdMouseDown:this.lcdMouseDown.bind(this),
      SetState:this.SetState.bind(this),
      languageIndex,
      changeLanguage:this.changeLanguage.bind(this)
    };
    var backDropProps = {
      className:'back-drop',
      [isMobile?'onTouchStart':'onMouseDown']:this.close.bind(this)
    };
    return (
      <keyboardContext.Provider value={contextValue}>
      <div className={"keyboard" + (caps?' caps':'')} style={this.getStyle()}>
        
        <div {...backDropProps}></div>
        <KeyboardTitle />
        {onSend && <KeyboardHeader />}
        {
          rows.map((row,i)=>{
            return <KeyboardRow key={i} row={row} index={i}/>
          })
        }    
      </div>
      </keyboardContext.Provider>
    );
  }
}
class KeyboardRow extends Component{
  static contextType = keyboardContext;
  render(){
    var {row,index} = this.props;
    var {items,style} = row;
    
    var keys = items.map((item,i)=><KeyboardKey key={index + '/' + i} item={item}/>);
    return (
      <div key={index} className='keyboard-row' style={style}>
        {keys}
      </div>
    );
  }
}
class KeyboardKey extends Component{
  static contextType = keyboardContext;
  getColor(){
    var {sym,theme} = this.context;
    var {keyColor,keyActiveColor} = theme;
    var {item} = this.props;
    if(item.id==='sym'){return sym?keyActiveColor:keyColor;}
    else {return keyColor;}
  }
  getStyle(){
    var {keyHeight,gap} = this.context;
    var {item} = this.props,{flex = 1} = item;
    return {height: keyHeight+'px',flex,padding:gap+'px',}
  }
  getKeyStyle(mode){
    var {theme} = this.context;
    var {keyBackground,keyColor,keyBoxShadow} = theme;
    return {
      color:mode === 'shadow'?keyBackground:this.getColor(),
      background:mode === 'shadow'?keyColor:keyBackground,
      boxShadow:keyBoxShadow,
    }
  }
  render(){
    var {item} = this.props;
    var {keydown,getUpper,isMobile} = this.context;
    var containerProps = {
      className:"key-container",style:this.getStyle(),
      [isMobile?'onTouchStart':'onMouseDown']:()=>keydown(item)
    };
    var keyProps = {
      className:item.className + ' keyboard-key', 
      id:item.id,style:this.getKeyStyle()
    };
    return (
      <div {...containerProps}>
        <div {...keyProps}>
          {item.hotKey && <span>{item.hotKey}</span>}
          {getUpper(item)}
          {item.active && <div className='keyboard-key key-shadow' style={this.getKeyStyle('shadow')}>{getUpper(item)}</div>}
        </div>
      </div>
    );
  }
}
class KeyboardHeader extends Component{
  static contextType = keyboardContext;
  constructor(props){
    super(props);
  }
  getLCDStyle(){
    var {theme,keyHeight,gap} = this.context;
    var {screenBackground} = theme;
    return {
      background:screenBackground,
      minHeight:(keyHeight - 2 * gap) + 'px',
      maxHeight:(keyHeight * 3) + 'px',
    }
  }
  render(){
    var {value,gap,init,lcdMouseDown,theme,isMobile} = this.context;
    var {highlight,screenColor} = theme;
    var lcdProps = {
       className:'keyboard-lcd',style:this.getLCDStyle(),
       [isMobile?'onTouchStart':'onMouseDown']:lcdMouseDown
    };
    var markProps = {
       style:{
         background:init?highlight:'none',
         color:init?'#fff':screenColor
      }
    }
  
    return (
      <div className='keyboard-header'>
        <div {...lcdProps}>
          <mark {...markProps}>{value}</mark>
        </div>
      </div>
    );
  }
}
class KeyboardTitle extends Component{
  static contextType = keyboardContext;
  constructor(props){
    super(props);
  }
  getStyle(){
    var {keyHeight,theme,gap} = this.context;
    var {titleColor} = theme;
    return {
      height:keyHeight + 'px',
      color:titleColor,
    }
  }
  changeLanguage(){ 
    var {changeLanguage,languageIndex,languages} = this.context;
    if(languageIndex === false){
      languageIndex = 0;
    }
    else if(languageIndex < languages.length - 1){
      languageIndex++;
    }
    else {
      languageIndex = false;
    }
    changeLanguage(languageIndex)
  }
  render(){
    var {title,languages} = this.context;
    return(
      <div className='keyboard-title' style={this.getStyle()}>
        <span>{title}</span>
        {
          languages && languages.length !== 0 &&
          (
            <svg onClick={()=>this.changeLanguage()} style={{width:"24px",height:"24px",background:"#000000"}} width={24} height={24}>
              <path fill="transparent" stroke="#ffffff" d="M5 20 L12 3 L19 20" strokeLinejoin="round" strokeLinecap="round" strokeWidth={3}></path>
              <path fill="transparent" stroke="#ffffff" d="M8 14 L16 14" strokeLinejoin="round" strokeLinecap="round" strokeWidth={3}></path>
            </svg>
          )
        }
        
      </div>
    );
  }
}
